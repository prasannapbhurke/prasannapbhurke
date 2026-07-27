import { useEffect, useState } from 'react';
import { Command, Menu, MoonStar, SunMedium, X } from 'lucide-react';

export default function Navbar({ currentTheme, onToggleTheme, onOpenTerminal, onOpenContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 18); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  const close = () => setMenuOpen(false);
  const links = [['About', '#about'], ['Work', '#projects'], ['Capabilities', '#tech-stack'], ['Journey', '#experience']];
  return (
    <nav className={`top-nav ${scrolled ? 'top-nav-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <a href="#about" className="brand" onClick={close}><span>PB</span><div>Prasanna Bhurke<small>ENGINEERING PORTFOLIO</small></div></a>
        <div className="hidden md:flex nav-links">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div className="hidden md:flex items-center gap-2">
          <button className="icon-action" onClick={onToggleTheme} title="Toggle Batman theme">{currentTheme === 'batman' ? <SunMedium size={17} /> : <MoonStar size={17} />}</button>
          <button className="terminal-action" onClick={onOpenTerminal}><Command size={15} /> CLI</button>
          <button className="nav-contact" onClick={onOpenContact}>Let’s talk</button>
        </div>
        <button className="md:hidden icon-action" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <div className="mobile-menu md:hidden px-5 pb-5"><div className="flex flex-col gap-1">{links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}<button onClick={() => { onToggleTheme(); close(); }}>Switch Batman theme</button><button onClick={() => { onOpenContact(); close(); }}>Let’s talk</button></div></div>}
    </nav>
  );
}

