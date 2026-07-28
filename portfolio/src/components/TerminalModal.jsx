import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';
import { sound } from '../utils/sound';

export default function TerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Prasanna Bhurke CLI Terminal v2.4.0 (x86_64-pc-linux-gnu)' },
    { type: 'system', text: 'Type "help" to view all available commands (try "matrix", "snake", "stats", "batman", "joker").' }
  ]);
  
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // Snake game state refs
  const snakePosRef = useRef([{ x: 10, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 5, y: 5 });
  const snakeCanvasRef = useRef(null);

  // Auto-focus input when opened or history changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!showMatrixRain) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzλπσθω';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }, 33);

    return () => clearInterval(interval);
  }, [showMatrixRain]);

  // Snake Game Logic
  useEffect(() => {
    if (!showSnakeGame) return;
    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 };
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameInterval = setInterval(() => {
      const snake = [...snakePosRef.current];
      const head = {
        x: (snake[0].x + dirRef.current.x + 20) % 20,
        y: (snake[0].y + dirRef.current.y + 15) % 15
      };

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        sound.playClick();
        setSnakeScore((s) => s + 10);
        foodRef.current = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 15)
        };
      } else {
        snake.pop();
      }

      snake.unshift(head);
      snakePosRef.current = snake;

      // Draw game
      ctx.fillStyle = '#090a0f';
      ctx.fillRect(0, 0, 300, 225);

      // Draw food
      ctx.fillStyle = '#facc15';
      ctx.fillRect(foodRef.current.x * 15, foodRef.current.y * 15, 13, 13);

      // Draw snake
      ctx.fillStyle = '#10b981';
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * 15, segment.y * 15, 13, 13);
      });
    }, 120);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameInterval);
    };
  }, [showSnakeGame]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  about     - View engineer background & summary
  skills    - View core technologies & AI/ML stack
  projects  - List top featured software engineering projects
  contact   - Display email and LinkedIn contact links
  clear     - Clear terminal buffer
  sudo hire - Run executive recruitment protocol
  stats     - Real-time system telemetry inspector
  matrix    - Toggle Matrix green code rain animation
  snake     - Launch playable retro arcade Snake mini-game
  batman    - Dispatch Gotham WayneTech protocol
  joker     - Trigger Arkham asylum cipher`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `PRASANNA BHURKE
