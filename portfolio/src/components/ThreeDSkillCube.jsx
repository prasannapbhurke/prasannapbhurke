import React, { useState, useRef } from 'react';
import { Box, Sparkles, RefreshCw, Cpu, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ThreeDSkillCube() {
  const [rot, setRot] = useState({ x: -20, y: 30 });
  const [activeFace, setActiveFace] = useState('Front: AI & ML');
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const faces = [
    {
      name: 'Front: AI & ML',
      transform: 'translateZ(110px)',
      color: 'bg-purple-950/90 border-purple-500/60 text-purple-200',
      title: 'AI / Machine Learning',
      skills: ['PyTorch', 'Scikit-Learn', 'NLTK', 'TF-IDF Vectorizer', 'Naive Bayes & SVM']
    },
    {
      name: 'Back: Full Stack',
      transform: 'rotateY(180deg) translateZ(110px)',
      color: 'bg-sky-950/90 border-sky-500/60 text-sky-200',
      title: 'Full Stack Web',
      skills: ['React', 'FastAPI', 'Node.js', 'Express', 'TypeScript', 'Tailwind CSS']
    },
    {
      name: 'Right: Systems C++',
      transform: 'rotateY(90deg) translateZ(110px)',
      color: 'bg-amber-950/90 border-amber-500/60 text-amber-200',
      title: 'Systems & C++',
      skills: ['C++17', 'Memory Alignment', 'POSIX Threads', 'Cache Locality', 'Data Structures']
    },
    {
      name: 'Left: Database',
      transform: 'rotateY(-90deg) translateZ(110px)',
      color: 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200',
      title: 'Database Architect',
      skills: ['MySQL 3NF', 'MongoDB', 'ACID Integrity', 'Redis Caching', 'PostgreSQL']
    },
    {
      name: 'Top: DevOps',
      transform: 'rotateX(90deg) translateZ(110px)',
      color: 'bg-pink-950/90 border-pink-500/60 text-pink-200',
      title: 'DevOps & Cloud',
      skills: ['Docker', 'Linux CLI', 'GitHub Actions', 'Vite Build Engine', 'REST Microservices']
    },
    {
      name: 'Bottom: Security',
      transform: 'rotateX(-90deg) translateZ(110px)',
      color: 'bg-yellow-950/90 border-yellow-500/60 text-yellow-200',
      title: 'Security & DOM',
      skills: ['Chrome Extension API', 'DOM Injection', 'Client Privacy', 'Bcrypt Auth']
    }
  ];

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    setRot((prev) => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5
    }));

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - lastMouseRef.current.x;
    const dy = e.touches[0].clientY - lastMouseRef.current.y;

    setRot((prev) => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5
    }));

    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const spinToFace = (faceName, targetRot) => {
    sound.playClick();
    setActiveFace(faceName);
    setRot(targetRot);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/90 border border-purple-500/40 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <Box size={16} />
          <span>Interactive 3D Rubik's Skill Cube</span>
        </div>
        <span className="text-slate-400">Click & Drag (or Touch) to rotate 3D cube 360°</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* 3D Cube Viewport */}
        <div
          className="flex justify-center items-center h-[300px] perspective-1000 cursor-grab active:cursor-grabbing select-none touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-[220px] h-[220px] transform-style-3d transition-transform duration-100 ease-out"
            style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
          >
            {faces.map((f, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex flex-col justify-between ${f.color}`}
                style={{ transform: f.transform }}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest block opacity-75">{f.name}</span>
                  <h4 className="text-sm font-extrabold text-white pt-1">{f.title}</h4>
                </div>

                <ul className="space-y-1 text-[11px] font-mono">
                  {f.skills.slice(0, 4).map((sk, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>

                <span className="text-[9px] text-right block opacity-60">WayneTech 3D Core</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Spin Preset Buttons */}
        <div className="space-y-4">
          <span className="text-xs text-slate-400 block font-bold">Spin 3D Cube to Face:</span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => spinToFace('Front: AI & ML', { x: 0, y: 0 })}
              className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs text-left hover:border-purple-300"
            >
              🟣 Front: AI / ML
            </button>
            <button
              onClick={() => spinToFace('Back: Full Stack', { x: 0, y: 180 })}
              className="p-3 rounded-xl bg-sky-950/80 border border-sky-500/40 text-sky-300 text-xs text-left hover:border-sky-300"
            >
              🔵 Back: Full Stack
            </button>
            <button
              onClick={() => spinToFace('Right: Systems C++', { x: 0, y: -90 })}
              className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs text-left hover:border-amber-300"
            >
              🟠 Right: Systems C++
            </button>
            <button
              onClick={() => spinToFace('Left: Database', { x: 0, y: 90 })}
              className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-left hover:border-emerald-300"
            >
              🟢 Left: Database
            </button>
            <button
              onClick={() => spinToFace('Top: DevOps', { x: -90, y: 0 })}
              className="p-3 rounded-xl bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs text-left hover:border-pink-300"
            >
              🌸 Top: DevOps Cloud
            </button>
            <button
              onClick={() => spinToFace('Bottom: Security', { x: 90, y: 0 })}
              className="p-3 rounded-xl bg-yellow-950/80 border border-yellow-500/40 text-yellow-300 text-xs text-left hover:border-yellow-300"
            >
              🟡 Bottom: Security
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
