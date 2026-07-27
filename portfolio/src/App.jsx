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
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'purple';
  });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleCmdK = () => setCmdPaletteOpen(true);
    window.addEventListener('toggle-cmd-k', handleCmdK);
    return () => window.removeEventListener('toggle-cmd-k', handleCmdK);
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
        onOpenContact={scrollToContact}
      />

      {/* Hero Section */}
      <Hero 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* AI Model & Neural Network Playground Section */}
      <AIPlayground />

      {/* Featured Projects Section */}
      <Projects />

      {/* Technical Skills & Ecosystem Section */}
      <TechStack />

      {/* Experience & Timeline Section */}
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

      {/* Command Palette Modal (Cmd + K / Ctrl + K) */}
      <CommandPalette 
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={scrollToContact}
        onSelectTheme={(t) => setTheme(t)}
      />
    </div>
  );
}
