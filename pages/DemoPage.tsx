import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VoiceDemo from '../components/VoiceDemo';

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

            <main className="pt-24">
                {/* Hero strip above form */}
                <div className="text-center py-12 px-6">
                    <div className="inline-block px-4 py-1.5 bg-[#282828] rounded-full text-xs font-black tracking-[0.2em] text-primary mb-6 uppercase border border-white/5">
                        Live Demo
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[1.1] mb-4">
                        Experience Our <span className="text-primary italic">Concierge</span> First-Hand.
                    </h1>
                    <p className="text-[#99A1AF] font-medium max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                        Fill in your details and our Voice AI Concierge will call you within seconds — live, real, and built for your industry.
                    </p>
                </div>

                <VoiceDemo />
            </main>

            <footer className="border-t border-[#282828] py-8 px-6 text-center">
                <a href="/" className="text-[#99A1AF] text-sm hover:text-primary transition-colors font-bold uppercase tracking-widest">
                    ← Back to Noxxera AI
                </a>
            </footer>
        </div>
    );
};

export default DemoPage;
