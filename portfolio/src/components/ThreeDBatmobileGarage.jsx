import React, { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Cpu, Flame, Crosshair } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';

export default function ThreeDBatmobileGarage() {
  const canvasRef = useRef(null);
  const [selectedHotspot, setSelectedHotspot] = useState(0);

  const rotYRef = useRef(0.4);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  const hotspots = [
    {
      id: 0,
      title: 'WayneTech AI Mainframe Core',
      icon: <Cpu size={14} className="text-yellow-300" />,
      desc: 'Sub-50ms NLP Threat Classification & Arkham Security Encryption Core.',
      spec: 'Neural TPU / 98.2% Accuracy'
    },
    {
      id: 1,
      title: 'Jet Turbine Afterburner',
      icon: <Flame size={14} className="text-amber-400 animate-pulse" />,
      desc: 'High-thrust dual turbine afterburner engine with liquid nitro injection.',
      spec: '1,500 HP / 0-60 in 1.8s'
    },
    {
      id: 2,
      title: 'EMP Pulse Disruptor',
      icon: <Zap size={14} className="text-amber-300" />,
      desc: 'Electromagnetic frequency launcher disabling rogue drone systems instantly.',
      spec: '50m Radius / Omni-directional'
    },
    {
      id: 3,
      title: 'Gotham Tactical Armor',
      icon: <Shield size={14} className="text-yellow-400" />,
      desc: 'Carbon-titanium composite body shell with Kevlar-reinforced undercarriage.',
      spec: 'Ballistic Grade / Class-4 Shield'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const width = (canvas.width = 650);
    const height = (canvas.height = 360);

    // 3D Batmobile Wireframe Vertices
    const vertices = [
      // Chassis Base
      { x: -140, y: 30, z: -50 }, { x: 140, y: 30, z: -50 },
      { x: 140, y: 30, z: 50 }, { x: -140, y: 30, z: 50 },

      // Cockpit Roof
      { x: -40, y: -25, z: -30 }, { x: 40, y: -25, z: -30 },
      { x: 40, y: -25, z: 30 }, { x: -40, y: -25, z: 30 },

      // Rear Bat-Fins
      { x: 150, y: -45, z: -55 }, { x: 150, y: -45, z: 55 },

      // Front Bumper Nose
      { x: -160, y: 20, z: 0 },

      // Wheels (FL, FR, RL, RR)
      { x: -90, y: 40, z: -60 }, { x: -90, y: 40, z: 60 },
      { x: 90, y: 40, z: -60 }, { x: 90, y: 40, z: 60 }
    ];

    const edges = [
      // Chassis Bottom Ring
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Nose Connections
      [0, 10], [3, 10], [4, 10], [7, 10],
      // Cockpit Roof
      [4, 5], [5, 6], [6, 7], [7, 4],
      // Cockpit Pillars to Chassis
      [4, 0], [5, 1], [6, 2], [7, 3],
      // Bat-Fins
      [1, 8], [5, 8], [2, 9], [6, 9]
    ];

    // Afterburner Particles
    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: 140,
        y: 25 + (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 30,
        vx: Math.random() * 8 + 6,
        life: Math.random(),
        size: Math.random() * 4 + 2
      });
    }

    const project3D = (x, y, z, ry) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const rx = 0.25; // fixed tilt angle
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 380;
      const scale = fov / (fov + z2 + 200);
      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        scale
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto Y Rotation when not dragging
      if (!isDraggingRef.current) {
        rotYRef.current += 0.005;
      }
      const ry = rotYRef.current;

      // Draw Perspective Grid Ground
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.08)';
      ctx.lineWidth = 1;
      for (let g = -250; g <= 250; g += 50) {
        const p1 = project3D(g, 50, -250, ry);
        const p2 = project3D(g, 50, 250, ry);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Project Vertices
      const proj = vertices.map((v) => project3D(v.x, v.y, v.z, ry));

      // Draw Wireframe Edges
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#facc15';

      edges.forEach(([i, j]) => {
        const p1 = proj[i];
        const p2 = proj[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // Draw Wheels
      [11, 12, 13, 14].forEach((idx) => {
        const p = proj[idx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#090a0f';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      });

      // Update & Draw Exhaust Afterburner Flames
      particles.forEach((pt) => {
        pt.x += pt.vx;
        pt.life -= 0.03;
        if (pt.life <= 0) {
          pt.x = 140;
          pt.life = 1;
        }

        const p = project3D(pt.x, pt.y, pt.z, ry);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pt.size * pt.life * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${pt.life})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#facc15';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Hotspot Target Markers (Cockpit, Engine, Fin, Nose)
      const targetIndices = [5, 8, 1, 10];
      targetIndices.forEach((vIdx, hIdx) => {
        const p = proj[vIdx];
        const isSel = selectedHotspot === hIdx;

        ctx.beginPath();
        ctx.arc(p.x, p.y, isSel ? 9 : 6, 0, Math.PI * 2);
        ctx.fillStyle = isSel ? '#facc15' : '#000000';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedHotspot]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    rotYRef.current += dx * 0.008;
    lastXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const current = hotspots[selectedHotspot];

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-950 border border-yellow-500/40 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-yellow-300 font-bold">
          <BatLogoSvg className="w-5 h-4" goldBackplate={true} />
          <span>WayneTech 3D Batmobile Tactical Garage</span>
        </div>
        <span className="text-slate-400">Drag canvas to rotate vehicle 360°</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D Canvas Viewport */}
        <div
          className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-yellow-500/40 bg-black shadow-2xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas ref={canvasRef} className="w-full h-auto block" />

          <div className="absolute top-3 left-3 text-[11px] text-yellow-300 font-bold flex items-center gap-1.5 bg-black/80 px-3 py-1 rounded-full border border-yellow-500/40">
            <Crosshair size={13} className="animate-spin" />
            <span>BAT-MOBILE PROTOCOL v4.2</span>
          </div>
        </div>

        {/* Hotspots Info Card Panel */}
        <div className="space-y-3">
          {hotspots.map((hs, idx) => (
            <button
              key={idx}
              onClick={() => { sound.playClick(); setSelectedHotspot(idx); }}
              onMouseEnter={() => sound.playHover()}
              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex flex-col gap-1.5 ${
                selectedHotspot === idx
                  ? 'bg-yellow-950/80 border-yellow-400 text-yellow-300 shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-400/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  {hs.icon}
                  {hs.title}
                </span>
                <span className="text-[10px] text-yellow-300 font-bold">{hs.spec}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{hs.desc}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
