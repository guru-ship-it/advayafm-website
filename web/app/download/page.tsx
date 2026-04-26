import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download App',
  description: 'Download the D Advaya FM NaipuNya training app from Google Play Store.',
};

// Play Store URLs
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=in.advayafm.training';
const OPEN_TESTING_URL = 'https://play.google.com/apps/testing/in.advayafm.training';

// Until the production launch on May 1 the Production Play Store URL
// returns a 404 (app is in Open Testing only). Until that flips, the QR
// code and primary CTA both point to the Open Testing URL so visitors
// always reach a working install page.
const PRIMARY_INSTALL_URL = OPEN_TESTING_URL;

// QR code service (Google Chart API - free, no auth required)
const QR_SIZE = 220;
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=${QR_SIZE}x${QR_SIZE}&data=${encodeURIComponent(PRIMARY_INSTALL_URL)}&color=0A1628&bgcolor=FFFFFF&margin=10&qzone=2`;

export default function DownloadPage() {
  return (
    <div className="container-max py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Get the App</p>
        <h1 className="section-title">Download FM NaipuNya</h1>
        <p className="section-subtitle">
          AI-powered training on your phone. Complete modules, earn certifications,
          and advance your career &mdash; all in your preferred language.
        </p>

        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Logos */}
          <div className="flex items-center gap-6">
            <Image src="/logos/advaya-fm.png" alt="D Advaya FM" width={100} height={100} className="rounded-full bg-white p-2 shadow-gold-lg" />
            <Image src="/logos/fm-naipunya.jpg" alt="FM NaipuNya" width={100} height={100} className="rounded-full bg-white p-2 shadow-gold-lg" />
          </div>

          {/* Download Section: QR + Play Store button */}
          <div className="w-full rounded-3xl border-2 border-gold-300 bg-gradient-to-br from-navy-50 to-white p-8 shadow-gold-lg">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              Open Testing Live
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-navy-900">
              Install Now &mdash; Open Testing
            </h2>
            <p className="mb-6 text-sm text-navy-500">
              Scan the QR code or tap <b>Install via Open Testing</b>. Production rollout on <b>May 1, 2026</b>.
            </p>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              {/* QR Code */}
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-2xl border-2 border-navy-200 bg-white p-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={QR_URL}
                    alt="Scan QR to install from Open Testing"
                    width={QR_SIZE}
                    height={QR_SIZE}
                    className="block"
                  />
                </div>
                <p className="text-xs font-semibold text-navy-500">Scan to Install</p>
              </div>

              {/* OR divider */}
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-16 bg-navy-200 sm:h-16 sm:w-px" />
                <span className="text-xs font-bold tracking-widest text-navy-400">OR</span>
                <div className="h-px w-16 bg-navy-200 sm:h-16 sm:w-px" />
              </div>

              {/* Download buttons */}
              <div className="flex flex-col items-center gap-3">
                {/* Primary CTA points at Open Testing URL until May 1 launch */}
                <a
                  href={OPEN_TESTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-navy-900 px-6 py-3 text-white shadow-navy transition-all hover:bg-navy-800 hover:shadow-lg active:scale-95"
                >
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] font-medium leading-none opacity-80">INSTALL VIA</div>
                    <div className="text-base font-bold leading-tight">Open Testing</div>
                  </div>
                </a>

                <p className="max-w-[220px] text-center text-[10px] leading-snug text-navy-400">
                  One tap to opt in &bull; standard Play Store install &bull; auto-updates to production on May 1
                </p>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-navy-400 underline underline-offset-2 hover:text-navy-600"
                  title="Production listing — live from May 1, 2026"
                >
                  Production Listing (Live May 1)
                </a>
              </div>
            </div>
          </div>

          {/* App features */}
          <div className="mt-8 grid w-full gap-6 text-left sm:grid-cols-2">
            {[
              { icon: '🎯', title: 'Self-Paced Modules', desc: 'Story + Theory + Practice + Quiz, ~15 min each' },
              { icon: '🎮', title: 'Practice Simulations', desc: 'Hands-on 3D scenes to practice what you learned' },
              { icon: '🗣️', title: 'Pragati AI Coach', desc: 'Native voice narration in English, Hindi, Telugu' },
              { icon: '📝', title: 'Telugu Subtitles', desc: 'On-screen text in your language even without voice pack' },
              { icon: '📱', title: 'Works Offline', desc: 'Download modules for zero-connectivity areas' },
              { icon: '🛡️', title: 'Vajra Security', desc: 'Liveness checks, no screenshots, device binding' },
              { icon: '📊', title: 'Progress Tracking', desc: 'See your growth, earn certifications' },
              { icon: '🔐', title: 'Private OTP Login', desc: 'Phone-number login, your data stays in India' },
            ].map((f) => (
              <div key={f.title} className="card">
                <div className="mb-2 text-2xl">{f.icon}</div>
                <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                <p className="text-xs text-navy-500">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Supported */}
          <div className="mt-8 text-center">
            <p className="text-xs text-navy-400">
              Requires Android 7.0 or later &bull; Package: in.advayafm.training &bull; Size: ~30 MB
            </p>
            <p className="mt-2 text-xs text-navy-400">
              Need help? Contact <Link href="/contact" className="text-gold-600 hover:text-gold-700 font-semibold">admin@advayafm.com</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
