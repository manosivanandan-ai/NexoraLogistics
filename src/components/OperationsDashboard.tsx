import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { enquiryVolumeData, resolutionTimeData } from '../data/metrics';

function useAnimatedValue(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return value;
}

function BarChart({ data, color = '#BEFF47', label }: {
  data: { label: string; value: number }[];
  color?: string;
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div>
      <p className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-4">{label}</p>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, idx) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-sm"
              style={{ backgroundColor: color, opacity: 0.8 }}
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
            />
            <span className="text-[#4A5A4D] text-[10px]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ data, color = '#BEFF47', label }: {
  data: { label: string; value: number }[];
  color?: string;
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const h = 80;
  const w = 300;
  const step = w / (data.length - 1);

  const points = data.map((d, i) => ({
    x: i * step,
    y: h - ((d.value - min) / (max - min)) * h * 0.8 - 8,
  }));

  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const cp = points[i - 1];
    const mx = (cp.x + p.x) / 2;
    return acc + ` C ${mx} ${cp.y} ${mx} ${p.y} ${p.x} ${p.y}`;
  }, '');

  const area = path + ` L ${points[points.length - 1].x} ${h} L 0 ${h} Z`;

  return (
    <div>
      <p className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-4">{label}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 80 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#lineGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} opacity="0.8" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d) => (
          <span key={d.label} className="text-[#4A5A4D] text-[10px]">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function OperationsDashboard() {
  const { ref, inView } = useInView(0.15);

  const shipCount = useAnimatedValue(2481, inView);
  const onTime = useAnimatedValue(968, inView, 1800);
  const enquiries = useAnimatedValue(1284, inView, 1600);
  const sla = useAnimatedValue(94, inView, 1400);

  return (
    <section id="dashboard" className="py-24 lg:py-36 bg-[#111812] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase">Operations</p>
              <span className="text-xs px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#6B7D6F] font-mono">SAMPLE DATA</span>
            </div>
            <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight">
              Inside the<br />operation.
            </h2>
          </div>
          <p className="text-[#6B7D6F] text-base max-w-xs leading-relaxed">
            Live operational metrics across freight, support and customer satisfaction.
          </p>
        </div>

        {/* Dashboard */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#111812] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden"
        >
          {/* Dashboard header */}
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
                ))}
              </div>
              <span className="text-[#4A5A4D] text-xs font-mono">NEXORA Operations Centre</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BEFF47] animate-pulse" />
              <span className="text-[#BEFF47] text-xs font-mono">LIVE</span>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Shipments this month', display: shipCount.toLocaleString(), suffix: '' },
                { label: 'On-time delivery', display: (onTime / 10).toFixed(1), suffix: '%' },
                { label: 'Customer enquiries', display: enquiries.toLocaleString(), suffix: '' },
                { label: 'Resolved within SLA', display: sla, suffix: '%' },
              ].map(({ label, display, suffix }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="text-3xl lg:text-4xl font-black text-[#BEFF47] mb-1">
                    {display}<span className="text-xl">{suffix}</span>
                  </div>
                  <div className="text-[#6B7D6F] text-xs leading-snug">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Satisfaction */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(190,255,71,0.1)] bg-[rgba(190,255,71,0.04)] mb-8">
              <div>
                <div className="text-[#BEFF47] text-3xl font-black">4.8<span className="text-lg text-[#6B7D6F] font-normal">/5</span></div>
                <div className="text-[#6B7D6F] text-xs mt-0.5">Customer satisfaction</div>
              </div>
              <div className="flex gap-1 ml-2">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className={`w-5 h-5 ${i <= 4 ? 'text-[#BEFF47]' : 'text-[#2A3A2D]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <div className="ml-auto text-right">
                <div className="text-[#BEFF47] text-sm font-semibold">↑ 0.2</div>
                <div className="text-[#4A5A4D] text-xs">vs last month</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <BarChart data={enquiryVolumeData} color="#BEFF47" label="Enquiry volume (last 6 months)" />
              </div>
              <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <LineChart data={resolutionTimeData} color="#FF8C3A" label="Avg. resolution time (hrs)" />
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[#FF8C3A] text-sm font-semibold">↓ 43%</span>
                  <span className="text-[#6B7D6F] text-xs">improvement over 6 months</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[#3A4A3D] text-xs mt-4">SAMPLE OPERATIONAL DATA — for demonstration purposes only</p>
      </div>
    </section>
  );
}
