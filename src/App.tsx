import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Services from './components/Services';
import Industries from './components/Industries';
import QuoteWizard from './components/QuoteWizard';
import ShipmentTracker from './components/ShipmentTracker';
import CustomerPortal from './components/CustomerPortal';
import ConnectedOperations from './components/ConnectedOperations';
import OperationsDashboard from './components/OperationsDashboard';
import AIInsights from './components/AIInsights';
import CaseStudies from './components/CaseStudies';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09100A] text-[#F0EDE6] overflow-x-hidden">
      <Navbar onGetQuote={() => setQuoteOpen(true)} onTrack={() => setTrackOpen(true)} />
      <Hero onGetQuote={() => setQuoteOpen(true)} onTrack={() => setTrackOpen(true)} />
      <Journey />
      <Services />
      <Industries />
      <CustomerPortal />
      <ConnectedOperations />
      <OperationsDashboard />
      <AIInsights />
      <CaseStudies />
      <TrustSection />
      <Footer onGetQuote={() => setQuoteOpen(true)} />

      <QuoteWizard isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <ShipmentTracker isOpen={trackOpen} onClose={() => setTrackOpen(false)} />
    </div>
  );
}
