import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitEnquiry } from '../api/zoho';
import type { Enquiry } from '../types';

interface QuoteWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const freightTypes = ['Pallets', 'Cartons', 'Machinery', 'Bulk Goods', 'Fragile Goods', 'Other'];
const cities = ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth'];
const priorities = [
  { value: 'Standard', desc: '5–10 business days' },
  { value: 'Express', desc: '2–3 business days' },
  { value: 'Urgent', desc: 'Next day delivery' },
];

const steps = ['Freight', 'Route', 'Details', 'Contact', 'Confirm'];

const journeySteps = [
  { label: 'Received', done: true },
  { label: 'Processing', done: false },
  { label: 'Assigned', done: false },
  { label: 'Quote in Progress', done: false },
];

export default function QuoteWizard({ isOpen, onClose }: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);

  const [form, setForm] = useState({
    freightType: '',
    origin: 'Melbourne',
    destination: 'Brisbane',
    quantity: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    pickupDate: '',
    priority: 'Standard' as 'Standard' | 'Express' | 'Urgent',
    customerName: '',
    company: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEnquiry(null);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 1 && !form.freightType) e.freightType = 'Please select a freight type';
    if (step === 2) {
      if (form.origin === form.destination) e.destination = 'Origin and destination must differ';
    }
    if (step === 3) {
      if (!form.quantity) e.quantity = 'Required';
      if (!form.weight) e.weight = 'Required';
      if (!form.pickupDate) e.pickupDate = 'Required';
    }
    if (step === 4) {
      if (!form.customerName.trim()) e.customerName = 'Required';
      if (!form.email.includes('@')) e.email = 'Valid email required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step === 4) {
      setLoading(true);
      try {
        const result = await submitEnquiry({
          customerName: form.customerName,
          company: form.company,
          email: form.email,
          phone: form.phone,
          origin: form.origin,
          destination: form.destination,
          freightType: form.freightType,
          quantity: parseInt(form.quantity) || 1,
          weight: form.weight + ' kg',
          length: form.length,
          width: form.width,
          height: form.height,
          pickupDate: form.pickupDate,
          priority: form.priority,
        });
        setEnquiry(result);
        setStep(5);
      } catch {
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const inp = (key: string, placeholder: string, type = 'text') => (
    <div>
      <input
        type={type}
        value={(form as Record<string, string>)[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-lg bg-[rgba(255,255,255,0.05)] border text-[#F0EDE6] placeholder-[#4A5A4D] text-sm outline-none focus:ring-1 focus:ring-[rgba(190,255,71,0.3)] transition-all ${
          errors[key] ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.08)] focus:border-[rgba(190,255,71,0.25)]'
        }`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgba(6,10,7,0.92)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-lg bg-[#111812] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-7 pt-7 pb-5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#BEFF47] rounded flex items-center justify-center">
                    <span className="text-[#09100A] font-black text-xs">N</span>
                  </div>
                  <span className="text-[#F0EDE6] font-bold text-sm tracking-wider">NEXORA</span>
                </div>
                <button onClick={onClose} className="text-[#6B7D6F] hover:text-[#F0EDE6] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {step < 5 && (
                <>
                  <h2 className="text-[#F0EDE6] font-bold text-xl mb-1">Get a Quote</h2>
                  <p className="text-[#6B7D6F] text-sm">Step {step} of 4</p>

                  {/* Stepper */}
                  <div className="flex gap-1 mt-4">
                    {steps.slice(0, 4).map((label, idx) => (
                      <div key={label} className="flex-1">
                        <div className={`h-1 rounded-full transition-all duration-400 ${
                          idx + 1 < step ? 'bg-[#BEFF47]' : idx + 1 === step ? 'bg-[#BEFF47] opacity-70' : 'bg-[rgba(255,255,255,0.08)]'
                        }`} />
                        <span className={`text-[10px] mt-1 block text-center font-medium tracking-wide ${
                          idx + 1 <= step ? 'text-[#BEFF47]' : 'text-[#4A5A4D]'
                        }`}>{label.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content — plain conditional rendering (no AnimatePresence) to work in hidden browser tabs */}
            <div className="px-7 py-6 max-h-[60vh] overflow-y-auto">

              {step === 1 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-[#F0EDE6] font-semibold text-lg mb-6">What are you moving?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {freightTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => update('freightType', type)}
                        className={`p-4 rounded-xl border text-sm font-medium text-left transition-all duration-200 ${
                          form.freightType === type
                            ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.08)] text-[#BEFF47]'
                            : 'border-[rgba(255,255,255,0.07)] text-[#8A9A8E] hover:border-[rgba(255,255,255,0.14)] hover:text-[#F0EDE6]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.freightType && <p className="text-red-400 text-xs mt-3">{errors.freightType}</p>}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fade-in-up">
                  <h3 className="text-[#F0EDE6] font-semibold text-lg">Where is it going?</h3>
                  <div>
                    <label className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-2 block">From</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {cities.map((city) => (
                        <button key={city} onClick={() => update('origin', city)}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            form.origin === city ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.08)] text-[#BEFF47]' : 'border-[rgba(255,255,255,0.07)] text-[#8A9A8E] hover:border-[rgba(255,255,255,0.14)]'
                          }`}>{city}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                    <svg className="w-4 h-4 text-[#BEFF47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                  </div>
                  <div>
                    <label className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-2 block">To</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {cities.map((city) => (
                        <button key={city} onClick={() => update('destination', city)}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            form.destination === city ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.08)] text-[#BEFF47]' : 'border-[rgba(255,255,255,0.07)] text-[#8A9A8E] hover:border-[rgba(255,255,255,0.14)]'
                          }`}>{city}</button>
                      ))}
                    </div>
                    {errors.destination && <p className="text-red-400 text-xs mt-2">{errors.destination}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-[#F0EDE6] font-semibold text-lg">Tell us about the freight.</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {inp('quantity', 'Quantity')}
                    {inp('weight', 'Weight (kg)')}
                    {inp('length', 'Length (cm)')}
                    {inp('width', 'Width (cm)')}
                  </div>
                  {inp('height', 'Height (cm)')}
                  {inp('pickupDate', 'Pickup Date', 'date')}
                  <div>
                    <label className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-2 block">Delivery Priority</label>
                    <div className="grid grid-cols-3 gap-2">
                      {priorities.map(({ value, desc }) => (
                        <button key={value} onClick={() => update('priority', value)}
                          className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                            form.priority === value ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.08)]' : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]'
                          }`}>
                          <div className={`text-sm font-medium mb-1 ${form.priority === value ? 'text-[#BEFF47]' : 'text-[#F0EDE6]'}`}>{value}</div>
                          <div className="text-xs text-[#6B7D6F] leading-tight">{desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-[#F0EDE6] font-semibold text-lg">Where should we send your quote?</h3>
                  {inp('customerName', 'Full name')}
                  {inp('company', 'Company (optional)')}
                  {inp('email', 'Email address', 'email')}
                  {inp('phone', 'Phone number', 'tel')}
                  {errors.submit && <p className="text-red-400 text-xs">{errors.submit}</p>}
                </div>
              )}

              {step === 5 && enquiry && (
                <div className="text-center py-4 animate-fade-in-up">
                  {/* Success icon */}
                  <div className="w-16 h-16 rounded-full bg-[rgba(190,255,71,0.12)] border border-[rgba(190,255,71,0.3)] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#BEFF47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 className="text-[#F0EDE6] font-bold text-2xl mb-2">REQUEST RECEIVED</h3>
                  <p className="text-[#6B7D6F] text-sm mb-6">Your enquiry has been received by our operations team.</p>

                  <div className="bg-[rgba(190,255,71,0.06)] border border-[rgba(190,255,71,0.15)] rounded-xl p-5 mb-6 text-left">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-[#6B7D6F] text-xs uppercase tracking-wider">Reference</span>
                        <div className="text-[#BEFF47] font-bold font-mono text-lg mt-0.5">{enquiry.enquiryId}</div>
                      </div>
                      <div>
                        <span className="text-[#6B7D6F] text-xs uppercase tracking-wider">Status</span>
                        <div className="text-[#BEFF47] font-semibold text-sm mt-0.5">{enquiry.status.toUpperCase()}</div>
                      </div>
                      <div>
                        <span className="text-[#6B7D6F] text-xs uppercase tracking-wider">Route</span>
                        <div className="text-[#F0EDE6] font-medium text-sm mt-0.5">{enquiry.origin} → {enquiry.destination}</div>
                      </div>
                      <div>
                        <span className="text-[#6B7D6F] text-xs uppercase tracking-wider">Freight</span>
                        <div className="text-[#F0EDE6] font-medium text-sm mt-0.5">{enquiry.freightType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Journey indicator */}
                  <div className="text-left mb-6">
                    <p className="text-[#6B7D6F] text-xs uppercase tracking-wider mb-4">Enquiry Journey</p>
                    <div className="space-y-3">
                      {journeySteps.map((s, idx) => (
                        <div key={s.label} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            idx === 0
                              ? 'border-[#BEFF47] bg-[rgba(190,255,71,0.15)]'
                              : 'border-[rgba(255,255,255,0.1)]'
                          }`}>
                            {idx === 0 && (
                              <svg className="w-3 h-3 text-[#BEFF47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${idx === 0 ? 'text-[#BEFF47] font-medium' : 'text-[#4A5A4D]'}`}>
                            {s.label}
                          </span>
                          {idx === 0 && (
                            <span className="ml-auto text-[#BEFF47] text-xs font-mono bg-[rgba(190,255,71,0.1)] px-2 py-0.5 rounded">ACTIVE</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[#6B7D6F] text-xs p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    Expected response within <strong className="text-[#F0EDE6]">2 business hours</strong>.<br />
                    Quote sent to <strong className="text-[#F0EDE6]">{enquiry.email}</strong>
                  </div>

                  <p className="text-[#4A5A4D] text-xs mt-4 italic">
                    This enquiry would flow into Zoho Desk → Zoho CRM in production.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {step < 5 && (
              <div className="px-7 pb-7 pt-4 border-t border-[rgba(255,255,255,0.05)] flex gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="px-5 py-3 border border-[rgba(255,255,255,0.08)] text-[#6B7D6F] text-sm rounded-lg hover:text-[#F0EDE6] hover:border-[rgba(255,255,255,0.15)] transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#BEFF47] text-[#09100A] font-semibold text-sm rounded-lg hover:bg-[#D4FF6B] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : step === 4 ? 'SUBMIT ENQUIRY' : 'CONTINUE'}
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="px-7 pb-7 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-[rgba(190,255,71,0.2)] text-[#BEFF47] text-sm font-medium rounded-lg hover:bg-[rgba(190,255,71,0.06)] transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
