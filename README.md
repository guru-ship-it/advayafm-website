# Advaya FM NaipuNya — Website + API

Official website and backend API for Advaya FM NaipuNya training platform.

## Architecture

| Component | Technology | Deployment |
|-----------|-----------|------------|
| **Website** | Next.js 14 (App Router, TypeScript, Tailwind CSS) | AWS App Runner |
| **API** | FastAPI (Python 3.11) | AWS App Runner |
| **Assets** | S3 + CloudFront | AWS |
| **DNS** | GoDaddy → App Runner CNAME | GoDaddy |

## Repo Structure

```
advayafm-website/
├── web/                    Next.js website
│   ├── app/                Pages (App Router)
│   │   ├── page.tsx        Home
│   │   ├── about/          About page
│   │   ├── solutions/      Solutions (all 5 sectors)
│   │   ├── partners/       Partners & Recognition
│   │   ├── contact/        Contact form + demo request
│   │   ├── download/       App download page
│   │   ├── privacy-policy/ Privacy Policy (Play Store)
│   │   ├── data-deletion/  Data Deletion (Play Store)
│   │   └── terms/          Terms of Service
│   ├── components/         Header, Footer
│   ├── public/logos/       Brand logos + Pragati avatar
│   ├── Dockerfile          App Runner deployment
│   └── package.json
├── api/                    FastAPI backend
│   ├── main.py             Unified API (translate, handshake, POSH, progress)
│   ├── requirements.txt
│   └── Dockerfile
├── docs/
│   └── AWS_DEPLOYMENT.md   Step-by-step AWS setup guide
└── README.md
```

## Local Development

### Website
```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### API
```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
# Open http://localhost:8080/docs (Swagger UI)
```

## Deployment

See [docs/AWS_DEPLOYMENT.md](docs/AWS_DEPLOYMENT.md) for complete AWS App Runner deployment instructions.

## Brand

- **Primary**: Navy (#0A1628 → #1E3A5F)
- **Accent**: Gold (#D4AF37)
- **Typography**: Inter (body) + Playfair Display (headings)
- **Logos**: `web/public/logos/`

## Related Repos

- **Mobile App**: [ADVAYA-FM-NAIPUNYA-AG-BRO](https://github.com/guru-ship-it/ADVAYA-FM-NAIPUNYA-AG-BRO) — Flutter + WebXR training app

---

&copy; 2026 Advaya FM Pvt Ltd. All rights reserved.
