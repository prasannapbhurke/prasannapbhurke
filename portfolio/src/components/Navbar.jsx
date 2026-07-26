import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Mail, Volume2, VolumeX, Menu, X, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Navbar({ onOpenTerminal, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const state = sound.toggleMute();
    setIsMuted(state);
    if (!state) sound.playClick();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090a0f]/90 backdrop-blur-xl border-b border-[#9d4edd]/30 py-3 shadow-2xl shadow-purple-950/40' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/40 group-hover:scale-105 transition-transform border border-purple-400/40">
            PB
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
              Prasanna Bhurke
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="block text-[11px] text-purple-400 font-mono">
              AI & Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="#about" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-purple-400 transition-colors"
          >
            // about
          </a>
          <a 
            href="#ai-playground" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-purple-300 hover:text-purple-200 flex items-center gap-1.5 bg-purple-950/60 border border-purple-500/40 px-3.5 py-1.5 rounded-full hover:bg-purple-900/50 shadow-md shadow-purple-900/30 transition-all hover:scale-105"
          >
            <Sparkles size={13} className="text-purple-400 animate-pulse" />
            <span>AI Playground</span>
          </a>
          <a 
            href="#projects" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-purple-400 transition-colors"
          >
            // projects
          </a>
          <a 
            href="#tech-stack" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-purple-400 transition-colors"
          >
            // skills
          </a>
          <a 
            href="#experience" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-purple-400 transition-colors"
          >
            // timeline
          </a>
        </div>

        {/* Action CTAs, Sound Toggle & Terminal Toggle */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Audio Mute/Unmute Synthesizer Button */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900/80 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 transition-all"
            title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-purple-400 animate-pulse" />}
          </button>

          {/* CLI Terminal Mode Button */}
          <button 
            onClick={() => { sound.playClick(); onOpenTerminal(); }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 text-xs font-mono bg-slate-900/90 hover:bg-purple-950/80 text-purple-300 border border-purple-500/40 px-3.5 py-2 rounded-xl hover:border-purple-400 transition-all shadow-md group"
            title="Launch Interactive Terminal"
          >
            <Terminal size={15} className="group-hover:text-emerald-400 transition-colors" />
            <span>CLI Mode</span>
          </button>

          {/* Contact Button */}
          <button 
            onClick={() => { sound.playSuccess(); onOpenContact(); }}
            onMouseEnter={() => sound.playHover()}
            className="glow-btn text-xs px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-purple-700/30"
          >
            <Mail size={14} />
            <span>Contact Me</span>
          </button>

        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/60 border border-purple-500/30"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-[#0a0b12]/98 backdrop-blur-2xl border-b border-purple-500/30 px-4 pt-3 pb-6 space-y-3 font-mono text-sm">
          <a href="#about" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">// about</a>
          <a href="#ai-playground" onClick={() => setMobileMenu(false)} className="block py-2 text-purple-300 font-semibold flex items-center gap-2">
            <Sparkles size={16} /> AI Playground
          </a>
          <a href="#projects" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">// projects</a>
          <a href="#tech-stack" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">// skills</a>
          <a href="#experience" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-purple-400">// timeline</a>
          
          <div className="pt-3 flex flex-col gap-2">
            <button 
              onClick={() => { onOpenTerminal(); setMobileMenu(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-mono bg-slate-900 text-purple-300 border border-purple-500/40 py-2.5 rounded-xl"
            >
              <Terminal size={16} /> Launch CLI Mode
            </button>
            <button 
              onClick={() => { onOpenContact(); setMobileMenu(false); }}
              className="w-full glow-btn text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Mail size={16} /> Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
