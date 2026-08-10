'use client';

import { useState } from 'react';

const COURSES = [
  {
    tab: 'The Executive',
    n: '01',
    title: 'The Transport Executive',
    spine: 'You are not just sending cabs. People’s safety depends on your decisions.',
    bullets: [
      'Night shift rules: written consent and duty rotation for women staff',
      'Routes: no lady staff should be picked up first or dropped last, alone with the driver',
      'Panic alert: whom to call first in the first two minutes — and why it is never the driver',
      'Complaint about a driver: what to write down, what to do at once, what to keep private',
    ],
  },
  {
    tab: 'Driver & Vehicle',
    n: '02',
    title: 'Before The Cab Rolls',
    spine: 'A paper you did not check is a paper you accepted.',
    bullets: [
      'Driving licence and badge: valid is not enough — it must be the right type',
      'Permit, fitness, insurance and PUC: what each paper means and when each one expires',
      'One simple expiry sheet, read once a week — no more 6 pm surprises',
      'Stopping a substitute driver at the gate at night, politely but firmly',
    ],
  },
  {
    tab: 'Night Shift',
    n: '03',
    title: 'The Night Shift File',
    spine: 'The permission belongs to the company. Keeping it belongs to you.',
    bullets: [
      'One missing consent letter can stop night work for the whole site',
      'The five registers: consent, rotation, route approval, escort and control room log',
      'What an inspector asks for, and in what order — so you are ready before he comes',
      'Why the original log book matters more than a neat rewritten copy',
    ],
  },
  {
    tab: 'Accidents',
    n: '04',
    title: 'When It Goes Wrong On The Road',
    spine: 'You cannot control the accident. You control the ninety minutes after it.',
    bullets: [
      'The four facts to collect on the first call — then dial 108 yourself',
      'At the spot: stop, make the area safe, get the injured to hospital, never leave',
      'Nobody goes to hospital alone, and the family hears it from a person, not a forward',
      'Save the proof the same night: GPS data, photos, statements, and inform the insurer',
    ],
  },
  {
    tab: 'Billing',
    n: '05',
    title: 'Counting What You Are Billed For',
    spine: 'What you do not measure, the vendor will decide for you.',
    bullets: [
      'Agree in writing what one trip means before you start counting trips',
      'No-show is a warning sign about the route, not only a line on the bill',
      'Check on-time claims against GPS, not against what the driver typed in the app',
      'Every month, match a few trips end to end: roster, GPS and invoice',
    ],
  },
  {
    tab: 'Self-Check',
    n: '06',
    title: 'Auditing Your Own Operation',
    spine: 'Find the gap yourself, before the client’s auditor finds it for you.',
    bullets: [
      'Check your own process to find gaps, not to tick boxes',
      'One hour at the gate at 11 pm shows what no report will show',
      'Pick one old date and rebuild that night fully from your records — in one hour',
      'Every finding gets a person’s name and a date; a repeated finding goes to your boss',
    ],
  },
];

export default function TxeCourseTabs() {
  const [active, setActive] = useState(0);
  const c = COURSES[active];

  return (
    <div className="mt-14">
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center" role="tablist" aria-label="Transport Executive modules">
        {COURSES.map((x, i) => (
          <button
            key={x.n}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={
              'shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ' +
              (i === active
                ? 'bg-gold-500 text-navy-900 shadow-gold'
                : 'border border-navy-200 bg-white text-navy-600 hover:border-gold-400 hover:text-navy-900')
            }
          >
            <span className="mr-1.5 opacity-60">{x.n}</span>
            {x.tab}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-gold sm:p-12">
        <div className="pointer-events-none absolute -right-6 -top-10 font-display text-[10rem] font-bold leading-none text-navy-50 select-none sm:text-[13rem]">
          {c.n}
        </div>
        <div className="relative z-10 max-w-3xl">
          <h3 className="font-display text-2xl font-bold text-navy-900 sm:text-4xl">{c.title}</h3>
          <p className="mt-3 text-base font-semibold italic text-gold-600 sm:text-lg">“{c.spine}”</p>
          <ul className="mt-7 space-y-4">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-600 sm:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Short lessons with marks', 'English · తెలుగు · हिंदी', 'Voice reads it out', '₹499 per module'].map((chip) => (
              <span key={chip} className="rounded-full bg-navy-50 px-4 py-1.5 text-xs font-semibold text-navy-700">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
