import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Radio, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import { useToast } from './ToastManager';

const PARTICLE_COUNT = 3200;

export default function ThreeDQuantumBlackHole() {
  const canvasRef = useRef(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [shockwaves, setShockwaves] = useState([]);
  const [isBatman, setIsBatman] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const shockwavesRef = useRef([]);
  const { toast } = useToast();

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  // Supernova Shockwave on Click
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left - canvas.width / 2;
    const clickY = e.clientY - rect.top - canvas.height / 2;

    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 5,
      maxRadius: 280,
      alpha: 1,
    });

    sound.playSuccess();
    toast('💥 Supernova Shockwave Triggered!', 'batman', 2500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Initialize 3D Particle accretion disk
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 260;
      const speed = (1 / radius) * 45 + Math.random() * 0.2;
      const size = Math.random() * 2 + 0.8;
      const z = (Math.random() - 0.5) * 80;

      return {
        angle,
        radius,
        baseRadius: radius,
        speed,
        size,
        z,
        color: Math.random() > 0.35 ? (isBatman ? '#facc15' : '#a855f7') : '#38bdf8',
      };
    });

    const render = () => {
      const W = (canvas.width = canvas.offsetWidth || 750);
      const H = (canvas.height = 420);
      const cx = W / 2;
      const cy = H / 2;

      ctx.fillStyle = 'rgba(5, 6, 10, 0.28)';
      ctx.fillRect(0, 0, W, H);

      const time = Date.now() * 0.001;

      // 1. Draw Event Horizon Core & Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      coreGrad.addColorStop(0, '#000000');
      coreGrad.addColorStop(0.4, '#000000');
      coreGrad.addColorStop(0.7, isBatman ? 'rgba(250,204,21,0.35)' : 'rgba(168,85,247,0.35)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fill();

      // Black Hole Event Horizon Ring
      ctx.strokeStyle = isBatman ? '#facc15' : '#c084fc';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = isBatman ? '#facc15' : '#a855f7';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 2. Render & Update Shockwaves
      shockwavesRef.current.forEach((sw) => {
        sw.radius += 8;
        sw.alpha -= 0.025;

        ctx.strokeStyle = isBatman ? `rgba(250,204,21,${sw.alpha})` : `rgba(168,85,247,${sw.alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx + sw.x, cy + sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      shockwavesRef.current = shockwavesRef.current.filter((sw) => sw.alpha > 0);

      // 3. Render Particles in Accretion Disk
      particles.forEach((p) => {
        p.angle += p.speed * 0.04;

        // Gravitational Warp towards Mouse
        let targetX = cx + Math.cos(p.angle) * p.radius;
        let targetY = cy + Math.sin(p.angle) * (p.radius * 0.45); // 3D perspective tilt

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - targetX;
          const dy = mouseRef.current.y - targetY;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const pull = (180 - dist) * 0.08;
            targetX += (dx / dist) * pull;
            targetY += (dy / dist) * pull;
          }
        }

        // Apply Shockwave Force
        shockwavesRef.current.forEach((sw) => {
          const dx = targetX - (cx + sw.x);
          const dy = targetY - (cy + sw.y);
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - sw.radius) < 25) {
            p.radius += 6;
          }
        });

        // Slowly decay pulled radius back to base
        p.radius += (p.baseRadius - p.radius) * 0.02;

        // 3D Perspective scale
        const scale = (p.z + 100) / 100;
        const finalSize = p.size * scale;
        const opacity = Math.min(1, Math.max(0.2, scale * 0.8));

        ctx.beginPath();
        ctx.arc(targetX, targetY, Math.max(0.5, finalSize), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isBatman]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div className={`p-6 rounded-2xl border space-y-4 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <Sparkles size={18} />
          <span>3D Quantum Black Hole / Gravitational Core Shader</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">3,200 Particles • 60 FPS</span>
          <button
            onClick={() => {
              setIsAudioActive((a) => !a);
              sound.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all ${
              isAudioActive
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{isAudioActive ? 'Audio Reactive' : 'Enable Audio'}</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full"
          style={{ height: 420 }}
        />

        <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 backdrop-blur-md">
          🌌 Click anywhere to trigger Supernova Shockwave • Move mouse to distort spacetime
        </div>
      </div>
    </div>
  );
}
