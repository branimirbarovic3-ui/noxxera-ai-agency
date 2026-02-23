
import React, { useState, useEffect, useRef } from 'react';

const RevenueCalculator: React.FC = () => {
  // Calculation inputs with realistic defaults
  const [callsPerDay, setCallsPerDay] = useState<number>(50);
  const [missedPercentage, setMissedPercentage] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(100);
  const [closingRate, setClosingRate] = useState<number>(20);
  const [daysOpen, setDaysOpen] = useState<number>(22);

  // Display result with animation
  const [displayResult, setDisplayResult] = useState<number>(0);
  const [chartPercent, setChartPercent] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  // Realistic Calculation
  const totalPotentialRevenue = callsPerDay * daysOpen * (closingRate / 100) * avgOrderValue;
  const potentialLeadsMissed = (callsPerDay * (missedPercentage / 100)) * daysOpen;
  const calculatedLoss = potentialLeadsMissed * (closingRate / 100) * avgOrderValue;

  // Percentage of total revenue being lost
  const lossRatio = totalPotentialRevenue > 0 ? (calculatedLoss / totalPotentialRevenue) * 100 : 0;

  useEffect(() => {
    const startValue = displayResult;
    const endValue = calculatedLoss;
    const startPercent = chartPercent;
    const endPercent = lossRatio;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const currentVal = startValue + (endValue - startValue) * easeOutExpo(progress);
      const currentPerc = startPercent + (endPercent - startPercent) * easeOutExpo(progress);

      setDisplayResult(currentVal);
      setChartPercent(currentPerc);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [calculatedLoss, lossRatio]);

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
    const dailyLossValue = displayResult / daysOpen;

    const formattedAnalysis = `
🔴 REVENUE INFRASTRUCTURE AUDIT FOR: ${email}
==================================================

I. FINANCIAL IMPACT SUMMARY
-----------------------------
• DAILY REVENUE LEAK: ${formatCurrency(dailyLossValue)}
• MONTHLY REVENUE SINKHOLE: ${formatCurrency(displayResult)}
• ANNUAL PROJECTED LOSS: ${formatCurrency(annualLossValue)}

II. OPERATIONAL GAP ANALYSIS
----------------------------
• Daily Opportunity Volume: ${callsPerDay} Inbound Calls
• Infrastructure Gap: ${missedPercentage}% Unanswered Rate
• Deal Closing Performance: ${closingRate}%

The "Silent Killer": Your infrastructure is failed to capture ${Math.round(potentialLeadsMissed)} leads/mo.
Infrastructure either captures demand — or leaks it.
    `.trim();

    const payload = {
      email,
      monthlyLoss: displayResult,
      annualLoss: annualLossValue,
      dailyLoss: dailyLossValue,
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
      if (response.ok) setIsSubmitted(true);
    } catch (err) {
      alert("Error submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-48 px-6 relative overflow-hidden" id="calculator">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
            REVENUE <span className="text-primary italic">LEAK</span> ANALYZER
          </h2>
          <p className="text-lg text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed">
            Revenue leakage doesn't pause. Infrastructure either captures demand — or leaks it. Quantify your gap below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Controls Column */}
          <div className="space-y-8 p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] flex flex-col justify-between">
            <div className="space-y-8">
              {/* Field: Calls Per Day */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Daily Inbound Volume</label>
                  <span className="text-xl font-black text-primary italic">{callsPerDay}</span>
                </div>
                <input type="range" min="10" max="1000" step="10" value={callsPerDay} onChange={(e) => setDailyCalls(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" />
              </div>

              {/* Field: Missed Percentage */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Infrastructure Gap ({missedPercentage}%)</label>
                  <span className="text-xl font-black text-red-500 italic">LEAKING</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={missedPercentage} onChange={(e) => setMissedPercentage(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500" />
              </div>

              {/* Field: Closing Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Lead-to-Close Rate (%)</label>
                  <span className="text-xl font-black text-white italic">{closingRate}%</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={closingRate} onChange={(e) => setClosingRate(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Avg. Deal Value</label>
                  <input type="number" value={avgOrderValue} onChange={(e) => setAvgOrderValue(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Working Days</label>
                  <input type="number" value={daysOpen} onChange={(e) => setDaysOpen(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black focus:border-primary outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">AI Revenue Infrastructure Diagnostic v2.4</p>
            </div>
          </div>

          {/* Result Column with Chart */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-primary p-12 rounded-[40px] text-black h-full flex flex-col justify-between relative overflow-hidden group">
              {!showForm ? (
                <>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-12 relative">
                      <svg className="w-48 h-48 transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-black/10" />
                        <circle cx="96" cy="96" r="88" stroke="black" strokeWidth="12" fill="transparent"
                          strokeDasharray={552.92}
                          strokeDashoffset={552.92 - (552.92 * chartPercent) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-black">{Math.round(chartPercent)}%</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Leakage</span>
                      </div>
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Monthly Revenue Leakage</p>
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic text-black">
                      {formatCurrency(displayResult)}
                    </h3>
                    <p className="text-xl font-bold opacity-80 leading-tight mb-8">
                      You are losing <strong>{formatCurrency(displayResult / daysOpen)} per day.</strong> Infrastructure either captures demand — or leaks it.
                    </p>
                  </div>

                  <button onClick={() => setShowForm(true)} className="w-full bg-black text-white py-6 rounded-[24px] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight shadow-2xl relative z-10">
                    Schedule Implementation Review
                  </button>
                </>
              ) : !isSubmitted ? (
                <form onSubmit={handleEmailCapture} className="relative z-10 flex flex-col h-full justify-center">
                  <h3 className="text-4xl font-black tracking-tighter leading-none mb-6">
                    WHERE SHOULD WE SEND THE <span className="italic text-black">REVENUE AUDIT?</span>
                  </h3>
                  <p className="text-lg font-bold mb-8 opacity-70">Access the Zero Missed Opportunity Framework. Revenue leakage doesn't pause.</p>

                  <input type="email" required placeholder="Work Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/10 border-2 border-black/20 text-black p-6 rounded-[24px] font-bold mb-6 placeholder:text-black/40 focus:border-black outline-none transition-all" />

                  <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-6 rounded-[24px] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight disabled:opacity-50 flex items-center justify-center gap-3">
                    {isSubmitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</> : 'Generate Audit'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="mt-6 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Back to diagnostic</button>
                </form>
              ) : (
                <div className="text-center py-12 relative z-10">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Audit Dispatched</h3>
                  <p className="text-xl font-bold opacity-80 mb-12">Analysis is being sent to <br /><span className="underline font-black">{email}</span>.</p>

                  <div className="pt-8 border-t border-black/10">
                    <h4 className="text-2xl font-black mb-4 uppercase italic">"Infrastructure either captures demand — or leaks it."</h4>
                    <a href="#" className="inline-block bg-black text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                      Talk to Infrastructure Architect
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculator;
