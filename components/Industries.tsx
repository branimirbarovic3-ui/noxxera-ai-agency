
import React from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import {
    Stethoscope,
    Scale,
    Building2,
    Home,
    Car,
    ShoppingBag,
    Users,
    Globe
} from 'lucide-react';

const Industries: React.FC = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    const industries = [
        { name: "Healthcare", icon: <Stethoscope className="w-6 h-6" />, desc: "Patient intake & scheduling" },
        { name: "Legal", icon: <Scale className="w-6 h-6" />, desc: "Client intake & case qualification" },
        { name: "Real Estate", icon: <Building2 className="w-6 h-6" />, desc: "Lead response & showing bookings" },
        { name: "Home Services", icon: <Home className="w-6 h-6" />, desc: "Dispatch & appointment routing" },
        { name: "Automotive", icon: <Car className="w-6 h-6" />, desc: "Service reminders & sales leads" },
        { name: "E-commerce", icon: <ShoppingBag className="w-6 h-6" />, desc: "Order tracking & support" },
        { name: "Agencies", icon: <Users className="w-6 h-6" />, desc: "White-label AI calling solutions" },
        { name: "Enterprise", icon: <Globe className="w-6 h-6" />, desc: "Scalable high-concurrency flows" }
    ];

    return (
        <section id="industries" ref={sectionRef as React.RefObject<HTMLElement>} className="py-48 px-6">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase leading-[1.2]">
                        BUILT FOR ANY INDUSTRY THAT <span className="text-primary italic">RELIES ON CALLS</span>.
                    </h2>
                    <p className="text-lg md:text-xl text-[#99A1AF] font-medium max-w-2xl mx-auto leading-relaxed">
                        Our AI Voice infrastructure adapts to your workflow, demand spikes, and operational needs across diverse sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industries.map((industry, i) => (
                        <div
                            key={i}
                            className={`p-8 border border-[#282828] bg-[#0D0D0D] hover:border-primary/40 transition-all duration-300 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                {industry.icon}
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{industry.name}</h3>
                            <p className="text-sm text-[#555] group-hover:text-[#99A1AF] transition-colors">{industry.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
