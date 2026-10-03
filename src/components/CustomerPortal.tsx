import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { customerShipments } from '../data/shipments';

const stats = [
  { label: 'Active Shipments', value: '12', icon: '→' },
  { label: 'Delivered', value: '8', icon: '✓' },
  { label: 'In Transit', value: '3', icon: '●' },
  { label: 'Requires Attention', value: '1', icon: '!' },
];

export default function CustomerPortal() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="portal" className="py-24 lg:py-36 bg-[#0D1310] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-[#BEFF47] text-xs font-semibold tracking-[0.2em] uppercase">Customer Portal</p>
              <span className="text-xs px-2 py-0.5 rounded bg-[rgba(190,255,71,0.1)] border border-[rgba(190,255,71,0.2)] text-[#BEFF47] font-mono">DEMO</span>
            </div>
            <h2 className="text-[#F0EDE6] font-black text-4xl lg:text-6xl tracking-tight">
              Your operation,<br />connected.
            </h2>
          </div>
          <p className="text-[#6B7D6F] text-base max-w-sm leading-relaxed">
            A single view across all your freight, from active shipments to delivered orders.
          </p>
        </div>

        {/* Portal card */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#111812] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden"
        >
          {/* Portal header bar */}
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
                ))}
              </div>
              <span className="text-[#4A5A4D] text-xs font-mono tracking-wider">portal.nexora.com.au</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6B7D6F] text-xs">CUSTOMER PORTAL</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[rgba(190,255,71,0.1)] border border-[rgba(190,255,71,0.2)] text-[#BEFF47] font-mono text-[10px]">DEMO</span>
            </div>
          </div>

          {/* Portal content */}
          <div className="p-6 lg:p-8">
            {/* Greeting */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-[#6B7D6F] text-sm mb-1">Thursday, Oct 3, 2026</p>
                <h3 className="text-[#F0EDE6] font-bold text-2xl lg:text-3xl">
                  Good morning, <span className="text-[#BEFF47]">ACME Retail</span>
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(190,255,71,0.06)] border border-[rgba(190,255,71,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#BEFF47] animate-pulse" />
                <span className="text-[#BEFF47] text-xs font-medium">All systems active</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  className="p-4 lg:p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-3xl lg:text-4xl font-black ${
                      stat.label === 'Requires Attention' ? 'text-[#FF8C3A]' : 'text-[#F0EDE6]'
                    }`}>{stat.value}</span>
                    <span className={`text-lg ${stat.label === 'Requires Attention' ? 'text-[#FF8C3A]' : 'text-[#BEFF47]'}`}>
                      {stat.icon}
                    </span>
                  </div>
                  <p className="text-[#6B7D6F] text-xs leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Shipments table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[#F0EDE6] font-semibold text-sm tracking-wide uppercase">Recent Shipments</h4>
                <button className="text-[#BEFF47] text-xs font-medium hover:underline">View all</button>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.06)]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                      {['Shipment', 'Route', 'Status', 'ETA'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[#6B7D6F] text-xs font-semibold uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customerShipments.map((s, idx) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + idx * 0.06 }}
                        className="border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-4">
                          <span className="text-[#BEFF47] font-mono text-sm font-semibold group-hover:underline">{s.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[#F0EDE6] text-sm font-medium">{s.route}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.statusColor }} />
                            <span className="text-sm font-medium" style={{ color: s.statusColor }}>{s.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[#8A9A8E] text-sm">{s.eta}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {customerShipments.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + idx * 0.06 }}
                    className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[#BEFF47] font-mono text-sm font-bold">{s.id}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.statusColor }} />
                        <span className="text-xs font-medium" style={{ color: s.statusColor }}>{s.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#F0EDE6] text-sm">{s.route}</span>
                      <span className="text-[#6B7D6F] text-xs">{s.eta}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
