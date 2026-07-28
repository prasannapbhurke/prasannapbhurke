import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Zap, Trophy } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

const ICONS = {
  success: <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />,
  error:   <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />,
  info:    <Info size={16} className="text-sky-400 flex-shrink-0" />,
  batman:  <Zap size={16} className="text-yellow-300 flex-shrink-0" />,
  achievement: <Trophy size={16} className="text-yellow-300 flex-shrink-0" />,
};

const STYLES = {
  success: 'border-emerald-500/50 bg-emerald-950/90',
  warning: 'border-amber-500/50 bg-amber-950/90',
  error:   'border-red-500/50 bg-red-950/90',
  info:    'border-sky-500/50 bg-sky-950/90',
  batman:  'border-yellow-400/60 bg-yellow-950/90 shadow-yellow-500/20',
  achievement: 'border-yellow-400/70 bg-slate-950/95 shadow-yellow-400/30',
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 350);
    clearTimeout(timers.current[id]);
  }, []);

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    setToasts(prev => [...prev.slice(-4), { id, message, type, leaving: false }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Viewport */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl border
              backdrop-blur-xl shadow-2xl text-sm font-mono text-slate-100
              max-w-sm w-full transition-all duration-350
              ${STYLES[t.type] || STYLES.info}
              ${t.leaving
                ? 'opacity-0 translate-x-8 scale-95'
                : 'opacity-100 translate-x-0 scale-100'}
            `}
            style={{ animation: t.leaving ? 'none' : 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            {ICONS[t.type] || ICONS.info}
            <span className="flex-1 leading-snug">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-slate-500 hover:text-slate-200 transition-colors mt-0.5 flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(2rem) scale(0.92); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
