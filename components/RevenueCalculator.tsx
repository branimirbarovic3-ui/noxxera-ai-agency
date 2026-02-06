
import React, { useState, useEffect, useRef } from 'react';

const RevenueCalculator: React.FC = () => {
  // Calculation inputs with realistic defaults
  const [callsPerDay, setCallsPerDay] = useState<number>(50);
  const [missedPercentage, setMissedPercentage] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(45);
  const [daysOpen, setDaysOpen] = useState<number>(30);
  
  // Display result with animation
  const [displayResult, setDisplayResult] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  const calculatedLoss = callsPerDay * (missedPercentage / 100) * avgOrderValue * daysOpen;

  useEffect(() => {
    // Simple count-up/down animation
    const startValue = displayResult;
    const endValue = calculatedLoss;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuad = (t: number) => t * (2 - t);
      const current = startValue + (endValue - startValue) * easeOutQuad(progress);
      
      setDisplayResult(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [calculatedLoss]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleEmailCapture = () => {
    alert("In a production app, this would open a lead capture form for a detailed profit recovery analysis.");
  };

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            HOW MUCH REVENUE IS YOUR <span className="text-primary italic">BUSY SIGNAL COSTING?</span>
          </h2>
          <p className="text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto">
            Peak hours drive your profits, but they are also when calls are most likely to go unanswered. Calculate your potential revenue recovery below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Controls Column */}
          <div className="space-y-10 p-8 md:p-12 bg-[#0A0A0A] border border-[#282828] rounded-[40px]">
            {/* Field: Calls Per Day */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-black uppercase tracking-widest text-white">Daily Call Volume</label>
                <span className="text-2xl font-black text-primary italic">{callsPerDay}</span>
              </div>
              <input 
                type="range" min="10" max="250" step="5"
                value={callsPerDay}
                onChange={(e) => setCallsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Estimated inbound inquiries for orders or bookings</p>
            </div>

            {/* Field: Missed Percentage */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-black uppercase tracking-widest text-white">Unanswered Call Rate</label>
                <span className="text-2xl font-black text-primary italic">{missedPercentage}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="1"
                value={missedPercentage}
                onChange={(e) => setMissedPercentage(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Busy restaurants can miss 20-30% of calls during rush</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Field: Avg Order Value */}
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-white block">Average Ticket ($)</label>
                <input 
                  type="number"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-4 rounded-xl font-black focus:border-primary outline-none"
                />
                <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Mean order or reservation value</p>
              </div>

              {/* Field: Days Open */}
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-white block">Monthly Operating Days</label>
                <input 
                  type="number"
                  value={daysOpen}
                  onChange={(e) => setDaysOpen(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-4 rounded-xl font-black focus:border-primary outline-none"
                />
                <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Monthly service days</p>
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-primary p-12 rounded-[40px] shadow-primary text-black transform hover:-rotate-1 transition-transform">
              <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Estimated Monthly Revenue Gap</p>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                YOU ARE MISSING <br />
                <span className="italic underline underline-offset-8 decoration-4">{formatCurrency(displayResult)}</span>
              </h3>
              <p className="text-lg font-bold opacity-80 leading-snug mb-8">
                Every missed call is a missed opportunity. This represents {formatCurrency(displayResult * 12)} in annual revenue lost to busy signals.
              </p>
              <button 
                onClick={handleEmailCapture}
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight"
              >
                Get My Recovery Plan
              </button>
            </div>

            <div className="p-8 border border-[#282828] rounded-[40px] bg-[#0A0A0A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[#99A1AF] font-medium italic">
                  "Modern guests expect immediate confirmation. If they hit a voicemail, they often call the next venue on the list."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          cursor: pointer;
          margin-top: -8px; 
          box-shadow: 0 0 10px rgba(191, 245, 73, 0.5);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #282828;
          border-radius: 4px;
        }
        input[type=range]:focus::-webkit-slider-runnable-track {
          background: #333333;
        }
      `}} />
    </section>
  );
};

export default RevenueCalculator;
