import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../components/ToastManager';
import { unlock, ACHIEVEMENTS } from '../utils/achievements';
import { sound } from '../utils/sound';
import { MessageCircle, X, Send, Bot, User, Code2, ChevronRight } from 'lucide-react';

const BOT_RESPONSES = {
  'salary': {
    q: '💰 What is your salary expectation?',
    a: `I'm targeting **₹8–14 LPA** for senior/lead roles with strong ML or full-stack components, depending on location, stack, and growth potential. I'm very open to discussing the full compensation package — equity, learning budget, and impact matter just as much to me as base pay.`,
  },
  'nlp': {
    q: '🧠 Explain your NLP pipeline',
    a: `My NLP pipeline uses **TF-IDF vectorization** for feature extraction → **Multinomial Naive Bayes** or **LinearSVC** for classification → **Probability Softmax** for confidence scoring. I tune the confidence threshold (τ) to balance Precision vs Recall for the use-case. See the AI Playground tab for a live demo!`,
    code: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.pipeline import Pipeline\n\npipeline = Pipeline([\n  ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1,2))),\n  ('clf',  MultinomialNB(alpha=0.1)),\n])\npipeline.fit(X_train, y_train)  # Acc: 98.2%`,
  },
  'fastapi': {
    q: '⚡ Why FastAPI over Flask?',
    a: `**FastAPI** gives me async ASGI support (Flask is WSGI-only), **automatic Pydantic validation**, OpenAPI docs generation out of the box, and typically **3–4× higher throughput**. For ML serving endpoints that need low latency and type safety, FastAPI is the clear winner.`,
    code: `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass TextInput(BaseModel):\n    text: str\n    threshold: float = 0.5\n\n@app.post("/classify")\nasync def classify(body: TextInput):\n    score = model.predict_proba([body.text])[0][1]\n    return {"label": "spam" if score > body.threshold else "ham", "score": score}`,
  },
  'drift': {
    q: '📉 How do you handle model drift?',
    a: `I monitor **data drift** (feature distribution shifts via KL-divergence) and **concept drift** (degrading accuracy over time). My strategy: set accuracy alert thresholds → retrain on sliding window of recent labeled data → A/B shadow deploy new model → promote after statistical significance check. I'd use MLflow or a simple scheduled retraining job with GitHub Actions.`,
  },
  'cpp': {
    q: '⚙️ Tell me about your C++ systems work',
    a: `I built a high-performance **Airline Reservation System** in C++17 with cache-friendly contiguous memory layouts, POSIX threading for concurrent booking validation, and a custom B-tree seat index. The key lesson: always profile first — **80% of cycles were in cache misses**, not algorithmic complexity.`,
    code: `// Cache-friendly seat index (AoS → SoA transformation)\nstruct SeatDB {\n  std::vector<int>    seat_ids;    // Contiguous in memory\n  std::vector<bool>   occupied;\n  std::vector<string> passenger;\n};\n// vs. std::vector<Seat> — 3.2× faster iteration`,
  },
  'stack': {
    q: '🛠️ What is your current preferred stack?',
    a: `**Frontend**: React 18 + TypeScript + Tailwind CSS\n**Backend**: Python / FastAPI (async) or Node.js / Express\n**ML**: PyTorch, Scikit-learn, NLTK, Pandas\n**DB**: PostgreSQL (relational), MongoDB (document)\n**DevOps**: Docker, GitHub Actions, Linux CLI\nI match the stack to the problem — no religious attachment to any single tool!`,
  },
};

const QUICK_QUESTIONS = Object.values(BOT_RESPONSES).map(r => r.q);

let msgId = 0;

