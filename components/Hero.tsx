
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Premium Trust Label: Centered above main headline */}
        <div className="flex items-center justify-center gap-3 mb-8 opacity-70 hover:opacity-100 transition-all duration-300 cursor-default group">
          {/* Golden Trophy SVG Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFD700" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] transition-transform group-hover:scale-110"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase">
            Official Retell AI Implementation Partner
          </span>
        </div>

        <div className="inline-block px-4 py-1.5 bg-[#282828] rounded-full text-xs font-black tracking-[0.2em] text-primary mb-8 animate-fade-in uppercase border border-white/5">
          ELIMINATE THE BUSY SIGNAL
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-10 text-white">
          EVERY CALL ANSWERED.<br />
          <span className="text-primary italic">EVERY TABLE SECURED.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-[#99A1AF] font-medium leading-relaxed mb-12">
          We implement natural-sounding AI voice agents that handle every inquiry, reservation, and order. Stop losing revenue to missed calls during your busiest shifts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative w-full sm:w-auto overflow-hidden bg-primary text-black px-10 py-5 rounded-full font-black text-xl shadow-primary transition-all duration-300 hover:scale-[1.03] active:scale-95 uppercase tracking-tight">
            <span className="relative z-10">Stop Missing Orders</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button className="w-full sm:w-auto bg-[#1A1A1A] border border-[#282828] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-[#222] hover:border-[#444] transition-all duration-300 uppercase tracking-tight active:scale-95">
            Test the Agent
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
