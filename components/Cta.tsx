
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';

const Cta: React.FC = () => {
  const { ref: ctaRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={ctaRef as React.RefObject<HTMLElement>}
      className="py-32 md:py-48 px-5 md:px-6 bg-black relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative gradient */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <h2
          id="cta-heading"
          className={`text-3xl md:text-[6rem] font-black text-white tracking-tighter leading-[1.1] mb-8 md:mb-12 uppercase ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
        >
          READY TO ELIMINATE<br />
          <span className="text-primary italic">MISSED CALLS?</span>
        </h2>

        <p className={`text-lg md:text-xl text-[#99A1AF] font-medium mb-10 md:mb-16 max-w-xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
          Deploy AI Voice infrastructure built to scale with your business. Capture every opportunity without increasing overhead.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 w-full ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}>
          <a
            href="https://cal.com/branimir-barovic-qc6qgo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer group relative w-full sm:w-auto bg-primary text-black px-10 md:px-14 py-5 md:py-7 rounded-full font-black text-xl md:text-3xl shadow-primary hover:scale-[1.05] active:scale-95 transition-all duration-300 uppercase tracking-tighter focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black inline-block text-center"
            aria-label="Schedule a strategy call with Noxxera AI"
          >
            Schedule a Strategy Call
          </a>

          <Link
            to="/case-studies"
            className="cursor-pointer w-full sm:w-auto text-white hover:text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-200 py-3 px-6 flex items-center justify-center gap-2 group focus:outline-none focus:text-primary focus:underline underline-offset-4"
            aria-label="Review success stories"
          >
            Review Success Stories
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className={`mt-16 md:mt-20 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[#99A1AF] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'
          }`}>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            Peak-Volume Ready
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            100% Call Answer Rate
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            Venture-Grade Infra
          </span>
        </div>
      </div>
    </section>
  );
};

export default Cta;
