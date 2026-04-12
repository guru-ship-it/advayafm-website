import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download App',
  description: 'Download the Advaya FM NaipuNya training app from Google Play Store.',
};

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
            <Image src="/logos/advaya-fm.png" alt="Advaya FM" width={100} height={100} className="rounded-full bg-white p-2 shadow-gold-lg" />
            <Image src="/logos/fm-naipunya.jpg" alt="FM NaipuNya" width={100} height={100} className="rounded-full bg-white p-2 shadow-gold-lg" />
          </div>

          {/* Play Store badge placeholder */}
          <div className="rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50 p-8">
            <p className="mb-4 text-lg font-semibold text-navy-900">Coming Soon on Google Play</p>
            <p className="mb-6 text-sm text-navy-500">
              The app is currently in closed testing. Contact us to join the beta program.
            </p>
            <Link href="/contact" className="btn-gold">
              Request Beta Access
            </Link>
          </div>

          {/* App features */}
          <div className="mt-8 grid w-full gap-6 text-left sm:grid-cols-2">
            {[
              { icon: '🎯', title: '30-Min Modules', desc: 'Story + Theory + XR Simulation + Quiz per module' },
              { icon: '🥽', title: 'WebXR Simulations', desc: 'Immersive 3D training scenes on your phone' },
              { icon: '🗣️', title: 'Pragati AI Coach', desc: 'Personal training guide in Hindi, English, Telugu' },
              { icon: '📱', title: 'Works Offline', desc: 'Download modules for zero-connectivity areas' },
              { icon: '🛡️', title: 'Vajra Security', desc: 'Liveness checks, no screenshots, device binding' },
              { icon: '📊', title: 'Progress Tracking', desc: 'See your growth, earn certifications' },
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
              Requires Android 7.0 or later &bull; Package: in.advayafm.training &bull; Size: ~15 MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
