import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Terminal, Code, Cpu, Mail, ExternalLink, X, Command } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { sound } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose, onOpenTerminal, onOpenContact, onSelectTheme }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          sound.playClick();
          window.dispatchEvent(new CustomEvent('toggle-cmd-k'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'ai', title: 'Launch AI Model & Neural Net Lab', category: 'Showcase', icon: <Sparkles size={16} className="text-purple-400" />, action: () => { window.location.href = '#ai-playground'; onClose(); } },
    { id: 'cli', title: 'Open Interactive CLI Terminal Mode', category: 'Feature', icon: <Terminal size={16} className="text-emerald-400" />, action: () => { onOpenTerminal(); onClose(); } },
    { id: 'projects', title: 'View Featured Engineering Projects', category: 'Navigation', icon: <Code size={16} className="text-blue-400" />, action: () => { window.location.href = '#projects'; onClose(); } },
    { id: 'skills', title: 'View Tech Stack & Ecosystem', category: 'Navigation', icon: <Cpu size={16} className="text-amber-400" />, action: () => { window.location.href = '#tech-stack'; onClose(); } },
    { id: 'contact', title: 'Open Contact Form & Email Copier', category: 'Contact', icon: <Mail size={16} className="text-rose-400" />, action: () => { onOpenContact(); onClose(); } },
    { id: 'github', title: 'Open GitHub Profile (prasannapbhurke)', category: 'Social', icon: <GithubIcon size={16} className="text-slate-300" />, action: () => { window.open('https://github.com/prasannapbhurke', '_blank'); onClose(); } },
    { id: 'theme-purple', title: 'Switch Theme: 🟣 Purple Luxury', category: 'Theme', icon: <Sparkles size={16} className="text-purple-400" />, action: () => { onSelectTheme('purple'); onClose(); } },
    { id: 'theme-cyber', title: 'Switch Theme: 🟢 Cyberpunk Matrix', category: 'Theme', icon: <Terminal size={16} className="text-emerald-400" />, action: () => { onSelectTheme('matrix'); onClose(); } },
    { id: 'theme-faang', title: 'Switch Theme: 🔵 FAANG Indigo', category: 'Theme', icon: <Cpu size={16} className="text-blue-400" />, action: () => { onSelectTheme('indigo'); onClose(); } }
  ];

  const filtered = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-xl w-full border-purple-500/50 overflow-hidden shadow-2xl shadow-purple-950/80">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-purple-500/30 flex items-center gap-3 bg-slate-950/90">
          <Search size={20} className="text-purple-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. AI, CLI, Projects, Theme)..."
            className="flex-1 bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded-md">
            ESC
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => { sound.playClick(); item.action(); }}
                onMouseEnter={() => sound.playHover()}
                className="w-full p-3 rounded-xl hover:bg-purple-950/60 border border-transparent hover:border-purple-500/40 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-purple-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white group-hover:text-purple-300 transition-colors block">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {item.category}
                    </span>
                  </div>
                </div>

                <ChevronIcon />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-2.5 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between px-4">
          <span>Press <kbd className="text-purple-300">↑</kbd> <kbd className="text-purple-300">↓</kbd> to navigate</span>
          <span className="flex items-center gap-1">
            <Command size={12} /> + K
          </span>
        </div>

      </div>
    </div>
  );
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
