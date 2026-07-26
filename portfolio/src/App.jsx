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
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  useEffect(() => {
    const handleCmdK = () => setCmdPaletteOpen(true);
    window.addEventListener('toggle-cmd-k', handleCmdK);
    return () => window.removeEventListener('toggle-cmd-k', handleCmdK);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-purple-600 selection:text-white relative">
      
      {/* Custom Trailing Neon Cursor */}
      <CustomCursor />

      {/* Dynamic Ambient Particle Canvas Background */}
      <ParticleBackground />

      {/* Top Navbar */}
      <Navbar 
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
        onSelectTheme={(t) => {}}
      />
    </div>
  );
}
