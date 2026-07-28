import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { sound } from '../utils/sound';

// Gotham Storm — random lightning flashes + thunder booms in Batman mode
export default function GothamStorm({ active }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!active) return;

    const triggerStorm = () => {
      // Double flash
      setFlash(true);
      setTimeout(() => setFlash(false), 80);
      setTimeout(() => setFlash(true), 160);
      setTimeout(() => setFlash(false), 250);

      // Thunder boom via Web Audio API
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        src.start();
      } catch {}
    };

    // Random interval between 20–40 seconds
    const schedule = () => {
      const delay = 20000 + Math.random() * 20000;
      return setTimeout(() => {
        triggerStorm();
        timerRef = schedule(); // reschedule
      }, delay);
    };

    let timerRef = schedule();
    return () => clearTimeout(timerRef);
  }, [active]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99998]"
      style={{
        background: flash ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: flash ? 'none' : 'background 0.08s ease',
      }}
    />
  );
}
