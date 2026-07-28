import React, { useEffect, useRef, useState } from 'react';
import { Sliders, RefreshCw, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

export default function DecisionBoundaryCanvas({ threshold = 0.5 }) {
  const canvasRef = useRef(null);
  const [kernel, setKernel] = useState('rbf'); // 'rbf' or 'linear'
  const [datapoints, setDatapoints] = useState([]);

  // Generate synthetic 2D feature dataset (Spam vs Ham)
  useEffect(() => {
    const points = [];
    // Ham cluster (Center: 0.3, 0.4)
    for (let i = 0; i < 45; i++) {
      points.push({
        x: 0.3 + (Math.random() - 0.5) * 0.35,
        y: 0.4 + (Math.random() - 0.5) * 0.35,
        label: 0 // Ham
      });
    }
    // Spam cluster (Center: 0.7, 0.65)
    for (let i = 0; i < 45; i++) {
      points.push({
        x: 0.7 + (Math.random() - 0.5) * 0.35,
        y: 0.65 + (Math.random() - 0.5) * 0.35,
        label: 1 // Spam
      });
    }
    // Outliers
    points.push({ x: 0.65, y: 0.25, label: 1 });
    points.push({ x: 0.35, y: 0.75, label: 0 });
    setDatapoints(points);
  }, []);

  const regenerateData = () => {
    sound.playClick();
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        x: 0.28 + (Math.random() - 0.5) * 0.38,
        y: 0.38 + (Math.random() - 0.5) * 0.38,
        label: 0
      });
    }
    for (let i = 0; i < 50; i++) {
      points.push({
        x: 0.72 + (Math.random() - 0.5) * 0.38,
        y: 0.68 + (Math.random() - 0.5) * 0.38,
        label: 1
      });
    }
    setDatapoints(points);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = 600);
    const height = (canvas.height = 360);

    // Render decision boundary background grid probability heatmap
    const res = 12;
    for (let x = 0; x < width; x += res) {
      for (let y = 0; y < height; y += res) {
        const nx = x / width;
        const ny = y / height;

        let prob = 0;

        if (kernel === 'linear') {
          // Linear hyperplane decision boundary equation: w1*x + w2*y + b
          const score = (nx * 1.8 + ny * 1.4) - (threshold * 1.6 + 0.5);
          prob = 1 / (1 + Math.exp(-score * 6));
        } else {
          // RBF Radial Basis Function non-linear decision boundary
          const distSpam = Math.hypot(nx - 0.7, ny - 0.65);
          const distHam = Math.hypot(nx - 0.3, ny - 0.4);
          const rbfScore = Math.exp(-distSpam * 4.5) - Math.exp(-distHam * 4.5) + (0.5 - threshold) * 1.5;
          prob = 1 / (1 + Math.exp(-rbfScore * 7));
        }

        // Color interpolation based on class probability
        if (prob > threshold) {
          ctx.fillStyle = `rgba(239, 68, 68, ${Math.min(0.55, prob * 0.45)})`; // Red Spam zone
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${Math.min(0.55, (1 - prob) * 0.45)})`; // Purple Ham zone
        }
        ctx.fillRect(x, y, res, res);
      }
    }

    // Draw decision contour hyper-line (Boundary line where prob == threshold)
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#facc15';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#facc15';
    ctx.beginPath();

    if (kernel === 'linear') {
      const startX = 0;
      const startY = height - ((threshold * 1.6 + 0.5) / 1.4) * height;
      const endX = width;
      const endY = height - (((threshold * 1.6 + 0.5) - 1.8) / 1.4) * height;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    } else {
      // Non-linear curved contour path
      for (let x = 0; x <= width; x += 10) {
        const nx = x / width;
        const ny = 0.5 + Math.sin(nx * Math.PI * 1.5) * 0.25 - (threshold - 0.5) * 0.4;
        const y = (1 - ny) * height;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw dataset points
    datapoints.forEach((pt) => {
      const px = pt.x * width;
      const py = (1 - pt.y) * height;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);

      if (pt.label === 1) {
        ctx.fillStyle = '#ef4444'; // Red Spam Point
        ctx.strokeStyle = '#fee2e2';
      } else {
        ctx.fillStyle = '#10b981'; // Green Ham Point
        ctx.strokeStyle = '#d1fae5';
      }
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });

  }, [datapoints, threshold, kernel]);

  return (
    <div className="space-y-4">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-purple-300 font-bold flex items-center gap-1.5">
            <Layers size={14} />
            <span>Classifier Kernel:</span>
          </span>

          <button
            onClick={() => { sound.playClick(); setKernel('rbf'); }}
            className={`px-3 py-1 rounded-lg border transition-all ${
              kernel === 'rbf' ? 'bg-purple-600 text-white border-purple-400 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            RBF (Non-Linear)
          </button>

          <button
            onClick={() => { sound.playClick(); setKernel('linear'); }}
            className={`px-3 py-1 rounded-lg border transition-all ${
              kernel === 'linear' ? 'bg-purple-600 text-white border-purple-400 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            Linear SVM
          </button>
        </div>

        <button
          onClick={regenerateData}
          onMouseEnter={() => sound.playHover()}
          className="px-3 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw size={12} />
          <span>Resample Data</span>
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} className="w-full max-w-[600px] h-auto block" />

        {/* Legend Overlay */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-200">Ham Datapoints (Normal)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-200">Spam Datapoints (Threat)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-300 font-bold">Decision Boundary Line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
