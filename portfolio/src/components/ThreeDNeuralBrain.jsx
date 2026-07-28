import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Zap, RefreshCw, Sparkles, Activity } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ThreeDNeuralBrain() {
  const canvasRef = useRef(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [activeNode, setActiveNode] = useState(null);

  // Mouse rotation angles
  const rotRef = useRef({ x: 0.3, y: 0.5 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // 3D Nodes Data (Layered 3D Structure)
  const nodesRef = useRef([
    // Input Layer (X = -120)
    { id: 0, layer: 0, label: 'Email Text Input', x: -130, y: -70, z: -40, color: '#38bdf8' },
    { id: 1, layer: 0, label: 'Metadata & Headers', x: -130, y: -20, z: 50, color: '#38bdf8' },
    { id: 2, layer: 0, label: 'Sender Reputation', x: -130, y: 30, z: -30, color: '#38bdf8' },
    { id: 3, layer: 0, label: 'URL Token Stream', x: -130, y: 80, z: 40, color: '#38bdf8' },

    // Hidden Layer 1 (X = -40)
    { id: 4, layer: 1, label: 'TF-IDF Embedding', x: -40, y: -90, z: 20, color: '#a855f7' },
    { id: 5, layer: 1, label: 'Stopword Filter', x: -40, y: -40, z: -50, color: '#a855f7' },
    { id: 6, layer: 1, label: 'N-Gram Context', x: -40, y: 10, z: 60, color: '#a855f7' },
    { id: 7, layer: 1, label: 'Stemming Weights', x: -40, y: 60, z: -20, color: '#a855f7' },
    { id: 8, layer: 1, label: 'Urgency Heuristics', x: -40, y: 100, z: 30, color: '#a855f7' },

    // Hidden Layer 2 (X = 40)
    { id: 9, layer: 2, label: 'Multinomial NB Neuron', x: 40, y: -70, z: -40, color: '#ec4899' },
    { id: 10, layer: 2, label: 'Linear SVM Hyperplane', x: 40, y: -20, z: 30, color: '#ec4899' },
    { id: 11, layer: 2, label: 'Probability Softmax', x: 40, y: 30, z: -50, color: '#ec4899' },
    { id: 12, layer: 2, label: 'Confidence Scaler', x: 40, y: 80, z: 40, color: '#ec4899' },

    // Output Layer (X = 130)
    { id: 13, layer: 3, label: 'SPAM Output (Score > τ)', x: 130, y: -30, z: -20, color: '#ef4444' },
    { id: 14, layer: 3, label: 'HAM Output (Normal Email)', x: 130, y: 40, z: 20, color: '#10b981' }
  ]);

  // Synaptic Connections
  const connectionsRef = useRef([
    // Layer 0 to Layer 1
    { from: 0, to: 4 }, { from: 0, to: 5 }, { from: 0, to: 6 },
    { from: 1, to: 5 }, { from: 1, to: 6 }, { from: 1, to: 7 },
    { from: 2, to: 6 }, { from: 2, to: 7 }, { from: 2, to: 8 },
    { from: 3, to: 4 }, { from: 3, to: 7 }, { from: 3, to: 8 },

    // Layer 1 to Layer 2
    { from: 4, to: 9 }, { from: 4, to: 10 },
    { from: 5, to: 9 }, { from: 5, to: 11 },
    { from: 6, to: 10 }, { from: 6, to: 11 }, { from: 6, to: 12 },
    { from: 7, to: 10 }, { from: 7, to: 12 },
    { from: 8, to: 11 }, { from: 8, to: 12 },

    // Layer 2 to Layer 3
    { from: 9, to: 13 }, { from: 9, to: 14 },
    { from: 10, to: 13 }, { from: 10, to: 14 },
    { from: 11, to: 13 }, { from: 11, to: 14 },
    { from: 12, to: 13 }, { from: 12, to: 14 }
  ]);

  // Active Pulses animating across connections
  const pulsesRef = useRef([]);

  const fireSynapticPulse = () => {
    sound.playClick();
    setPulseCount((c) => c + 1);

    // Pick random starting input node
    const startNodeId = Math.floor(Math.random() * 4);
    const firstConn = connectionsRef.current.filter((c) => c.from === startNodeId);
    if (firstConn.length > 0) {
      const chosen = firstConn[Math.floor(Math.random() * firstConn.length)];
      pulsesRef.current.push({
        from: chosen.from,
        to: chosen.to,
        progress: 0,
        speed: 0.035,
        color: '#facc15'
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const width = (canvas.width = 650);
    const height = (canvas.height = 360);

    const project3D = (x, y, z, rx, ry) => {
      // Rotate Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      // Perspective Projection
      const fov = 350;
      const scale = fov / (fov + z2);
      const projX = width / 2 + x1 * scale;
      const projY = height / 2 + y2 * scale;

      return { x: projX, y: projY, z: z2, scale };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation drift when not dragging
      if (!isDraggingRef.current) {
        rotRef.current.y += 0.003;
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      // Project Nodes
      const projectedNodes = nodesRef.current.map((node) => {
        const proj = project3D(node.x, node.y, node.z, rx, ry);
        return { ...node, projX: proj.x, projY: proj.y, zIndex: proj.z, scale: proj.scale };
      });

      // Sort by Z depth for rendering order
      projectedNodes.sort((a, b) => b.zIndex - a.zIndex);

      // Map by ID for easy lookup
      const nodeMap = {};
      projectedNodes.forEach((n) => (nodeMap[n.id] = n));

      // Draw Connections (Synapses)
      connectionsRef.current.forEach((conn) => {
        const p1 = nodeMap[conn.from];
        const p2 = nodeMap[conn.to];
        if (!p1 || !p2) return;

        ctx.beginPath();
        ctx.moveTo(p1.projX, p1.projY);
        ctx.lineTo(p2.projX, p2.projY);

        ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * p1.scale})`;
        ctx.lineWidth = 1.2 * p1.scale;
        ctx.stroke();
      });

      // Update & Draw Pulses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i];
        pulse.progress += pulse.speed;

        const p1 = nodeMap[pulse.from];
        const p2 = nodeMap[pulse.to];

        if (p1 && p2) {
          const px = p1.projX + (p2.projX - p1.projX) * pulse.progress;
          const py = p1.projY + (p2.projY - p1.projY) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 4 * p1.scale, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = pulse.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Chain next pulse when reached target
        if (pulse.progress >= 1) {
          const nextConns = connectionsRef.current.filter((c) => c.from === pulse.to);
          if (nextConns.length > 0) {
            const nextConn = nextConns[Math.floor(Math.random() * nextConns.length)];
            pulsesRef.current.push({
              from: nextConn.from,
              to: nextConn.to,
              progress: 0,
              speed: 0.04,
              color: pulse.color
            });
          }
          pulsesRef.current.splice(i, 1);
        }
      }

      // Draw 3D Nodes
      projectedNodes.forEach((node) => {
        const r = 7 * node.scale;

        ctx.beginPath();
        ctx.arc(node.projX, node.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
        ctx.font = `${Math.max(9, 10 * node.scale)}px "Fira Code", monospace`;
        ctx.fillText(node.label, node.projX + r + 4, node.projY + 3);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse drag listeners for 3D Orbiting
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotRef.current.y += dx * 0.008;
    rotRef.current.x += dy * 0.008;

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-purple-500/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <Cpu size={16} />
          <span>Interactive 3D WebGL Neural Brain Graph</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fireSynapticPulse}
            onMouseEnter={() => sound.playHover()}
            className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-400 text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors font-bold shadow-md shadow-purple-950/80"
          >
            <Zap size={14} className="text-yellow-400 animate-bounce" />
            <span>Fire 3D Synapse Pulse ({pulseCount})</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        className="relative rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-950/90 shadow-2xl cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="w-full h-auto block" />

        <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 flex items-center gap-2 pointer-events-none">
          <Activity size={12} className="text-purple-400" />
          <span>Click & Drag to rotate 3D Neural Network in 360° space</span>
        </div>
      </div>
    </div>
  );
}