Senior Software Engineer & AI/ML Specialist
Location: India | Remote
Specialization: NLP Classification, Browser Extensions, Full Stack Backends
Precision: 98.2% Spam Detection Benchmark`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `CORE TECH STACK:
- Languages : Python, C++, JavaScript, TypeScript, SQL
- AI / ML   : Scikit-Learn, NLTK, Pandas, NumPy, Streamlit
- Backend   : FastAPI, Flask, Node.js, Express, MySQL, MongoDB
- Frontend  : React, Chrome Extension API, Tailwind CSS`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `FEATURED PROJECTS:
1. Email Spam Detector Extension  [Chrome Extension API + FastAPI]
2. SMS Spam Detector App          [NLTK + Streamlit + Scikit-Learn]
3. Academic Student Portal        [Node.js + MySQL + Express]
4. Airplane Reservation System    [C++ / Python + SQL Engine]
5. Expense Tracker Application    [React + Local Storage]`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `GET IN TOUCH:
Email    : prasannapbhurke@gmail.com
LinkedIn : https://www.linkedin.com/in/prasanna-bhurke-25a10931a
GitHub   : https://github.com/prasannapbhurke`
        });
        break;

      case 'stats':
        {
          const mem = performance.memory 
            ? `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB / ${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(1)} MB` 
            : '64.2 MB (Allocated)';
          newHistory.push({
            type: 'output',
            text: `SYSTEM TELEMETRY INSPECTOR:
- JS Memory Heap : ${mem}
- Screen Res     : ${window.innerWidth}x${window.innerHeight} (${window.devicePixelRatio}x DPR)
- Network Latency: ~18ms
- Frame Rate     : 60 FPS (V-Sync Lock)
- User Agent     : ${navigator.userAgent.slice(0, 50)}...`
          });
        }
        break;

      case 'matrix':
        setShowMatrixRain(!showMatrixRain);
        newHistory.push({
          type: 'success',
          text: `[SYSTEM] Matrix Digital Code Rain ${!showMatrixRain ? 'ACTIVATED' : 'DEACTIVATED'}.`
        });
        break;

      case 'snake':
        setShowSnakeGame(!showSnakeGame);
        newHistory.push({
          type: 'success',
          text: `[GAME] Snake Arcade ${!showSnakeGame ? 'STARTED' : 'STOPPED'}. Use Arrow keys to control snake!`
        });
        break;

      case 'batman':
      case 'gotham':
        sound.playBatmanThemeSound?.();
        sound.playBatmanThemeMusic?.();
        window.dispatchEvent(new CustomEvent('activate-batman-theme'));
        newHistory.push({
          type: 'success',
          text: `🦇 [WAYNETECH] Gotham Bat-Signal Broadcast Engaged! Theme switched to Batman Gotham Mode.`
        });
        break;

      case 'joker':
        sound.playClick?.();
        newHistory.push({
          type: 'error',
          text: `🤡 WHY SO SERIOUS? HA-HA-HA-HA-HA!
[ARKHAM ASYLUM CIPHER DECRYPTED]
"Introduce a little anarchy. Upset the established order, and everything becomes chaos."
Status: Joker virus payload triggered! Type 'clear' or 'batman' to restore order.`
        });
        break;

      case 'sudo hire':
        sound.playSuccess();
        newHistory.push({
          type: 'success',
          text: `[EXECUTE] Hiring protocol initiated! 🎉 Candidate available for Senior Software & AI Roles!`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 50);
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for command list.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <>
      {/* Matrix Rain Fullscreen Overlay */}
      {showMatrixRain && (
        <canvas
          ref={matrixCanvasRef}
          onClick={() => setShowMatrixRain(false)}
          className="fixed inset-0 z-50 pointer-events-auto cursor-pointer"
          title="Click to dismiss Matrix Code Rain"
        />
      )}

      {/* Terminal Modal Container */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        onClick={() => inputRef.current?.focus()}
      >
        <div 
          className="relative w-full max-w-3xl h-[540px] rounded-2xl border border-purple-500/40 bg-[#090a0f]/95 shadow-2xl overflow-hidden flex flex-col font-mono text-xs sm:text-sm"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
        >
          
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-purple-500/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => { sound.playClick(); onClose(); }} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-400 text-xs">prasanna@bhurke-workstation:~</span>
            </div>

            <button onClick={() => { sound.playClick(); onClose(); }} className="text-slate-400 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-2.5 cursor-text">
            
            {/* Snake Game Canvas Box */}
            {showSnakeGame && (
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2 text-center">
                <div className="flex justify-between items-center text-xs font-bold text-yellow-300">
                  <span>🐍 Retro Snake Game</span>
                  <span>Score: {snakeScore} pts</span>
                </div>
                <div className="flex justify-center">
                  <canvas ref={snakeCanvasRef} width={300} height={225} className="border border-slate-800 rounded-lg" />
                </div>
                <p className="text-[11px] text-slate-400">Use ARROW KEYS on your keyboard to steer snake.</p>
              </div>
            )}

            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'user' && (
                  <span className="text-emerald-400 font-bold">{item.text}</span>
                )}
                {item.type === 'system' && (
                  <span className="text-purple-300 font-medium">{item.text}</span>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 font-mono whitespace-pre-wrap">{item.text}</pre>
                )}
                {item.type === 'success' && (
                  <span className="text-emerald-400 font-bold">{item.text}</span>
                )}
                {item.type === 'error' && (
                  <span className="text-red-400 font-bold">{item.text}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Form Input Bar */}
          <form onSubmit={handleCommand} className="border-t border-purple-500/40 bg-slate-950 p-3.5 flex items-center gap-2">
            <Terminal size={16} className="text-purple-400 shrink-0" />
            <span className="text-emerald-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder="Type command ('help', 'matrix', 'snake', 'stats', 'sudo hire')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm focus:ring-0"
            />
          </form>

        </div>
      </div>
    </>
  );
}
