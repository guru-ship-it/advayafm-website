import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Advaya FM NaipuNya mobile application and web platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-max py-16 sm:py-24">
      <div className="mx-auto max-w-3xl prose-policy">
        <p className="eyebrow">Legal</p>
        <h1 className="mb-2 font-display text-4xl font-bold text-navy-900 sm:text-5xl">Privacy Policy</h1>
        <p className="mb-10 text-sm text-navy-400">Effective Date: January 26, 2026 &bull; Last Updated: April 12, 2026</p>

        <h2>1. Introduction</h2>
        <p>
          Advaya FM Pvt Ltd (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the FM NaipuNya mobile application and web platform (collectively, the &ldquo;Service&rdquo;). We are committed to protecting your privacy in compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India and applicable data protection laws.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our Service.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect the following categories of data to provide our training and certification services:</p>
        <ul>
          <li><strong>Identity Data:</strong> Name, Employee ID, and profile photo (for identity verification via the Vajra system).</li>
          <li><strong>Contact Data:</strong> Mobile phone number (for OTP-based authentication via MSG91).</li>
          <li><strong>Device Data:</strong> Device ID, operating system version, and app version (for session management and security).</li>
          <li><strong>Training Data:</strong> Module completion records, quiz scores, assessment results, and training progress.</li>
          <li><strong>Camera &amp; Microphone:</strong> Used only during active liveness verification checks and WebXR simulations. Data is processed locally and not stored on servers.</li>
          <li><strong>Location Data:</strong> Collected only during active Emergency Mode (SOS) to coordinate with emergency services. Not collected during normal training.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <ul>
          <li>To authenticate your identity and maintain secure sessions.</li>
          <li>To track and verify completion of mandatory training modules.</li>
          <li>To generate compliance reports for your employer or facility manager (Pass/Fail status only).</li>
          <li>To improve our training content based on aggregated, anonymized performance data.</li>
          <li>To facilitate the zero-reprisal POSH (Prevention of Sexual Harassment) reporting system.</li>
          <li>To provide emergency services coordination when SOS is activated.</li>
        </ul>

        <h2>4. Zero-Reprisal POSH Guarantee</h2>
        <p>For users reporting harassment through our POSH module:</p>
        <ul>
          <li>All reports are <strong>end-to-end encrypted</strong>.</li>
          <li>Reports are routed <strong>directly to the Internal Complaints Committee (ICC)</strong>, bypassing local supervisors and managers.</li>
          <li>Your identity is protected unless you voluntarily choose to disclose it.</li>
          <li>We maintain a strict <strong>zero-reprisal policy</strong> &mdash; no adverse action will be taken against a reporter.</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <ul>
          <li><strong>With Your Employer:</strong> We share training compliance status (module completion, pass/fail) with your employer or facility manager as required for site access and regulatory compliance.</li>
          <li><strong>No Third-Party Advertising:</strong> We do NOT sell, rent, or share your personal data with advertisers or third-party marketing platforms.</li>
          <li><strong>Service Providers:</strong> We use cloud infrastructure (AWS) and authentication services (MSG91) that process data on our behalf under strict data processing agreements.</li>
          <li><strong>Legal Obligations:</strong> We may disclose data if required by law, court order, or government regulation.</li>
        </ul>

        <h2>6. Data Storage &amp; Security</h2>
        <ul>
          <li>All data is stored on servers located in <strong>India (AWS ap-south-1, Mumbai)</strong>.</li>
          <li>Data is encrypted in transit (TLS 1.3) and at rest (AES-256).</li>
          <li>Liveness verification telemetry is retained for a maximum of <strong>30 seconds</strong> and then permanently deleted.</li>
          <li>Training records are retained for the duration of your employment plus 3 years for audit purposes.</li>
        </ul>

        <h2>7. Your Rights Under the DPDP Act</h2>
        <p>As a data principal under the DPDP Act 2023, you have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data we hold.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
          <li><strong>Erasure:</strong> Request deletion of your data (see our <a href="/data-deletion">Data Deletion</a> page).</li>
          <li><strong>Portability:</strong> Export your training score card and certification records.</li>
          <li><strong>Grievance Redressal:</strong> Contact our Data Protection Officer for any privacy concerns.</li>
        </ul>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our Service is not intended for users under 18 years of age. We do not knowingly collect personal data from children. If you believe a minor has provided us with personal data, please contact us immediately.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Significant changes will be communicated through the app or via email. Continued use of the Service after changes constitutes acceptance.
        </p>

        <h2>10. Contact Us</h2>
        <p>For privacy concerns, data requests, or to exercise your rights under the DPDP Act:</p>
        <ul>
          <li><strong>Data Protection Officer:</strong> Guru Prasaad</li>
          <li><strong>Email:</strong> <a href="mailto:privacy@advayafm.com">privacy@advayafm.com</a></li>
          <li><strong>General Support:</strong> <a href="mailto:support@advayafm.com">support@advayafm.com</a></li>
          <li><strong>Phone:</strong> +91 81259 91247</li>
          <li><strong>Address:</strong> Advaya FM Pvt Ltd, 502B Sadhguru Capital Park, Madhapur, Hyderabad, Telangana 500081, India</li>
        </ul>
      </div>
    </div>
  );
}
