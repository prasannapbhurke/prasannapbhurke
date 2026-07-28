import React, { useState, useEffect } from 'react';
import { Trophy, Lock } from 'lucide-react';
import { ACHIEVEMENTS, getUnlocked } from '../utils/achievements';
import { sound } from '../utils/sound';

export default function AchievementSystem() {
  const [unlocked, setUnlocked] = useState(() => getUnlocked());
  const [isBatman, setIsBatman] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => setUnlocked(getUnlocked());
    window.addEventListener('achievement-unlocked', handler);
    return () => window.removeEventListener('achievement-unlocked', handler);
  }, []);

  const all = Object.values(ACHIEVEMENTS);
  const count = unlocked.length;
  const pct = Math.round((count / all.length) * 100);

  return (
    <>
      {/* Floating Trophy Button */}
      <button
        onClick={() => { sound.playClick(); setOpen(o => !o); }}
        onMouseEnter={() => sound.playHover()}
        title="Achievements"
        className={`fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-300 hover:scale-110 group ${
          isBatman
            ? 'bg-yellow-950 border-yellow-400/60 text-yellow-300 shadow-yellow-500/30'
            : 'bg-purple-950 border-purple-400/60 text-purple-300 shadow-purple-500/30'
        }`}
        aria-label="Open achievements"
      >
        <Trophy size={20} />
        {count > 0 && (
          <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-black ${
            isBatman ? 'bg-yellow-400' : 'bg-purple-400'
          }`}>
            {count}
          </span>
        )}
      </button>

      {/* Achievement Panel */}
      {open && (
        <div className={`fixed bottom-40 right-6 z-50 w-80 rounded-2xl border backdrop-blur-xl shadow-2xl font-mono overflow-hidden ${
          isBatman
            ? 'bg-slate-950/95 border-yellow-400/40 shadow-yellow-500/20'
            : 'bg-slate-950/95 border-purple-500/40 shadow-purple-500/20'
        }`}>
          {/* Header */}
          <div className={`px-5 py-4 border-b flex items-center justify-between ${
            isBatman ? 'border-yellow-500/20' : 'border-purple-500/20'
          }`}>
            <div className="flex items-center gap-2">
              <Trophy size={16} className={isBatman ? 'text-yellow-300' : 'text-purple-300'} />
              <span className={`text-sm font-bold ${isBatman ? 'text-yellow-200' : 'text-purple-200'}`}>
                Achievements
              </span>
            </div>
            <span className="text-xs text-slate-400">{count}/{all.length} · {pct}%</span>
          </div>

          {/* Progress Bar */}
          <div className="px-5 pt-3 pb-2">
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isBatman ? 'bg-yellow-400' : 'bg-purple-400'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Badge Grid */}
          <div className="px-4 pb-4 grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
            {all.map((ach) => {
              const done = unlocked.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    done
                      ? isBatman
                        ? 'bg-yellow-950/60 border-yellow-500/40 text-yellow-200'
                        : 'bg-purple-950/60 border-purple-500/40 text-purple-200'
                      : 'bg-slate-900/40 border-slate-800/50 text-slate-600'
                  }`}
                >
                  <div className="text-xl mb-1">{done ? ach.emoji : '🔒'}</div>
                  <div className="font-bold text-[11px] truncate">{done ? ach.title : '???'}</div>
                  <div className="text-[10px] mt-0.5 opacity-70 leading-tight">
                    {done ? ach.desc : 'Locked'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
