import { motion } from 'framer-motion';

interface FooterProps {
  onGetQuote: () => void;
}

const footerLinks = {
  Services: ['Road Freight', 'Express Freight', '3PL & Warehousing', 'Interstate Distribution', 'Bulk & Heavy', 'Custom Logistics'],
  Solutions: ['Retail', 'Manufacturing', 'E-commerce', 'Healthcare', 'Technology', 'Hospitality'],
  Company: ['About', 'Careers', 'Contact', 'Press', 'Partners'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
};

const cities = ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth'];

export default function Footer({ onGetQuote }: FooterProps) {
  return (
    <footer className="bg-[#09100A] border-t border-[rgba(255,255,255,0.06)]">
      {/* Big CTA section */}
      <div className="py-24 lg:py-36 border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-6">Get Started</p>
            <h2 className="text-[#F0EDE6] font-black leading-[0.92] tracking-tight mb-10"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
              Ready to move<br />smarter?
            </h2>
            <button
              onClick={onGetQuote}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#BEFF47] text-[#09100A] font-bold text-base tracking-wide rounded-lg hover:bg-[#D4FF6B] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              GET A QUOTE
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="text-[#4A5A4D] text-sm mt-6">
              Or call us: <span className="text-[#6B7D6F]">1800 NEXORA</span> · Available 24/7
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#BEFF47] rounded flex items-center justify-center">
                <span className="text-[#09100A] font-black text-sm">N</span>
              </div>
              <span className="text-[#F0EDE6] font-bold text-lg tracking-wider">NEXORA</span>
            </div>
            <p className="text-[#4A5A4D] text-sm leading-relaxed mb-6 max-w-xs">
              Move freight. Not paperwork.<br />
              Australia-wide logistics, connected from enquiry to delivery.
            </p>
            <p className="text-[#4A5A4D] text-xs font-semibold tracking-widest uppercase mb-3">Australia-wide</p>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span key={city} className="text-xs text-[#4A5A4D] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.05)]">{city}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#F0EDE6] font-semibold text-xs tracking-wider uppercase mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#4A5A4D] text-sm hover:text-[#F0EDE6] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#3A4A3D] text-xs">
            © 2026 NEXORA Logistics Pty Ltd. Demo website. All content is fictional and for demonstration purposes only.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#3A4A3D] text-xs">ABN 00 000 000 000</span>
            <span className="text-[#3A4A3D] text-xs">•</span>
            <span className="text-[#3A4A3D] text-xs">WORKSHOP DEMO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
