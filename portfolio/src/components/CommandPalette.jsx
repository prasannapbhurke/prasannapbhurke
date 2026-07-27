import { useEffect, useState } from 'react';
import { Code2, Mail, Search, Terminal, X } from 'lucide-react';
export default function CommandPalette({ isOpen, onClose, onOpenTerminal, onOpenContact, onSelectTheme }) {
  const [query, setQuery] = useState('');
  useEffect(() => { const key = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); isOpen ? onClose() : window.dispatchEvent(new Event('toggle-cmd-k')); } if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [isOpen, onClose]);
  useEffect(() => { if (isOpen) setQuery(''); }, [isOpen]);
  if (!isOpen) return null;
  const actions = [['Work', <Code2 size={16}/>, () => { location.hash = 'projects'; onClose(); }], ['Open CLI', <Terminal size={16}/>, () => { onOpenTerminal(); onClose(); }], ['Contact Prasanna', <Mail size={16}/>, () => { onOpenContact(); onClose(); }], ['Use Batman theme', <Search size={16}/>, () => { onSelectTheme('batman'); onClose(); }]].filter(([title]) => title.toLowerCase().includes(query.toLowerCase()));
  return <div className="fixed inset-0 z-[60] grid place-items-start pt-28 px-5 bg-black/35 backdrop-blur-sm" onMouseDown={onClose}><div className="w-full max-w-xl bg-[var(--panel)] text-[var(--ink)] border border-[var(--line)] shadow-2xl" onMouseDown={e => e.stopPropagation()}><div className="flex items-center gap-3 border-b border-[var(--line)] px-4"><Search size={18}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search actions…" className="w-full bg-transparent py-4 outline-none text-sm"/><button onClick={onClose} aria-label="Close"><X size={18}/></button></div><div className="p-2">{actions.map(([title, icon, action]) => <button key={title} className="w-full flex items-center gap-3 p-3 text-left text-sm hover:bg-[var(--accent-soft)]" onClick={action}>{icon}{title}</button>)}</div><p className="px-4 pb-3 text-[10px] text-[var(--muted)]">ESC to close · Ctrl/⌘ K to open</p></div></div>;
}

