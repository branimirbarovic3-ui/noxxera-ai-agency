
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 px-4 md:px-6 py-3 md:py-4 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#282828]' : 'bg-transparent'
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-lg md:text-2xl font-black tracking-tighter text-white cursor-pointer hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Noxxera AI Home"
          >
            NOXXERA <span className="text-primary">AI</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#99A1AF]">
          <a
            href="/#home"
            className="cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary focus:underline underline-offset-4"
          >
            Home
          </a>
          <a
            href="/#services"
            className="cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary focus:underline underline-offset-4"
          >
            Services
          </a>
          <a
            href="/#industries"
            className="cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary focus:underline underline-offset-4"
          >
            Industries
          </a>
          <a
            href="/#contact"
            className="cursor-pointer hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary focus:underline underline-offset-4"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden sm:block text-xs font-black uppercase tracking-widest text-[#99A1AF] hover:text-primary transition-colors mr-4 focus:outline-none focus:text-primary focus:underline underline-offset-4"
          >
            Login
          </Link>
          <a
            href="https://cal.com/branimir-barovic-qc6qgo/noxxera"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-primary text-black px-4 md:px-7 py-2 md:py-3 rounded-full font-black text-[10px] md:text-xs tracking-widest uppercase shadow-primary hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black inline-block text-center"
            aria-label="Book a Strategy Call"
          >
            <span className="hidden sm:inline">Book a </span>Strategy Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
