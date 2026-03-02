import React, { useState, useEffect } from 'react';
import VoiceDemo from '../components/VoiceDemo';
import SocialProof from '../components/SocialProof';
import Industries from '../components/Industries';
import { motion } from 'framer-motion';

const AdsLandingPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black selection:bg-primary selection:text-black font-sans antialiased overflow-x-hidden">
            {/* Header - Simplified for Conversion */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="text-2xl font-black tracking-tighter text-white">
                        NOXXERA <span className="text-primary italic">AI</span>
                    </a>
                    <a
                        href="https://cal.com/branimir-barovic-qc6qgo/noxxera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-black px-6 py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-primary"
                    >
                        Get Started
                    </a>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-40 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto relative z-10"
                    >
                        <div className="inline-block px-4 py-1.5 bg-[#282828] rounded-full text-[10px] font-black tracking-[0.25em] text-primary mb-8 uppercase border border-white/5 shadow-2xl">
                            24/7 AI CONCIERGE INFRASTRUCTURE
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95] mb-8">
                            NEVER MISS A <br />
                            <span className="text-primary italic">LEAD AGAIN.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                            Stop losing high-value appointments to voicemail. Deploy a Voice AI Concierge that answers, qualifies, and books every inquiry — with zero latency.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="#demo"
                                className="bg-primary text-black px-10 py-5 rounded-full font-black text-lg hover:scale-[1.03] active:scale-95 transition-all shadow-primary uppercase tracking-tight btn-liquid"
                            >
                                Try the Demo Now
                            </a>
                        </div>

                        <div className="mt-16 flex items-center justify-center gap-8 opacity-50 grayscale contrast-125">
                            <span className="text-white font-black text-xl italic tracking-tighter">FORBES</span>
                            <span className="text-white font-black text-xl italic tracking-tighter">TECHCRUNCH</span>
                            <span className="text-white font-black text-xl italic tracking-tighter">BLOOMBERG</span>
                        </div>
                    </motion.div>
                </section>

                {/* Social Proof */}
                <div className="bg-[#050505] py-24 border-y border-white/5">
                    <SocialProof />
                </div>

                {/* Demo Anchor */}
                <section id="demo" className="scroll-mt-24">
                    <VoiceDemo />
                </section>

                {/* How it Works / The Benefit */}
                <section className="py-32 px-6 bg-[#080808] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                                HUMAN INTELLIGENCE.<br />
                                <span className="text-primary italic">MACHINE SCALE.</span>
                            </h2>
                            <p className="text-[#99A1AF] text-lg font-medium leading-relaxed">
                                Our Voice AI isn't just a chatbot. It's a high-cadence concierge that understands context, handles objections, and takes action in your CRM.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { title: 'Sub-300ms Latency', desc: 'No awkward pauses. The concierge and customer talk in real-time.' },
                                    { title: 'End-to-End CRM Sync', desc: 'Automatically bookings and qualified leads go straight to your GoHighLevel or Pipedrive.' },
                                    { title: 'Scalable to Infinity', desc: 'Handle 1,000 calls simultaneously. Never have a busy line again.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black uppercase text-lg leading-tight">{item.title}</h3>
                                            <p className="text-[#555] font-medium text-sm leading-snug">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 relative group grow-0">
                            <div className="absolute inset-0 bg-primary/20 rounded-[40px] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative bg-[#111] border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary rounded-full animate-pulse" />
                                        <div className="h-4 w-48 bg-[#222] rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-2/3 animate-[loading_2s_infinite]" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 opacity-50">
                                        <div className="h-3 w-full bg-[#222] rounded-full" />
                                        <div className="h-3 w-5/6 bg-[#222] rounded-full" />
                                        <div className="h-3 w-4/6 bg-[#222] rounded-full" />
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-black text-[#444] uppercase tracking-widest">
                                        <span>Concierge Logic Running...</span>
                                        <span className="text-primary italic">Live Session</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Industries />

                {/* Final CTA */}
                <section className="py-48 px-6 text-center bg-black relative">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 italic">
                            READY TO CAPTURE <br />
                            <span className="text-primary">EVERY REVENUE STREAM?</span>
                        </h2>
                        <a
                            href="https://cal.com/branimir-barovic-qc6qgo/noxxera"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-black px-12 py-6 rounded-full font-black text-xl hover:scale-[1.05] active:scale-95 transition-all shadow-primary uppercase tracking-tight btn-liquid"
                        >
                            Book Your Strategy Call
                        </a>
                        <p className="mt-8 text-[#555] font-bold uppercase tracking-widest text-[10px]">
                            Limited availability for Enterprise Q2 Onboarding
                        </p>
                    </div>
                </section>
            </main>

            <footer className="py-12 px-6 border-t border-white/5 text-center">
                <div className="flex flex-col items-center gap-8">
                    <span className="text-2xl font-black tracking-tighter text-white uppercase">NOXXERA <span className="text-primary">AI</span></span>
                    <nav className="flex gap-8 text-[#555] font-black uppercase tracking-widest text-xs">
                        <a href="/" className="hover:text-primary transition-colors">Main Site</a>
                        <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
                    </nav>
                    <p className="text-[#333] text-[10px] font-bold uppercase tracking-[0.4em]">© 2025 NOXXERA ENTERPRISE LTD.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdsLandingPage;
