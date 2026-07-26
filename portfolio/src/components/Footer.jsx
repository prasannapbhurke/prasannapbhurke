import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-purple-500/20 bg-[#07080c] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-heading font-extrabold text-xl text-white">
              Prasanna Bhurke
            </h3>
            <p className="text-xs font-mono text-purple-300">
              Senior Software Engineer & AI/ML Specialist
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <span>•</span>
            <a href="#ai-playground" className="hover:text-purple-300 transition-colors">AI Playground</a>
            <span>•</span>
            <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
            <span>•</span>
            <a href="#tech-stack" className="hover:text-purple-300 transition-colors">Skills</a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={16} />
          </button>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Prasanna Bhurke. All rights reserved.</p>
          <p className="text-purple-400/80">Designed & Engineered with React + Vite</p>
        </div>

      </div>
    </footer>
  );
}
