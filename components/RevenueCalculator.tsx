
import React, { useState, useEffect, useRef } from 'react';

const RevenueCalculator: React.FC = () => {
  // Inputs: daily calls, missed %, avg deal value
  const [dailyCalls, setDailyCalls] = useState<number>(50);
  const [missedPercentage, setMissedPercentage] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(250);
  const [daysOpen, setDaysOpen] = useState<number>(20);

  // States
  const [monthlyLoss, setMonthlyLoss] = useState<number>(0);
  const [annualLoss, setAnnualLoss] = useState<number>(0);
  const [dailyLoss, setDailyLoss] = useState<number>(0);
  const [showAudit, setShowAudit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Calculations
  const calculatedMonthly = dailyCalls * (missedPercentage / 100) * avgOrderValue * daysOpen;
  const calculatedAnnual = calculatedMonthly * 12;
  const calculatedDaily = calculatedMonthly / daysOpen;

  useEffect(() => {
    // Smooth transition for numbers
    setMonthlyLoss(calculatedMonthly);
    setAnnualLoss(calculatedAnnual);
    setDailyLoss(calculatedDaily);
  }, [calculatedMonthly, calculatedAnnual, calculatedDaily]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAuditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email,
      metrics: {
        dailyLoss: formatCurrency(dailyLoss),
        monthlyLoss: formatCurrency(monthlyLoss),
        annualLoss: formatCurrency(annualLoss)
      },
      infrastructure: {
        volume: dailyCalls,
        leakage: `${missedPercentage}%`,
        dealValue: formatCurrency(avgOrderValue)
      },
      timestamp: new Date().toISOString(),
      type: "Enterprise Revenue Audit"
    };

    try {
      await fetch('https://brano1957.app.n8n.cloud/webhook/missed-call-revenue', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Audit submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-black text-white" id="diagnostic">
      <div className="max-w-6xl mx-auto">
        {/* Header: McKinsey Style */}
        <div className="mb-20 border-l border-primary pl-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">Diagnostic Tool</h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Revenue Infrastructure <br /> <span className="text-white/40 italic">Audit</span>
          </h1>
          <p className="mt-6 text-[#9CA3AF] max-w-xl font-medium text-lg leading-relaxed">
            Quantifying operational attrition through inbound demand leakage. Infrastructure either captures demand — or leaks it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Inputs: Left Side */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {/* Daily Calls */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Inbound Daily Volume</label>
                  <span className="text-2xl font-black text-white">{dailyCalls} calls</span>
                </div>
                <input type="range" min="10" max="500" step="5" value={dailyCalls} onChange={(e) => setDailyCalls(Number(e.target.value))} className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-primary" />
              </div>

              {/* Missed % */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Infrastructure Gap (Missed %)</label>
                  <span className="text-2xl font-black text-white">{missedPercentage}%</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={missedPercentage} onChange={(e) => setMissedPercentage(Number(e.target.value))} className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-primary" />
              </div>

              {/* Avg Deal Value */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Average Contract Value</label>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20">$</span>
                    <input type="number" value={avgOrderValue} onChange={(e) => setAvgOrderValue(Number(e.target.value))} className="bg-transparent text-right font-black text-2xl focus:outline-none w-32 border-b border-white/10 pb-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 opacity-20 text-[9px] uppercase tracking-[0.4em] font-medium border-t border-white/5">
              Protocol: Zero Missed Opportunity Framework
            </div>
          </div>

          {/* Results: Right Side */}
          <div className="lg:col-span-7">
            {!showAudit ? (
              <div className="bg-[#0A0A0A] border border-white/5 p-12 rounded-sm shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" /></svg>
                </div>

                <h3 className="text-xs uppercase tracking-[0.4em] font-black text-primary mb-12">Analysis Summary</h3>

                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-2">Monthly Leakage</p>
                      <p className="text-4xl font-black">{formatCurrency(monthlyLoss)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-2">Annual Projected Loss</p>
                      <p className="text-4xl font-black text-white/60">{formatCurrency(annualLoss)}</p>
                    </div>
                  </div>

                  <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
                    <p className="text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">Immediate Urgency</p>
                    <p className="text-xl font-medium">Based on your volume, you are losing approximately <span className="text-primary font-black underline underline-offset-4">{formatCurrency(dailyLoss)} per day.</span></p>
                  </div>

                  <button
                    onClick={() => setShowAudit(true)}
                    className="w-full bg-white text-black py-6 font-black text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300"
                  >
                    Generate Implementation Audit
                  </button>
                </div>
              </div>
            ) : !isSubmitted ? (
              <form onSubmit={handleAuditRequest} className="bg-[#0A0A0A] border border-white/5 p-12 rounded-sm animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Access Full Infrastructure Audit</h3>
                <p className="text-[#9CA3AF] text-sm mb-8 leading-relaxed">Enter your professional email to receive the Zero Missed Opportunity Framework and the 24/7 Capture Layer implementation roadmap.</p>

                <div className="space-y-6">
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-5 font-bold focus:border-primary outline-none transition-all uppercase text-xs tracking-widest"
                  />

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black py-6 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    {isSubmitting ? 'Authenticating Protocol...' : 'Finalize Audit'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#0A0A0A] border border-white/5 p-12 rounded-sm text-center py-20 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <div className="w-2 h-2 bg-primary animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Audit Sent to Cloud</h3>
                <p className="text-[#9CA3AF] text-sm mb-12 max-w-xs mx-auto">Your infrastructure gap analysis is being dispatched to {email}. Revenue Leakage Doesn’t Pause.</p>

                <div className="pt-10 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Final Step Required</p>
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tight italic">“Revenue Leakage Doesn’t Pause.”</h4>
                  <p className="text-xs text-[#9CA3AF] mb-8 uppercase tracking-widest font-bold">Infrastructure either captures demand — or leaks it.</p>

                  <a
                    href="[CALENDLY_LINK]"
                    target="_blank"
                    className="inline-block bg-white text-black px-12 py-6 font-black text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all"
                  >
                    Schedule Implementation Review
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculator;
