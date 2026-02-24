
import React, { useState } from 'react';

const VoiceDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    industry: '',
    function: ''
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    // Simulate deployment/API call
    setTimeout(() => {
      setIsDeploying(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <section id="demo" className="py-48 px-6 border-y border-[#282828] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-primary mb-6 uppercase border border-primary/20">
            Real-time Experience Preview
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase leading-[1.1]">
            LET OUR <span className="text-primary italic">CONCIERGE CALL YOU</span>.
          </h2>
          <p className="text-lg md:text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed">
            Tell us about your business context. Our Voice AI Concierge will instantly call you and simulate a real inquiry.
          </p>
        </div>

        <div className="p-8 md:p-12 bg-[#0D0D0D] border border-[#282828] rounded-[40px] shadow-2xl">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#555] ml-4">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#555] ml-4">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#555] ml-4">Industry</label>
                  <select
                    required
                    className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 rounded-2xl font-bold focus:border-primary outline-none transition-colors appearance-none"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="" disabled>Select Industry</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Legal">Legal</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Automotive">Automotive</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Agencies">Agencies</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#555] ml-4">AI Function</label>
                  <select
                    required
                    className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 rounded-2xl font-bold focus:border-primary outline-none transition-colors appearance-none"
                    value={formData.function}
                    onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                  >
                    <option value="" disabled>What should AI handle?</option>
                    <option value="Appointments">Appointment Booking</option>
                    <option value="Sales">Sales & Inquiries</option>
                    <option value="Support">Customer Support</option>
                    <option value="LeadQual">Lead Qualification</option>
                    <option value="Other">Custom Workflow</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isDeploying}
                  className="w-full bg-primary text-black py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tight shadow-primary btn-liquid flex items-center justify-center gap-3"
                >
                  {isDeploying ? (
                    <>
                      <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                      CONNECTING CONCIERGE...
                    </>
                  ) : (
                    "GET A CALL NOW"
                  )}
                </button>
                <p className="text-center text-[10px] font-bold text-[#555] mt-4 uppercase tracking-widest">
                  Our custom Voice AI Concierge will call you within seconds.
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white uppercase mb-4">Concierge Ready</h3>
              <p className="text-[#99A1AF] font-medium mb-8">Calling {formData.phone} now. Please get ready to speak with our AI.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-primary font-black text-xs uppercase tracking-widest hover:underline"
              >
                Test another configuration
              </button>
            </div>
          )}
        </div>

        <div className="mt-32 text-center">
          <p className="text-[#444] text-[10px] font-black uppercase tracking-[0.4em] mb-4">PRODUCTION-READY VOICE AI INFRASTRUCTURE</p>
          <p className="text-[#99A1AF] text-sm font-medium leading-relaxed italic max-w-2xl mx-auto">
            "This is not a generic demo. This is a personalized real-time AI session configured specifically for your industry's operational logic."
          </p>
        </div>
      </div>
    </section>
  );
};

export default VoiceDemo;
