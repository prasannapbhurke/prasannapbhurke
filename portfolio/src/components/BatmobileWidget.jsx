import React, { useState, useEffect } from 'react';
import { Gauge, Shield, Flame, Radio } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';
import confetti from 'canvas-confetti';

export default function BatmobileWidget() {
  const [isBatman, setIsBatman] = useState(false);
  const [speed, setSpeed] = useState(65);
  const [boosting, setBoosting] = useState(false);
  const [stealth, setStealth] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  if (!isBatman) return null;

  const triggerBoost = () => {
    sound.playBatmanThemeSound();
    setBoosting(true);
    setSpeed(220);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.85 },
      colors: ['#facc15', '#eab308', '#38bdf8']
    });

    setTimeout(() => {
      setSpeed(65);
      setBoosting(false);
    }, 2500);
  };

  const toggleStealth = () => {
    sound.playClick();
    setStealth(!stealth);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full font-mono text-xs animate-fadeIn">
      <div className={`glass-card p-4 border transition-all duration-300 ${
        stealth
          ? 'bg-slate-950/95 border-yellow-500/80 shadow-2xl shadow-yellow-500/30'
          : 'bg-black/90 border-yellow-500/50 shadow-xl shadow-yellow-950/60'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-yellow-500/30">
          <div className="flex items-center gap-2">
            <BatLogoSvg className="w-6 h-4" goldBackplate={true} />
            <span className="font-extrabold tracking-wider text-yellow-400">WAYNETECH BATMOBILE HUD</span>
          </div>
          <button 
            onClick={() => setMinimized(!minimized)}
            className="text-yellow-400/70 hover:text-yellow-300 font-bold px-1.5"
          >
            {minimized ? '[ + ]' : '[ _ ]'}
          </button>
        </div>

        {!minimized && (
          <div className="mt-3 space-y-3">
            {/* Status & Speedometer */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-yellow-500/20">
              <div>
                <span className="text-[10px] text-slate-400 block">PATROL SPEED</span>
                <span className="text-sm font-bold text-yellow-300 flex items-center gap-1">
                  <Gauge size={14} className="text-yellow-400" /> {speed} MPH
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">STEALTH ARMOR</span>
                <span className={`text-sm font-bold flex items-center gap-1 ${stealth ? 'text-emerald-400' : 'text-slate-300'}`}>
                  <Shield size={14} /> {stealth ? 'CLOAKED' : 'STANDARD'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={triggerBoost}
                disabled={boosting}
                className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                  boosting 
                    ? 'bg-yellow-400 text-black animate-bounce ring-2 ring-yellow-300' 
                    : 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 border border-yellow-500/40'
                }`}
              >
                <Flame size={14} className={boosting ? 'text-black animate-pulse' : 'text-yellow-400'} />
                <span>{boosting ? 'AFTERBURNER!' : 'JET BOOST'}</span>
              </button>

              <button
                onClick={toggleStealth}
                className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1 transition-all border ${
                  stealth
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-yellow-500/50'
                }`}
              >
                <Radio size={14} />
                <span>{stealth ? 'CLOAK' : 'STEALTH'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
