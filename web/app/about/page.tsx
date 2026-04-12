import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Advaya FM - Innovating FM Education for India\'s core sectors since 2024.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 sm:py-28">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-400">About Advaya FM</p>
            <h1 className="mb-6 font-display text-5xl font-bold text-white sm:text-6xl">
              Innovating FM Education for a <span className="text-gold-400">Rising India</span>
            </h1>
            <p className="text-xl leading-relaxed text-navy-200">
              Advaya, Sanskrit for &lsquo;unique&rsquo;, is an educational technology company
              revolutionizing training and certification for India&apos;s most vital industries.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 font-display text-3xl font-bold text-navy-900">Our Story</h2>
                <p className="mb-4 text-navy-600 leading-relaxed">
                  Founded by professionals with 70+ combined years of experience in offline training programs
                  across India&apos;s key sectors, Advaya FM bridges the gap between traditional on-ground expertise
                  and modern AI-driven education technology.
                </p>
                <p className="mb-4 text-navy-600 leading-relaxed">
                  We recognized that India&apos;s 500+ million blue-collar workforce deserves the same quality
                  of training technology available to white-collar professionals. Our platform makes enterprise-grade
                  training accessible, multilingual, and mobile-first.
                </p>
                <p className="text-navy-600 leading-relaxed">
                  Incubated at AIC BIMTECH and ALEAP WE-HUB, and selected for the Google for AI Startups program,
                  we are building India&apos;s most comprehensive workforce skilling platform.
                </p>
              </div>
              <div className="space-y-6">
                <div className="card bg-navy-50 border-none">
                  <h3 className="mb-2 font-display text-lg font-bold text-navy-900">Our Mission</h3>
                  <p className="text-sm text-navy-600">To make world-class, compliance-grade training accessible to every worker in India, in their own language, on their own device.</p>
                </div>
                <div className="card bg-navy-50 border-none">
                  <h3 className="mb-2 font-display text-lg font-bold text-navy-900">Our Vision</h3>
                  <p className="text-sm text-navy-600">To be India&apos;s go-to FM EdTech partner for both blue-collar and white-collar workforce development up to manager level.</p>
                </div>
                <div className="card bg-navy-50 border-none">
                  <h3 className="mb-2 font-display text-lg font-bold text-navy-900">Our Approach</h3>
                  <p className="text-sm text-navy-600">AI-powered assessments, immersive WebXR simulations, Pragati AI coach, and NSDC/MoRTH-aligned curriculum delivered via a mobile-first platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="section bg-navy-50">
        <div className="container-max">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '2024', label: 'Founded' },
              { value: 'Hyderabad', label: 'Headquarters' },
              { value: '5 Sectors', label: 'Industry Coverage' },
              { value: '95+ Modules', label: 'Training Content' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <div className="mb-2 font-display text-3xl font-bold text-gold-600">{stat.value}</div>
                <div className="text-sm font-semibold text-navy-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-3xl font-bold text-navy-900">Company Information</h2>
            <div className="text-navy-600 space-y-2">
              <p><strong>Legal Name:</strong> Advaya FM Pvt Ltd (D Advaya FM Pvt Ltd)</p>
              <p><strong>Registered Office:</strong> 502B, Sadhguru Capital Park, Madhapur, Hyderabad, Telangana 500081</p>
              <p><strong>Founder:</strong> Guru Prasaad</p>
              <p><strong>Website:</strong> www.advayafm.com</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Image src="/logos/advaya-fm.png" alt="Advaya FM" width={80} height={80} className="rounded-full bg-white shadow-gold p-1" />
              <Image src="/logos/fm-naipunya.jpg" alt="FM NaipuNya" width={80} height={80} className="rounded-full bg-white shadow-gold p-1" />
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-gold">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
