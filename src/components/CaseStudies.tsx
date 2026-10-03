import { useRef } from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-24 lg:py-36 bg-[#111812] border-t border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16">
        <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Case Studies</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight leading-tight">
            Logistics that<br />works.
          </h2>
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#6B7D6F] hover:text-[#F0EDE6] hover:border-[rgba(255,255,255,0.2)] transition-all"
            >
              ←
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#6B7D6F] hover:text-[#F0EDE6] hover:border-[rgba(255,255,255,0.2)] transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-6 lg:px-12 overflow-x-auto no-scrollbar pb-6"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {caseStudies.map((cs, idx) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex-shrink-0 w-[340px] lg:w-[420px] rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#181F19] overflow-hidden group cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Visual area */}
            <div className="h-52 bg-[#0D1310] relative overflow-hidden p-6 flex flex-col justify-between">
              {/* Abstract pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
                {[0,1,2,3].map((i) => (
                  <path
                    key={i}
                    d={`M ${i * 80} 200 Q ${i * 80 + 80} ${100 - i * 20} ${i * 80 + 160} 200`}
                    fill="none"
                    stroke={cs.color}
                    strokeWidth="1"
                  />
                ))}
                <path d="M 0 80 Q 100 20 200 80 Q 300 140 400 60" fill="none" stroke={cs.color} strokeWidth="1.5" strokeDasharray="6 10">
                  <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="4s" repeatCount="indefinite"/>
                </path>
              </svg>

              {/* Sector badge */}
              <div>
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.15em]"
                  style={{ backgroundColor: `${cs.color}18`, color: cs.color, border: `1px solid ${cs.color}30` }}>
                  {cs.sector}
                </span>
              </div>

              {/* Large result number */}
              <div className="relative">
                {cs.metrics.slice(0, 1).map((m) => (
                  <div key={m.label}>
                    <div className="font-black text-4xl" style={{ color: cs.color }}>{m.value}</div>
                    <div className="text-[#6B7D6F] text-xs mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-[#F0EDE6] font-bold text-lg leading-snug mb-3 group-hover:text-[#BEFF47] transition-colors duration-300">
                {cs.headline}
              </h3>
              <p className="text-[#6B7D6F] text-sm leading-relaxed mb-5">
                {cs.description}
              </p>

              {/* Metrics row */}
              <div className="flex gap-3 mb-5">
                {cs.metrics.slice(1).map((m) => (
                  <div key={m.label} className="flex-1 text-center p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    <div className="font-bold text-sm" style={{ color: cs.color }}>{m.value}</div>
                    <div className="text-[#4A5A4D] text-[10px] mt-0.5 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Result quote */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cs.color }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[#8A9A8E] text-xs leading-relaxed italic">{cs.result}</p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium group-hover:text-[#BEFF47] text-[#4A5A4D] transition-colors">
                <span>Read more</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Spacer */}
        <div className="flex-shrink-0 w-6 lg:w-12" />
      </div>
    </section>
  );
}
