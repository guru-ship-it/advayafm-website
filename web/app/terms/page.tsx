import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Advaya FM NaipuNya platform.',
};

export default function TermsPage() {
  return (
    <div className="container-max py-16 sm:py-24">
      <div className="mx-auto max-w-3xl prose-policy">
        <p className="eyebrow">Legal</p>
        <h1 className="mb-2 font-display text-4xl font-bold text-navy-900 sm:text-5xl">Terms of Service</h1>
        <p className="mb-10 text-sm text-navy-400">Effective Date: January 26, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Advaya FM NaipuNya platform (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

        <h2>2. Description of Service</h2>
        <p>Advaya FM NaipuNya is an AI-powered training and certification platform for workforce development. The Service includes mobile applications, web platforms, WebXR training simulations, AI-powered assessments, and compliance tracking tools.</p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must provide accurate information during registration.</li>
          <li>Your account is personal and non-transferable.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul>
          <li>Share login credentials with others or allow others to use your account.</li>
          <li>Record, screenshot, or redistribute training content (protected by Vajra Security).</li>
          <li>Attempt to bypass liveness verification or any security measures.</li>
          <li>Use the Service for any unlawful purpose.</li>
          <li>Submit false or misleading information in assessments or reports.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>All content, including training modules, WebXR simulations, quiz questions, the Pragati AI coach persona, branding, logos, and software code, is the intellectual property of Advaya FM Pvt Ltd. Unauthorized reproduction, distribution, or modification is strictly prohibited.</p>

        <h2>6. Training Certification</h2>
        <ul>
          <li>Completion certificates are issued upon successful completion of required modules with passing scores.</li>
          <li>Certificates are issued to the individual who completed the training and are non-transferable.</li>
          <li>Advaya FM reserves the right to revoke certificates if evidence of fraud or impersonation is found.</li>
        </ul>

        <h2>7. POSH Reporting</h2>
        <p>The zero-reprisal POSH reporting system is provided in compliance with the Prevention of Sexual Harassment at Workplace Act, 2013. False reports made with malicious intent may result in account suspension and appropriate legal action.</p>

        <h2>8. Limitation of Liability</h2>
        <p>Advaya FM Pvt Ltd provides the Service &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>

        <h2>9. Termination</h2>
        <p>We may suspend or terminate your access to the Service at any time for violation of these Terms or at the request of your employer. You may request account deletion at any time (see <a href="/data-deletion">Data Deletion</a>).</p>

        <h2>10. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.</p>

        <h2>11. Changes to Terms</h2>
        <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance.</p>

        <h2>12. Contact</h2>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@advayafm.com">support@advayafm.com</a></li>
          <li><strong>Address:</strong> Advaya FM Pvt Ltd, 502B Sadhguru Capital Park, Madhapur, Hyderabad, Telangana 500081</li>
        </ul>
      </div>
    </div>
  );
}
