import React, { useRef, useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const COMPLEXITIES = [
  { label: 'O(1)',      color: '#10b981', fn: ()  => 1 },
  { label: 'O(log n)', color: '#38bdf8', fn: (n) => Math.log2(n) },
  { label: 'O(n)',     color: '#a855f7', fn: (n) => n },
  { label: 'O(n log n)', color: '#f59e0b', fn: (n) => n * Math.log2(n) },
  { label: 'O(n²)',    color: '#ef4444', fn: (n) => n * n },
];

export default function BigOVisualizer() {
  const canvasRef = useRef(null);
  const [n, setN] = useState(50);
  const [hovered, setHovered] = useState(null);
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth || 580;
    const H = canvas.height = 260;

    ctx.clearRect(0, 0, W, H);

    const PAD = { top: 20, right: 20, bottom: 40, left: 55 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    const maxN = 100;
    const nSteps = maxN;

    // Determine Y max (cap at n² for visibility of other lines)
    const yMax = Math.min(n * n * 1.1, 10000);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const y = PAD.top + (plotH * g) / 4;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + plotW, y); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font = '10px monospace';
      ctx.fillText(Math.round(yMax * (1 - g / 4)), 4, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    for (let g = 0; g <= 4; g++) {
      const x = PAD.left + (plotW * g) / 4;
      ctx.fillText(Math.round(maxN * g / 4), x - 8, H - 10);
    }

    // Draw curves
    COMPLEXITIES.forEach((c) => {
      ctx.beginPath();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = hovered === c.label ? 3 : 1.8;
      ctx.shadowBlur = hovered === c.label ? 10 : 0;
      ctx.shadowColor = c.color;

      for (let i = 1; i <= nSteps; i++) {
        const xVal = (i / nSteps) * maxN;
        const yVal = Math.min(c.fn(xVal), yMax);
        const px = PAD.left + (i / nSteps) * plotW;
        const py = PAD.top + plotH - (yVal / yMax) * plotH;

        if (i === 1) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Mark current n position
      const curY = Math.min(c.fn(n), yMax);
      const markerX = PAD.left + (n / maxN) * plotW;
      const markerY = PAD.top + plotH - (curY / yMax) * plotH;

      ctx.beginPath();
      ctx.arc(markerX, markerY, hovered === c.label ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });

    // Current n vertical line
    const lineX = PAD.left + (n / maxN) * plotW;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(lineX, PAD.top);
    ctx.lineTo(lineX, PAD.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`n=${n}`, lineX + 5, PAD.top + 14);

  }, [n, hovered, isBatman]);

  return (
    <div className={`p-6 rounded-2xl border space-y-5 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <TrendingUp size={16} />
          Big-O Complexity Visualizer
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Array Size: <span className={`font-bold ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>n = {n}</span></span>
          <input
            type="range" min={5} max={100} value={n}
            onChange={e => setN(Number(e.target.value))}
            className="w-32 accent-purple-500"
          />
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full rounded-xl bg-slate-900 border border-slate-800" style={{ height: 260 }} />

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {COMPLEXITIES.map(c => {
          const val = Math.round(Math.min(c.fn(n), 999999));
          return (
            <button
              key={c.label}
              onMouseEnter={() => setHovered(c.label)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                hovered === c.label ? 'border-opacity-100 scale-105 shadow-lg' : 'border-slate-800'
              }`}
              style={{
                borderColor: hovered === c.label ? c.color : undefined,
                boxShadow: hovered === c.label ? `0 0 12px ${c.color}44` : undefined,
              }}
            >
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />
              <span className="text-slate-300 font-bold">{c.label}</span>
              <span className="text-slate-500">→ {val.toLocaleString()} ops</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
