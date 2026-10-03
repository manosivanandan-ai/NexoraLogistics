import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { liveNetworkStatus } from '../data/shipments';

interface HeroProps {
  onGetQuote: () => void;
  onTrack: () => void;
}

export default function Hero({ onGetQuote, onTrack }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((i) => (i + 1) % liveNetworkStatus.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A130B] via-[#09100A] to-[#060A07]" />
        {/* Radial accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(190,255,71,0.18) 0%, transparent 70%)' }} />
        {/* Route network SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="routeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#BEFF47" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#BEFF47" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Route lines */}
          {[
            'M 200 750 Q 500 400 900 200',
            'M 100 500 Q 400 350 720 450 Q 1000 550 1350 300',
            'M 300 800 Q 600 600 950 350 Q 1200 200 1400 150',
            'M 50 300 Q 350 500 700 400 Q 1050 300 1400 500',
            'M 400 900 Q 700 600 1000 400 Q 1200 300 1440 250',
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#BEFF47" strokeWidth="0.5"
              strokeDasharray="6 14"
              style={{ animation: `routeDash ${8 + i * 2}s linear infinite`, animationDelay: `${i * 1.5}s` }}
            />
          ))}
          {/* City nodes */}
          {[
            { cx: 300, cy: 720, label: 'MEL' },
            { cx: 720, cy: 450, label: 'SYD' },
            { cx: 950, cy: 350, label: 'BNE' },
            { cx: 200, cy: 500, label: 'ADL' },
            { cx: 100, cy: 280, label: 'PER' },
          ].map(({ cx, cy, label }) => (
            <g key={label}>
              <circle cx={cx} cy={cy} r="3" fill="#BEFF47" opacity="0.8">
                <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="12" fill="none" stroke="#BEFF47" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          {/* Moving dots */}
          {[
            { path: 'M 200 750 Q 500 400 900 200', dur: '8s', delay: '0s' },
            { path: 'M 100 500 Q 400 350 720 450 Q 1000 550 1350 300', dur: '12s', delay: '2s' },
            { path: 'M 300 800 Q 600 600 950 350 Q 1200 200 1400 150', dur: '10s', delay: '1s' },
          ].map((dot, i) => (
            <circle key={i} r="3" fill="#BEFF47" opacity="0.9">
              <animateMotion dur={dot.dur} repeatCount="indefinite" begin={dot.delay}>
                <mpath xlinkHref={`#route${i}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">

          {/* Left — Hero copy */}
          <motion.div style={{ y, opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(190,255,71,0.2)] bg-[rgba(190,255,71,0.06)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BEFF47] animate-pulse" />
                <span className="text-[#BEFF47] text-xs font-medium tracking-[0.12em] uppercase">
                  Australian Logistics / One Connected Operation
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-black text-[#F0EDE6] leading-[0.92] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
            >
              MOVE FREIGHT.
              <br />
              <span className="text-[#BEFF47]">NOT PAPERWORK.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#8A9A8E] text-lg lg:text-xl leading-relaxed max-w-[520px] mb-10"
            >
              From first enquiry to final delivery, NEXORA connects your logistics operation in one intelligent flow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={onGetQuote}
                className="group px-7 py-4 bg-[#BEFF47] text-[#09100A] font-semibold text-sm tracking-wide rounded hover:bg-[#D4FF6B] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                GET A QUOTE
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={onTrack}
                className="px-7 py-4 border border-[rgba(255,255,255,0.12)] text-[#F0EDE6] font-medium text-sm tracking-wide rounded hover:border-[rgba(190,255,71,0.3)] hover:bg-[rgba(190,255,71,0.06)] transition-all duration-200"
              >
                TRACK A SHIPMENT
              </button>
            </motion.div>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              {['24/7 visibility', 'Nationwide coverage', 'Real-time updates'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BEFF47]" />
                  <span className="text-[#6B7D6F] text-sm font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Live Network Status Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="glass rounded-2xl p-6 border border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#BEFF47] animate-pulse" />
                    <span className="text-[#BEFF47] text-xs font-semibold tracking-[0.1em] uppercase">Live Network</span>
                  </div>
                  <p className="text-[#6B7D6F] text-xs">Updated 12s ago</p>
                </div>
                <div className="px-2 py-1 rounded bg-[rgba(190,255,71,0.1)] border border-[rgba(190,255,71,0.15)]">
                  <span className="text-[#BEFF47] text-xs font-mono font-medium">LIVE</span>
                </div>
              </div>

              <div className="space-y-3">
                {liveNetworkStatus.map((item, idx) => (
                  <motion.div
                    key={item.route}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      idx === statusIndex % liveNetworkStatus.length
                        ? 'bg-[rgba(190,255,71,0.06)] border border-[rgba(190,255,71,0.12)]'
                        : 'bg-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <div>
                      <p className="text-[#F0EDE6] text-sm font-medium">{item.route}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.statusColor }}
                      />
                      <span className="text-xs font-mono font-medium" style={{ color: item.statusColor }}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Active', value: '48' },
                    { label: 'On Time', value: '96%' },
                    { label: 'Delivered', value: '12' },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="text-[#BEFF47] text-xl font-bold">{value}</div>
                      <div className="text-[#6B7D6F] text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#6B7D6F] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#6B7D6F] to-transparent"
        />
      </motion.div>
    </div>
  );
}
