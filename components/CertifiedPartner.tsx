
import React, { useState } from 'react';

const CertifiedPartner: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const advantages = [
    {
      title: "7-DAY IMPLEMENTATION",
      desc: "Live on your phone lines in under a week with our battle-tested restaurant frameworks.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "POS & MENU INTEGRATION",
      desc: "Bidirectional connection to your POS for accurate order processing and menu management.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "SECURE GUEST PRIVACY",
      desc: "Encrypted handling of guest contact details, preferences, and reservation history.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "ENTERPRISE SCALABILITY",
      desc: "Processes unlimited concurrent calls simultaneously, ensuring no guest ever hits a busy signal during peak rushes.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const partners = [
    { color: 'bg-[#BFF549]', initial: 'V' }, // Primary brand
    { color: 'bg-[#282828]', initial: 'A' }, // Neutral
    { color: 'bg-[#444444]', initial: 'T' }, // Darker
    { color: 'bg-white', initial: 'S' },     // Light contrast
  ];

  const clientLogos = [
    "SYNERGY", "QUANTUM", "VELOCITY", "HORIZON", "ORBITAL"
  ];

  const toggleAccordion = (index: number) => {
    if (window.innerWidth < 768) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <section className="py-16 md:py-24 px-5 md:px-6 bg-black border-t border-[#282828]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20">
          
          {/* Left Column: Contextual Value */}
          <div className="text-center lg:text-left">
            {/* Refined Badge with Logo Area */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-[#1A1A1A] border border-[#282828] rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              {/* Subtle Neutral Logo Mark */}
              <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white opacity-60">
                  <path d="M12 2L4 7V17L12 22L20 17V7L12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 7L12 12L4 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white opacity-40 font-extrabold tracking-normal">RETELL</span>
              </div>
              
              <div className="flex items-center gap-2 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="tracking-[0.3em]">Official Certified Partner</span>
              </div>
            </div>
            
            <h2 className="text-[2.5rem] md:text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.95]">
              Precision Setup. <br />
              <span className="text-primary italic">Proven Stability.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-[#99A1AF] font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              As a certified integration partner, we specialize in architecting voice solutions that understand the specific nuances of your menu, your floor plan, and your guest behavior.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-primary">
                Book a Strategy Session
              </button>
              <button className="bg-[#1A1A1A] text-[#99A1AF] border border-[#282828] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:text-white hover:border-[#444] transition-all active:scale-95">
                Review Our Process
              </button>
            </div>
          </div>

          {/* Right Column: Scannable Benefit Grid (Accordion on Mobile) */}
          <div className="bg-[#0A0A0A] border border-[#282828] rounded-[30px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="mb-8 border-b border-[#282828] pb-6">
                <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-1">Implementation Advantage</h3>
                <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Production-Ready Hospitality AI</p>
              </div>

              {/* Grid / Accordion Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advantages.map((adv, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div 
                      key={i} 
                      className={`group relative bg-[#121212] border border-[#282828] rounded-2xl transition-all duration-300 cursor-pointer md:cursor-default ${
                        isOpen ? 'border-primary/40 ring-1 ring-primary/20' : 'hover:border-primary/20'
                      }`}
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-0 md:mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A1A1A] text-primary group-hover:scale-110 transition-transform duration-300">
                              {adv.icon}
                            </div>
                            <span className="text-white font-black text-[11px] md:text-xs tracking-[0.1em] uppercase">
                              {adv.title}
                            </span>
                          </div>
                          
                          {/* Chevron for mobile only */}
                          <div className={`md:hidden transition-transform duration-300 text-primary/60 ${isOpen ? 'rotate-180' : ''}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>

                        {/* Description: Collapsible on Mobile, Visible on Desktop */}
                        <div className={`transition-all duration-300 ease-in-out md:block overflow-hidden ${
                          isOpen 
                            ? 'max-h-[100px] opacity-100 mt-4' 
                            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
                        }`}>
                          <p className="text-[#99A1AF] text-[10.5px] md:text-[11px] leading-relaxed font-medium">
                            {adv.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-[#282828]">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {partners.map((p, i) => (
                      <div 
                        key={i} 
                        className={`w-9 h-9 rounded-full border-2 border-black ${p.color} flex items-center justify-center text-[10px] font-black text-black/50 shadow-lg`}
                        style={{ zIndex: partners.length - i }}
                      >
                        {p.initial}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#555] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                    Trusted by <span className="text-[#888]">50+ high-volume</span><br /> hospitality groups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Row: Enterprise Partner Logos */}
        <div className="pt-12 border-t border-[#282828]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="shrink-0">
              <p className="text-[#555] text-[9px] font-black uppercase tracking-[0.4em]">Integrated Networks</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30">
              {clientLogos.map((logo, i) => (
                <span 
                  key={i} 
                  className="text-white font-black text-sm md:text-lg tracking-tighter hover:opacity-100 transition-opacity cursor-default"
                >
                  {logo}
                </span>
              ))}
            </div>
            <div className="hidden lg:block text-right">
              <a href="#" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline underline-offset-4">
                View Case Studies →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CertifiedPartner;
