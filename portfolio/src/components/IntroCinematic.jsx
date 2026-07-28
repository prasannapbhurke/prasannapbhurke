import React, { useState, useEffect } from 'react';

export default function IntroCinematic({ onComplete }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('intro-shown')) {
      onComplete();
      return;
    }

    // Phase timeline: enter (700ms) → hold (1400ms) → exit (700ms) → done
    const t1 = setTimeout(() => setPhase('hold'), 700);
    const t2 = setTimeout(() => setPhase('exit'), 2100);
    const t3 = setTimeout(() => {
      sessionStorage.setItem('intro-shown', '1');
      onComplete();
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 'exit' && false) return null; // keep rendering during exit anim

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black select-none"
      style={{
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.7s ease' : 'opacity 0.4s ease',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Radial burst glow */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: phase === 'hold'
            ? 'radial-gradient(circle, rgba(250,204,21,0.18) 0%, transparent 65%)'
            : 'transparent',
          transition: 'background 0.6s ease',
        }}
      />

      {/* Batman Logo + Text */}
      <div
        className="relative flex flex-col items-center gap-6"
        style={{
          transform: phase === 'enter' ? 'scale(0.6)' : phase === 'hold' ? 'scale(1)' : 'scale(1.1)',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease',
        }}
      >
        {/* Bat Logo SVG */}
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer oval glow */}
          <ellipse cx="80" cy="50" rx="78" ry="48" fill="#facc15" opacity="0.15"/>
          <ellipse cx="80" cy="50" rx="75" ry="45" fill="#000" stroke="#facc15" strokeWidth="4"/>
          {/* Bat silhouette */}
          <path
            d="M80 28 C60 28 48 38 44 44 L36 40 C40 46 44 48 48 47 C46 52 44 56 44 62 C50 58 54 54 56 52 C58 56 60 62 80 62 C100 62 102 56 104 52 C106 54 110 58 116 62 C116 56 114 52 112 47 C116 48 120 46 124 40 L116 44 C112 38 100 28 80 28Z"
            fill="#facc15"
          />
        </svg>

        <div className="text-center space-y-1">
          <p className="text-yellow-300 font-mono text-xs tracking-[0.4em] uppercase">
            WayneTech Portfolio
          </p>
          <h1 className="text-white font-black text-3xl tracking-tight">
            Prasanna Bhurke
          </h1>
          <p className="text-yellow-400/70 font-mono text-[11px] tracking-widest uppercase">
            Senior Software Engineer
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          sessionStorage.setItem('intro-shown', '1');
          onComplete();
        }}
        className="absolute bottom-10 right-10 text-xs font-mono text-slate-600 hover:text-slate-300 transition-colors px-4 py-2 rounded border border-slate-800 hover:border-slate-600"
      >
        Skip Intro →
      </button>
    </div>
  );
}
