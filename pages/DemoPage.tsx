import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VoiceDemo from '../components/VoiceDemo';

const stats = [
    { value: '100%', label: 'Call Answer Rate' },
    { value: '<0.3s', label: 'Response Latency' },
    { value: '7 Days', label: 'To Live Production' },
    { value: '+40%', label: 'Lead Capture Uplift' },
];

const DemoPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen selection:bg-primary selection:text-black">
            <Navbar scrolled={scrolled} />

            <main className="pt-28">
                {/* Hero */}
                <div className="text-center py-16 px-6 relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs font-black tracking-[0.2em] text-primary mb-8 uppercase border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Concierge Demo
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[1.05] mb-6">
                            Hear It For<br />
                            <span className="text-primary italic">Yourself.</span>
                        </h1>

                        <p className="text-[#99A1AF] font-medium max-w-xl mx-auto text-lg leading-relaxed mb-10">
                            Enter your details below. Our Voice AI Concierge will call you within seconds — tailored to your industry, live and real.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4">
                            {['No Credit Card', 'Calls in Seconds', '100% Free Demo'].map((badge, i) => (
                                <span key={i} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#99A1AF]">
                                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="border-y border-[#282828] bg-black/60 backdrop-blur-md py-6 px-6">
                    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((s, i) => (
                            <div key={i}>
                                <div className="text-2xl md:text-3xl font-black text-primary italic tracking-tighter">{s.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#555] mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demo Form */}
                <VoiceDemo />

                {/* Testimonial */}
                <div className="max-w-3xl mx-auto px-6 py-16 text-center">
                    <div className="p-8 md:p-12 bg-white/5 border border-[#282828] rounded-[30px]">
                        <div className="flex justify-center gap-1 mb-6 text-primary">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-lg md:text-xl font-black italic text-white leading-relaxed mb-6">
                            "Noxxera didn't just provide a concierge, they deployed a scalable voice infrastructure that handles our entire inbound pipeline. Our lead capture rate increased by 40% in two months."
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
                                alt="Sarah Jenkins"
                                className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                            />
                            <div className="text-left">
                                <p className="font-black text-white text-sm">SARAH JENKINS</p>
                                <p className="text-[#555] text-xs font-bold uppercase tracking-widest">COO @ Vertex Enterprise</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-[#282828] py-8 px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-xl font-black tracking-tighter text-white">NOXXERA <span className="text-primary">AI</span></span>
                    <a href="/" className="text-[#99A1AF] text-xs hover:text-primary transition-colors font-bold uppercase tracking-widest">
                        ← Back to Main Site
                    </a>
                    <p className="text-[#555] text-xs font-bold">© 2025 Noxxera AI</p>
                </div>
            </footer>
        </div>
    );
};

export default DemoPage;
