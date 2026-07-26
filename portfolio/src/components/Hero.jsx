import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code, Cpu, ShieldCheck, Mail } from 'lucide-react';
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

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-purple-500/30 text-xs sm:text-sm font-medium text-purple-300 shadow-xl shadow-purple-950/40">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-5" />
            <span>Open to Senior Software & AI Engineering Roles</span>
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
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Engineered NLP classification platforms, real-time browser extensions, and scalable full-stack applications. Bridging high-accuracy Machine Learning with robust software architecture.
          </p>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#ai-playground"
              className="glow-btn px-6 py-3.5 text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-purple-700/30"
            >
              <Sparkles size={18} className="text-purple-200" />
              <span>Launch AI Playground</span>
              <ArrowRight size={16} />
            </a>

            <a 
              href="#projects"
              className="px-6 py-3.5 text-sm sm:text-base rounded-xl font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-2"
            >
              <Code size={18} className="text-purple-400" />
              <span>View Projects</span>
            </a>

            <button 
              onClick={onOpenTerminal}
              className="px-6 py-3.5 text-sm sm:text-base rounded-xl font-mono text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 hover:border-purple-400 transition-all flex items-center gap-2 shadow-lg"
            >
              <Terminal size={18} className="text-emerald-400" />
              <span>CLI Mode</span>
            </button>
          </div>

          {/* Social Badges Row */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <a 
              href="https://github.com/prasannapbhurke" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>

            <a 
              href="https://www.linkedin.com/in/prasanna-bhurke-25a10931a" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={20} />
            </a>

            <a 
              href="https://leetcode.com/u/si9Zaelw6i/" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
              title="LeetCode Profile"
            >
              <span>LeetCode</span>
            </a>

            <button 
              onClick={onOpenContact}
              className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white hover:scale-110 transition-all shadow-md"
              title="Email Contact"
            >
              <Mail size={20} />
            </button>
          </div>

          {/* Feature Highlights Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left">
            <div className="glass-card p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">Machine Learning & NLP</h3>
                <p className="text-xs text-slate-400 mt-1">98.2% Spam Detection precision with Naive Bayes & TF-IDF vectors.</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Code size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">Full Stack Engineering</h3>
                <p className="text-xs text-slate-400 mt-1">Python, JavaScript, React, FastAPI, SQL, & Chrome Extension API.</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">Product Engineering</h3>
                <p className="text-xs text-slate-400 mt-1">Sub-50ms inference latency, responsive UI, & clean database schemas.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
