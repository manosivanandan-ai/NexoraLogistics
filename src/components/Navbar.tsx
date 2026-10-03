import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onGetQuote: () => void;
  onTrack: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#industries' },
  { label: 'Track Shipment', href: '#track', action: 'track' },
  { label: 'Insights', href: '#dashboard' },
  { label: 'About', href: '#about' },
];

export default function Navbar({ onGetQuote, onTrack }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.action === 'track') {
      e.preventDefault();
      onTrack();
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(9,16,10,0.92)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#BEFF47] rounded flex items-center justify-center">
              <span className="text-[#09100A] font-black text-sm leading-none">N</span>
            </div>
            <span className="text-[#F0EDE6] font-bold text-base tracking-wider">NEXORA</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className="text-[#6B7D6F] hover:text-[#F0EDE6] text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={onGetQuote}
              className="px-5 py-2.5 bg-[#BEFF47] text-[#09100A] text-sm font-semibold rounded tracking-wide hover:bg-[#D4FF6B] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#F0EDE6] origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[#F0EDE6]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#F0EDE6] origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[rgba(9,16,10,0.98)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.07)] lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className="text-[#F0EDE6] text-lg font-medium py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onGetQuote(); setMobileOpen(false); }}
                className="mt-4 w-full py-3.5 bg-[#BEFF47] text-[#09100A] font-semibold rounded text-sm tracking-wider"
              >
                GET A QUOTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
