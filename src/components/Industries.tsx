import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { industries } from '../data/industries';

export default function Industries() {
  const [activeId, setActiveId] = useState('ecommerce');
  const active = industries.find((i) => i.id === activeId) ?? industries[0];

  return (
    <section id="industries" className="py-24 lg:py-36 bg-[#111812] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Solutions</p>
          <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight">
            Built around<br />your business.
          </h2>
        </div>

        {/* Industry selector tabs */}
        <div className="flex gap-2 flex-wrap mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveId(industry.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-250 border ${
                activeId === industry.id
                  ? 'bg-[#BEFF47] text-[#09100A] border-[#BEFF47] font-semibold'
                  : 'bg-transparent text-[#6B7D6F] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:text-[#F0EDE6]'
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>

        {/* Active industry content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start"
          >
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(190,255,71,0.08)] border border-[rgba(190,255,71,0.15)] mb-6">
                <span className="text-[#BEFF47] text-xs font-semibold tracking-wider uppercase">{active.label}</span>
              </div>
              <h3 className="text-[#F0EDE6] font-bold text-2xl lg:text-4xl leading-tight mb-6">
                {active.headline}
              </h3>
              <p className="text-[#8A9A8E] text-base lg:text-lg leading-relaxed mb-10">
                {active.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {active.metrics.map((metric) => (
                  <div key={metric.label} className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                    <div className="text-[#BEFF47] text-xl lg:text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-[#6B7D6F] text-xs leading-snug">{metric.label}</div>
                  </div>
                ))}
              </div>

              <button className="mt-8 flex items-center gap-2 text-[#BEFF47] text-sm font-medium group">
                <span>Explore {active.label} solutions</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Visual card */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#181F19] p-6">
                {/* Visual representation */}
                <div className="relative rounded-xl bg-[#0E1510] h-48 mb-6 overflow-hidden flex items-center justify-center">
                  {/* Abstract logistics visual */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="indGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#BEFF47" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#BEFF47" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M 0 150 Q 100 50 200 100 Q 300 150 400 50" fill="none" stroke="#BEFF47" strokeWidth="1" strokeDasharray="8 12">
                      <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="50" cy="140" r="6" fill="#BEFF47" opacity="0.6">
                      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="200" cy="100" r="6" fill="#BEFF47" opacity="0.8">
                      <animate attributeName="r" values="4;8;4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="350" cy="60" r="6" fill="#BEFF47" opacity="0.5">
                      <animate attributeName="r" values="4;8;4" dur="2s" begin="1s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  <div className="relative text-center">
                    <div className="text-[#BEFF47] font-black text-5xl opacity-15">{active.label.toUpperCase()}</div>
                  </div>
                </div>

                {/* Detail list */}
                <div className="space-y-3">
                  {[
                    'Dedicated account management',
                    `Optimised for ${active.label.toLowerCase()} operations`,
                    'Integrated reporting & analytics',
                    'SLA-backed service guarantees',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BEFF47] flex-shrink-0" />
                      <span className="text-[#8A9A8E] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
