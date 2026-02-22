
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import CaseStudies from '../components/CaseStudies';
import VoiceDemo from '../components/VoiceDemo';
import Cta from '../components/Cta';
import RevenueCalculator from '../components/RevenueCalculator';
import CertifiedPartner from '../components/CertifiedPartner';
import Industries from '../components/Industries';
import { GlowingEffectDemo } from '../components/GlowingEffectDemo';

const Home: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen selection:bg-primary selection:text-black">
            <Navbar scrolled={scrolled} />

            <main>
                <section id="home">
                    <Hero />
                </section>

                <div className="relative py-48 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#282828] to-transparent"></div>
                    <SocialProof />
                </div>

                <CaseStudies />

                <Industries />

                <RevenueCalculator />

                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#282828] to-transparent"></div>
                    <CertifiedPartner />
                </div>

                <VoiceDemo />

                <Features />

                <div className="py-48 px-6 max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-16 uppercase text-center leading-[1.2]">
                        Scalable <span className="text-primary italic">Capabilities</span>
                    </h2>
                    <GlowingEffectDemo />
                </div>

                <section id="contact">
                    <Cta />
                </section>
            </main>

            <footer className="border-t border-[#282828] py-12 px-6" role="contentinfo">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tighter text-white">NOXXERA <span className="text-primary">AI</span></span>
                    </div>
                    <p className="text-[#99A1AF] text-sm">
                        © 2025 Noxxera AI. Pioneering Enterprise Voice Automation.
                    </p>
                    <nav className="flex gap-6 text-[#99A1AF] text-sm uppercase tracking-widest font-bold" aria-label="Footer navigation">
                        <a href="#privacy" className="cursor-pointer hover:text-primary transition-colors duration-200">Privacy</a>
                        <a href="#terms" className="cursor-pointer hover:text-primary transition-colors duration-200">Terms</a>
                        <a href="https://x.com/noxxeraai" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-primary transition-colors duration-200">X</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default Home;
