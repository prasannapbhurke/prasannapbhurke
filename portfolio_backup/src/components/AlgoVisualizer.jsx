import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Code } from 'lucide-react';
import { sound } from '../utils/sound';

export default function AlgoVisualizer() {
  const [array, setArray] = useState([4, 12, 19, 27, 34, 45, 58, 63, 71, 89, 94]);
  const [target, setTarget] = useState(58);
  const [activeStep, setActiveStep] = useState(null);
  const [running, setRunning] = useState(false);

  const runBinarySearch = () => {
    sound.playClick();
    setRunning(true);
    let low = 0;
    let high = array.length - 1;
    let steps = [];

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      steps.push({ low, high, mid, val: array[mid] });
      if (array[mid] === target) break;
      if (array[mid] < target) low = mid + 1;
      else high = mid - 1;
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStep(step);
        sound.playHover();
        if (idx === steps.length - 1) {
          sound.playSuccess();
          setRunning(false);
        }
      }, (idx + 1) * 700);
    });
  };

  return (
    <div className="glass-card p-6 border-purple-500/40 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code size={18} className="text-purple-400" />
          <h3 className="font-heading font-bold text-lg text-white">
            Algorithm Execution Engine
          </h3>
        </div>
        <span className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
          O(log N) Binary Search Visualizer
        </span>
      </div>

      {/* Target input selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Target Search Value:</span>
          <select
            value={target}
            onChange={(e) => { setTarget(Number(e.target.value)); setActiveStep(null); }}
            className="bg-slate-900 border border-purple-500/40 text-purple-300 font-bold px-3 py-1.5 rounded-lg focus:outline-none"
          >
            {array.map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>

        <button
          onClick={runBinarySearch}
          disabled={running}
          className="glow-btn px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-50"
        >
          <Play size={14} />
          <span>{running ? 'Executing...' : 'Run Algorithm'}</span>
        </button>
      </div>

      {/* Array Bars Visualizer */}
      <div className="py-6 flex items-end justify-center gap-2 h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-4">
        {array.map((num, idx) => {
          const isMid = activeStep && activeStep.mid === idx;
          const inRange = activeStep && idx >= activeStep.low && idx <= activeStep.high;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <span className={`text-[10px] font-mono ${isMid ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                {num}
              </span>
              <div 
                className={`w-full rounded-t-md transition-all duration-300 ${
                  isMid 
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50 scale-105' 
                    : inRange 
                    ? 'bg-purple-600 shadow-md shadow-purple-600/40' 
                    : 'bg-slate-800 opacity-40'
                }`}
                style={{ height: `${(num / 100) * 80 + 20}px` }}
              />
            </div>
          );
        })}
      </div>

      {/* Execution Telemetry Step Info */}
      {activeStep && (
        <div className="p-3 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono flex items-center justify-between text-purple-300">
          <span>Low Pointer: index {activeStep.low}</span>
          <span className="text-emerald-400 font-bold">Mid Pointer: index {activeStep.mid} (val: {activeStep.val})</span>
          <span>High Pointer: index {activeStep.high}</span>
        </div>
      )}
    </div>
  );
}
