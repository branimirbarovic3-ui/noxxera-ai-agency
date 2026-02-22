
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';
import { TrendingUp, PhoneOff, Clock } from 'lucide-react';

const CaseStudies: React.FC = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    const studies = [
        {
            metric: "+40%",
            label: "Lead Capture Rate",
            quote: "We used to lose significant pipeline volume during off-hours. Now, every single prospect is qualified and booked instantly. The ROI was immediate.",
            author: "Marcus T.",
            role: "Head of Sales, CloudScale SaaS",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
            icon: <TrendingUp className="w-6 h-6 text-primary" />
        },
        {
            metric: "0",
            label: "Missed Appointments",
            quote: "Our intake team was overwhelmed with scheduling. The AI handles 100% of routine bookings now, maintaining a perfect capture rate across all clinics.",
            author: "Elena R.",
            role: "Ops Director, MedCore Network",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
            icon: <PhoneOff className="w-6 h-6 text-primary" />
        },
        {
            metric: "24/7",
            label: "Dispatch Coverage",
            quote: "Flawless consistency across 14 time zones. It handles urgent dispatch inquiries that we previously struggled to manage at scale.",
            author: "David K.",
            role: "Logistics Mgr, Nexus Global",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
            icon: <Clock className="w-6 h-6 text-primary" />
        }
    ];

    return (
        <section id="results" ref={sectionRef as React.RefObject<HTMLElement>} className="py-32 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-[1.2]">
                        Proven <span className="text-primary italic">Success</span>
                    </h2>
                    <p className="text-[#99A1AF] font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        See how growth-focused companies transform their voice communication into a measurable revenue engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {studies.map((study, i) => (
                        <div
                            key={i}
                            className={`bg-white/5 backdrop-blur-sm border border-[#282828] p-8 rounded-[30px] hover:border-primary/50 transition-all duration-300 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter group-hover:text-primary transition-colors">
                                        {study.metric}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#99A1AF]">
                                        {study.label}
                                    </div>
                                </div>
                                <div className="p-3 bg-[#1A1A1A] rounded-full group-hover:scale-110 transition-transform">
                                    {study.icon}
                                </div>
                            </div>

                            <p className="text-[#CCCCCC] text-sm md:text-base italic leading-relaxed mb-6 font-medium">
                                "{study.quote}"
                            </p>

                            <div className="flex items-center gap-3 border-t border-[#282828] pt-4">
                                <img
                                    src={study.image}
                                    alt={study.author}
                                    className="w-10 h-10 rounded-full object-cover border border-[#282828] group-hover:border-primary/50 transition-colors"
                                />
                                <div>
                                    <div className="text-white font-bold text-xs uppercase tracking-wide">{study.author}</div>
                                    <div className="text-[#666] text-[10px] font-bold uppercase tracking-wider">{study.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/case-studies"
                        className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-[0.2em] hover:underline underline-offset-4 cursor-pointer"
                    >
                        Read Full Success Stories
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
