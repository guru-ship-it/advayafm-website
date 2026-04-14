import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = {
  Solutions: [
    { href: '/solutions#ground-transport', label: 'Ground Transport' },
    { href: '/solutions#hospitality', label: 'Hospitality' },
    { href: '/solutions#facilities', label: 'Facilities Management' },
    { href: '/solutions#logistics', label: 'Logistics & Supply Chain' },
    { href: '/solutions#msme', label: 'MSME Sector' },
  ],
  Platform: [
    { href: '/about', label: 'About Us' },
    { href: '/partners', label: 'Partners' },
    { href: '/download', label: 'Download App' },
    { href: '/contact', label: 'Contact Us' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/data-deletion', label: 'Data Deletion' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-white">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logos/advaya-fm.png" alt="Advaya FM" width={44} height={44} className="rounded-full bg-white p-1" />
              <Image src="/logos/fm-naipunya.jpg" alt="FM NaipuNya" width={44} height={44} className="rounded-full bg-white p-1" />
            </div>
            <h3 className="mb-2 font-display text-xl font-bold">
              D Advaya FM <span className="text-gold-400">NaipuNya</span>
            </h3>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-navy-300">
              Revolutionizing training and certification for India&apos;s most vital industries through AI-powered assessments, immersive WebXR simulations, and personalized learning paths.
            </p>
            <div className="space-y-2 text-sm text-navy-300">
              <p>
                <span className="font-semibold text-gold-400">Email:</span>{' '}
                <a href="mailto:admin@advayafm.com" className="hover:text-white">admin@advayafm.com</a>
              </p>
              <p>
                <span className="font-semibold text-gold-400">Phone:</span>{' '}
                <a href="tel:+917989002661" className="hover:text-white">+91 79890 02661</a>
              </p>
              <p className="pt-1 text-navy-400">
                502B, Sadhguru Capital Park, Madhapur, Hyderabad, Telangana 500081
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold-400">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-navy-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-max flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} D Advaya FM Pvt Ltd. All rights reserved. CIN: U74999TG2024PTC185XXX
          </p>
          <p className="text-xs text-navy-500">
            Innovating FM Education &bull; Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
