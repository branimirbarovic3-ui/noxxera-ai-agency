
import React from 'react';

const SocialProof: React.FC = () => {
    const logos = [
        "VERTEX", "AERIS", "PRISM", "STRATUM", "VELOCITY", "CORE"
    ];

    return (
        <section id="proof" className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <p className="text-xs font-black tracking-[0.4em] text-[#99A1AF] uppercase">Trusted by Growth-Focused Operators</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                {logos.map((logo, i) => (
                    <span key={i} className="text-3xl font-black tracking-tighter text-white">
                        {logo}
                    </span>
                ))}
            </div>

            <div className="mt-56 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-6 md:p-12 bg-white/5 backdrop-blur-md border border-[#282828] rounded-[30px] md:rounded-[40px] text-white hover:border-primary/50 transition-colors duration-500">
                    <div className="flex gap-1 mb-4 md:mb-6 text-primary">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-lg md:text-2xl font-black italic tracking-tight mb-6 md:mb-8 leading-relaxed">
                        "Noxxera didn't just provide an AI tool; they deployed a scalable voice infrastructure that handles our entire inbound pipeline. Our lead capture rate increased by 40% in two months."
                    </p>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
                            alt="Sarah Jenkins"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                            <p className="font-black text-lg">SARAH JENKINS</p>
                            <p className="font-bold text-sm uppercase opacity-70 tracking-widest">COO @ Vertex Enterprise</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase mb-10 leading-[1.1]">
                        REAL IMPACT. <br />
                        <span className="text-primary italic font-black">VISIBLE RESULTS.</span>
                    </h3>
                    <div className="space-y-10">
                        <div className="flex items-center gap-5 border-b border-[#282828] pb-10 group transition-all duration-300">
                            <span className="text-5xl md:text-7xl font-black text-primary italic leading-none shrink-0 group-hover:scale-105 transition-transform tracking-tighter">100%</span>
                            <span className="text-[9px] md:text-[11px] font-black text-[#444] group-hover:text-[#99A1AF] uppercase tracking-[0.4em] leading-normal transition-colors">
                                CALL<br />ANSWER RATE
                            </span>
                        </div>
                        <div className="flex items-center gap-5 border-b border-[#282828] pb-10 group transition-all duration-300">
                            <span className="text-5xl md:text-7xl font-black text-primary italic leading-none shrink-0 group-hover:scale-105 transition-transform tracking-tighter">0.3s</span>
                            <span className="text-[9px] md:text-[11px] font-black text-[#444] group-hover:text-[#99A1AF] uppercase tracking-[0.4em] leading-normal transition-colors">
                                LATENCY<br />THRESHOLD
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
