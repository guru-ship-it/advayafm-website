import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with D Advaya FM for training solutions, partnerships, or support.',
};

export default function ContactPage() {
  return (
    <div className="container-max py-16 sm:py-24">
      <div className="text-center">
        <p className="eyebrow">Get in Touch</p>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Ready to transform your workforce training? Reach out for a demo, partnership inquiry, or support.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-2">
        {/* Contact info */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">Reach Us Directly</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gold-600">Business, Support &amp; Enquiries</h3>
              <a href="mailto:admin@advayafm.com" className="text-lg font-semibold text-navy-900 hover:text-gold-600">admin@advayafm.com</a>
            </div>
            <div className="card">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gold-600">Phone</h3>
              <a href="tel:+917989002661" className="text-lg font-semibold text-navy-900 hover:text-gold-600">+91 79890 02661</a>
            </div>
            <div className="card">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gold-600">Office Address</h3>
              <p className="text-navy-700">502B, Sadhguru Capital Park<br />Madhapur, Hyderabad<br />Telangana 500081, India</p>
            </div>
          </div>
        </div>

        {/* Contact form placeholder */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">Request a Demo</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy-700">Full Name</label>
              <input type="text" id="name" name="name" required className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-700">Work Email</label>
              <input type="email" id="email" name="email" required className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100" placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy-700">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-navy-700">Company Name</label>
              <input type="text" id="company" name="company" className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100" placeholder="Your organization" />
            </div>
            <div>
              <label htmlFor="sector" className="mb-1.5 block text-sm font-semibold text-navy-700">Interested Sector</label>
              <select id="sector" name="sector" className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100">
                <option value="">Select a sector</option>
                <option value="ground-transport">Ground Transport</option>
                <option value="hospitality">Hospitality</option>
                <option value="facilities">Facilities Management</option>
                <option value="logistics">Logistics &amp; Supply Chain</option>
                <option value="msme">MSME</option>
                <option value="multiple">Multiple Sectors</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy-700">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100" placeholder="Tell us about your training needs..." />
            </div>
            <button type="submit" className="btn-gold w-full text-base">
              Submit Request
            </button>
            <p className="text-center text-xs text-navy-400">We typically respond within 24 hours.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
