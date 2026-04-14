import Image from 'next/image';
import Link from 'next/link';

const SECTORS = [
  {
    name: 'Ground Transport',
    icon: '🚛',
    description: 'MoRTH-aligned driver training with defensive driving, POSH, and emergency response modules. Immersive WebXR simulations for hazard detection.',
    modules: '22 modules',
    status: '8 live, 14 in development',
    highlights: ['MoRTH-Mandated Curriculum', 'Defensive Driving (3 levels)', 'Vehicle Inspection Rituals', 'First Aid & Emergency Response'],
    href: '/solutions#ground-transport',
  },
  {
    name: 'Hospitality',
    icon: '🏨',
    description: 'World-class housekeeping and guest service training co-developed with IHM Hyderabad. NSDC qualification pack aligned.',
    modules: '13 modules',
    status: 'In development',
    highlights: ['Housekeeping Standards (IHM)', 'Guest Interaction & Service', 'Kitchen Stewarding', 'Supervisory Skills'],
    href: '/solutions#hospitality',
  },
  {
    name: 'Facilities Management',
    icon: '🏢',
    description: 'Complete training from basic housekeeping to advanced facility operations. Security, electrical safety, HVAC, and maintenance.',
    modules: '25 modules',
    status: 'Planned',
    highlights: ['Soft Services & Housekeeping', 'Security Operations', 'Safety & Compliance', 'Facility Operations'],
    href: '/solutions#facilities',
  },
  {
    name: 'Logistics & Supply Chain',
    icon: '📦',
    description: 'End-to-end supply chain training from warehouse operations to last-mile delivery excellence.',
    modules: '12 modules',
    status: 'Planned',
    highlights: ['Warehouse Operations', 'Inventory Management', 'Last-Mile Delivery', 'Fleet Coordination'],
    href: '/solutions#logistics',
  },
  {
    name: 'MSME Sector',
    icon: '💼',
    description: 'Empowering small and medium enterprises with digital literacy, business skills, and regulatory compliance training.',
    modules: '16 modules',
    status: 'Planned',
    highlights: ['Digital Marketing', 'Financial Compliance', 'E-commerce Skills', 'Entrepreneurial Development'],
    href: '/solutions#msme',
  },
];

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI-Powered Assessments',
    description: 'Multilingual MCQ assessments that adapt to the learner\'s proficiency. Powered by Google Gemini for real-time evaluation.',
  },
  {
    icon: '🎯',
    title: 'Personalized Learning Paths',
    description: 'Every worker gets a customized journey from beginner to advanced based on their role, sector, and performance.',
  },
  {
    icon: '🥽',
    title: 'Immersive WebXR Simulations',
    description: 'A-Frame powered 3D simulations for hazard detection, vehicle inspection, emergency response, and workplace scenarios.',
  },
  {
    icon: '🗣️',
    title: 'Multi-Language Support',
    description: 'Full training content in English, Hindi, and Telugu. Pragati AI coach narrates in the learner\'s preferred language.',
  },
  {
    icon: '📊',
    title: 'Compliance Tracking',
    description: 'Real-time dashboards for HR and managers to track completion rates, scores, and compliance status across teams.',
  },
  {
    icon: '🛡️',
    title: 'DPDP Act Compliant',
    description: 'End-to-end encryption, zero-reprisal POSH reporting, and data sovereignty under India\'s Digital Personal Data Protection Act 2023.',
  },
];

const PARTNERS = [
  'IHM Hyderabad',
  'Broadcom',
  'Meta India',
  'Google India',
  'CBRE',
  'Meru International School',
  'Move in Sync',
  'Schneider Electric',
  'RED.Health',
  'AIC BIMTECH',
  'ALEAP WE-HUB',
  'CII Hyderabad',
  'Google for AI Startups',
];

