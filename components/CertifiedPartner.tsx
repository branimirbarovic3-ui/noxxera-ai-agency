import React, { useState } from 'react';
import { Crown, Gem, Mountain, Shield } from "lucide-react";

const LogoTao = () => (
  <svg viewBox="0 0 100 30" fill="currentColor" className="h-6 w-auto">
    <text x="0" y="24" font-family="serif" font-weight="900" font-size="24" letter-spacing="2">TAO</text>
    <rect x="65" y="8" width="35" height="12" rx="2" />
    <text x="68" y="18" fill="black" font-family="sans-serif" font-weight="900" font-size="8">GROUP</text>
  </svg>
);

const LogoHillstone = () => (
  <svg viewBox="0 0 120 30" fill="currentColor" className="h-4 w-auto">
    <text x="0" y="22" font-family="serif" font-weight="400" font-size="18" letter-spacing="4">HILLSTONE</text>
    <path d="M0 26 H120" stroke="currentColor" stroke-width="1" />
  </svg>
);

const LogoMajor = () => (
  <svg viewBox="0 0 140 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="22" font-family="sans-serif" font-weight="900" font-size="14" letter-spacing="1">MAJOR FOOD GROUP</text>
  </svg>
);

const LogoStarr = () => (
  <svg viewBox="0 0 100 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="22" font-family="serif" font-weight="800" font-size="18" font-style="italic">STARR</text>
    <circle cx="85" cy="18" r="8" fill="none" stroke="currentColor" stroke-width="2" />
    <path d="M85 14 L85 22 M81 18 L89 18" stroke="currentColor" stroke-width="2" />
  </svg>
);

const CertifiedPartner: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const advantages = [
    {
      title: "7-DAY DEPLOYMENT FRAMEWORK",
      desc: "Go from discovery to live production in under a week with our battle-tested integration pipeline.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "CRM & API INTEGRATION",
      desc: "Bidirectional connection to your existing CRM, scheduling software, and custom business systems.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "SECURE DATA HANDLING",
      desc: "Enterprise-grade encryption for all voice data, lead information, and sensitive business logic.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "UNLIMITED CONCURRENCY",
      desc: "Processes hundreds of simultaneous calls, eliminating busy signals even during extreme traffic spikes.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const partners = [
    "TECH", "LEGAL", "MED", "TRADE", "GLOBAL"
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
    <section className="py-32 md:py-48 px-5 md:px-6 relative border-t border-[#282828]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20">

          {/* Left Column: Contextual Value */}
          <div className="text-center lg:text-left">
            {/* Refined Badge with Logo Area */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-[#282828] rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              {/* Subtle Neutral Logo Mark */}
              <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white opacity-60">
                  <path d="M12 2L4 7V17L12 22L20 17V7L12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 7L12 12L4 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-white opacity-40 font-extrabold tracking-normal">RETELL</span>
              </div>

              <div className="flex items-center gap-2 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="tracking-[0.3em]">Technical Systems Integrator</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase leading-[1.1]">
              Real-Time Automation. <br />
              <span className="text-primary italic">Enterprise Reliability.</span>
            </h2>

            <p className="text-lg md:text-xl text-[#99A1AF] font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              As a specialized voice systems integrator, we architect serious AI infrastructure that adapts to your complex business workflows and operational demands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-primary">
                Schedule a Strategy Call
              </button>
              <button className="bg-[#1A1A1A] text-[#99A1AF] border border-[#282828] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:text-white hover:border-[#444] transition-all active:scale-95">
                Our Infrastructure Specialists
              </button>
            </div>
          </div>

          {/* Right Column: Scannable Benefit Grid (Accordion on Mobile) */}
          <div className="bg-white/5 backdrop-blur-md border border-[#282828] rounded-[30px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="mb-8 border-b border-[#282828] pb-6">
                <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-1">Infrastructure Focus</h3>
                <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Architecture Specialists</p>
              </div>

              {/* Grid / Accordion Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advantages.map((adv, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div
                      key={i}
                      className={`group relative bg-[#121212] border border-[#282828] rounded-2xl transition-all duration-300 cursor-pointer md:cursor-default ${isOpen ? 'border-primary/40 ring-1 ring-primary/20' : 'hover:border-primary/20'
                        }`}
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1A1A1A] text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50">
                              {adv.icon}
                            </div>
                            <span className="text-white font-black text-sm md:text-sm tracking-tight uppercase leading-none">
                              {adv.title}
                            </span>
                          </div>

                          {/* Chevron for mobile only */}
                          <div className={`md:hidden transition-transform duration-300 text-primary/60 ${isOpen ? 'rotate-180' : ''}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>

                        {/* Description: Collapsible on Mobile, Visible on Desktop */}
                        <div className={`transition-all duration-300 ease-in-out md:block overflow-hidden ${isOpen
                          ? 'max-h-[200px] opacity-100'
                          : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
                          }`}>
                          <p className="text-[#99A1AF] text-sm md:text-[15px] leading-relaxed font-medium">
                            {adv.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-[#282828]">
                <div className="flex flex-col gap-6">
                  <p className="text-[#555] text-[10px] font-black uppercase tracking-[0.3em] leading-tight">
                    TRUSTED BY <span className="text-[#888]">HIGH-VOLUME</span> GROWTH OPERATORS
                  </p>
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-6 opacity-40 transition-all duration-700">
                    {partners.map((p, i) => (
                      <div key={i} className="text-white font-black text-lg tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Row: Enterprise Partner Logos */}
        <div className="pt-12 border-t border-[#282828] relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Label - Fixed */}
            <div className="shrink-0 relative z-10 bg-black md:pr-8">
              <p className="text-[#555] text-[9px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Integrated Networks</p>
            </div>

            {/* Marquee Container - Flexible */}
            <div className="flex-1 w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
              <div className="flex items-center gap-16 animate-scroll w-max">
                {/* Quadrupled list for smooth infinite scroll on large screens */}
                {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
                  <span
                    key={i}
                    className="text-white font-black text-sm md:text-lg tracking-tighter opacity-30 hover:opacity-100 transition-opacity cursor-default select-none"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            {/* Link - Fixed */}
            <div className="hidden lg:block text-right shrink-0 relative z-10 bg-black md:pl-8">
              <a href="/case-studies" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline underline-offset-4 whitespace-nowrap">
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
