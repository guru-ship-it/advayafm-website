# AWS Deployment Guide — Advaya FM Website + API

Deploy the Next.js website and FastAPI backend on AWS App Runner using the Compliance Desk AWS account.

---

## Architecture

```
                    GoDaddy DNS
                        |
               www.advayafm.com
                        |
                   CloudFront (optional)
                   /          \
          App Runner (Web)    App Runner (API)
          Next.js :3000       FastAPI :8080
                   \          /
                    ECR (Docker images)
                        |
                  S3 (Static assets)
```

**Estimated cost**: ~$40-60/mo (App Runner 0.25 vCPU + 0.5 GB each)

---

## Step 1: IAM Setup (One-time)

### Create an IAM User for ADVAYA Deployment

1. Go to AWS Console → IAM → Users → Create User
2. Username: `advaya-deploy`
3. Attach policies:
   - `AmazonEC2ContainerRegistryFullAccess` (for ECR)
   - `AWSAppRunnerFullAccess` (for App Runner)
   - `AmazonS3FullAccess` (for static assets)
   - `CloudFrontFullAccess` (optional, for CDN)
4. Create access key (CLI access)
5. Save the Access Key ID and Secret Access Key securely

### Set Up AWS CLI on Your Machine

```bash
aws configure --profile advaya
# Enter: Access Key ID, Secret Key, Region: ap-south-1, Output: json
```

---

## Step 2: Create ECR Repositories

```bash
# Website ECR repo
aws ecr create-repository --repository-name advayafm-web --region ap-south-1 --profile advaya

# API ECR repo
aws ecr create-repository --repository-name advayafm-api --region ap-south-1 --profile advaya
```

Note the repository URIs (format: `ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-web`)

---

## Step 3: Build & Push Docker Images

### Login to ECR
```bash
aws ecr get-login-password --region ap-south-1 --profile advaya | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
```

### Build & Push Website
```bash
cd web
docker build -t advayafm-web .
docker tag advayafm-web:latest ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-web:latest
docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-web:latest
```

### Build & Push API
```bash
cd api
docker build -t advayafm-api .
docker tag advayafm-api:latest ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-api:latest
docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-api:latest
```

---

## Step 4: Create App Runner Services (AWS Console)

### Website Service

1. Go to AWS Console → App Runner → Create service
2. Source: **Container registry** → Amazon ECR
3. Image URI: `ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-web:latest`
4. ECR access role: Create new role (App Runner will auto-create)
5. Deployment: **Automatic** (redeploy on new image push)
6. Configuration:
   - Service name: `advayafm-web`
   - Port: `3000`
   - CPU: `0.25 vCPU`
   - Memory: `0.5 GB`
   - Environment variables:
     - `NODE_ENV` = `production`
     - `HOSTNAME` = `0.0.0.0`
7. Create service

### API Service

1. Same steps as above
2. Image URI: `ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/advayafm-api:latest`
3. Service name: `advayafm-api`
4. Port: `8080`
5. CPU: `0.25 vCPU`, Memory: `0.5 GB`
6. Create service

After creation, note the App Runner URLs:
- Web: `https://RANDOM.ap-south-1.awsapprunner.com`
- API: `https://RANDOM.ap-south-1.awsapprunner.com`

---

## Step 5: Custom Domain (GoDaddy DNS)

### Option A: Direct CNAME (Simplest)

1. In App Runner Console → your web service → Custom domains → Link domain
2. Enter: `www.advayafm.com`
3. App Runner will provide:
   - A CNAME record to add
   - Validation records for SSL certificate

4. Go to GoDaddy DNS Management for advayafm.com:
   - Delete any existing A/CNAME record for `www`
   - Add CNAME: `www` → the App Runner CNAME value
   - Add the validation CNAME records

5. Wait 5-15 minutes for DNS propagation
6. App Runner will auto-provision SSL certificate

### Option B: CloudFront (Better Performance)

1. Create CloudFront distribution
2. Origin: App Runner URL
3. Custom domain: `www.advayafm.com`
4. Request ACM certificate in us-east-1 for `*.advayafm.com`
5. Point GoDaddy CNAME to CloudFront distribution

---

## Step 6: S3 Bucket for Static Assets

```bash
# Create bucket
aws s3 mb s3://advayafm-assets --region ap-south-1 --profile advaya

# Upload logos and images
aws s3 sync web/public/logos/ s3://advayafm-assets/logos/ --profile advaya

# Make public (or use CloudFront OAI)
aws s3api put-bucket-policy --bucket advayafm-assets --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::advayafm-assets/*"
  }]
}' --profile advaya
```

---

## Step 7: GitHub Actions CI/CD (Optional)

Add to your repo: `.github/workflows/deploy.yml`

Requires GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_ACCOUNT_ID`

The workflow will:
1. Build Docker images
2. Push to ECR
3. App Runner auto-deploys on new image

---

## Maintenance

### View Logs
- App Runner Console → Service → Logs

### Redeploy
- Push new Docker image to ECR → App Runner auto-redeploys
- Or: App Runner Console → Deployments → Deploy

### Scale
- App Runner Console → Configuration → increase vCPU/Memory

### Costs
- App Runner: ~$15-25/mo per service (0.25 vCPU)
- ECR: ~$1/mo (storage)
- S3: ~$1-2/mo
- CloudFront: ~$1-5/mo
- **Total: ~$35-55/mo**
