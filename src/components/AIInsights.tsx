import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const responseLines = [
  '● Analysing freight network...',
  '● Cross-referencing SLA thresholds...',
  '● Reviewing open enquiry queue...',
  '● Flagging high-priority accounts...',
  '',
];

const finalResponse = {
  summary: '3 areas need attention',
  items: [
    { count: 7, label: 'delayed shipments', icon: '→', color: '#FF8C3A' },
    { count: 4, label: 'unresolved customer enquiries', icon: '●', color: '#FF8C3A' },
    { count: 2, label: 'high-priority accounts awaiting response', icon: '!', color: '#EF4444' },
  ],
};

export default function AIInsights() {
  const { ref, inView } = useInView(0.2);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle');
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (inView && phase === 'idle') {
      setTimeout(() => setPhase('typing'), 600);
    }
  }, [inView, phase]);

  useEffect(() => {
    if (phase !== 'typing') return;
    const currentLine = responseLines[lineIdx] ?? '';

    if (charIdx < currentLine.length) {
      const timer = setTimeout(() => {
        setTyped((t) => t + currentLine[charIdx]);
        setCharIdx((c) => c + 1);
      }, 18);
      return () => clearTimeout(timer);
    } else {
      if (lineIdx < responseLines.length - 1) {
        const timer = setTimeout(() => {
          setTyped('');
          setCharIdx(0);
          setLineIdx((l) => l + 1);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setPhase('done'), 400);
      }
    }
  }, [phase, lineIdx, charIdx]);

  const restart = () => {
    setPhase('idle');
    setLineIdx(0);
    setTyped('');
    setCharIdx(0);
    setTimeout(() => setPhase('typing'), 100);
  };

  return (
    <section id="ai" className="py-24 lg:py-36 bg-[#09100A] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase mb-4">AI Insights</p>
          <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight mb-6">
            Logistics shouldn't just move.<br />
            <span className="text-[#BEFF47]">It should learn.</span>
          </h2>
          <p className="text-[#6B7D6F] text-base lg:text-lg leading-relaxed">
            Proactive intelligence that surfaces what matters — before it becomes a problem.
          </p>
        </div>

        {/* AI panel */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-[#111812] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden"
          >
            {/* Header bar */}
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#BEFF47] flex items-center justify-center">
                    <span className="text-[#09100A] font-black text-[10px]">N</span>
                  </div>
                  <span className="text-[#F0EDE6] text-sm font-semibold">NEXORA AI</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BEFF47] animate-pulse" />
                <span className="text-[#BEFF47] text-xs font-mono">DEMO ONLY</span>
              </div>
            </div>

            <div className="p-6">
              {/* User prompt */}
              <div className="flex justify-end mb-6">
                <div className="max-w-xs px-4 py-3 rounded-2xl rounded-tr-sm bg-[rgba(190,255,71,0.1)] border border-[rgba(190,255,71,0.2)]">
                  <p className="text-[#F0EDE6] text-sm">"Show me today's operational risks."</p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-[rgba(190,255,71,0.1)] border border-[rgba(190,255,71,0.2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#BEFF47]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="flex-1">
                  {/* Typing animation */}
                  <AnimatePresence mode="wait">
                    {phase === 'typing' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs text-[#6B7D6F] mb-4 min-h-[20px]"
                      >
                        {typed}
                        <span className="animate-blink">▌</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Done state */}
                  <AnimatePresence>
                    {phase === 'done' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="bg-[rgba(255,140,58,0.06)] border border-[rgba(255,140,58,0.15)] rounded-xl p-4 mb-4">
                          <p className="text-[#FF8C3A] font-semibold text-sm mb-3">⚠ {finalResponse.summary}</p>
                          <div className="space-y-2.5">
                            {finalResponse.items.map((item, idx) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.12 }}
                                className="flex items-center gap-3"
                              >
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                                  style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                  {item.count}
                                </div>
                                <span className="text-[#8A9A8E] text-sm">{item.label}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2">
                          {['VIEW SHIPMENTS', 'VIEW ENQUIRIES', 'OPEN CRM'].map((btn, idx) => (
                            <motion.button
                              key={btn}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.08 }}
                              className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[#F0EDE6] text-xs font-medium tracking-wide hover:border-[rgba(190,255,71,0.25)] hover:text-[#BEFF47] transition-all duration-200"
                            >
                              {btn}
                            </motion.button>
                          ))}
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            onClick={restart}
                            className="ml-auto text-[#4A5A4D] text-xs hover:text-[#6B7D6F] transition-colors"
                          >
                            ↺ Replay
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {phase === 'idle' && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0,1,2].map((i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#4A5A4D] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)]">
              <p className="text-[#3A4A3D] text-xs text-center">
                Demo interaction — no real AI backend. In production, powered by Zoho Zia or a connected LLM.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
