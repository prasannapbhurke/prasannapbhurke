import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [theme, setTheme] = useState(() => {
    return 'purple';
  });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleCmdK = () => setCmdPaletteOpen(true);
    const handleActivateBatman = () => setTheme('batman');
    window.addEventListener('toggle-cmd-k', handleCmdK);
    window.addEventListener('activate-batman-theme', handleActivateBatman);
    return () => {
      window.removeEventListener('toggle-cmd-k', handleCmdK);
      window.removeEventListener('activate-batman-theme', handleActivateBatman);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'purple' ? 'batman' : 'purple'));
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-purple-600 selection:text-white relative transition-colors duration-500">
      
      {/* Custom Trailing Neon Cursor */}
      <CustomCursor />

      {/* Dynamic Ambient Particle Canvas Background */}
      <ParticleBackground theme={theme} />

      {/* Top Navbar */}
      <Navbar 
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Hero Section */}
      <Hero 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* AI Machine Learning Lab & NLP Playground */}
      <AIPlayground />

      {/* Engineering Portfolio Projects */}
      <Projects />

      {/* Technical Capabilities & Skill Matrix */}
      <TechStack />

      {/* Engineering Career Experience & Timeline */}
      <Experience />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Interactive CLI Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Interactive Resume CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Cmd + K Command Palette */}
      <CommandPalette 
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

    </div>
  );
}