export default function PrasannaBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, from: 'bot', text: "👋 Hi! I'm **PrasannaBot** — ask me anything about Prasanna's skills, experience, or salary. Pick a question or type your own!" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);
  const [isBatman, setIsBatman] = useState(false);
  const bottomRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const addBotMessage = (text, code) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: ++msgId, from: 'bot', text, code }]);
    }, 900 + Math.random() * 500);
  };

  const handleQuestion = (key) => {
    sound.playClick();
    const resp = BOT_RESPONSES[key];
    if (!resp) return;

    setMessages(prev => [...prev, { id: ++msgId, from: 'user', text: resp.q }]);
    addBotMessage(resp.a, resp.code);
  };

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val) return;
    sound.playClick();
    setInputVal('');
    setMessages(prev => [...prev, { id: ++msgId, from: 'user', text: val }]);

    // Simple keyword matching
    const lower = val.toLowerCase();
    if (lower.includes('salary') || lower.includes('ctc') || lower.includes('pay')) handleQuestion('salary');
    else if (lower.includes('nlp') || lower.includes('pipeline') || lower.includes('spam')) handleQuestion('nlp');
    else if (lower.includes('fastapi') || lower.includes('flask') || lower.includes('api')) handleQuestion('fastapi');
    else if (lower.includes('drift') || lower.includes('monitor') || lower.includes('retrain')) handleQuestion('drift');
    else if (lower.includes('c++') || lower.includes('cpp') || lower.includes('system')) handleQuestion('cpp');
    else if (lower.includes('stack') || lower.includes('react') || lower.includes('tech')) handleQuestion('stack');
    else {
      addBotMessage("Great question! I'm best at answering about NLP pipelines, FastAPI vs Flask, C++ systems, model drift, or salary expectations. Try one of the quick buttons below, or visit the AI Playground for live demos! 🚀");
    }
  };

  const renderText = (txt) => {
    if (!txt) return null;
    return txt.split('**').map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className={isBatman ? 'text-yellow-300' : 'text-purple-300'}>{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  const accent = isBatman ? 'yellow' : 'purple';

  return (
    <>
      {/* Floating Bot Button */}
      <button
        onClick={() => { sound.playClick(); setOpen(o => !o); }}
        onMouseEnter={() => sound.playHover()}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-300 hover:scale-110 ${
          isBatman
            ? 'bg-yellow-950 border-yellow-400/60 text-yellow-300 shadow-yellow-500/30'
            : 'bg-purple-950 border-purple-400/60 text-purple-300 shadow-purple-500/30'
        }`}
        aria-label="Chat with PrasannaBot"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
        {!open && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isBatman ? 'bg-yellow-400' : 'bg-purple-400'} animate-ping opacity-60`} />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className={`fixed bottom-24 left-6 z-50 w-80 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden ${
          isBatman
            ? 'bg-slate-950/97 border-yellow-400/40'
            : 'bg-slate-950/97 border-purple-500/40'
        }`}
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className={`px-4 py-3 border-b flex items-center gap-3 ${isBatman ? 'border-yellow-500/20 bg-yellow-950/30' : 'border-purple-500/20 bg-purple-950/30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isBatman ? 'bg-yellow-400 text-black' : 'bg-purple-500 text-white'}`}>
              🤖
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">PrasannaBot</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Online — WayneTech AI
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs font-mono">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                  m.from === 'user'
                    ? (isBatman ? 'bg-yellow-400 text-black' : 'bg-purple-500 text-white')
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {m.from === 'user' ? <User size={10} /> : <Bot size={10} />}
                </div>
                <div className={`max-w-[82%] space-y-2 ${m.from === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-3 py-2 rounded-xl leading-relaxed ${
                    m.from === 'user'
                      ? (isBatman ? 'bg-yellow-950/80 border border-yellow-500/30 text-yellow-100' : 'bg-purple-950/80 border border-purple-500/30 text-purple-100')
                      : 'bg-slate-800/80 border border-slate-700/40 text-slate-200'
                  }`}>
                    {renderText(m.text)}
                  </div>
                  {m.code && (
                    <pre className="text-[10px] bg-black/80 border border-slate-700/50 rounded-xl p-3 overflow-x-auto text-green-300 leading-relaxed max-w-full">
                      <code>{m.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]"><Bot size={10} /></div>
                <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/40 text-slate-400 text-[11px] flex gap-1 items-center">
                  <span className="animate-bounce delay-0">●</span>
                  <span className="animate-bounce delay-75">●</span>
                  <span className="animate-bounce delay-150">●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          <div className={`px-3 py-2 border-t flex gap-1.5 overflow-x-auto ${isBatman ? 'border-yellow-500/20' : 'border-purple-500/20'}`}>
            {Object.entries(BOT_RESPONSES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => handleQuestion(key)}
                className={`flex-shrink-0 px-2 py-1 rounded-lg text-[10px] border transition-colors ${
                  isBatman
                    ? 'bg-yellow-950/60 border-yellow-500/30 text-yellow-300 hover:border-yellow-400'
                    : 'bg-purple-950/60 border-purple-500/30 text-purple-300 hover:border-purple-400'
                }`}
              >
                {val.q.slice(0, 18)}…
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={`px-3 py-2 border-t flex gap-2 ${isBatman ? 'border-yellow-500/20' : 'border-purple-500/20'}`}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything…"
              className={`flex-1 bg-slate-900 border rounded-xl px-3 py-2 text-xs font-mono text-slate-100 outline-none transition-colors ${
                isBatman ? 'border-yellow-500/30 focus:border-yellow-400' : 'border-purple-500/30 focus:border-purple-400'
              }`}
            />
            <button
              onClick={handleSend}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isBatman ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
