import React, { useState, useEffect } from 'react';
import BatLogoSvg from './BatLogoSvg';

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
        <BatLogoSvg className="w-40 h-24 drop-shadow-[0_0_25px_rgba(254,208,0,0.6)]" goldBackplate={true} />

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
