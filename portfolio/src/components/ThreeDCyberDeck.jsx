import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, Terminal, Shield, Play, RefreshCw, Zap, Server, Activity } from 'lucide-react';
import { sound } from '../utils/sound';
import { useToast } from './ToastManager';

const SCREEN_VIEWS = {
  CODE: {
    title: 'NLP_Classifier_Core.py',
    lines: [
      'import torch',
      'import torch.nn as nn',
      'from transformers import AutoModel',
      '',
      'class WayneAIClassifier(nn.Module):',
      '    def __init__(self, num_classes=2):',
      '        super().__init__()',
      '        self.bert = AutoModel.from_pretrained("bert-base-uncased")',
      '        self.fc = nn.Linear(768, num_classes)',
      '        self.softmax = nn.Softmax(dim=1)',
      '',
      '    def forward(self, input_ids, mask):',
      '        out = self.bert(input_ids, mask)[1]',
      '        return self.softmax(self.fc(out))',
    ],
  },
  LOGS: {
    title: 'WayneTech_System_Logs.log',
    lines: [
      '[SYSTEM] Booting WayneTech AI Cyber Deck v4.2...',
      '[GPU] NVIDIA RTX 4090 initialized — VRAM: 24GB allocated',
      '[FASTAPI] ASGI worker online at port 8000 (0.0.0.0)',
      '[MODEL] TF-IDF + NaiveBayes model loaded into memory (Acc: 98.2%)',
      '[WEBSOCKET] Client connected from 192.168.1.42 (Latency: 12ms)',
      '[SECURITY] JWT token authenticated — Scope: ADMIN_READ_WRITE',
      '[SYSTEM] Status: ALL_SYSTEMS_OPTIMAL — 0 errors detected',
    ],
  },
  METRICS: {
    title: 'Model_Inference_Telemetry.json',
    lines: [
      '{',
      '  "throughput_qps": 4820,',
      '  "p99_latency_ms": 14.2,',
      '  "gpu_utilization_pct": 68.4,',
      '  "memory_allocated_gb": 4.12,',
      '  "drift_score_kl": 0.012,',
      '  "model_version": "v2.4.1-prod",',
      '  "active_nodes": 12',
      '}',
    ],
  },
};

export default function ThreeDCyberDeck() {
  const [activeScreen, setActiveScreen] = useState('CODE');
  const [rot, setRot] = useState({ x: 12, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cpuUsage, setCpuUsage] = useState(42);
  const [gpuUsage, setGpuUsage] = useState(68);
  const [isBatman, setIsBatman] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  // Simulate telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(35 + Math.floor(Math.random() * 25));
      setGpuUsage(60 + Math.floor(Math.random() * 20));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRot((prev) => ({
      x: Math.max(-25, Math.min(35, prev.x - dy * 0.3)),
      y: Math.max(-45, Math.min(45, prev.y + dx * 0.3)),
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setRot({ x: 12, y: -15 });
    sound.playClick();
  };

  const currentData = SCREEN_VIEWS[activeScreen];

  return (
    <div className={`p-6 rounded-2xl border space-y-5 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <Monitor size={18} />
          <span>3D Holographic Cyber Deck Workstation</span>
        </div>

        <div className="flex items-center gap-2">
          {Object.keys(SCREEN_VIEWS).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveScreen(mode);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                activeScreen === mode
                  ? isBatman
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={resetView}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset 3D Angle"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#050609] cursor-grab active:cursor-grabbing p-6 sm:p-10 select-none"
        style={{ perspective: 1000, minHeight: 440 }}
      >
        {/* 3D Rotatable Desk & Screen Group */}
        <div
          className="w-full h-full flex flex-col items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          }}
        >
          {/* Main Floating Holographic Monitor */}
          <div
            className={`w-full max-w-2xl rounded-2xl border backdrop-blur-xl shadow-2xl p-5 space-y-3 transition-all ${
              isBatman
                ? 'bg-slate-950/90 border-yellow-500/50 shadow-yellow-500/20'
                : 'bg-slate-950/90 border-purple-500/50 shadow-purple-500/20'
            }`}
            style={{
              transform: 'translateZ(40px)',
              boxShadow: isBatman ? '0 0 35px rgba(250,204,21,0.15)' : '0 0 35px rgba(168,85,247,0.15)',
            }}
          >
            {/* Screen Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-slate-300 font-bold ml-2">{currentData.title}</span>
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
            </div>

            {/* Screen Code/Content */}
            <pre className="text-xs text-slate-300 overflow-x-auto p-3 bg-black/60 rounded-xl border border-slate-800/80 leading-relaxed font-mono">
              <code>
                {currentData.lines.map((line, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-slate-600 select-none w-5 text-right">{idx + 1}</span>
                    <span className={line.startsWith('[') ? 'text-cyan-300' : line.startsWith('{') ? 'text-yellow-300' : 'text-purple-200'}>
                      {line}
                    </span>
                  </div>
                ))}
              </code>
            </pre>

            {/* Telemetry Bar */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                <Cpu size={14} className="text-purple-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>CPU LOAD</span>
                    <span className="text-slate-200 font-bold">{cpuUsage}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${cpuUsage}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                <Server size={14} className="text-emerald-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>GPU VRAM</span>
                    <span className="text-slate-200 font-bold">{gpuUsage}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${gpuUsage}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Keyboard Base / Terminal Pedestal */}
          <div
            className={`w-full max-w-xl h-16 mt-6 rounded-2xl border flex items-center justify-around px-6 transition-all ${
              isBatman ? 'bg-slate-950 border-yellow-500/30' : 'bg-slate-950 border-purple-500/30'
            }`}
            style={{
              transform: 'rotateX(65deg) translateZ(-20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <span className="text-xs text-slate-400 font-mono">WAYNETECH CYBERDECK HARDWARE</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-6 h-4 rounded bg-slate-800 border border-slate-700" />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 pointer-events-none text-[11px] text-slate-500">
          🖱️ Click and drag to rotate the 3D Cyber Deck in space
        </div>
      </div>
    </div>
  );
}
