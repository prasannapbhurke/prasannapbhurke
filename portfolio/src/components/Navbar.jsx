import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Mail, Menu, X, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Navbar({ onOpenTerminal, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090a0f]/85 backdrop-blur-md border-b border-[#9d4edd]/20 py-3 shadow-lg shadow-purple-950/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            PB
          </div>
          <div>
            <span className="font-heading font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
              Prasanna Bhurke
            </span>
            <span className="block text-xs text-purple-400/80 font-mono">
              AI & Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">
            About
          </a>
          <a href="#ai-playground" className="text-sm font-medium text-purple-300 hover:text-purple-200 flex items-center gap-1.5 bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full hover:bg-purple-900/40 transition-colors">
            <Sparkles size={14} className="text-purple-400 animate-pulse" />
            AI Playground
          </a>
          <a href="#projects" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">
            Projects
          </a>
          <a href="#tech-stack" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">
            Skills
          </a>
          <a href="#experience" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">
            Experience
          </a>
        </div>

        {/* Action CTAs & Terminal Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={onOpenTerminal}
            className="flex items-center gap-2 text-xs font-mono bg-slate-900/80 hover:bg-slate-800 text-purple-300 border border-purple-500/30 px-3.5 py-2 rounded-xl hover:border-purple-400 transition-all shadow-md group"
            title="Launch Interactive Terminal"
          >
            <Terminal size={15} className="group-hover:text-green-400 transition-colors" />
            <span>CLI Mode</span>
          </button>

          <button 
            onClick={onOpenContact}
            className="glow-btn text-xs px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-purple-700/20"
          >
            <Mail size={14} />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu button */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/50 border border-slate-800"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-[#0e0f18]/95 backdrop-blur-xl border-b border-purple-500/20 px-4 pt-3 pb-6 space-y-3">
          <a href="#about" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">About</a>
          <a href="#ai-playground" onClick={() => setMobileMenu(false)} className="block py-2 text-purple-300 font-semibold flex items-center gap-2">
            <Sparkles size={16} /> AI Playground
          </a>
          <a href="#projects" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">Projects</a>
          <a href="#tech-stack" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">Skills</a>
          <a href="#experience" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">Experience</a>
          
          <div className="pt-3 flex flex-col gap-2">
            <button 
              onClick={() => { onOpenTerminal(); setMobileMenu(false); }}
              className="w-full flex items-center justify-center gap-2 text-sm font-mono bg-slate-900 text-purple-300 border border-purple-500/30 py-2.5 rounded-xl"
            >
              <Terminal size={16} /> Launch CLI Mode
            </button>
            <button 
              onClick={() => { onOpenContact(); setMobileMenu(false); }}
              className="w-full glow-btn text-sm py-2.5 flex items-center justify-center gap-2"
            >
              <Mail size={16} /> Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
