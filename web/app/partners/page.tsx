import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'D Advaya FM partnerships with IHM Hyderabad, RED.Health, Move in Sync, and leading institutions.',
};

// Honest-labels rule (2026-07-10, founder-confirmed): a card's type must match
// what was actually delivered. "Enterprise Client" = active, ongoing commercial
// relationship only. Deleted permanently: "Google for AI Startups" (application
// was declined; never selected).
// Google + Meta RESTORED 2026-07-25 on founder's instruction as "Offline Training
// Delivered" - both engagements delivered personally by the founder; founder holds
// emails and invoices as documentation.
const PARTNERS = [
  { name: 'Google Hyderabad', type: 'Offline Training Delivered', description: 'On-campus transport and driver training delivered across multiple consecutive quarters, renewed on performance.' },
  { name: 'Meta India', type: 'Offline Training Delivered', description: 'On-site workforce training delivered for facility and transport teams.' },
  { name: 'IHM Hyderabad', type: 'Academic Partner', description: 'Co-developed hospitality curriculum blending academic rigor with AI-driven training technology.' },
  { name: 'Move in Sync', type: 'Enterprise Client', description: 'Transport and logistics training integration for corporate mobility platform.' },
  { name: 'RED.Health', type: 'First Aid Training Partner', description: 'Official partnership for First Aid and Emergency Response training certification. RED.Health delivers accredited first aid content aligned with St. John Ambulance guidelines per Government of India regulations.' },
  { name: 'Broadcom', type: 'Pilot Deployment', description: 'Pilot deployment of Ground Transport training for corporate fleet drivers at Broadcom Hyderabad campus.' },
  { name: 'CBRE', type: 'Training Engagement', description: 'Facility management training engagement for corporate housekeeping and maintenance staff.' },
  { name: 'Schneider Electric', type: 'Offline Training Delivered', description: 'On-site workforce training delivered covering electrical safety and facility compliance.' },
  { name: 'Meru International School Hyderabad', type: 'Offline Training Delivered', description: 'On-site driver and campus operations training delivered for school transport staff.' },
  { name: 'AIC BIMTECH', type: 'Incubator', description: 'Incubated at Atal Incubation Centre, BIMTECH for startup development and mentorship.' },
  { name: 'ALEAP WE-HUB', type: 'Incubator', description: 'Part of ALEAP WE-HUB Cohort 5.0 supporting women-led and innovative enterprises.' },
  { name: 'CII Hyderabad', type: 'Industry Network', description: 'Member of Confederation of Indian Industry Hyderabad chapter for industry connections.' },
];

export default function PartnersPage() {
  return (
    <>
      <section className="bg-navy-gradient py-20 sm:py-28">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-400">Our Network</p>
            <h1 className="mb-6 font-display text-5xl font-bold text-white sm:text-6xl">
              Partners &amp; Recognition
            </h1>
            <p className="text-xl text-navy-200">
              Our programs are co-created with and endorsed by leading institutions,
              ensuring credibility and regulatory alignment.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="card">
                <span className="mb-3 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800">
                  {partner.type}
                </span>
                <h3 className="mb-2 font-display text-xl font-bold text-navy-900">{partner.name}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy-50 text-center">
        <div className="container-max">
          <h2 className="mb-4 font-display text-3xl font-bold text-navy-900">Become a Partner</h2>
          <p className="mx-auto mb-8 max-w-2xl text-navy-500">
            We&apos;re actively seeking academic institutions, enterprises, and training organizations
            to co-develop industry-specific curriculum and deploy our platform.
          </p>
          <Link href="/contact" className="btn-gold text-base">Partner With Us</Link>
        </div>
      </section>
    </>
  );
}
