'use client';

import { useState } from 'react';

const COURSES = [
  {
    tab: 'The Executive',
    n: '01',
    title: 'The Transport Executive',
    spine: 'You are not dispatching cabs — you are accountable for people who cannot see the risk you manage for them.',
    bullets: [
      'The roster as a legal record: written consent and rotation for women on night shifts',
      'Route approval that software cannot do: no woman first picked up or last dropped alone',
      'The control room and the panic alert: who you call in the first ninety seconds — and why it is never the driver first',
      'POSH in the cab: what you record, what you act on, and what you never circulate',
    ],
  },
  {
    tab: 'Driver & Vehicle',
    n: '02',
    title: 'Before The Cab Rolls',
    spine: 'A document you did not check is a document you accepted.',
    bullets: [
      'Licence class and badge: why a valid licence can still be the wrong one',
      'Permit, fitness, insurance and PUC — what each proves and when each silently lapses',
      'The weekly expiry board that turns 6 pm surprises into routine renewals',
      'The substitution at the gate: stopping the unverified stand-in driver at nine at night',
    ],
  },
  {
    tab: 'Night Shift',
    n: '03',
    title: 'The Night Shift File',
    spine: 'The exemption belongs to the company. The conditions belong to you.',
    bullets: [
      'Why one missing consent letter puts night working for the whole site at risk',
      'The five records: consent register, rotation, route approvals, escort log, control room log',
      'Surviving an inspection: the vertical slice through one ordinary night',
      'Contemporaneous logs: why the messy original beats a neat rewrite every time',
    ],
  },
  {
    tab: 'Incidents',
    n: '04',
    title: 'When It Goes Wrong On The Road',
    spine: 'You cannot control the accident. You control the ninety minutes after it.',
    bullets: [
      'The four facts before any other question — and calling 108 yourself',
      'Duties at the scene: stop, secure, get the injured to treatment, never leave',
      'Nobody goes to hospital alone, and the family hears from a person, not a forward',
      'Evidence with a shelf life: tracker export, photographs, statements and the insurer clock',
    ],
  },
  {
    tab: 'SLA & Billing',
    n: '05',
    title: 'Counting What You Are Billed For',
    spine: 'What you cannot measure, the vendor will price.',
    bullets: [
      'Define the trip before counting trips: dead mileage, waiting time, cancellations',
      'No-show as a safety signal — a route people stopped trusting, not just a billing line',
      'On-time truth: measure against the tracker nobody can type into',
      'The three-way match — roster to tracker to invoice — sampled deeply, not ticked widely',
    ],
  },
  {
    tab: 'Self-Audit',
    n: '06',
    title: 'Auditing Your Own Operation',
    spine: 'Find it before the client’s auditor does.',
    bullets: [
      'Audit to break your process, not to tick it — swap auditors between sites',
      'The night round: what an hour at the gate at eleven shows that no dashboard will',
      'The random-date test: rebuild one ordinary night end to end from records alone',
      'Findings with an owner and a date — and escalating the design on the third repeat',
    ],
  },
];

export default function TxeCourseTabs() {
  const [active, setActive] = useState(0);
  const c = COURSES[active];

  return (
    <div className="mt-14">
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center" role="tablist" aria-label="Transport Executive courses">
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
            {['Interactive story lesson', 'Scored decisions', 'English · తెలుగు · हिंदी', 'Voice narrated'].map((chip) => (
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
