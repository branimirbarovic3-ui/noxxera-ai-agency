
import React from 'react';
import { useScrollReveal } from '../hooks/useAnimations';

const Features: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

  const features = [
    {
      title: "LATENCY-OPTIMIZED ENGINE",
      description: "Consistent sub-500ms response times. No awkward delays or robotic pauses. Just fluid, natural interaction that maintains human-level standards across all enterprise workflows.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "ENTERPRISE ADAPTABILITY",
      description: "Agents programmed with domain-specific logic. Our infrastructure adapts to any industry, from patient intake in healthcare to lead qualification for high-ticket agencies.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "SCALABLE INFRASTRUCTURE",
      description: "Seamlessly connected to your CRM and business systems via robust API integrations. Handles hundreds of concurrent calls without performance degradation.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-48 px-6 relative"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-12 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="max-w-2xl">
            <h2
              id="features-heading"
              className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase leading-[1.2]"
            >
              ENGINEERED FOR <span className="text-primary italic">PEAK DEMAND</span>.
            </h2>
            <p className="text-lg md:text-xl text-[#99A1AF] font-medium leading-relaxed">
              When call volume spikes, your efficiency shouldn't drop. Our voice infrastructure handles the surges so your team can focus on complex operations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`p-10 border border-[#282828] bg-white/5 backdrop-blur-md hover:border-primary/50 transition-all duration-300 group cursor-default ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="mb-8 p-4 bg-white/10 inline-block rounded-2xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">{feature.title}</h3>
              <p className="text-[#99A1AF] leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
