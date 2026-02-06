
import React from 'react';

const SocialProof: React.FC = () => {
  const logos = [
    "DINE", "GRILL", "PLATE", "SERVICE", "LOCAL", "ORDER"
  ];

  return (
    <section id="proof" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-xs font-black tracking-[0.4em] text-[#99A1AF] uppercase">Trusted by high-volume operators</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
        {logos.map((logo, i) => (
          <span key={i} className="text-3xl font-black tracking-tighter text-white">
            {logo}
          </span>
        ))}
      </div>

      <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-12 bg-primary rounded-[40px] text-black">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-3xl font-black italic tracking-tight mb-8 leading-tight">
            "Noxxera didn't just give us a bot—they gave us a host that never gets tired and never misses a call. Our weekend reservation volume is up 42%."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black/20 rounded-full"></div>
            <div>
              <p className="font-black text-lg">SARAH JENKINS</p>
              <p className="font-bold text-sm uppercase opacity-70 tracking-widest">Director @ Vertex Hospitality</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
            REAL IMPACT. <br />
            <span className="text-primary italic">VISIBLE RESULTS.</span>
          </h3>
          <div className="space-y-8">
            <div className="flex items-baseline gap-4 border-b border-[#282828] pb-6">
              <span className="text-5xl font-black text-primary italic">98%</span>
              <span className="text-lg font-bold text-[#99A1AF] uppercase tracking-widest">Guest Satisfaction</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-[#282828] pb-6">
              <span className="text-5xl font-black text-primary italic">Sub-0.5s</span>
              <span className="text-lg font-bold text-[#99A1AF] uppercase tracking-widest">Voice Response Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
