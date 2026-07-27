import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import CommandPalette from './components/CommandPalette';
import ParticleBackground from './components/ParticleBackground';
import BatmobileWidget from './components/BatmobileWidget';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') === 'batman' ? 'batman' : 'violet');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const openPalette = () => setPaletteOpen(true);
    window.addEventListener('toggle-cmd-k', openPalette);
    return () => window.removeEventListener('toggle-cmd-k', openPalette);
  }, []);

  const goToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site-shell min-h-screen overflow-hidden relative">
      <ParticleBackground theme={theme} />
      <div className="site-grain" aria-hidden="true" />
      <Navbar currentTheme={theme} onToggleTheme={() => setTheme((t) => t === 'violet' ? 'batman' : 'violet')} onOpenTerminal={() => setTerminalOpen(true)} onOpenContact={goToContact} />
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} onOpenContact={goToContact} />
        <Projects />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BatmobileWidget />
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} onOpenTerminal={() => setTerminalOpen(true)} onOpenContact={goToContact} onSelectTheme={setTheme} />
    </div>
  );
}
