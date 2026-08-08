import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Mail, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';

export default function Navbar({ currentTheme, onToggleTheme, onOpenTerminal, onOpenResume, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('app-lang') || 'en');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleThemeToggle = () => {
    try {
      if (currentTheme !== 'batman') {
        sound.playBatmanThemeSound?.();
        sound.playBatmanThemeMusic?.();
      } else {
        sound.playClick?.();
        sound.stopBatmanThemeMusic?.();
      }
    } catch (e) {
      // Audio context safeguard
    }
    onToggleTheme();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-purple-500/20 py-3.5 shadow-2xl shadow-purple-950/40' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Monogram */}
        <a 
          href="#about"
          className="flex items-center gap-3 group"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="flex items-center justify-center group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(254,208,0,0.8)]">
            <BatLogoSvg className="w-12 h-8" goldBackplate={true} />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-white text-base tracking-tight group-hover:text-yellow-400 transition-colors">
              Prasanna Bhurke
            </span>
            <span className="text-[10px] font-mono text-yellow-400/90 tracking-wider uppercase font-semibold">
              🦇 Gotham AI Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          <a 
            href="#about" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-yellow-400 transition-colors"
          >
            // about
          </a>
          <a 
            href="#ai-playground" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-400/10 border border-yellow-500/30"
          >
            <Sparkles size={13} className="text-yellow-400 animate-pulse" />
            <span>AI Playground</span>
          </a>
          <a 
            href="#projects" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-yellow-400 transition-colors"
          >
            // projects
          </a>
          <a 
            href="#tech-stack" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-yellow-400 transition-colors"
          >
            // skills
          </a>
          <a 
            href="#experience" 
            onMouseEnter={() => sound.playHover()}
            className="text-xs font-mono font-medium text-slate-300 hover:text-yellow-400 transition-colors"
          >
            // timeline
          </a>
        </div>

        {/* Theme Toggle, Audio Toggle, CLI Mode & Contact */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Batman Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            onMouseEnter={() => sound.playHover()}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md ${
              currentTheme === 'batman'
                ? 'bg-yellow-400 text-black border-yellow-200 shadow-yellow-500/50 hover:bg-yellow-300 ring-2 ring-yellow-400/80 animate-pulse'
                : 'bg-slate-900 text-purple-300 border-purple-500/40 hover:border-yellow-400 hover:text-yellow-300'
            }`}
            title="Toggle Gotham Batman Theme & Music"
          >
            <BatLogoSvg className="w-5 h-4" goldBackplate={currentTheme !== 'batman'} />
            <span>{currentTheme === 'batman' ? 'Gotham Mode Active' : 'Batman Theme'}</span>
          </button>

          {/* Multi-Language i18n Selector */}
          <div className="flex items-center bg-slate-900 border border-purple-500/30 rounded-xl p-1 font-mono text-[11px]">
            {['en', 'de', 'jp'].map((langKey) => (
              <button
                key={langKey}
                onClick={() => {
                  sound.playClick();
                  setCurrentLang(langKey);
                  window.dispatchEvent(new CustomEvent('app-lang-change', { detail: langKey }));
                  localStorage.setItem('app-lang', langKey);
                }}
                className={`px-2 py-0.5 rounded-lg font-bold uppercase transition-all ${
                  currentLang === langKey
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {langKey}
              </button>
            ))}
          </div>

          {/* Audio Mute/Unmute Synthesizer Button */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900/80 border border-yellow-500/30 text-yellow-300 hover:text-white hover:border-yellow-400 transition-all"
            title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-amber-400 animate-pulse" />}
          </button>

          {/* Resume Modal Trigger Button */}
          <button
            onClick={() => { sound.playClick(); onOpenResume?.(); }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 text-xs font-mono bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 px-3 py-2 rounded-xl hover:border-purple-300 transition-all shadow-md"
            title="Inspect Interactive CV Resume"
          >
            <span>CV Resume</span>
          </button>

          {/* CLI Terminal Mode Button */}
          <button 
            onClick={() => { sound.playClick(); onOpenTerminal(); }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 text-xs font-mono bg-slate-900/90 hover:bg-amber-950/80 text-yellow-300 border border-yellow-500/40 px-3.5 py-2 rounded-xl hover:border-yellow-400 transition-all shadow-md group"
            title="Launch Interactive Terminal"
          >
            <Terminal size={15} className="group-hover:text-emerald-400 transition-colors" />
            <span>CLI Mode</span>
          </button>

          {/* Contact Button */}
          <button 
            onClick={() => { sound.playSuccess(); onOpenContact(); }}
            onMouseEnter={() => sound.playHover()}
            className="px-4 py-2 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-lg shadow-yellow-500/30 hover:scale-[1.02] flex items-center gap-1.5"
          >
            <BatLogoSvg className="w-4 h-3" goldBackplate={true} />
            <span>Bat-Signal</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2.5 rounded-xl bg-slate-900 border border-yellow-500/40 text-yellow-300"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-slate-950/95 border-b border-yellow-500/30 px-6 py-6 space-y-4 font-mono text-sm animate-fadeIn">
          <a href="#about" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-yellow-400">// about</a>
          <a href="#ai-playground" onClick={() => setMobileMenu(false)} className="block py-2 text-yellow-300 font-semibold flex items-center gap-2">
            <Sparkles size={16} /> AI Playground
          </a>
          <a href="#projects" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-yellow-400">// projects</a>
          <a href="#tech-stack" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-yellow-400">// skills</a>
          <a href="#experience" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-300 hover:text-yellow-400">// timeline</a>
          
          <div className="pt-3 flex flex-col gap-2">
            <button 
              onClick={() => { handleThemeToggle(); setMobileMenu(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-mono bg-yellow-400 text-black border border-yellow-300 py-2.5 rounded-xl font-bold"
            >
              <BatLogoSvg className="w-4 h-3" goldBackplate={true} />
              <span>{currentTheme === 'batman' ? 'Gotham Mode Active' : 'Switch to Batman Mode'}</span>
            </button>
            <button 
              onClick={() => { onOpenTerminal(); setMobileMenu(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-mono bg-slate-900 text-yellow-300 border border-yellow-500/40 py-2.5 rounded-xl"
            >
              <Terminal size={16} /> Launch CLI Mode
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
