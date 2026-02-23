
import React, { useState, useEffect, useRef } from 'react';

const RevenueCalculator: React.FC = () => {
  // Calculation inputs with realistic defaults
  const [callsPerDay, setCallsPerDay] = useState<number>(50);
  const [missedPercentage, setMissedPercentage] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(45);
  const [closingRate, setClosingRate] = useState<number>(20);
  const [daysOpen, setDaysOpen] = useState<number>(30);

  // Display result with animation
  const [displayResult, setDisplayResult] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  // Use closing rate in the calculation
  const potentialLeadsMissed = (callsPerDay * (missedPercentage / 100)) * daysOpen;
  const calculatedLoss = potentialLeadsMissed * (closingRate / 100) * avgOrderValue;

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

  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const annualLossValue = displayResult * 12;

    const formattedAnalysis = `
🔴 CRITICAL REVENUE LEAK IDENTIFIED FOR: ${email}
==================================================

I. EXECUTIVE SUMMARY: THE "SILENT KILLER"
-----------------------------------------
Your current business infrastructure is failing to capture approximately ${Math.round(potentialLeadsMissed)} high-intent leads every single month.

II. FINANCIAL IMPACT ANALYSIS
-----------------------------
• MONTHLY REVENUE SINKHOLE: ${formatCurrency(displayResult)}
• ANNUAL CAPITAL DRAIN: ${formatCurrency(annualLossValue)}

III. DATA BREAKDOWN:
• Daily Calls: ${callsPerDay}
• Missed Rate: ${missedPercentage}%
• Closing Rate: ${closingRate}%
• Deal Value: ${formatCurrency(avgOrderValue)}

IV. SOLUTION: 
Noxxera AI agents deploy a zero-latency response system that eliminates this leak entirely.
    `.trim();

    const payload = {
      email,
      monthlyLoss: displayResult,
      annualLoss: annualLossValue,
      leadsMissed: Math.round(potentialLeadsMissed),
      closingRate: closingRate,
      formattedAnalysis: formattedAnalysis,
      calculationData: {
        dailyCalls: callsPerDay,
        missedRate: missedPercentage,
        avgLeadValue: avgOrderValue,
        operatingDays: daysOpen
      },
      auditTime: new Date().toISOString()
    };

    try {
      const response = await fetch('https://brano1957.app.n8n.cloud/webhook/missed-call-revenue', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Webhook failed:", response.statusText);
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Webhook error:", err);
      alert("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-48 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase leading-[1.2]">
            HOW MUCH REVENUE IS YOUR <span className="text-primary italic">MISSED CALL VOLUME COSTING?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed">
            High-volume businesses miss 20–40% of inbound calls during peak demand. Missed calls = lost revenue. Calculate your potential recovery below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Controls Column */}
          <div className="space-y-10 p-8 md:p-12 bg-white/5 backdrop-blur-md border border-[#282828] rounded-[40px]">
            {/* Field: Calls Per Day */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-black uppercase tracking-widest text-white">Daily Call Volume</label>
                <span className="text-2xl font-black text-primary italic">{callsPerDay}</span>
              </div>
              <input
                type="range" min="10" max="1000" step="10"
                value={callsPerDay}
                onChange={(e) => setCallsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Total inbound inquiries, leads, and support requests</p>
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
              <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Average missed call rate across high-demand periods</p>
            </div>

            {/* Field: Closing Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-black uppercase tracking-widest text-white">Lead-to-Close Rate (%)</label>
                <span className="text-2xl font-black text-primary italic">{closingRate}%</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={closingRate}
                onChange={(e) => setClosingRate(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Percentage of leads that become paying customers</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Field: Avg Order Value */}
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-white block">Average Lead Value ($)</label>
                <input
                  type="number"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-4 rounded-xl font-black focus:border-primary outline-none"
                />
                <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Estimated revenue per successful call</p>
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
                <p className="text-xs font-bold text-[#555] uppercase tracking-wider">Number of active business days per month</p>
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-primary p-12 rounded-[40px] shadow-primary text-black transform hover:-rotate-1 transition-transform min-h-[450px] flex flex-col justify-center">
              {!showForm ? (
                <>
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Estimated Monthly Revenue Gap</p>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                    YOU ARE MISSING <br />
                    <span className="italic underline underline-offset-8 decoration-4">{formatCurrency(displayResult)}</span>
                  </h3>
                  <p className="text-lg font-bold opacity-80 leading-snug mb-8">
                    Every missed call is a missed opportunity. This represents {formatCurrency(displayResult * 12)} in annual revenue lost to operational bottlenecks.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight"
                  >
                    Get My Recovery Plan
                  </button>
                </>
              ) : !isSubmitted ? (
                <form onSubmit={handleEmailCapture} className="animate-fade-in-up">
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70 text-black">Final Step</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-6 text-black">
                    WHERE SHOULD WE SEND YOUR <span className="italic">ANALYSIS?</span>
                  </h3>
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/10 border-2 border-black/20 text-black p-5 rounded-2xl font-bold mb-6 placeholder:text-black/40 focus:border-black outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Send Recovery Plan'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full text-black/60 font-black text-xs uppercase tracking-widest mt-4 hover:text-black transition-colors"
                  >
                    Back to calculation
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-black uppercase mb-4 tracking-tighter">Analysis Sent</h3>
                  <p className="text-black font-bold opacity-80 mb-8 leading-snug">Check your inbox. We've sent a detailed breakdown of your {formatCurrency(displayResult)} recovery plan.</p>
                  <button
                    onClick={() => { setIsSubmitted(false); setShowForm(false); }}
                    className="text-black/60 font-black text-xs uppercase tracking-widest hover:text-black"
                  >
                    Back to calculator
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 border border-[#282828] rounded-[40px] bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[#99A1AF] font-medium italic">
                  "Modern prospects expect immediate responses. If they hit a busy signal, they move to the next competitor. Our AI ensures that never happens."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
