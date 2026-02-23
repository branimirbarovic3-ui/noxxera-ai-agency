
import React, { useState, useEffect, useRef } from 'react';

const RevenueCalculator: React.FC = () => {
  // Calculation inputs
  const [callsPerDay, setCallsPerDay] = useState<number>(50);
  const [missedPercentage, setMissedPercentage] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(100);
  const [closingRate, setClosingRate] = useState<number>(20);
  const [daysOpen, setDaysOpen] = useState<number>(22);

  // Display result with animation
  const [displayResult, setDisplayResult] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  // Realistic Calculation: Only a percentage of missed calls would have actually closed
  const potentialLeadsMissed = (callsPerDay * (missedPercentage / 100)) * daysOpen;
  const calculatedLoss = potentialLeadsMissed * (closingRate / 100) * avgOrderValue;

  useEffect(() => {
    const startValue = displayResult;
    const endValue = calculatedLoss;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

    // FOMO-Heavy Structured Analysis based on Best Practices
    const formattedAnalysis = `
🔴 CRITICAL REVENUE LEAK IDENTIFIED FOR: ${email}
==================================================

I. EXECUTIVE SUMMARY: THE "SILENT KILLER"
-----------------------------------------
Your current business infrastructure is failing to capture approximately ${Math.round(potentialLeadsMissed)} high-intent leads every single month. These are prospects who reached out but were met with a busy signal, a voicemail, or no answer.

II. FINANCIAL IMPACT ANALYSIS
-----------------------------
• MONTHLY REVENUE SINKHOLE: ${formatCurrency(displayResult)}
• ANNUAL CAPITAL DRAIN: ${formatCurrency(annualLossValue)}

This is not just "missed business"—this is money you have already spent marketing and operational capital to attract, only to hand it over to your competitors.

III. LEAD QUALIFICATION DATA
----------------------------
• Daily Opportunity Volume: ${callsPerDay} Inbound Calls
• Current Infrastructure Gap: ${missedPercentage}% Missed Call Rate
• Target Conversion Value: ${formatCurrency(avgOrderValue)} per deal
• Closing Performance: ${closingRate}% Conversion Rate

IV. THE COMPETITOR ADVANTAGE
----------------------------
In 2026, a missed call is an immediate referral to your direct competitor. 82% of consumers will call the next business in line if their first attempt is not answered by a live voice within 3 rings.

V. INFRASTRUCTURE RECOVERY PLAN
-------------------------------
Noxxera AI agents deploy a zero-latency response system that eliminates this leak entirely. By implementing our voice AI infrastructure, you recover up to 95% of this "lost" revenue starting from Day 1.

AUDIT GENERATED ON: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
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
      const response = await fetch('https://brano1957.app.n8n.cloud/webhook-test/missed-call-revenue', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Infrastructure error. Please try again.");
      }
    } catch (err) {
      alert("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-48 px-6 relative overflow-hidden" id="calculator">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
            LEAD <span className="text-primary italic">WASTE</span> CALCULATOR
          </h2>
          <p className="text-lg md:text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Quantify the exact amount of revenue you are losing to manual follow-up failures and missed opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Controls Column */}
          <div className="space-y-8 p-10 md:p-12 bg-[#0D0D0D] border border-[#282828] rounded-[40px] shadow-2xl">
            <div className="mb-6">
              <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-2 italic">Step 1: Input Your Metrics</h4>
              <p className="text-xs text-white/40">Our algorithm qualifies your lead quality based on these variables.</p>
            </div>

            {/* Field: Calls Per Day */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Daily Call Volume</label>
                <span className="text-2xl font-black text-primary italic leading-none">{callsPerDay}</span>
              </div>
              <input
                type="range" min="10" max="1000" step="10"
                value={callsPerDay}
                onChange={(e) => setCallsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Field: Missed Percentage */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Unanswered Rate (%)</label>
                <span className="text-2xl font-black text-primary italic leading-none">{missedPercentage}%</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={missedPercentage}
                onChange={(e) => setMissedPercentage(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Field: Closing Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Lead-to-Close Rate (%)</label>
                <span className="text-2xl font-black text-primary italic leading-none">{closingRate}%</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={closingRate}
                onChange={(e) => setClosingRate(Number(e.target.value))}
                className="w-full h-2 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60 block">Avg. Lead Value ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">$</span>
                  <input
                    type="number"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-4 pl-8 rounded-xl font-black focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60 block">Active Days / Mo</label>
                <input
                  type="number"
                  value={daysOpen}
                  onChange={(e) => setDaysOpen(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-4 rounded-xl font-black focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-primary p-12 rounded-[40px] shadow-primary text-black transform hover:-rotate-1 transition-all duration-500 min-h-[480px] flex flex-col justify-center border-b-8 border-black/10">
              {!showForm ? (
                <>
                  <div className="mb-4 inline-flex px-3 py-1 bg-black/10 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Personalized ROI Analysis</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">
                    Your Waste <br />
                    <span className="italic underline underline-offset-8 decoration-4">{formatCurrency(displayResult)}</span>
                  </h3>
                  <p className="text-lg font-bold opacity-80 leading-snug mb-8">
                    Your business is leaking <strong>{formatCurrency(displayResult * 12)}</strong> annually. This is capital your competitors are currently taking from you.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight shadow-2xl hover:bg-black/90"
                  >
                    View Detailed Breakdown
                  </button>
                </>
              ) : !isSubmitted ? (
                <form onSubmit={handleEmailCapture} className="animate-fade-in-up">
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70 text-black">Step 2: Authenticate To Access</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-6 text-black uppercase">
                    RECOVER <span className="italic">{formatCurrency(displayResult * 0.95)}</span>
                  </h3>
                  <p className="text-sm font-bold text-black/60 mb-6 leading-tight">Enter your business email to unlock the full revenue recovery audit and custom 7-day implementation roadmap.</p>
                  <input
                    type="email"
                    required
                    placeholder="name@business.com"
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
                        Generating Report...
                      </>
                    ) : (
                      'Generate Full Audit'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full text-black/60 font-black text-xs uppercase tracking-widest mt-6 hover:text-black transition-colors"
                  >
                    Back to calculation
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-black uppercase mb-4 tracking-tighter">Audit Generated</h3>
                  <p className="text-black font-bold opacity-80 mb-8 leading-snug text-lg">
                    The full ROI analysis and recovery sequence has been deployed to <br /><span className="underline font-black">{email}</span>.
                  </p>
                  <button
                    onClick={() => { setIsSubmitted(false); setShowForm(false); }}
                    className="text-black/60 font-black text-xs uppercase tracking-widest hover:text-black"
                  >
                    Recalculate Data
                  </button>
                </div>
              )}
            </div>

            {/* Best Practice Tags */}
            <div className="flex flex-wrap gap-4 pt-4 px-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
              <div className="text-[8px] font-black uppercase tracking-widest text-white border border-white/20 px-2 py-1 rounded">Instant Value</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white border border-white/20 px-2 py-1 rounded">Lead Waste Qualifier</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white border border-white/20 px-2 py-1 rounded">Verified Algorithm</div>
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
          box-shadow: 0 0 15px rgba(191, 245, 73, 0.4);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #282828;
          border-radius: 10px;
        }
        input[type=range]:focus::-webkit-slider-runnable-track {
          background: #333333;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}} />
    </section>
  );
};

export default RevenueCalculator;
