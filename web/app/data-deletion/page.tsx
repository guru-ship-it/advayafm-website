import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Deletion',
  description: 'Request deletion of your personal data from Advaya FM NaipuNya platform.',
};

export default function DataDeletionPage() {
  return (
    <div className="container-max py-16 sm:py-24">
      <div className="mx-auto max-w-3xl prose-policy">
        <p className="eyebrow">Legal</p>
        <h1 className="mb-2 font-display text-4xl font-bold text-navy-900 sm:text-5xl">Data Deletion Request</h1>
        <p className="mb-10 text-sm text-navy-400">Your right to delete your data under the DPDP Act 2023</p>

        <h2>Your Right to Delete Data</h2>
        <p>
          Under the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and
          Google Play Data Safety policies, you have the right to request the permanent
          deletion of your account and all associated personal data from the Advaya FM
          NaipuNya platform.
        </p>

        <h2>How to Request Deletion</h2>
        <p>To delete your account and personal data, please send an email to our Data Protection Officer:</p>
        <div className="my-6 rounded-xl border-2 border-gold-300 bg-gold-50 p-6">
          <p className="mb-2 text-base font-bold text-navy-900">Send an email to:</p>
          <p className="mb-1">
            <strong>Email:</strong>{' '}
            <a href="mailto:privacy@advayafm.com" className="text-gold-700 font-semibold">privacy@advayafm.com</a>
          </p>
          <p>
            <strong>Subject line:</strong>{' '}
            <code className="rounded bg-navy-100 px-2 py-1 text-sm">DELETE MY DATA - [Your Employee ID]</code>
          </p>
        </div>

        <h2>What Happens After Your Request</h2>
        <ol className="mb-6 ml-6 list-decimal space-y-3 text-navy-600">
          <li>
            <strong>Identity Verification (1-2 days):</strong> We will verify your identity
            via an OTP sent to your registered mobile number.
          </li>
          <li>
            <strong>Compliance Check:</strong> We will check if any data must be retained for
            legal or regulatory audit purposes (e.g., proof of mandatory safety training
            completion as required by MoRTH or your employer).
          </li>
          <li>
            <strong>Data Deletion (within 30 days):</strong> All non-essential personal data
            (profile photo, preferences, device data, quiz attempt details) will be permanently
            deleted from our servers.
          </li>
          <li>
            <strong>Confirmation:</strong> You will receive a final confirmation email
            confirming the deletion of your data.
          </li>
        </ol>

        <h2>What Data May Be Retained</h2>
        <p>
          In certain cases, we may be required by law or contractual obligation to retain
          minimal records:
        </p>
        <ul>
          <li>
            <strong>Training completion certificates:</strong> Anonymized records of module
            completion may be retained for employer audit and regulatory compliance (MoRTH,
            POSH Act requirements).
          </li>
          <li>
            <strong>POSH reports:</strong> If you have filed a harassment report, the
            encrypted report may be retained as required under the POSH Act 2013 for the
            duration of any ongoing investigation.
          </li>
        </ul>

        <h2>Important Notes</h2>
        <ul>
          <li>
            Deletion of your account will result in <strong>loss of all training progress</strong>,
            certification records, and verified status.
          </li>
          <li>
            If your employer requires proof of training completion, we recommend downloading
            your score card before requesting deletion.
          </li>
          <li>
            Account deletion is <strong>permanent and irreversible</strong>.
          </li>
        </ul>

        <h2>Contact</h2>
        <p>
          For questions about data deletion or to exercise any of your data rights:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:privacy@advayafm.com">privacy@advayafm.com</a></li>
          <li><strong>Phone:</strong> +91 81259 91247</li>
          <li><strong>Address:</strong> Advaya FM Pvt Ltd, 502B Sadhguru Capital Park, Madhapur, Hyderabad, Telangana 500081</li>
        </ul>

        <div className="mt-10 rounded-xl bg-navy-50 p-6 text-center">
          <p className="text-sm text-navy-500">
            For more information about how we handle your data, please see our{' '}
            <Link href="/privacy-policy" className="font-semibold text-gold-600 hover:text-gold-700">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
