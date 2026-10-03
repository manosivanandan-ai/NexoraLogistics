import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getShipment } from '../api/zoho';
import type { Shipment } from '../types';

interface ShipmentTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  'In Transit': '#BEFF47',
  'Delivered': '#22C55E',
  'Processing': '#FF8C3A',
  'Delayed': '#EF4444',
  'On Schedule': '#BEFF47',
};

// City positions within viewBox 0 0 520 290
const mapCities = [
  { id: 'MEL', name: 'Melbourne', x: 340, y: 255 },
  { id: 'ALB', name: 'Albury', x: 362, y: 210 },
  { id: 'SYD', name: 'Sydney', x: 408, y: 172 },
  { id: 'BNE', name: 'Brisbane', x: 428, y: 98 },
  { id: 'ADL', name: 'Adelaide', x: 210, y: 240 },
  { id: 'PER', name: 'Perth', x: 65, y: 195 },
];

export default function ShipmentTracker({ isOpen, onClose }: ShipmentTrackerProps) {
  const [trackId, setTrackId] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [dotPosition, setDotPosition] = useState(0.5);

  const handleTrack = async () => {
    if (!trackId.trim()) { setError('Enter a shipment ID'); return; }
    setLoading(true);
    setError('');
    setShipment(null);
    try {
      const result = await getShipment(trackId.trim());
      if (result) {
        setShipment(result);
        const completed = result.milestones.filter((m) => m.status === 'completed').length;
        setDotPosition(completed / (result.milestones.length - 1));
      } else {
        setError(`No shipment found for "${trackId}". Try NX-48291.`);
      }
    } catch {
      setError('Unable to retrieve shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(6,10,7,0.92)] backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-2xl bg-[#111812] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-7 py-6 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <div>
                <h2 className="text-[#F0EDE6] font-bold text-xl">Track Shipment</h2>
                <p className="text-[#6B7D6F] text-sm mt-0.5">Enter your NEXORA reference number</p>
              </div>
              <button onClick={onClose} className="text-[#6B7D6F] hover:text-[#F0EDE6] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-7 py-6 max-h-[80vh] overflow-y-auto">
              {/* Search */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    value={trackId}
                    onChange={(e) => { setTrackId(e.target.value); setError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    placeholder="e.g. NX-48291"
                    className="w-full px-4 py-3.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#F0EDE6] placeholder-[#4A5A4D] text-sm outline-none focus:border-[rgba(190,255,71,0.3)] focus:ring-1 focus:ring-[rgba(190,255,71,0.2)] transition-all font-mono"
                  />
                  {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
                </div>
                <button
                  onClick={handleTrack}
                  disabled={loading}
                  className="px-6 py-3.5 bg-[#BEFF47] text-[#09100A] font-semibold text-sm rounded-lg hover:bg-[#D4FF6B] transition-all disabled:opacity-60 flex items-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  TRACK
                </button>
              </div>

              <AnimatePresence mode="wait">
                {shipment && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Shipment header */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { label: 'Shipment ID', value: shipment.id },
                        { label: 'Status', value: shipment.status, color: statusColors[shipment.status] },
                        { label: 'ETA', value: shipment.eta },
                        { label: 'Weight', value: shipment.weight },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                          <div className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-1">{label}</div>
                          <div className="font-bold text-sm font-mono" style={{ color: color || '#F0EDE6' }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Route visual */}
                    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
                      {/* Australian map SVG */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#6B7D6F] text-xs uppercase tracking-wider">Route Map</span>
                        <span className="text-[#F0EDE6] text-sm font-medium">{shipment.origin} → {shipment.destination}</span>
                      </div>
                      <div className="relative w-full overflow-hidden rounded-lg bg-[#0C1210]" style={{ paddingBottom: '55%' }}>
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 520 290"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Australia outline (simplified) */}
                          <path
                            d="M 60 120 Q 50 150 55 200 Q 60 250 80 280 Q 120 295 160 285 Q 200 275 240 280 Q 290 295 330 285 Q 380 270 410 250 Q 445 220 455 185 Q 460 155 450 130 Q 430 95 400 80 Q 360 65 320 70 Q 290 75 265 65 Q 240 55 220 60 Q 195 65 180 55 Q 160 45 145 55 Q 120 65 100 80 Q 75 95 60 120 Z"
                            fill="rgba(190,255,71,0.04)"
                            stroke="rgba(190,255,71,0.15)"
                            strokeWidth="0.8"
                          />
                          {/* Route line */}
                          <motion.path
                            d={(() => {
                              const pts = shipment.milestones
                                .map(m => mapCities.find(c => c.name === m.location))
                                .filter(Boolean);
                              if (pts.length < 2) return '';
                              return pts.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c!.x} ${c!.y}`).join(' ');
                            })()}
                            fill="none"
                            stroke="#BEFF47"
                            strokeWidth="1.5"
                            strokeDasharray="6 8"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                          />
                          {/* City markers */}
                          {mapCities.map((city) => {
                            const isOnRoute = shipment.milestones.some(m => m.location === city.name);
                            if (!isOnRoute) return null;
                            const milestone = shipment.milestones.find(m => m.location === city.name);
                            const color = milestone?.status === 'completed' ? '#22C55E' : milestone?.status === 'active' ? '#BEFF47' : '#6B7D6F';
                            return (
                              <g key={city.id}>
                                <circle cx={city.x} cy={city.y} r="5" fill={color} opacity="0.9">
                                  {milestone?.status === 'active' && (
                                    <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
                                  )}
                                </circle>
                                {milestone?.status === 'active' && (
                                  <circle cx={city.x} cy={city.y} r="12" fill="none" stroke="#BEFF47" strokeWidth="0.8" opacity="0.4">
                                    <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite"/>
                                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                                  </circle>
                                )}
                                <text x={city.x + 8} y={city.y + 4} fill={color} fontSize="9" fontWeight="600" fontFamily="monospace">{city.name}</text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <p className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-4">Shipment Timeline</p>
                      <div className="space-y-3">
                        {shipment.milestones.map((m, idx) => (
                          <motion.div
                            key={m.location}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-4"
                          >
                            {/* Status icon */}
                            <div className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                m.status === 'completed'
                                  ? 'border-[#22C55E] bg-[rgba(34,197,94,0.12)]'
                                  : m.status === 'active'
                                  ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.12)]'
                                  : 'border-[rgba(255,255,255,0.1)] bg-transparent'
                              }`}>
                                {m.status === 'completed' ? (
                                  <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : m.status === 'active' ? (
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#BEFF47]" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
                                )}
                              </div>
                              {idx < shipment.milestones.length - 1 && (
                                <div className={`w-px h-full mt-1 min-h-[20px] ${
                                  m.status === 'completed' ? 'bg-[rgba(34,197,94,0.3)]' : 'bg-[rgba(255,255,255,0.06)]'
                                }`} />
                              )}
                            </div>

                            {/* Details */}
                            <div className="pb-4 flex-1">
                              <div className="flex items-baseline justify-between">
                                <span className={`font-semibold text-sm ${
                                  m.status === 'active' ? 'text-[#BEFF47]' : m.status === 'completed' ? 'text-[#F0EDE6]' : 'text-[#4A5A4D]'
                                }`}>{m.location}</span>
                                {m.time && <span className="text-[#6B7D6F] text-xs font-mono">{m.time}</span>}
                              </div>
                              {m.note && <p className="text-[#6B7D6F] text-xs mt-0.5">{m.note}</p>}
                              {m.status === 'active' && (
                                <span className="inline-block mt-1.5 text-[10px] font-semibold bg-[rgba(190,255,71,0.1)] text-[#BEFF47] px-2 py-0.5 rounded tracking-wider">
                                  CURRENT LOCATION
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!shipment && !loading && !error && (
                <div className="text-center py-8 text-[#4A5A4D]">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">Enter a shipment reference to track</p>
                  <p className="text-xs mt-1 text-[#3A4A3D]">Try: NX-48291</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
