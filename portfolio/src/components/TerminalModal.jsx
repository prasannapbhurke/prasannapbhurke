import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Sparkles, Send } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Prasanna Bhurke CLI Terminal v2.4.0 (x86_64-pc-linux-gnu)' },
    { type: 'system', text: 'Type "help" to view all available commands.' }
  ]);
  
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

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
  matrix    - Display system performance metrics`
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
GitHub   : https://github.com/prasannapbhurke
LeetCode : https://leetcode.com/u/si9Zaelw6i/`
        });
        break;

      case 'sudo hire':
        newHistory.push({
          type: 'success',
          text: `[EXECUTE] Hiring protocol initiated! 🎉
Sending request to Prasanna Bhurke...
Status: 200 OK — Candidate available for Senior Software & AI Roles!`
        });
        break;

      case 'matrix':
        newHistory.push({
          type: 'output',
          text: `SYSTEM STATUS:
[CPU] 0.4% | [RAM] 142MB / 16GB | [LATENCY] 18ms
[MODEL ACCURACY] 98.2% | [UPTIME] 99.999%`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-3xl w-full h-[550px] flex flex-col overflow-hidden border-purple-500/50 shadow-2xl shadow-purple-950/70">
        
        {/* Terminal Window Header */}
        <div className="bg-slate-900/90 border-b border-purple-500/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-xs font-mono text-slate-300 ml-2 font-semibold flex items-center gap-1.5">
              <Terminal size={14} className="text-purple-400" />
              prasanna@dev-box:~ (zsh)
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Terminal Body Screen */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 bg-[#08090e]">
          {history.map((item, idx) => (
            <div key={idx} className={`leading-relaxed ${
              item.type === 'user' ? 'text-purple-300 font-bold' :
              item.type === 'error' ? 'text-rose-400' :
              item.type === 'success' ? 'text-emerald-400 font-bold' :
              item.type === 'system' ? 'text-purple-400/80 italic' :
              'text-slate-200 whitespace-pre-wrap'
            }`}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Footer */}
        <form onSubmit={handleCommand} className="bg-slate-950 border-t border-purple-500/30 p-3 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold pl-2">
            prasanna@dev-box:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'projects', 'about', or 'sudo hire'..."
            className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-white placeholder-slate-600 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="p-1.5 text-purple-400 hover:text-purple-300">
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