const METRICS = [
  { value: '95+', label: 'Training Modules' },
  { value: '5', label: 'Industry Sectors' },
  { value: '8', label: 'MNC Partnerships' },
  { value: '70+', label: 'Years Combined Expertise' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient py-20 sm:py-28 lg:py-36">
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-400">Innovating FM Education</p>
            <h1 className="text-hero text-white">
              AI-Powered Skilling for{' '}
              <span className="bg-gold-gradient bg-clip-text text-transparent">India&apos;s Workforce</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Immersive WebXR training platform for blue-collar and white-collar professionals.
              MoRTH aligned. NSDC certified. DPDP compliant.
              Trusted by Broadcom, CBRE, and leading institutions.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold text-base">
                Request a Demo
              </Link>
              <Link href="/solutions" className="btn-outline border-navy-600 bg-transparent text-white hover:border-gold-400 hover:bg-navy-800/50 text-base">
                Explore Solutions
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-navy-700 pt-8">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-2xl font-bold text-gold-400">{m.value}</div>
                  <div className="text-xs text-navy-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logos floating right (desktop) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-90">
          <Image src="/logos/advaya-fm.png" alt="D Advaya FM" width={120} height={120} className="rounded-full bg-white/95 p-2 shadow-gold-lg" />
          <Image src="/logos/fm-naipunya.jpg" alt="FM NaipuNya" width={120} height={120} className="rounded-full bg-white/95 p-2 shadow-gold-lg" />
        </div>

        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* About section */}
      <section className="section bg-white" id="about">
        <div className="container-max">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our Mission</p>
              <h2 className="section-title">
                Innovating Education for India&apos;s Core Sectors
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-600">
                D Advaya FM, Sanskrit for &lsquo;unique&rsquo;, is an educational technology company
                revolutionizing training and certification for India&apos;s most vital industries.
                We leverage AI-powered assessments, personalized learning paths, and immersive
                WebXR simulations to empower professionals and drive national growth.
              </p>
              <p className="mt-4 text-base text-navy-500">
                We collaborate with prestigious institutions like IHM Hyderabad, and are incubated
                at AIC BIMTECH and ALEAP WE-HUB. Our on-ground experience of 70+ years in offline
                training now powers our AI-driven platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {FEATURES.slice(0, 4).map((f) => (
                <div key={f.title} className="card text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-2xl">{f.icon}</div>
                  <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  <p className="mt-1 text-xs text-navy-500">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section bg-navy-50" id="solutions">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">Tailored Solutions</p>
            <h2 className="section-title">Industry-Specific Training</h2>
            <p className="section-subtitle">
              Specialized, compliant, and culturally-aware training programs
              for India&apos;s key economic sectors.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => (
              <Link key={sector.name} href={sector.href} className="card group relative">
                <div className="mb-4 text-4xl">{sector.icon}</div>
                <h3 className="mb-2 font-display text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                  {sector.name}
                </h3>
                <p className="mb-4 text-sm text-navy-500">{sector.description}</p>
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                    {sector.modules}
                  </span>
                  <span className="text-xs text-navy-400">{sector.status}</span>
                </div>
                <ul className="space-y-1.5">
                  {sector.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-navy-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">Platform Features</p>
            <h2 className="section-title">Enterprise-Grade Training Platform</h2>
            <p className="section-subtitle">
              Everything your organization needs to train, assess, and certify
              your workforce at scale.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pragati AI Coach */}
      <section className="section bg-navy-gradient">
        <div className="container-max">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/logos/pragati.jpg"
                  alt="Pragati - AI Training Coach"
                  width={280}
                  height={280}
                  className="rounded-3xl border-4 border-gold-400/50 shadow-gold-lg"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-6 py-2 text-sm font-bold text-navy-900 shadow-lg">
                  Pragati AI Coach
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow text-gold-400">Meet Pragati</p>
              <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
                Your Personal <span className="text-gold-400">Career Coach</span>
              </h2>
              <p className="text-lg leading-relaxed text-navy-200">
                Pragati is the warm, relatable &lsquo;Didi&rsquo; who guides every learner
                through safety modules, career growth, and compliance checks. She speaks
                Hindi, English, and Telugu, adapting to your local dialect and learning pace.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Voice narration in Hindi, English, and Telugu',
                  'Context-aware guidance on every training screen',
                  'Encouraging feedback and career progression tips',
                  'Zero-reprisal POSH reporting support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-200">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gold-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section bg-white" id="partners">
        <div className="container-max">
          <div className="text-center">
            <p className="eyebrow">Trusted By</p>
            <h2 className="section-title">Our Partners &amp; Recognition</h2>
            <p className="section-subtitle">
              Co-created with and endorsed by leading institutions, ensuring credibility
              and regulatory alignment.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="flex h-20 items-center rounded-xl border border-navy-100 bg-navy-50 px-8 text-sm font-semibold text-navy-700 transition-all hover:border-gold-300 hover:shadow-gold"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-gradient text-center">
        <div className="container-max">
          <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Ready to Transform Your Workforce?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-navy-200">
            Join Broadcom, Meta India, Google India, CBRE, and other industry leaders who trust
            D Advaya FM for compliance training and workforce development.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold text-base">
              Request a Demo
            </Link>
            <Link href="/download" className="btn-outline border-navy-600 bg-transparent text-white hover:border-gold-400 hover:bg-navy-800/50 text-base">
              Download the App
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
