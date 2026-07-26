import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code, Cpu, ShieldCheck, Activity, Zap, Server } from 'lucide-react';
import { sound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Hero({ onOpenTerminal, onOpenContact }) {
  const titles = [
    "AI & Machine Learning Specialist",
    "Full Stack Software Engineer",
    "NLP Classification Architect",
    "Open Source Tech Innovator"
  ];
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Real-time Telemetry Stats Ticker
  const [telemetry, setTelemetry] = useState({
    cpu: 1.2,
    latency: 22,
    requests: 1420,
    accuracy: 98.2
  });

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
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
  }, [displayText, isDeleting, currentTitleIndex]);

  // Live telemetry pulse simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        cpu: (Math.random() * 2 + 0.8).toFixed(1),
        latency: Math.floor(Math.random() * 10 + 18),
        requests: 1420 + Math.floor(Math.random() * 50),
        accuracy: 98.2
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden z-10">
      
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Availability Pill & Live Telemetry Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full glass-card border-purple-500/40 text-xs sm:text-sm font-medium text-purple-300 shadow-2xl shadow-purple-950/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4.5" />
              <span className="text-white font-semibold">Available for Senior Software & AI Roles</span>
            </div>
            <span className="text-purple-500/60">|</span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-purple-300">
              <Activity size={13} className="text-emerald-400 animate-pulse" />
              <span>SLA Latency: {telemetry.latency}ms</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight text-white leading-tight">
            Hi, I'm <span className="text-gradient">Prasanna Bhurke</span>
          </h1>

          {/* Typing Subtitle */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <p className="text-xl sm:text-3xl font-mono text-purple-300 font-semibold flex items-center gap-1">
              <span>{displayText}</span>
              <span className="w-2.5 h-7 bg-purple-400 animate-pulse inline-block ml-1" />
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Engineered NLP classification platforms, real-time browser extensions, and scalable full-stack applications. Bridging high-accuracy Machine Learning with robust software architecture.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#ai-playground"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="glow-btn px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-purple-700/40"
            >
              <Sparkles size={18} className="text-purple-200" />
              <span>Launch AI Playground</span>
              <ArrowRight size={16} />
            </a>

            <a 
              href="#projects"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 text-xs sm:text-sm rounded-xl font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-2 shadow-lg"
            >
              <Code size={18} className="text-purple-400" />
              <span>Explore Projects</span>
            </a>

            <button 
              onClick={() => { sound.playClick(); onOpenTerminal(); }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 text-xs sm:text-sm rounded-xl font-mono text-purple-300 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-300 transition-all flex items-center gap-2 shadow-lg shadow-purple-950/40"
            >
              <Terminal size={18} className="text-emerald-400" />
              <span>CLI Mode</span>
            </button>
          </div>

          {/* Social Badges Row */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <a 
              href="https://github.com/prasannapbhurke" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>

            <a 
              href="https://www.linkedin.com/in/prasanna-bhurke-25a10931a" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={20} />
            </a>

            <a 
              href="https://leetcode.com/u/si9Zaelw6i/" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
              title="LeetCode Profile"
            >
              <span>LeetCode</span>
            </a>

            <button 
              onClick={() => { sound.playClick(); onOpenContact(); }}
              onMouseEnter={() => sound.playHover()}
              className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="Email Contact"
            >
              <Mail size={20} />
            </button>
          </div>

          {/* Live System Telemetry Ticker Bar */}
          <div className="pt-10">
            <div className="glass-card p-4 border border-purple-500/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-500/30">
                  <Cpu size={16} />
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[10px]">CPU LOAD</span>
                  <span className="text-white font-bold">{telemetry.cpu}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-950/80 text-emerald-400 border border-purple-500/30">
                  <Zap size={16} />
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[10px]">INFERENCE SLA</span>
                  <span className="text-emerald-400 font-bold">{telemetry.latency} ms</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-500/30">
                  <Server size={16} />
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[10px]">PREDICTION REQS</span>
                  <span className="text-white font-bold">{telemetry.requests}/min</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[10px]">SPAM PRECISION</span>
                  <span className="text-purple-300 font-bold">{telemetry.accuracy}%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
