import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIPlayground from './components/AIPlayground';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-purple-600 selection:text-white">
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

      {/* AI Model Playground Section */}
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
    </div>
  );
}
