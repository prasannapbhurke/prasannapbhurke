import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

export default function NeuralNetworkVisualizer({ isAnalyzing }) {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <span className="text-purple-300 font-bold flex items-center gap-1.5">
          <Cpu size={14} className="text-purple-400" />
          Neural Pipeline & Transformer Attention Visualizer
        </span>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <Activity size={12} className="animate-pulse" />
          {isAnalyzing ? 'Processing Tensor Vectors...' : 'Active Weight Matrix'}
        </span>
      </div>

      <div className="relative h-36 flex items-center justify-between px-6">
        
        {/* Layer 1: Input Tokens */}
        <div className="space-y-3 z-10">
          <span className="text-[10px] text-slate-500 block text-center">INPUT TOKENS</span>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              activePulse === 0 || isAnalyzing
                ? 'bg-purple-600 border-purple-300 text-white shadow-lg shadow-purple-500/50 scale-110'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              x{i}
            </div>
          ))}
        </div>

        {/* Hidden Layer 1: Embedding / TF-IDF Vectorizer */}
        <div className="space-y-2 z-10">
          <span className="text-[10px] text-slate-500 block text-center">EMBEDDING</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
              activePulse === 1 || isAnalyzing
                ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg shadow-indigo-500/50 scale-110'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              h{i}
            </div>
          ))}
        </div>

        {/* Hidden Layer 2: Attention & Naive Bayes Weights */}
        <div className="space-y-2 z-10">
          <span className="text-[10px] text-slate-500 block text-center">ATTENTION / NB</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
              activePulse === 2 || isAnalyzing
                ? 'bg-purple-600 border-purple-300 text-white shadow-lg shadow-purple-500/50 scale-110'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              w{i}
            </div>
          ))}
        </div>

        {/* Output Layer: Softmax Classification */}
        <div className="space-y-3 z-10">
          <span className="text-[10px] text-slate-500 block text-center">SOFTMAX</span>
          {[0, 1].map((i) => (
            <div key={i} className={`w-10 h-8 rounded-lg border flex items-center justify-center font-bold text-[11px] transition-all ${
              activePulse === 3 || isAnalyzing
                ? i === 0 ? 'bg-rose-600 border-rose-300 text-white shadow-lg shadow-rose-500/50' : 'bg-emerald-600 border-emerald-300 text-white shadow-lg shadow-emerald-500/50'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              {i === 0 ? 'SPAM' : 'HAM'}
            </div>
          ))}
        </div>

        {/* Connecting SVG Synapses Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-purple-500/20 stroke-[1.5]">
          <line x1="20%" y1="30%" x2="40%" y2="25%" strokeDasharray="4 2" />
          <line x1="20%" y1="50%" x2="40%" y2="50%" strokeDasharray="4 2" />
          <line x1="20%" y1="70%" x2="40%" y2="75%" strokeDasharray="4 2" />

          <line x1="40%" y1="25%" x2="60%" y2="20%" strokeDasharray="4 2" />
          <line x1="40%" y1="50%" x2="60%" y2="50%" strokeDasharray="4 2" />
          <line x1="40%" y1="75%" x2="60%" y2="80%" strokeDasharray="4 2" />

          <line x1="60%" y1="20%" x2="80%" y2="35%" strokeDasharray="4 2" />
          <line x1="60%" y1="80%" x2="80%" y2="65%" strokeDasharray="4 2" />
        </svg>

      </div>
    </div>
  );
}
