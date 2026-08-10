import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code, Activity } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';
import TechOrbitSphere from './TechOrbitSphere';

const TRANSLATED_TITLES = {
  en: [
    "AI & Machine Learning Specialist",
    "Full Stack Software Engineer",
    "NLP Classification Architect",
    "Open Source Tech Innovator"
  ],
  de: [
    "KI & Maschinelles Lernen Spezialist",
    "Full Stack Softwareentwickler",
    "Klassifizierungs-Architekt NLP",
    "Open-Source-Tech-Innovator"
  ],
  jp: [
    "AIãƒ»æ©Ÿæ¢°å­¦ç¿’ã‚¹ãƒšã‚·ãƒ£ãƒªã‚¹ãƒˆ",
    "ãƒ•ãƒ«ã‚¹ã‚¿ãƒƒã‚¯ã‚½ãƒ•ãƒˆã‚¦ã‚§ã‚¢ã‚¨ãƒ³ã‚¸ãƒ‹ã‚¢",
    "NLPãƒ†ã‚­ã‚¹ãƒˆåˆ†é¡žã‚¢ãƒ¼ã‚­ãƒ†ã‚¯ãƒˆ",
    "ã‚ªãƒ¼ãƒ—ãƒ³ã‚½ãƒ¼ã‚¹æŠ€è¡“é©æ–°è€…"
  ]
};

const BATMAN_TITLES = [
  "The Dark Knight of Code & AI",
  "Gotham Machine Learning Specialist",
  "Batcave Mainframe Architect",
  "Full Stack Vigilante Engineer"
];

export default function Hero({ onOpenTerminal, onOpenContact }) {
  const [isBatman, setIsBatman] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [telemetry, setTelemetry] = useState({
    cpu: 1.2,
    latency: 18,
    requests: 1420,
    accuracy: 98.2
  });

  const [lang, setLang] = useState(() => localStorage.getItem('app-lang') || 'en');

  useEffect(() => {
    const checkTheme = () => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    };
    const handleLangChange = (e) => setLang(e.detail || 'en');

    checkTheme();
    window.addEventListener('app-lang-change', handleLangChange);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      window.removeEventListener('app-lang-change', handleLangChange);
      observer.disconnect();
    };
  }, []);

  const titles = isBatman ? BATMAN_TITLES : (TRANSLATED_TITLES[lang] || TRANSLATED_TITLES.en);

  useEffect(() => {
    const fullText = titles[currentTitleIndex % titles.length];
    let typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  const handleThemeToggle = () => {
    sound.playBatmanThemeSound?.();
    sound.playBatmanThemeMusic?.();
    window.dispatchEvent(new CustomEvent('activate-batman-theme'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        cpu: (Math.random() * 2 + 0.8).toFixed(1),
        latency: Math.floor(Math.random() * 10 + 15),
        requests: 1420 + Math.floor(Math.random() * 50),
        accuracy: 98.2
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden z-10">
      
      {/* Background Accent Glow */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
        isBatman ? 'bg-yellow-500/15' : 'bg-purple-600/20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Hero Emblem / Monogram Badge */}
          <div className="flex justify-center pb-2">
            <div 
              onClick={handleThemeToggle}
              className="p-3 rounded-full bg-yellow-400/10 border-2 border-yellow-400/60 shadow-2xl shadow-yellow-500/50 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer group"
              title="Click to activate Gotham Batman Theme & Sound"
            >
              <BatLogoSvg className="w-24 h-14 drop-shadow-[0_0_25px_rgba(254,208,0,0.95)] group-hover:rotate-3 transition-transform" goldBackplate={true} />
            </div>
          </div>

          {/* Availability & Telemetry Pill */}
          <div className={`inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full glass-card text-xs sm:text-sm font-medium shadow-2xl transition-all ${
            isBatman
              ? 'border-yellow-500/50 text-yellow-300 shadow-yellow-950/80 ring-1 ring-yellow-400/40 bg-slate-950/90'
              : 'border-purple-500/40 text-purple-200 shadow-purple-950/50 bg-slate-950/80'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isBatman ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
              <span className={`w-2.5 h-2.5 rounded-full -ml-4.5 ${isBatman ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
              <span className="text-white font-semibold">
                {isBatman ? 'ðŸ¦‡ GOTHAM MAINFRAME // WAYNE TECH AI NODE' : 'AVAILABLE FOR SENIOR SW/AI ROLES'}
              </span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <Activity size={13} className={isBatman ? 'text-yellow-400 animate-pulse' : 'text-emerald-400 animate-pulse'} />
              <span>SLA LATENCY: {telemetry.latency}ms</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight text-white leading-tight">
            Hi, I'm{' '}
            <span className={isBatman 
              ? 'text-yellow-400 font-extrabold drop-shadow-[0_0_30px_rgba(250,204,21,0.7)]'
              : 'text-purple-300 font-extrabold drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]'
            }>
              Prasanna Bhurke
            </span>
          </h1>

          {/* Typing Subtitle */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <p className={`text-xl sm:text-3xl font-mono font-semibold flex items-center gap-1 ${
              isBatman ? 'text-yellow-300' : 'text-purple-300'
            }`}>
              <span>{displayText}</span>
              <span className={`w-2.5 h-7 animate-pulse inline-block ml-1 ${isBatman ? 'bg-yellow-400' : 'bg-purple-400'}`} />
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            {isBatman
              ? 'Engineered NLP classification platforms, Arkham phishing extensions, and scalable WayneTech backend infrastructure. Bridging high-accuracy Machine Learning with Gotham security architecture.'
              : 'Engineered NLP classification platforms, real-time browser extensions, and scalable full-stack applications. Bridging high-accuracy Machine Learning with robust software architecture.'}
          </p>

          {/* 3D Tech Orbit Sphere */}
          {!isBatman && <TechOrbitSphere />}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#projects"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className={`px-6 py-3.5 text-xs sm:text-sm rounded-xl font-bold font-mono shadow-xl transition-all flex items-center gap-2 ${
                isBatman
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-yellow-500/40 hover:scale-[1.03]'
                  : 'glow-btn'
              }`}
            >
              <Sparkles size={18} />
              <span>View Flagship Work</span>
              <ArrowRight size={16} />
            </a>

            <a 
              href="#ai-playground"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className={`px-6 py-3.5 text-xs sm:text-sm rounded-xl font-mono font-bold border transition-all flex items-center gap-2 shadow-lg ${
                isBatman
                  ? 'bg-slate-950/90 text-yellow-300 border-yellow-500/40 hover:border-yellow-400'
                  : 'bg-slate-900/90 text-slate-200 border-purple-500/30 hover:border-purple-400'
              }`}
            >
              <Code size={18} className={isBatman ? 'text-yellow-400' : 'text-purple-400'} />
              <span>Explore Interactive Lab</span>
            </a>

            <button
              onClick={() => { sound.playClick(); onOpenTerminal(); }}
              onMouseEnter={() => sound.playHover()}
              className={`px-6 py-3.5 text-xs sm:text-sm rounded-xl font-mono font-bold border transition-all flex items-center gap-2 shadow-lg ${
                isBatman
                  ? 'bg-amber-950/80 text-yellow-300 border-yellow-500/50 hover:border-yellow-300'
                  : 'bg-slate-900/90 text-purple-300 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              <Terminal size={18} className="text-emerald-400" />
              <span>{isBatman ? 'Batcave CLI Terminal' : 'CLI Terminal'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

