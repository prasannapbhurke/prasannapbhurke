import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import BatLogoSvg from './BatLogoSvg';
import LiveActivityFeed from './LiveActivityFeed';

export default function Footer() {
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative z-10 border-t pt-12 pb-8 transition-colors ${
      isBatman ? 'bg-[#040508] border-yellow-500/30' : 'bg-[#07080c] border-purple-500/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              {isBatman && <BatLogoSvg className="w-5 h-4" goldBackplate={true} />}
              <h3 className={`font-heading font-extrabold text-xl ${isBatman ? 'text-yellow-300' : 'text-white'}`}>
                Prasanna Bhurke
              </h3>
            </div>
            <p className={`text-xs font-mono ${isBatman ? 'text-amber-400' : 'text-purple-300'}`}>
              {isBatman ? '🦇 Gotham City Senior Software Engineer & AI Architect' : 'Senior Software Engineer & AI/ML Specialist'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a href="#about" className={isBatman ? 'hover:text-yellow-300' : 'hover:text-purple-300'}>About</a>
            <span>•</span>
            <a href="#ai-playground" className={isBatman ? 'hover:text-yellow-300' : 'hover:text-purple-300'}>AI Playground</a>
            <span>•</span>
            <a href="#projects" className={isBatman ? 'hover:text-yellow-300' : 'hover:text-purple-300'}>Projects</a>
            <span>•</span>
            <a href="#tech-stack" className={isBatman ? 'hover:text-yellow-300' : 'hover:text-purple-300'}>Skills</a>
          </div>

          <button
            onClick={scrollToTop}
            className={`p-3 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono ${
              isBatman
                ? 'bg-amber-950/60 border-yellow-500/40 text-yellow-300 hover:text-white hover:border-yellow-400'
                : 'bg-purple-950/60 border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400'
            }`}
            title="Back to top"
          >
            <span>{isBatman ? 'Return to Batcave Top' : 'Top'}</span>
            <ArrowUp size={16} />
          </button>

        </div>

        {/* Live Activity Feed Ticker */}
        <div className={`py-3 px-4 rounded-xl border mt-4 mb-2 ${
          isBatman ? 'bg-slate-950/60 border-yellow-500/20' : 'bg-slate-950/60 border-purple-500/20'
        }`}>
          <LiveActivityFeed />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Prasanna Bhurke. {isBatman ? 'Protected by Wayne Enterprises & Gotham AI Node 01.' : 'All rights reserved.'}</p>
          <p className={isBatman ? 'text-yellow-400/80 font-bold' : 'text-purple-400/80'}>
            {isBatman ? '🦇 Engineered in Gotham City with React + Vite' : 'Designed & Engineered with React + Vite'}
          </p>
        </div>

      </div>
    </footer>
  );
}
