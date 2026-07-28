import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, RotateCcw, Trophy, Zap, Shield, Flame } from 'lucide-react';
import { sound } from '../utils/sound';
import { unlock, ACHIEVEMENTS } from '../utils/achievements';
import { useToast } from './ToastManager';

const TECH_BOXES_DEF = [
  { id: 1, name: 'Python', color: '#38bdf8', x: 200, y: -150, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 2, name: 'PyTorch', color: '#f97316', x: -220, y: -100, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 3, name: 'FastAPI', color: '#10b981', x: 180, y: 180, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 4, name: 'C++', color: '#a855f7', x: -200, y: 160, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 5, name: 'Docker', color: '#0284c7', x: 0, y: -250, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 6, name: 'Scikit', color: '#eab308', x: 0, y: 240, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 7, name: 'React', color: '#06b6d4', x: -300, y: 0, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
  { id: 8, name: 'SQL', color: '#ec4899', x: 300, y: 0, z: 0, vx: 0, vy: 0, rot: 0, knocked: false },
];

export default function ThreeDBatmobileDrive() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [knockedCount, setKnockedCount] = useState(0);
  const [isBatman, setIsBatman] = useState(false);
  const { toast } = useToast();

  const carRef = useRef({
    x: 0,
    y: 0,
    angle: -Math.PI / 2,
    speed: 0,
    maxSpeed: 7,
    accel: 0.2,
    decel: 0.08,
    turnSpeed: 0.055,
  });

  const keysRef = useRef({
    ArrowUp: false, KeyW: false,
    ArrowDown: false, KeyS: false,
    ArrowLeft: false, KeyA: false,
    ArrowRight: false, KeyD: false,
  });

  const boxesRef = useRef(JSON.parse(JSON.stringify(TECH_BOXES_DEF)));
  const particlesRef = useRef([]);
  const trophiesRef = useRef([
    { id: 1, x: -350, y: -250, collected: false },
    { id: 2, x: 350, y: 250, collected: false },
  ]);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        keysRef.current[e.code] = true;
      }
    };
    const onKeyUp = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        keysRef.current[e.code] = false;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const resetArena = () => {
    carRef.current = {
      x: 0,
      y: 0,
      angle: -Math.PI / 2,
      speed: 0,
      maxSpeed: 7,
      accel: 0.2,
      decel: 0.08,
      turnSpeed: 0.055,
    };
    boxesRef.current = JSON.parse(JSON.stringify(TECH_BOXES_DEF));
    trophiesRef.current = [
      { id: 1, x: -350, y: -250, collected: false },
      { id: 2, x: 350, y: 250, collected: false },
    ];
    setScore(0);
    setKnockedCount(0);
    sound.playClick();
  };

  // Main Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const W = (canvas.width = canvas.offsetWidth || 750);
      const H = (canvas.height = 420);
      const centerX = W / 2;
      const centerY = H / 2;

      const car = carRef.current;
      const keys = keysRef.current;

      // 1. Controls & Velocity Update
      const isAccelerating = keys.ArrowUp || keys.KeyW;
      const isReversing = keys.ArrowDown || keys.KeyS;
      const isTurningLeft = keys.ArrowLeft || keys.KeyA;
      const isTurningRight = keys.ArrowRight || keys.KeyD;

      if (isAccelerating) {
        car.speed = Math.min(car.speed + car.accel, car.maxSpeed);
      } else if (isReversing) {
        car.speed = Math.max(car.speed - car.accel, -car.maxSpeed * 0.5);
      } else {
        if (car.speed > 0) car.speed = Math.max(0, car.speed - car.decel);
        else if (car.speed < 0) car.speed = Math.min(0, car.speed + car.decel);
      }

      if (Math.abs(car.speed) > 0.1) {
        const dir = car.speed > 0 ? 1 : -1;
        if (isTurningLeft) car.angle -= car.turnSpeed * dir;
        if (isTurningRight) car.angle += car.turnSpeed * dir;
      }

      car.x += Math.cos(car.angle) * car.speed;
      car.y += Math.sin(car.angle) * car.speed;

      // Arena boundaries (soft bounce)
      const boundX = W / 2 - 40;
      const boundY = H / 2 - 40;
      if (Math.abs(car.x) > boundX) {
        car.x = Math.sign(car.x) * boundX;
        car.speed *= -0.5;
      }
      if (Math.abs(car.y) > boundY) {
        car.y = Math.sign(car.y) * boundY;
        car.speed *= -0.5;
      }

      setSpeed(Math.round(Math.abs(car.speed) * 18));

      // Tire Drift Smoke Particles
      if (Math.abs(car.speed) > 3.5 && (isTurningLeft || isTurningRight)) {
        particlesRef.current.push({
          x: car.x - Math.cos(car.angle) * 20 + (Math.random() - 0.5) * 8,
          y: car.y - Math.sin(car.angle) * 20 + (Math.random() - 0.5) * 8,
          radius: Math.random() * 4 + 2,
          alpha: 0.6,
          life: 1,
        });
      }

      // 2. Clear Background
      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, W, H);

      // Grid Pattern
      ctx.strokeStyle = isBatman ? 'rgba(250,204,21,0.06)' : 'rgba(168,85,247,0.06)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = (centerX + car.x * 0.1) % gridSize; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = (centerY + car.y * 0.1) % gridSize; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Draw Arena Border
      ctx.strokeStyle = isBatman ? 'rgba(250,204,21,0.4)' : 'rgba(168,85,247,0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(centerX - boundX, centerY - boundY, boundX * 2, boundY * 2);

      // 3. Render Drift Particles
      particlesRef.current.forEach((p, idx) => {
        p.life -= 0.03;
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isBatman ? `rgba(250,204,21,${p.life * 0.4})` : `rgba(168,85,247,${p.life * 0.4})`;
        ctx.fill();
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // 4. Render & Update Trophies
      trophiesRef.current.forEach((t) => {
        if (t.collected) return;
        const tx = centerX + t.x;
        const ty = centerY + t.y;

        // Collision check
        const dist = Math.hypot(car.x - t.x, car.y - t.y);
        if (dist < 32) {
          t.collected = true;
          setScore((s) => s + 500);
          sound.playSuccess();
          toast('🏆 Batcave Trophy Collected! +500 PTS', 'achievement', 3000);
          unlock(ACHIEVEMENTS.BATMAN_MODE);
        }

        // Draw Trophy
        ctx.save();
        ctx.translate(tx, ty);
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏆', 0, 0);
        ctx.restore();
      });

      // 5. Render & Physics for 3D Tech Boxes
      let currentKnocked = 0;
      boxesRef.current.forEach((box) => {
        // Friction decay
        box.vx *= 0.94;
        box.vy *= 0.94;
        box.x += box.vx;
        box.y += box.vy;
        box.rot += Math.hypot(box.vx, box.vy) * 0.05;

        // Collision with Car
        const dist = Math.hypot(car.x - box.x, car.y - box.y);
        if (dist < 34) {
          const angle = Math.atan2(box.y - car.y, box.x - car.x);
          const force = Math.max(Math.abs(car.speed) * 1.8, 3);
          box.vx = Math.cos(angle) * force;
          box.vy = Math.sin(angle) * force;

          if (!box.knocked) {
            box.knocked = true;
            setScore((s) => s + 100);
            sound.playClick();
          }
        }

        if (box.knocked) currentKnocked++;

        // Draw 3D Box
        const bx = centerX + box.x;
        const by = centerY + box.y;
        const size = 38;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(box.rot);

        // 3D Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(-size / 2 + 4, -size / 2 + 4, size, size);

        // Box Body
        ctx.fillStyle = box.knocked ? '#1e293b' : '#0f172a';
        ctx.strokeStyle = box.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, 8);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = box.color;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(box.name, 0, 0);

        ctx.restore();
      });

      setKnockedCount(currentKnocked);

      // 6. Draw 3D Batmobile Vehicle
      const cx = centerX + car.x;
      const cy = centerY + car.y;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(car.angle);

      // Headlight Beam Cone
      const lightGrad = ctx.createRadialGradient(25, 0, 0, 60, 0, 70);
      lightGrad.addColorStop(0, isBatman ? 'rgba(250,204,21,0.45)' : 'rgba(168,85,247,0.45)');
      lightGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(15, -6);
      ctx.lineTo(80, -35);
      ctx.lineTo(80, 35);
      ctx.lineTo(15, 6);
      ctx.closePath();
      ctx.fillStyle = lightGrad;
      ctx.fill();

      // Car Body (Batmobile Silhouette)
      ctx.fillStyle = isBatman ? '#090a0f' : '#0f172a';
      ctx.strokeStyle = isBatman ? '#facc15' : '#a855f7';
      ctx.lineWidth = 2;

      // Chassis
      ctx.beginPath();
      ctx.moveTo(22, 0); // nose
      ctx.lineTo(10, -12);
      ctx.lineTo(-12, -14); // rear left fin
      ctx.lineTo(-20, -18);
      ctx.lineTo(-15, -6);
      ctx.lineTo(-20, 0); // rear center exhaust
      ctx.lineTo(-15, 6);
      ctx.lineTo(-20, 18);
      ctx.lineTo(-12, 14); // rear right fin
      ctx.lineTo(10, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit Glow
      ctx.fillStyle = isBatman ? '#facc15' : '#c084fc';
      ctx.beginPath();
      ctx.ellipse(2, 0, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Exhaust Flame when accelerating
      if (isAccelerating) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-32 - Math.random() * 8, -4 + Math.random() * 8);
        ctx.lineTo(-20, 4);
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isBatman, toast]);

  return (
    <div className={`p-6 rounded-2xl border space-y-4 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      {/* Header HUD */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <Gamepad2 size={18} />
          <span>3D Batmobile Interactive Arena</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Speed: <span className={`font-bold ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>{speed} MPH</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Tech Knocked: <span className="font-bold text-emerald-400">{knockedCount}/8</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Score: <span className="font-bold text-yellow-400">{score} PTS</span>
          </div>
          <button
            onClick={resetArena}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800">
        <canvas ref={canvasRef} className="w-full" style={{ height: 420 }} />

        {/* Touch Controls for Mobile */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 sm:hidden">
          <button
            onMouseDown={() => (keysRef.current.KeyW = true)}
            onMouseUp={() => (keysRef.current.KeyW = false)}
            onTouchStart={() => (keysRef.current.KeyW = true)}
            onTouchEnd={() => (keysRef.current.KeyW = false)}
            className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold flex items-center justify-center"
          >
            ▲
          </button>
          <div className="flex gap-1">
            <button
              onMouseDown={() => (keysRef.current.KeyA = true)}
              onMouseUp={() => (keysRef.current.KeyA = false)}
              onTouchStart={() => (keysRef.current.KeyA = true)}
              onTouchEnd={() => (keysRef.current.KeyA = false)}
              className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold flex items-center justify-center"
            >
              ◀
            </button>
            <button
              onMouseDown={() => (keysRef.current.KeyS = true)}
              onMouseUp={() => (keysRef.current.KeyS = false)}
              onTouchStart={() => (keysRef.current.KeyS = true)}
              onTouchEnd={() => (keysRef.current.KeyS = false)}
              className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold flex items-center justify-center"
            >
              ▼
            </button>
            <button
              onMouseDown={() => (keysRef.current.KeyD = true)}
              onMouseUp={() => (keysRef.current.KeyD = false)}
              onTouchStart={() => (keysRef.current.KeyD = true)}
              onTouchEnd={() => (keysRef.current.KeyD = false)}
              className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold flex items-center justify-center"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
        <span>🎮 Controls: Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">WASD</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Arrow Keys</kbd> to drive & turn.</span>
        <span>💥 Crash into Tech Stack Cubes to score points! Collect hidden 🏆 Trophies.</span>
      </div>
    </div>
  );
}
