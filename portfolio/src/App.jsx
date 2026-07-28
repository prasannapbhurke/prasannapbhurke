import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIPlayground from './components/AIPlayground';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ResumeModal from './components/ResumeModal';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import IntroCinematic from './components/IntroCinematic';
import { ToastProvider, useToast } from './components/ToastManager';
import AchievementSystem from './components/AchievementSystem';
import GothamStorm from './components/GothamStorm';
import PrasannaBot from './components/PrasannaBot';

function AppContent() {
  const [theme, setTheme] = useState('purple');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleCmdK = () => setCmdPaletteOpen(true);
    const handleActivateBatman = () => {
      setTheme('batman');
      toast('🦇 BATMAN MODE ACTIVATED — Welcome to Gotham!', 'batman', 4000);
    };
    const handleAchievement = (e) => {
      const { emoji, title, desc } = e.detail;
      toast(`${emoji} Achievement Unlocked: ${title} — ${desc}`, 'achievement', 5000);
    };

    window.addEventListener('toggle-cmd-k', handleCmdK);
    window.addEventListener('activate-batman-theme', handleActivateBatman);
    window.addEventListener('achievement-unlocked', handleAchievement);
    return () => {
      window.removeEventListener('toggle-cmd-k', handleCmdK);
      window.removeEventListener('activate-batman-theme', handleActivateBatman);
      window.removeEventListener('achievement-unlocked', handleAchievement);
    };
  }, [toast]);

  const toggleTheme = () => {
    const next = theme === 'purple' ? 'batman' : 'purple';
    setTheme(next);
    if (next === 'batman') {
      toast('🦇 BATMAN MODE ACTIVATED — Welcome to Gotham!', 'batman', 4000);
    } else {
      toast('🔵 Standard Mode — Switched to purple theme', 'info', 2500);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-purple-600 selection:text-white relative transition-colors duration-500">

      {/* Intro Cinematic (first visit only) */}
      {!introComplete && (
        <IntroCinematic onComplete={() => setIntroComplete(true)} />
      )}

      {/* Custom Trailing Cursor */}
      <CustomCursor theme={theme} />

      {/* Dynamic Ambient Particle Canvas */}
      <ParticleBackground theme={theme} />

      {/* Gotham Storm (lightning + thunder in Batman mode) */}
      <GothamStorm active={theme === 'batman'} />

      {/* Top Navbar */}
      <Navbar
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => { setTerminalOpen(true); }}
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Main Sections */}
      <Hero
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={scrollToContact}
      />
      <AIPlayground />
      <Projects />
      <TechStack />
      <Experience />
      <Contact />
      <Footer />

      {/* Modals */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating UI */}
      <AchievementSystem />
      <PrasannaBot />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
