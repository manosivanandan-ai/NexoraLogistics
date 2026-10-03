import { motion } from 'framer-motion';

const trustLogos = [
  { name: 'NORTHSTAR RETAIL', sub: 'Retail Network' },
  { name: 'AXIS MANUFACTURING', sub: 'Industrial' },
  { name: 'HARBOUR HOME', sub: 'E-commerce' },
  { name: 'VANTAGE HEALTH', sub: 'Healthcare' },
  { name: 'MOTION COMMERCE', sub: 'Distribution' },
];

const trustStats = [
  { value: '850+', label: 'Business clients' },
  { value: '12', label: 'Distribution hubs' },
  { value: '98%', label: 'Client retention' },
  { value: '15+', label: 'Years in operation' },
];

export default function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#09100A] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#6B7D6F] text-base lg:text-lg font-medium">
            Trusted by businesses that can't afford to stop.
          </p>
        </div>

        {/* Logo row */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-16">
          {trustLogos.map((logo, idx) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="px-6 py-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-center hover:border-[rgba(255,255,255,0.1)] transition-colors group"
            >
              <div className="text-[#F0EDE6] font-bold text-sm tracking-widest group-hover:text-[#BEFF47] transition-colors">{logo.name}</div>
              <div className="text-[#4A5A4D] text-xs mt-0.5">{logo.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-0 mx-auto border-t border-[rgba(255,255,255,0.06)] mb-16" style={{ width: '100%' }} />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {trustStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-[#F0EDE6] font-black text-4xl lg:text-5xl mb-2">{stat.value}</div>
              <div className="text-[#6B7D6F] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#3A4A3D] text-xs mt-10">
          Fictional demo companies — for demonstration purposes only. Not affiliated with real businesses.
        </p>
      </div>
    </section>
  );
}
