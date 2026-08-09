import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport Executive Training — from ₹199/month | Advaya naipuNya',
  description:
    'Six interactive courses for the executives who run corporate employee transport — rosters, routes, night-shift compliance, incidents, billing and self-audit. WhatsApp-delivered in English, Telugu and Hindi. Team access from ₹199 per learner per month.',
};

const COURSES = [
  {
    n: '01',
    title: 'The Transport Executive',
    line: 'The roster, the route and the control room — and why you are accountable for people who cannot see the risk you manage for them.',
  },
  {
    n: '02',
    title: 'Before The Cab Rolls',
    line: 'Driver and vehicle compliance: licence class and badge, permit vs fitness, the expiry board, and the substitution at the gate.',
  },
  {
    n: '03',
    title: 'The Night Shift File',
    line: 'Women’s night-shift transport as an auditable record — consent, rotation, route approvals, escorts and the control room log.',
  },
  {
    n: '04',
    title: 'When It Goes Wrong On The Road',
    line: 'The ninety minutes after an accident: duties at the scene, the people, the family, and evidence that decays by morning.',
  },
  {
    n: '05',
    title: 'Counting What You Are Billed For',
    line: 'SLA, no-show and on-time truth — and the three-way match between roster, tracker and invoice.',
  },
  {
    n: '06',
    title: 'Auditing Your Own Operation',
    line: 'The night round, the random-date test, and closing findings before the client’s auditor finds them for you.',
  },
];

const INCLUDED = [
  ['📱', 'WhatsApp-delivered', 'Personal, device-locked course links sent straight to each learner’s phone. No app to install.'],
  ['🗣️', 'Three languages', 'Full content and voice narration in English, Telugu and Hindi.'],
  ['🎯', 'Scored decisions', 'Every course is interactive — real workplace decisions, scored, not passive video.'],
  ['📊', 'Live employer dashboard', 'Track completion, scores and stuck learners in real time, with CSV export for your records.'],
  ['🏆', 'Master certificate', 'A completion certificate per learner once every assigned module is done, delivered on WhatsApp.'],
  ['🛡️', 'Compliance-anchored', 'Built on the rules your operation actually answers to — not generic supervision content.'],
];

const WA_LINK =
  'https://wa.me/917989002661?text=' +
  encodeURIComponent('Hi, I am interested in the Transport Executive programme (from Rs 199 per learner per month).');

export default function TransportExecutivePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient py-20 sm:py-28">
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-400">New Programme · Live Now</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Transport Executive <span className="bg-gold-gradient bg-clip-text text-transparent">Training</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Six interactive courses for the people who run corporate employee transport —
              rosters, routes, night-shift compliance, incidents, vendor billing and self-audit.
              Delivered on WhatsApp in English, Telugu and Hindi.
            </p>
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-2xl border border-gold-400/40 bg-navy-800/60 px-6 py-4">
              <span className="text-sm font-semibold text-navy-200">Team access from</span>
              <span className="font-display text-4xl font-bold text-gold-400">₹199</span>
              <span className="text-sm font-semibold text-navy-200">per learner / month</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={WA_LINK} className="btn-gold text-base" target="_blank" rel="noopener noreferrer">
                Talk to us on WhatsApp
              </a>
              <Link href="/contact" className="btn-outline border-navy-600 bg-transparent text-white hover:border-gold-400 hover:bg-navy-800/50 text-base">
                Request a Team Demo
              </Link>
            </div>
            <p className="mt-6 text-xs text-navy-400">
              Team pricing, billed to the employer. GST additional. Senior Executive tier (6 further courses) also available.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* The six courses */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">The Programme</p>
            <h2 className="section-title">Six Courses, One Discipline</h2>
            <p className="section-subtitle">
              Not generic supervision content — each course teaches the decisions a transport
              executive actually signs, and how to prove they were taken.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <div key={c.n} className="card">
                <div className="mb-3 font-display text-3xl font-bold text-gold-500">{c.n}</div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">{c.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{c.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section bg-navy-50">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">What You Get</p>
            <h2 className="section-title">Built for Frontline Teams</h2>
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
            Developed with reference to the Logistics Sector Skill Council qualification for Land
            Transportation Supervisor (NSQF Level 5), the Motor Vehicles Act 1988 and the State
            Shops &amp; Establishments conditions for women on night shift. Awareness training —
            your company policy and client contracts always prevail.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-gradient text-center">
        <div className="container-max">
          <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Train Your Transport Team This Month
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-navy-200">
            Access for your whole executive team from <span className="font-bold text-gold-400">₹199 per learner per month</span>.
            Your first learner can be live on WhatsApp today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={WA_LINK} className="btn-gold text-base" target="_blank" rel="noopener noreferrer">
              Talk to us on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline border-navy-600 bg-transparent text-white hover:border-gold-400 hover:bg-navy-800/50 text-base">
              Request a Team Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
