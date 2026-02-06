
import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-5 md:px-6 bg-black relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-[2.75rem] md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 md:mb-12 uppercase">
          READY TO CAPTURE<br />
          <span className="text-primary italic">EVERY CALL?</span>
        </h2>
        
        <p className="text-lg md:text-2xl text-[#99A1AF] font-medium mb-10 md:mb-16 max-w-xl mx-auto leading-relaxed">
          Scale your operation's capacity without increasing overhead. Let Noxxera AI manage your phone lines so you can manage your restaurant.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <button className="group relative w-full sm:w-auto bg-primary text-black px-10 md:px-14 py-5 md:py-7 rounded-full font-black text-xl md:text-3xl shadow-primary hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-tighter">
            Schedule a Strategy Call
          </button>
          
          <button className="w-full sm:w-auto text-white hover:text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300 py-3 px-6 flex items-center justify-center gap-2 group">
            Review Profit Case Studies
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="mt-16 md:mt-20 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[#99A1AF] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Peak-Hour Tested</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> 100% Response Rate</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Enterprise Support</span>
        </div>
      </div>
    </section>
  );
};

export default Cta;
