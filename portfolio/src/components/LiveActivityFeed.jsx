import React, { useEffect, useState } from 'react';
import { Activity, Circle } from 'lucide-react';

const FEED_MESSAGES = [
  { icon: '📦', text: 'Pushed commit to github/email-spam-detector', time: 'just now' },
  { icon: '🤖', text: 'NLP model trained on 1,247 new samples — Acc: 98.2%', time: '2m ago' },
  { icon: '⚡', text: 'FastAPI /classify endpoint responded in 23ms', time: '5m ago' },
  { icon: '🧪', text: 'Unit tests passed — 47/47 assertions green', time: '8m ago' },
  { icon: '🌐', text: 'React bundle built successfully — 374kB gzipped', time: '12m ago' },
  { icon: '🔒', text: 'Bcrypt auth token verified for academic portal login', time: '18m ago' },
  { icon: '📊', text: 'Confusion matrix AUC scored 0.97 on test split', time: '22m ago' },
  { icon: '🐳', text: 'Docker container health check — Status: healthy', time: '31m ago' },
  { icon: '💾', text: 'MySQL 3NF schema migrated — 0 constraint violations', time: '45m ago' },
  { icon: '🚀', text: 'Chrome extension v2.4.1 deployed to 3 test clients', time: '1h ago' },
  { icon: '🧠', text: 'TF-IDF vectorizer re-trained on updated corpus', time: '1.5h ago' },
  { icon: '📡', text: 'WebSocket connection established — latency: 8ms', time: '2h ago' },
];

export default function LiveActivityFeed() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % FEED_MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const msg = FEED_MESSAGES[currentIdx];

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 overflow-hidden max-w-xs">
      <span className="flex items-center gap-1 text-emerald-400 flex-shrink-0">
        <Circle size={6} className="fill-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-bold">LIVE</span>
      </span>
      <span
        className="truncate transition-all duration-400"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-6px)' }}
      >
        {msg.icon} {msg.text}
      </span>
    </div>
  );
}
