import React, { useState } from 'react';
import { Cpu, Zap, Star } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SkillRadarChart() {
  const [activeAxis, setActiveAxis] = useState(0);

  const skillsData = [
    { label: 'AI / Machine Learning', score: 95, color: '#a855f7', tech: 'PyTorch, Scikit-Learn, NLTK, TF-IDF' },
    { label: 'Full Stack Web', score: 92, color: '#38bdf8', tech: 'React, TypeScript, FastAPI, Node.js' },
    { label: 'Systems & C++', score: 88, color: '#f59e0b', tech: 'C++17, Memory Alignment, Cache Locality' },
    { label: 'Database Architect', score: 90, color: '#10b981', tech: 'MySQL, MongoDB, PostgreSQL, Redis' },
    { label: 'DevOps & Cloud', score: 85, color: '#ec4899', tech: 'Docker, GitHub Actions, Linux CLI' }
  ];

  const center = 150;
  const radius = 100;
  const numAxes = skillsData.length;

  // Calculate polygon points
  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (radius * (value / 100));
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = skillsData.map((d, i) => {
    const { x, y } = getCoordinates(i, d.score);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-300">
          <Cpu size={16} />
          <span>Interactive Competency Radar Spider Matrix</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Hover nodes to inspect Domain SLA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* SVG Radar Spider Chart Canvas */}
        <div className="flex justify-center relative">
          <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto overflow-visible">
            
            {/* Concentric Grid Rings (20%, 40%, 60%, 80%, 100%) */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((ringLevel, rIdx) => {
              const ringPoints = skillsData.map((_, i) => {
                const { x, y } = getCoordinates(i, ringLevel * 100);
                return `${x},${y}`;
              }).join(' ');

              return (
                <polygon
                  key={rIdx}
                  points={ringPoints}
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.15)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axes Lines from Center to Perimeter */}
            {skillsData.map((_, i) => {
              const { x, y } = getCoordinates(i, 100);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(168, 85, 247, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Filled Polygon Competency Area */}
            <polygon
              points={points}
              fill="rgba(168, 85, 247, 0.25)"
              stroke="#a855f7"
              strokeWidth="2.5"
              className="transition-all duration-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />

            {/* Interactive Radar Vertex Nodes */}
            {skillsData.map((d, i) => {
              const { x, y } = getCoordinates(i, d.score);
              const isActive = activeAxis === i;

              return (
                <g key={i} className="cursor-pointer" onMouseEnter={() => { sound.playHover(); setActiveAxis(i); }}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? "7" : "5"}
                    fill={d.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

          </svg>
        </div>

        {/* Dynamic Hover Information Display */}
        <div className="space-y-4 font-mono">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{skillsData[activeAxis].label}</span>
              <span className="text-sm font-extrabold" style={{ color: skillsData[activeAxis].color }}>
                {skillsData[activeAxis].score}% Proficiency
              </span>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${skillsData[activeAxis].score}%`, backgroundColor: skillsData[activeAxis].color }}
              />
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              <span className="text-purple-300 font-bold">Tech Specs: </span>
              {skillsData[activeAxis].tech}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {skillsData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { sound.playClick(); setActiveAxis(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-2.5 rounded-lg border text-left text-[11px] transition-all flex items-center justify-between ${
                  activeAxis === idx
                    ? 'bg-purple-950/80 border-purple-400 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="font-bold ml-1">{item.score}%</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
