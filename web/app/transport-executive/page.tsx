import Link from 'next/link';
import type { Metadata } from 'next';
import TxeCourseTabs from '../../components/TxeCourseTabs';

export const metadata: Metadata = {
  title: 'Transport Executive Training — ₹499 per module | Advaya naipuNya',
  description:
    'Six short courses for the people who run staff cabs and employee transport — rosters, routes, night shift rules, accidents, billing and checks. On WhatsApp, in English, Telugu and Hindi. ₹499 per module.',
};

const INCLUDED = [
  ['📱', 'On WhatsApp', 'Each learner gets a personal link on their phone. It works only on their phone. No app needed.'],
  ['🗣️', 'Three languages', 'Every lesson is in English, Telugu and Hindi, with a voice that reads it out.'],
  ['🎯', 'Lessons with marks', 'Short lessons where the learner takes real decisions and gets marks. Not a long video.'],
  ['📊', 'Company dashboard', 'The company sees who finished, who is stuck and the marks — live, with an Excel download.'],
  ['🏆', 'Certificate', 'When all modules are done, the learner gets a certificate on WhatsApp.'],
  ['🛡️', 'Based on the rules', 'Built on the actual rules a transport team must follow — MV Act, night shift rules, POSH.'],
];

const WA_LINK =
  'https://wa.me/917989002661?text=' +
  encodeURIComponent('Hi, I am interested in the Transport Executive course (Rs 499 per module).');

export default function TransportExecutivePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient py-24 sm:py-32">
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-gold-400">New Course · Live Now</p>
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Transport Executive{' '}
              <span className="bg-gold-gradient bg-clip-text text-transparent">Training</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Six short courses for the people who run staff cabs and employee transport —
              rosters, routes, night shift rules, accidents, billing and checks.
              On WhatsApp, in English, Telugu and Hindi.
            </p>

            {/* Price card */}
            <div className="mx-auto mt-10 max-w-xl rounded-3xl border-2 border-gold-400/60 bg-navy-800/70 px-8 py-8 shadow-gold-lg backdrop-blur">
              <div className="mt-1 flex items-baseline justify-center gap-4">
                <span className="font-display text-7xl font-bold text-gold-400 sm:text-8xl">₹499</span>
                <span className="text-left text-lg font-bold leading-tight text-white sm:text-xl">
                  per module
                </span>
              </div>
              <div className="mt-3 text-sm text-navy-300">
                Simple lessons on your phone. Learn in your own language.
              </div>
              <div className="mt-2 text-xs text-navy-400">
                GST additional · Team pricing available · Senior Executive course also available
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={WA_LINK}
                className="btn-gold px-8 py-4 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Talk to us on WhatsApp
              </a>
              <Link
                href="/contact"
                className="btn-outline border-navy-600 bg-transparent px-8 py-4 text-lg text-white hover:border-gold-400 hover:bg-navy-800/50"
              >
                Ask for a Team Demo
              </Link>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* The six courses — tabbed */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">The Course</p>
            <h2 className="section-title">Six Modules, Plain and Practical</h2>
            <p className="section-subtitle">
              Made for people who came into transport work without formal training.
              Simple language, real situations. Tap a module to see what is inside.
            </p>
          </div>
          <TxeCourseTabs />
        </div>
      </section>

      {/* What's included */}
      <section className="section bg-navy-50">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">What You Get</p>
            <h2 className="section-title">Made for Working People</h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map(([icon, title, desc]) => (
              <div key={title} className="card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-2xl">{icon}</div>
                <h3 className="mb-2 text-base font-bold text-navy-900">{title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-navy-500">
            Courses are prepared with reference to the Logistics Sector Skill Council qualification
            for Land Transportation Supervisor (NSQF Level 5), the Motor Vehicles Act 1988 and the
            State rules for women working night shifts. This is awareness training — your company
            rules and client contracts always apply.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-gradient text-center">
        <div className="container-max">
          <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Start This Week
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-navy-200">
            <span className="font-display text-2xl font-bold text-gold-400">₹499 per module</span>.
            Your first learner can start on WhatsApp today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={WA_LINK} className="btn-gold px-8 py-4 text-lg" target="_blank" rel="noopener noreferrer">
              💬 Talk to us on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline border-navy-600 bg-transparent px-8 py-4 text-lg text-white hover:border-gold-400 hover:bg-navy-800/50">
              Ask for a Team Demo
            </Link>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-xs text-navy-400">
            All training content is the copyright of D Advaya FM Private Limited. Patent applied for.
          </p>
        </div>
      </section>
    </>
  );
}
