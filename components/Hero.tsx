
import React from 'react';
import { useScrollReveal, useParallax } from '../hooks/useAnimations';

const Hero: React.FC = () => {
    const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.2 });
    const { ref: bgRef, offset } = useParallax(0.3);

    return (
        <section
            ref={heroRef as React.RefObject<HTMLElement>}
            className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center"
            aria-label="Hero section"
        >
            {/* Background decoration with parallax */}
            <div
                ref={bgRef as React.RefObject<HTMLDivElement>}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
                style={{ transform: `translate(-50%, calc(-50% + ${offset * 0.5}px))` }}
                aria-hidden="true"
            />

            <div className={`max-w-7xl mx-auto relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>

                <div className={`inline-block px-4 py-1.5 bg-[#282828] rounded-full text-xs font-black tracking-[0.2em] text-primary mb-8 uppercase border border-white/5 ${isVisible ? 'animate-fade-in delay-100' : 'opacity-0'
                    }`}>
                    ELIMINATE THE BUSY SIGNAL
                </div>

                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter mb-8 md:mb-10 text-white ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
                    }`}>
                    EVERY CALL ANSWERED.<br />
                    <span className="text-primary italic">EVERY OPPORTUNITY CAPTURED.</span>
                </h1>

                <p className={`max-w-2xl mx-auto text-lg md:text-xl text-[#99A1AF] font-medium leading-relaxed mb-12 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'
                    }`}>
                    Deploy scalable Concierge voice infrastructure that handles inbound inquiries, outbound lead qualification, and appointment booking with human-level intelligence.
                </p>

                <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'
                    }`}>
                    <a
                        href="/#demo"
                        className="cursor-pointer group relative w-full sm:w-auto overflow-hidden bg-primary text-black px-10 py-5 rounded-full font-black text-lg shadow-primary transition-all duration-300 hover:scale-[1.03] active:scale-95 uppercase tracking-tight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black inline-block text-center btn-liquid pulse-primary"
                        aria-label="Access Concierge Infrastructure"
                    >
                        <span className="relative z-10">Access Infrastructure</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true" />
                    </a>

                    <a
                        href="https://cal.com/branimir-barovic-qc6qgo/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer w-full sm:w-auto bg-[#1A1A1A] border border-[#282828] text-white px-10 py-5 rounded-full font-black text-lg hover:bg-[#222] hover:border-[#444] transition-all duration-200 uppercase tracking-tight active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center"
                        aria-label="Book a Strategy Call"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
