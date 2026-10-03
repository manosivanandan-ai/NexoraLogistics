import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const stages = [
  {
    id: 'website',
    label: 'WEBSITE',
    desc: 'Customers enquire, get quotes and track shipments — all structured data, ready for action.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'CUSTOMER SUPPORT',
    desc: 'Every enquiry becomes a trackable service interaction. Full context, full history, full accountability.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: 'crm',
    label: 'CRM',
    desc: 'Customer, account, shipment and relationship data in one place. Account managers see everything they need.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 'ops',
    label: 'OPERATIONS',
    desc: 'Freight coordination, warehouse management and delivery scheduling — all in one operational view.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'ANALYTICS',
    desc: 'Understand volume, response times, resolution and service performance. Real data, real decisions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI INSIGHTS',
    desc: 'Identify exceptions and operational risks before they become problems. Proactive, not reactive.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function ConnectedOperations() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref, inView } = useInView(0.15);

  return (
    <section id="architecture" className="py-24 lg:py-36 bg-[#09100A] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Demo Architecture</p>
          <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight mb-6">
            One customer journey.<br />One connected operation.
          </h2>
          <p className="text-[#6B7D6F] text-base lg:text-lg leading-relaxed">
            From first click to delivered freight, every stage is connected, tracked and visible.
          </p>
        </div>

        {/* Desktop: vertical flow */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="hidden lg:flex flex-col items-center gap-0 max-w-lg mx-auto"
        >
          {stages.map((stage, idx) => (
            <div key={stage.id} className="w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full p-5 rounded-xl border cursor-default transition-all duration-300 ${
                  hoveredId === stage.id
                    ? 'bg-[rgba(190,255,71,0.06)] border-[rgba(190,255,71,0.2)] scale-[1.01]'
                    : 'bg-[#111812] border-[rgba(255,255,255,0.07)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-lg border flex-shrink-0 transition-colors duration-300 ${
                    hoveredId === stage.id
                      ? 'border-[rgba(190,255,71,0.3)] bg-[rgba(190,255,71,0.1)] text-[#BEFF47]'
                      : 'border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] text-[#6B7D6F]'
                  }`}>
                    {stage.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-bold tracking-[0.15em] transition-colors ${
                      hoveredId === stage.id ? 'text-[#BEFF47]' : 'text-[#F0EDE6]'
                    }`}>{stage.label}</span>
                    <p className="text-[#6B7D6F] text-sm leading-relaxed mt-1">{stage.desc}</p>
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              {idx < stages.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                  className="w-px h-8 origin-top"
                  style={{ background: 'linear-gradient(to bottom, rgba(190,255,71,0.4), rgba(190,255,71,0.1))' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#111812]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-[#BEFF47]">{stage.icon}</div>
                <span className="text-[#F0EDE6] text-xs font-bold tracking-wider">{stage.label}</span>
              </div>
              <p className="text-[#6B7D6F] text-sm leading-relaxed">{stage.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-[#4A5A4D] text-xs">
            Demo architecture — illustrating how NEXORA enquiries can connect into Zoho Desk, Zoho CRM and Analytics
          </p>
        </div>
      </div>
    </section>
  );
}
