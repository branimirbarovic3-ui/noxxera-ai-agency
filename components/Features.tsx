
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "INSTANT GUEST RESPONSE",
      description: "Consistent sub-500ms response times. No awkward delays or robotic pauses. Just fluid, natural interaction that maintains your brand's standards during the rush.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "HOSPITALITY-DRIVEN TONE",
      description: "Agents programmed with emotional intelligence to detect guest sentiment, adjusting their cadence to provide an empathetic, premium service experience.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "OPERATIONAL SYNC",
      description: "Seamlessly connected to your POS for direct ordering and your reservation platform for live availability. Turns your phone line into an automated revenue stream.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
              ENGINEERED FOR THE <span className="text-primary italic">PEAK SERVICE RUSH</span>.
            </h2>
            <p className="text-xl text-[#99A1AF] font-medium leading-relaxed">
              When volume spikes, staff focus drops. Our voice assistants handle the phones so your floor team can focus on the guests in the building.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-10 border border-[#282828] bg-[#0A0A0A] hover:border-primary/50 transition-all group">
              <div className="mb-8 p-4 bg-[#1A1A1A] inline-block rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{feature.title}</h3>
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
