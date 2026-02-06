
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import VoiceDemo from './components/VoiceDemo';
import Cta from './components/Cta';
import RevenueCalculator from './components/RevenueCalculator';
import CertifiedPartner from './components/CertifiedPartner';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-primary selection:text-black">
      <Navbar scrolled={scrolled} />
      
      <main>
        <Hero />
        
        <div className="relative py-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#282828] to-transparent"></div>
          <SocialProof />
        </div>

        <RevenueCalculator />
        
        <CertifiedPartner />

        <VoiceDemo />
        
        <Features />
        
        <Cta />
      </main>

      <footer className="bg-black border-t border-[#282828] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white">NOXXERA <span className="text-primary">AI</span></span>
          </div>
          <p className="text-[#99A1AF] text-sm">
            © 2025 Noxxera AI. Pioneering Human-Centric Voice Intelligence.
          </p>
          <div className="flex gap-6 text-[#99A1AF] text-sm uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
