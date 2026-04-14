import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Industry-specific training solutions for Ground Transport, Hospitality, Facilities Management, Logistics, and MSME sectors.',
};

const SECTORS = [
  {
    id: 'ground-transport',
    name: 'Ground Transport',
    icon: '🚛',
    tagline: 'MoRTH-aligned driver training with immersive simulations',
    description: 'Complete training program for corporate drivers, fleet operators, and transport executives. Covers defensive driving, vehicle inspection, POSH, emergency response, and MoRTH compliance.',
    target: 'Corporate drivers, fleet operators, transport executives, logistics coordinators',
    levels: [
      { level: 'Beginner', count: 11, topics: ['Grooming & Hygiene', 'Digital Navigation', 'POSH Training', 'Vehicle Inspection', 'Defensive Driving I', 'Traffic Rules', 'Passenger Comfort', 'Company Policy'] },
      { level: 'Intermediate', count: 7, topics: ['Route Planning', 'Fleet Management', 'Eco-Driving', 'Advanced Maintenance', 'Driving Laws', 'Accident Reporting', 'Special Needs Passengers'] },
      { level: 'Advanced', count: 4, topics: ['Supervisor Leadership', 'Transport Operations', 'Crisis Management & VIP Protocol', 'MoRTH Compliance & Certification'] },
    ],
    status: '8 modules live, 14 in development',
    clients: 'Broadcom, Meta India, Google India, CBRE, Meru International School',
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    icon: '🏨',
    tagline: 'World-class housekeeping and guest service training',
    description: 'Comprehensive training for housekeeping staff, kitchen stewards, front office, and F&B service professionals. Co-developed with IHM Hyderabad and aligned with NSDC qualification packs.',
    target: 'Housekeeping staff, kitchen stewards, front office, F&B service, multi-task attendants',
    levels: [
      { level: 'Beginner', count: 5, topics: ['Professional Grooming', 'Cleaning Fundamentals', 'Bed-Making & Room Prep', 'Bathroom Cleaning', 'Guest Interaction'] },
      { level: 'Intermediate', count: 4, topics: ['Stain Removal & Fabric Care', 'Floor Care Specialization', 'Kitchen Stewarding', 'Safety, Fire & POSH'] },
      { level: 'Advanced', count: 4, topics: ['Supervisory Skills', 'Quality Audits', 'Inventory Management', 'Guest Complaint Handling'] },
    ],
    status: 'In development',
    academicPartner: 'IHM Hyderabad',
    clients: 'CBRE, Meru International School, Meta India, Google India',
  },
  {
    id: 'facilities',
    name: 'Facilities Management',
    icon: '🏢',
    tagline: 'Complete FM training from housekeeping to facility operations',
    description: 'End-to-end facility management training covering soft services, security operations, maintenance, safety compliance, and management skills.',
    target: 'Housekeeping staff, security guards, maintenance technicians, facility managers',
    levels: [
      { level: 'Beginner', count: 6, topics: ['Electrical Safety', 'Plumbing Fundamentals', 'HVAC Introduction', 'Housekeeping Best Practices', 'Security Protocols', 'Painting Basics'] },
      { level: 'Intermediate', count: 9, topics: ['Advanced Electrical', 'Plumbing Systems', 'HVAC Maintenance', 'Fire Safety Systems', 'Access Control', 'Pest Management', 'Waste Management', 'Landscape Maintenance', 'Energy Management'] },
      { level: 'Advanced', count: 10, topics: ['Facility Planning', 'Vendor Management', 'Budget & Cost Control', 'Compliance Auditing', 'Space Management', 'Sustainability', 'BMS Operations', 'SLA Management', 'Crisis Response', 'Team Leadership'] },
    ],
    status: 'Planned for Q3 2026',
    clients: 'CBRE, Schneider Electric, Meta India, Google India',
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: '📦',
    tagline: 'End-to-end supply chain optimization training',
    description: 'Training for warehouse operations, inventory management, last-mile delivery, and fleet coordination professionals across the entire supply chain.',
    target: 'Warehouse operators, delivery executives, inventory managers, fleet coordinators',
    levels: [
      { level: 'Beginner', count: 4, topics: ['Warehouse Operations', 'Inventory Basics', 'Last-Mile Delivery', 'Safety & Handling'] },
      { level: 'Intermediate', count: 4, topics: ['Advanced Inventory Management', 'Route Optimization', 'Quality Control', 'Technology & WMS'] },
      { level: 'Advanced', count: 4, topics: ['Supply Chain Analytics', 'Vendor Relations', 'Regulatory Compliance', 'Operations Leadership'] },
    ],
    status: 'Planned for Q4 2026',
    clients: 'Move in Sync',
  },
  {
    id: 'msme',
    name: 'MSME Sector',
    icon: '💼',
    tagline: 'Digital literacy and business skills for small enterprises',
    description: 'Empowering micro, small, and medium enterprises with digital marketing, financial compliance, e-commerce, and entrepreneurial development training.',
    target: 'Small business owners, shop managers, first-time entrepreneurs, MSME employees',
    levels: [
      { level: 'Beginner', count: 6, topics: ['Digital Literacy', 'Basic Accounting', 'Customer Service', 'Social Media Basics', 'GST Fundamentals', 'Workplace Safety'] },
      { level: 'Intermediate', count: 6, topics: ['Digital Marketing', 'E-commerce Operations', 'Financial Planning', 'HR Management', 'Quality Standards', 'Business Communication'] },
      { level: 'Advanced', count: 4, topics: ['Business Strategy', 'Regulatory Compliance', 'Scaling Operations', 'Leadership Development'] },
    ],
    status: 'Planned for 2027',
    clients: 'ALEAP WE-HUB cohort',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-navy-gradient py-20 sm:py-28">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-400">Solutions</p>
            <h1 className="mb-6 font-display text-5xl font-bold text-white sm:text-6xl">
              Training Solutions for Every Sector
            </h1>
            <p className="text-xl text-navy-200">
              Specialized, compliant, and culturally-aware training programs built for
              India&apos;s core economic sectors. NSDC aligned. MoRTH certified.
            </p>
          </div>
        </div>
      </section>

      {SECTORS.map((sector, idx) => (
        <section key={sector.id} id={sector.id} className={`section ${idx % 2 === 0 ? 'bg-white' : 'bg-navy-50'}`}>
          <div className="container-max">
            <div className="mb-12">
              <div className="mb-4 text-5xl">{sector.icon}</div>
              <h2 className="mb-2 font-display text-4xl font-bold text-navy-900">{sector.name}</h2>
              <p className="mb-4 text-lg font-medium text-gold-600">{sector.tagline}</p>
              <p className="max-w-3xl text-navy-600 leading-relaxed">{sector.description}</p>
              <p className="mt-2 text-sm text-navy-400"><strong>Target audience:</strong> {sector.target}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-gold-100 px-4 py-1.5 text-xs font-bold text-gold-800">{sector.status}</span>
                {sector.academicPartner && (
                  <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-800">Academic Partner: {sector.academicPartner}</span>
                )}
                <span className="rounded-full bg-navy-100 px-4 py-1.5 text-xs font-semibold text-navy-700">Clients: {sector.clients}</span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {sector.levels.map((level) => (
                <div key={level.level} className="card">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-navy-900">{level.level}</h3>
                    <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-bold text-navy-700">{level.count} modules</span>
                  </div>
                  <ul className="space-y-2">
                    {level.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-navy-600">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mandatory Core */}
      <section className="section bg-navy-gradient">
        <div className="container-max text-center">
          <p className="eyebrow text-gold-400">Mandatory for All Sectors</p>
          <h2 className="mb-4 font-display text-4xl font-bold text-white">Core Training Modules</h2>
          <p className="mx-auto mb-12 max-w-2xl text-navy-200">
            Every learner starts with these 7 foundational modules before progressing to sector-specific content.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Professional Communication',
              'Customer Service Excellence',
              'POSH (Prevention of Sexual Harassment)',
              'Professional Grooming & Hygiene',
              'Basic Fire Safety',
              'First Aid & Emergency Response',
              'Workplace Etiquette',
            ].map((mod) => (
              <div key={mod} className="rounded-xl border border-navy-700 bg-navy-800/50 px-6 py-4 text-sm font-medium text-white">
                {mod}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/contact" className="btn-gold text-base">
              Request Training for Your Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
