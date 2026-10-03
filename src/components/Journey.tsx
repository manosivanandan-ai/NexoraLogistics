import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stages = [
  {
    num: '01',
    label: 'ENQUIRY',
    headline: 'Customer tells us what they need.',
    description: 'A customer visits NEXORA, selects their freight type, origin, destination and priority. The request is structured, referenced and ready for action.',
    detail: 'Every enquiry generates a unique reference (e.g. NX-10482) and enters the operations pipeline immediately.',
    color: '#BEFF47',
  },
  {
    num: '02',
    label: 'SUPPORT',
    headline: 'Every request becomes a trackable conversation.',
    description: 'The enquiry flows into customer support as a structured ticket. The team has full context — freight type, timeline, customer history — from the first interaction.',
    detail: 'Connects to Zoho Desk for ticket management, SLA tracking and team collaboration.',
    color: '#BEFF47',
  },
  {
    num: '03',
    label: 'OPERATIONS',
    headline: 'Teams coordinate freight, warehouse and delivery.',
    description: 'Ops assigns carriers, warehouse capacity and delivery windows. Every movement is logged, tracked and visible across the operation.',
    detail: 'Connects to CRM, TMS and WMS. Account managers see customer history alongside operational status.',
    color: '#BEFF47',
  },
  {
    num: '04',
    label: 'DELIVERY',
    headline: 'Customers stay informed at every step.',
    description: 'Automated milestones keep customers up to date — pick-up confirmed, in transit, at hub, out for delivery. No chasing. No uncertainty.',
    detail: 'Real-time notifications via portal, email and SMS. Customer portal shows live ETA.',
    color: '#BEFF47',
  },
  {
    num: '05',
    label: 'INSIGHTS',
    headline: 'Management sees what\'s improving — and what needs attention.',
    description: 'Every delivery feeds analytics. Response times, SLA performance, volumes and customer satisfaction are visible in real time.',
    detail: 'Connects to Zoho Analytics and AI-powered exception alerts. Proactive, not reactive.',
    color: '#BEFF47',
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * stages.length * 1.1), stages.length - 1);
      setActiveStage(Math.max(0, idx));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="journey" ref={containerRef} style={{ height: `${stages.length * 80}vh` }} className="relative">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">

          {/* Section header */}
          <div className="mb-10 lg:mb-16">
            <motion.p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Customer Journey
            </motion.p>
            <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight">
              Every shipment has a story.
            </h2>
          </div>

          {/* Stage tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
            {stages.map((stage, idx) => (
              <button
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold tracking-wider transition-all duration-300 ${
                  idx === activeStage
                    ? 'bg-[rgba(190,255,71,0.1)] border-[rgba(190,255,71,0.3)] text-[#BEFF47]'
                    : idx < activeStage
                    ? 'border-[rgba(190,255,71,0.12)] text-[#4A6450]'
                    : 'border-[rgba(255,255,255,0.06)] text-[#4A5A4D]'
                }`}
              >
                <span className={idx < activeStage ? 'text-[#BEFF47]' : ''}>{stage.num}</span>
                <span>{stage.label}</span>
                {idx < activeStage && (
                  <svg className="w-3 h-3 text-[#BEFF47]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Journey line */}
          <div className="relative mb-8 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#BEFF47] rounded-full"
              animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            {/* Moving dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#BEFF47] rounded-full shadow-[0_0_10px_rgba(190,255,71,0.8)]"
              animate={{ left: `calc(${((activeStage + 1) / stages.length) * 100}% - 6px)` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Active stage content */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-[#BEFF47] text-6xl font-black opacity-20">{stages[activeStage].num}</span>
                <h3 className="text-[#F0EDE6] text-3xl lg:text-4xl font-bold tracking-tight">
                  {stages[activeStage].label}
                </h3>
              </div>
              <p className="text-[#F0EDE6] text-xl font-medium mb-4">
                {stages[activeStage].headline}
              </p>
              <p className="text-[#8A9A8E] text-base leading-relaxed mb-6">
                {stages[activeStage].description}
              </p>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(190,255,71,0.06)] border border-[rgba(190,255,71,0.1)]">
                <svg className="w-4 h-4 text-[#BEFF47] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-[#8A9A8E] text-sm">{stages[activeStage].detail}</p>
              </div>
            </motion.div>

            {/* Visual stage diagram */}
            <motion.div
              key={`diagram-${activeStage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative h-64 flex items-center justify-center">
                {/* Connected circles */}
                <div className="flex items-center gap-3">
                  {stages.map((s, idx) => (
                    <div key={s.num} className="flex items-center">
                      <div
                        className={`relative flex flex-col items-center transition-all duration-500 ${
                          idx === activeStage ? 'scale-110' : 'scale-90 opacity-40'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                            idx < activeStage
                              ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.15)] text-[#BEFF47]'
                              : idx === activeStage
                              ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.2)] text-[#BEFF47] shadow-[0_0_20px_rgba(190,255,71,0.3)]'
                              : 'border-[rgba(255,255,255,0.1)] text-[#4A5A4D]'
                          }`}
                        >
                          {idx < activeStage ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            s.num
                          )}
                        </div>
                        <span className="text-xs text-[#6B7D6F] mt-2 font-medium">{s.label}</span>
                      </div>
                      {idx < stages.length - 1 && (
                        <div className="w-8 h-px mx-1 transition-colors duration-500"
                          style={{ backgroundColor: idx < activeStage ? '#BEFF47' : 'rgba(255,255,255,0.1)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
