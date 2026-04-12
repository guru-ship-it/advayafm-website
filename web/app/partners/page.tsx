import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Advaya FM partnerships with IHM Hyderabad, Broadcom, CBRE, Google for Startups, and leading institutions.',
};

const PARTNERS = [
  { name: 'IHM Hyderabad', type: 'Academic Partner', description: 'Co-developed hospitality curriculum blending academic rigor with AI-driven training technology.' },
  { name: 'Broadcom', type: 'Enterprise Client', description: 'Pilot deployment of Ground Transport training for corporate fleet drivers at Broadcom Hyderabad campus.' },
  { name: 'CBRE', type: 'Enterprise Client', description: 'Facility management training for corporate housekeeping and maintenance staff.' },
  { name: 'Meru', type: 'Enterprise Client', description: 'Comprehensive driver training program for Meru fleet operations.' },
  { name: 'Schneider Electric', type: 'Industry Partner', description: 'Collaboration on electrical safety and facility management training modules.' },
  { name: 'Google for AI Startups', type: 'Accelerator', description: 'Selected for Google for Startups AI program. Platform powered by Google Gemini AI.' },
  { name: 'AIC BIMTECH', type: 'Incubator', description: 'Incubated at Atal Incubation Centre, BIMTECH for startup development and mentorship.' },
  { name: 'ALEAP WE-HUB', type: 'Incubator', description: 'Part of ALEAP WE-HUB Cohort 5.0 supporting women-led and innovative enterprises.' },
  { name: 'CII Hyderabad', type: 'Industry Network', description: 'Member of Confederation of Indian Industry Hyderabad chapter for industry connections.' },
  { name: 'St. John Ambulance Telangana', type: 'Training Partner', description: 'Partnership for First Aid and Emergency Response training certification.' },
  { name: 'Move in Sync', type: 'Enterprise Client', description: 'Transport and logistics training integration for corporate mobility platform.' },
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
