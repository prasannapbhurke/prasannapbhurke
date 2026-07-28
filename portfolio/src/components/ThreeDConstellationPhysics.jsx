import React, { useEffect, useRef, useState } from 'react';
import { Orbit, Sparkles, Sliders, RefreshCw, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { useToast } from './ToastManager';

const NODES_DEF = [
  { id: 'python', name: 'Python 3.12', mass: 12, color: '#38bdf8', category: 'Core', r: 24, level: '95%' },
  { id: 'pytorch', name: 'PyTorch / ML', mass: 10, color: '#f97316', category: 'AI/ML', r: 22, level: '92%' },
  { id: 'fastapi', name: 'FastAPI', mass: 8, color: '#10b981', category: 'Backend', r: 20, level: '90%' },
  { id: 'cpp', name: 'C++ Systems', mass: 9, color: '#a855f7', category: 'Systems', r: 21, level: '85%' },
  { id: 'react', name: 'React 18', mass: 9, color: '#06b6d4', category: 'Frontend', r: 21, level: '95%' },
  { id: 'docker', name: 'Docker / DevOps', mass: 7, color: '#0284c7', category: 'DevOps', r: 18, level: '88%' },
  { id: 'sql', name: 'PostgreSQL / SQL', mass: 8, color: '#ec4899', category: 'Database', r: 19, level: '90%' },
  { id: 'nlp', name: 'NLP / SpaCy', mass: 9, color: '#eab308', category: 'AI/ML', r: 21, level: '92%' },
  { id: 'scikit', name: 'Scikit-Learn', mass: 8, color: '#84cc16', category: 'AI/ML', r: 19, level: '92%' },
];

export default function ThreeDConstellationPhysics() {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [gravityG, setGravityG] = useState(0.8);
  const [isBatman, setIsBatman] = useState(false);
  const nodesRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  // Initialize N-body particles in 3D orbit
  useEffect(() => {
    const total = NODES_DEF.length;
    nodesRef.current = NODES_DEF.map((def, idx) => {
      const angle = (idx / total) * Math.PI * 2;
      const dist = 110 + (idx % 3) * 45;
      return {
        ...def,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z: (Math.random() - 0.5) * 60,
        vx: -Math.sin(angle) * (1.8 + Math.random() * 0.5),
        vy: Math.cos(angle) * (1.8 + Math.random() * 0.5),
        vz: (Math.random() - 0.5) * 0.5,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const W = (canvas.width = canvas.offsetWidth || 750);
      const H = (canvas.height = 420);
      const cx = W / 2;
      const cy = H / 2;

      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, W, H);

      const nodes = nodesRef.current;

      // 1. Central Mass ("Prasanna AI Core")
      const coreR = 30;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      coreGrad.addColorStop(0, isBatman ? '#facc15' : '#a855f7');
      coreGrad.addColorStop(0.5, isBatman ? 'rgba(250,204,21,0.4)' : 'rgba(168,85,247,0.4)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isBatman ? '#facc15' : '#c084fc';
      ctx.font = 'bold 11px font-mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PRASANNA CORE', cx, cy);

      // 2. Gravitational Physics N-Body calculations
      nodes.forEach((n1, i) => {
        if (draggedNodeRef.current === n1) return;

        // Gravity pull toward central core
        const distCore = Math.hypot(n1.x, n1.y);
        if (distCore > 40) {
          const forceCore = (gravityG * 120) / (distCore * distCore);
          n1.vx -= (n1.x / distCore) * forceCore;
          n1.vy -= (n1.y / distCore) * forceCore;
        }

        // Repulsion between nodes (collision avoidance)
        nodes.forEach((n2, j) => {
          if (i === j) return;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = n1.r + n2.r + 15;
          if (dist < minDist && dist > 0) {
            const push = (minDist - dist) * 0.04;
            n1.vx -= (dx / dist) * push;
            n1.vy -= (dy / dist) * push;
          }
        });

        // Speed dampening & movement
        n1.vx *= 0.992;
        n1.vy *= 0.992;
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Arena bounce
        const boundX = W / 2 - 40;
        const boundY = H / 2 - 40;
        if (Math.abs(n1.x) > boundX) { n1.x = Math.sign(n1.x) * boundX; n1.vx *= -0.7; }
        if (Math.abs(n1.y) > boundY) { n1.y = Math.sign(n1.y) * boundY; n1.vy *= -0.7; }
      });

      // 3. Draw Connecting Springs / Constellation Web
      ctx.strokeStyle = isBatman ? 'rgba(250,204,21,0.12)' : 'rgba(168,85,247,0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(cx + n1.x, cy + n1.y);
            ctx.lineTo(cx + n2.x, cy + n2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Render Nodes
      nodes.forEach((n) => {
        const nx = cx + n.x;
        const ny = cy + n.y;
        const isSelected = selectedNode?.id === n.id;

        // Node Glow & Body
        ctx.shadowBlur = isSelected ? 20 : 8;
        ctx.shadowColor = n.color;

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = isSelected ? '#ffffff' : n.color;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Node Title Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.name.split(' ')[0], nx, ny);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gravityG, selectedNode, isBatman]);

  // Mouse Interactivity
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - canvas.width / 2;
    const my = e.clientY - rect.top - canvas.height / 2;

    const clicked = nodesRef.current.find((n) => Math.hypot(n.x - mx, n.y - my) < n.r + 5);
    if (clicked) {
      draggedNodeRef.current = clicked;
      setSelectedNode(clicked);
      sound.playClick();
      toast(`🪐 Selected Skill: ${clicked.name} — Proficiency: ${clicked.level}`, 'info', 2500);
    }
  };

  const handleMouseMove = (e) => {
    if (!draggedNodeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - canvas.width / 2;
    const my = e.clientY - rect.top - canvas.height / 2;

    draggedNodeRef.current.x = mx;
    draggedNodeRef.current.y = my;
    draggedNodeRef.current.vx = 0;
    draggedNodeRef.current.vy = 0;
  };

  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      // Give random toss impulse
      draggedNodeRef.current.vx = (Math.random() - 0.5) * 4;
      draggedNodeRef.current.vy = (Math.random() - 0.5) * 4;
      draggedNodeRef.current = null;
    }
  };

  const resetOrbit = () => {
    setGravityG(0.8);
    setSelectedNode(null);
    sound.playClick();
  };

  return (
    <div className={`p-6 rounded-2xl border space-y-4 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <Orbit size={18} />
          <span>3D N-Body Gravitational Physics Skill Constellation</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Gravity:</span>
            <input
              type="range" min="0.1" max="2.5" step="0.1"
              value={gravityG}
              onChange={(e) => setGravityG(Number(e.target.value))}
              className="w-24 accent-purple-500"
            />
          </div>
          <button
            onClick={resetOrbit}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset Physics"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Selected Skill Banner */}
      {selectedNode && (
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs animate-fadeIn ${
          isBatman ? 'bg-yellow-950/60 border-yellow-400/40 text-yellow-200' : 'bg-purple-950/60 border-purple-400/40 text-purple-200'
        }`}>
          <div className="flex items-center gap-2 font-bold">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedNode.color }} />
            <span>{selectedNode.name} ({selectedNode.category})</span>
          </div>
          <span className="font-bold">Mastery Level: {selectedNode.level}</span>
        </div>
      )}

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full"
          style={{ height: 420 }}
        />

        <div className="absolute bottom-3 left-4 pointer-events-none text-[11px] text-slate-500">
          🪐 Click any 3D node to inspect stats • Drag and toss planets in space to test 3D gravity physics
        </div>
      </div>
    </div>
  );
}
