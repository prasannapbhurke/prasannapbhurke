import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Sparkles, Orbit, Activity } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ThreeDTechGalaxy() {
  const canvasRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  const rotYRef = useRef(0.2);
  const rotXRef = useRef(0.3);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const planets = [
    {
      id: 0,
      name: 'AI & Machine Learning',
      color: '#a855f7',
      orbitRadius: 90,
      speed: 0.012,
      moons: ['PyTorch', 'Scikit-Learn', 'NLTK'],
      desc: 'Supervised classification, TF-IDF vectorization, and spam detection architectures.'
    },
    {
      id: 1,
      name: 'Full Stack Web Platform',
      color: '#38bdf8',
      orbitRadius: 140,
      speed: 0.008,
      moons: ['React', 'TypeScript', 'FastAPI'],
      desc: 'Asynchronous ASGI microservices, reactive UI components, and state reducers.'
    },
    {
      id: 2,
      name: 'Systems & C++ Engine',
      color: '#f59e0b',
      orbitRadius: 185,
      speed: 0.006,
      moons: ['C++17', 'Memory Alignment', 'POSIX Threads'],
      desc: 'Low-latency flight reservation engines and cache-friendly data structures.'
    },
    {
      id: 3,
      name: 'Database & Cloud Architecture',
      color: '#10b981',
      orbitRadius: 230,
      speed: 0.004,
      moons: ['MySQL', 'Docker', 'Redis'],
      desc: 'ACID transactional integrity, normalized 3NF schemas, and containerization.'
    }
  ];

  const angleRef = useRef(planets.map(() => Math.random() * Math.PI * 2));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const width = (canvas.width = 650);
    const height = (canvas.height = 360);

    const project3D = (x, y, z, rx, ry) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 380;
      const scale = fov / (fov + z2 + 150);
      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        scale,
        z: z2
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isDraggingRef.current) {
        rotYRef.current += 0.003;
      }
      const rx = rotXRef.current;
      const ry = rotYRef.current;

      // Draw Starfield Background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let s = 0; s < 40; s++) {
        const sx = (Math.sin(s * 99) * 0.5 + 0.5) * width;
        const sy = (Math.cos(s * 33) * 0.5 + 0.5) * height;
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      // Draw Orbiting Rings
      planets.forEach((p) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, 0.15)`;
        ctx.lineWidth = 1;

        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const ox = Math.cos(a) * p.orbitRadius;
          const oz = Math.sin(a) * p.orbitRadius;
          const proj = project3D(ox, 0, oz, rx, ry);
          if (a === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      });

      // Draw Central Star (Prasanna Engine Core)
      const sunProj = project3D(0, 0, 0, rx, ry);
      ctx.beginPath();
      ctx.arc(sunProj.x, sunProj.y, 16 * sunProj.scale, 0, Math.PI * 2);
      ctx.fillStyle = '#facc15';
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#facc15';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update & Draw Planets
      const projectedPlanets = planets.map((p, idx) => {
        angleRef.current[idx] += p.speed;
        const ang = angleRef.current[idx];

        const px = Math.cos(ang) * p.orbitRadius;
        const pz = Math.sin(ang) * p.orbitRadius;
        const proj = project3D(px, 0, pz, rx, ry);

        return { ...p, proj, ang, px, pz };
      });

      // Sort by Z for proper 3D depth rendering
      projectedPlanets.sort((a, b) => b.proj.z - a.proj.z);

      projectedPlanets.forEach((p) => {
        const isSel = selectedPlanet === p.id;
        const r = (isSel ? 11 : 8) * p.proj.scale;

        // Draw Planet Sphere
        ctx.beginPath();
        ctx.arc(p.proj.x, p.proj.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isSel ? 2 : 1;
        ctx.stroke();

        // Planet Label
        ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
        ctx.font = `${Math.max(9, 10 * p.proj.scale)}px "Fira Code", monospace`;
        ctx.fillText(p.name, p.proj.x + r + 5, p.proj.y + 3);

        // Draw Orbiting Moons
        p.moons.forEach((mName, mIdx) => {
          const mAng = p.ang * 2.5 + (mIdx * Math.PI * 2) / p.moons.length;
          const mx = p.px + Math.cos(mAng) * 22;
          const mz = p.pz + Math.sin(mAng) * 22;
          const mProj = project3D(mx, 0, mz, rx, ry);

          ctx.beginPath();
          ctx.arc(mProj.x, mProj.y, 3 * mProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#cbd5e1';
          ctx.fill();
        });
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedPlanet]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotYRef.current += dx * 0.008;
    rotXRef.current += dy * 0.008;

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const current = planets[selectedPlanet];

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-purple-500/40 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <Orbit size={16} />
          <span>Interactive 3D Tech Solar System & Galaxy</span>
        </div>
        <span className="text-slate-400">Drag to orbit 3D galaxy 360°</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D Viewport */}
        <div
          className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-purple-500/40 bg-[#06070a] shadow-2xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas ref={canvasRef} className="w-full h-auto block" />
        </div>

        {/* Planet Specs Panel */}
        <div className="space-y-3">
          {planets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => { sound.playClick(); setSelectedPlanet(idx); }}
              onMouseEnter={() => sound.playHover()}
              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex flex-col gap-1.5 ${
                selectedPlanet === idx
                  ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg shadow-purple-950/50 ring-1 ring-purple-400/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {p.moons.map((m, mIdx) => (
                  <span key={mIdx} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-purple-300 border border-purple-500/20">
                    {m}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
