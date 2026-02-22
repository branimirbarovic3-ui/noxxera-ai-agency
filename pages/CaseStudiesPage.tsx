
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { TrendingUp, Clock, PhoneOff, Award } from 'lucide-react';

const CaseStudiesPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cases = [
        {
            name: "CloudScale SaaS",
            type: "Enterprise Software",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            metric: "+40%",
            metricLabel: "Lead Capture Rate",
            desc: "Automated high-ticket lead qualification for after-hours global traffic.",
        },
        {
            name: "MedCore Network",
            type: "Healthcare Systems",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            metric: "0",
            metricLabel: "Missed Appointments",
            desc: "Achieved 100% call answer rate across 12 multidisciplinary clinics.",
        },
        {
            name: "Horizon Realty Group",
            type: "Luxury Real Estate",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            metric: "$45k",
            metricLabel: "Monthly Recovered Commission",
            desc: "Captured high-intent leads that would have been lost to voicemail during peak viewing hours.",
        },
        {
            name: "Nexus Global",
            type: "Global Logistics",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            metric: "24/7",
            metricLabel: "Operational Uptime",
            desc: "Infrastructure manages urgent dispatch inquiries with zero latency across all time zones.",
        }
    ];

    return (
        <div className="min-h-screen selection:bg-primary selection:text-black font-sans">
            <Navbar scrolled={scrolled} />

            <main className="pt-32 px-6 pb-20">
                <div className="max-w-7xl mx-auto mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-[#282828] rounded-full text-xs font-black tracking-[0.2em] text-primary mb-6 uppercase border border-white/5 animate-fade-in">
                        Infrastructure Impact
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 animate-fade-in-up">
                        Proven Scalability. <br /><span className="text-primary italic">Measurable Results.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-[#99A1AF] font-medium leading-relaxed animate-fade-in-up delay-100">
                        See how our AI voice infrastructure transforms complex operations by capturing every mission-critical opportunity.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            className="group relative h-[500px] rounded-[40px] overflow-hidden border border-[#282828] hover:border-primary/50 transition-all duration-500 animate-fade-in-up"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {/* Background Image with Zoom Effect */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${c.image})` }}
                            ></div>

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                            {/* Glass Content Card */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 md:p-8 rounded-[30px] bg-white/5 backdrop-blur-xl border border-white/10 transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">{c.type}</div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{c.name}</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex items-end gap-4 mb-4 pb-4 border-b border-white/10">
                                    <span className="text-4xl font-black text-white italic">{c.metric}</span>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest pb-1">{c.metricLabel}</span>
                                </div>

                                <p className="text-sm text-white/80 font-medium leading-relaxed">
                                    "{c.desc}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="border-t border-[#282828] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-black tracking-tighter text-white">NOXXERA <span className="text-primary">AI</span></div>
                    <p className="text-[#99A1AF] text-sm">
                        © 2025 Noxxera AI. Pioneering Human-Centric Voice Intelligence.
                    </p>
                    <nav className="flex gap-6 text-[#99A1AF] text-sm uppercase tracking-widest font-bold" aria-label="Footer navigation">
                        <a href="/#privacy" className="cursor-pointer hover:text-primary transition-colors duration-200">Privacy</a>
                        <a href="/#terms" className="cursor-pointer hover:text-primary transition-colors duration-200">Terms</a>
                        <a href="https://x.com/noxxeraai" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-primary transition-colors duration-200">X</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default CaseStudiesPage;
