
import React from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#282828]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-white">NOXXERA <span className="text-primary">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#99A1AF]">
          <a href="#features" className="hover:text-white transition-colors">Technology</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#proof" className="hover:text-white transition-colors">Clients</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-primary text-black px-7 py-3 rounded-full font-black text-xs tracking-widest uppercase shadow-primary hover:scale-105 hover:brightness-110 active:scale-95 transition-all">
            GET STARTED
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
