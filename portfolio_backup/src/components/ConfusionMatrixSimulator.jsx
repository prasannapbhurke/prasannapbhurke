import React, { useState, useEffect, useRef } from 'react';
import { Sliders, RefreshCw, Activity, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ConfusionMatrixSimulator() {
  const [tp, setTp] = useState(482); // True Positives
  const [fp, setFp] = useState(14);  // False Positives
  const [tn, setTn] = useState(940); // True Negatives
  const [fn, setFn] = useState(12);  // False Negatives

  const canvasRef = useRef(null);

  // Derived Metrics Calculations
  const total = tp + fp + tn + fn;
  const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 0;
  const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0;
  const accuracy = total > 0 ? ((tp + tn) / total) * 100 : 0;
  const f1Score = precision + recall > 0 ? (2 * (precision * recall) / (precision + recall)) : 0;
  const fpr = fp + tn > 0 ? (fp / (fp + tn)) : 0;
  const tpr = recall / 100;

  const resetMetrics = () => {
    sound.playClick();
    setTp(482);
    setFp(14);
    setTn(940);
    setFn(12);
  };

  // Render ROC Curve Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = 400);
    const height = (canvas.height = 280);

    ctx.clearRect(0, 0, width, height);

    const pad = 40;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;

    // Draw Axes Grid
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const x = pad + (plotW / 5) * i;
      const y = height - pad - (plotH / 5) * i;

      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, height - pad);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(width - pad, y);
      ctx.stroke();
    }

    // Random Guess Diagonal Reference Line (AUC = 0.5)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad, height - pad);
    ctx.lineTo(width - pad, pad);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Dynamic Classifier ROC Curve
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#a855f7';

    ctx.beginPath();
    ctx.moveTo(pad, height - pad);
    
    // Smooth curve through active operating point (FPR, TPR)
    const activeX = pad + fpr * plotW;
    const activeY = height - pad - tpr * plotH;

    ctx.quadraticCurveTo(pad + (activeX - pad) * 0.3, activeY, activeX, activeY);
    ctx.lineTo(width - pad, pad);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Active Threshold Operating Point Node
    ctx.beginPath();
    ctx.arc(activeX, activeY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px "Fira Code", monospace';
    ctx.fillText('False Positive Rate (FPR)', width / 2 - 50, height - 10);

  }, [fpr, tpr]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <Activity size={16} />
          <span>Interactive Confusion Matrix & ROC Curve Evaluator</span>
        </div>

        <button
          onClick={resetMetrics}
          onMouseEnter={() => sound.playHover()}
          className="px-3 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw size={12} />
          <span>Reset Benchmarks</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2x2 Interactive Confusion Matrix Grid */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
            Click +/- to adjust sample counts:
          </span>

          <div className="grid grid-cols-2 gap-4">
            
            {/* True Positive (TP) */}
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
              <span className="text-[11px] font-mono text-emerald-300 block font-bold">True Positives (TP)</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-white">{tp}</span>
                <div className="flex gap-1 font-mono">
                  <button onClick={() => { sound.playClick(); setTp(Math.max(0, tp - 10)); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">-</button>
                  <button onClick={() => { sound.playClick(); setTp(tp + 10); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">+</button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">Correctly detected Spam messages</p>
            </div>

            {/* False Positive (FP) */}
            <div className="p-5 rounded-2xl bg-red-950/60 border border-red-500/40 space-y-2">
              <span className="text-[11px] font-mono text-red-300 block font-bold">False Positives (FP)</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-white">{fp}</span>
                <div className="flex gap-1 font-mono">
                  <button onClick={() => { sound.playClick(); setFp(Math.max(0, fp - 2)); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">-</button>
                  <button onClick={() => { sound.playClick(); setFp(fp + 2); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">+</button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">Normal Ham flagged as Spam (False Alarm)</p>
            </div>

            {/* False Negative (FN) */}
            <div className="p-5 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-2">
              <span className="text-[11px] font-mono text-amber-300 block font-bold">False Negatives (FN)</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-white">{fn}</span>
                <div className="flex gap-1 font-mono">
                  <button onClick={() => { sound.playClick(); setFn(Math.max(0, fn - 2)); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">-</button>
                  <button onClick={() => { sound.playClick(); setFn(fn + 2); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">+</button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">Spam missed by model</p>
            </div>

            {/* True Negative (TN) */}
            <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-500/40 space-y-2">
              <span className="text-[11px] font-mono text-purple-300 block font-bold">True Negatives (TN)</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-white">{tn}</span>
                <div className="flex gap-1 font-mono">
                  <button onClick={() => { sound.playClick(); setTn(Math.max(0, tn - 10)); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">-</button>
                  <button onClick={() => { sound.playClick(); setTn(tn + 10); }} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200">+</button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">Correctly classified Ham messages</p>
            </div>

          </div>

          {/* Derived Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">PRECISION</span>
              <span className="text-sm font-bold text-purple-300">{precision.toFixed(1)}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">RECALL</span>
              <span className="text-sm font-bold text-emerald-300">{recall.toFixed(1)}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">ACCURACY</span>
              <span className="text-sm font-bold text-yellow-300">{accuracy.toFixed(1)}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">F1-SCORE</span>
              <span className="text-sm font-bold text-indigo-300">{f1Score.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* ROC Curve Canvas Plot */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-purple-300 font-bold">ROC Curve & AUC Benchmark:</span>
            <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
              AUC = {(0.95 + (f1Score / 100) * 0.04).toFixed(3)}
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-950 shadow-2xl">
            <canvas ref={canvasRef} className="w-full max-w-[400px] h-auto block" />
          </div>
        </div>

      </div>
    </div>
  );
}
