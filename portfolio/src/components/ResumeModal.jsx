import React, { useState, useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadPdf = () => {
    sound.playSuccess();
    // Generate text/markdown resume data download trigger
    const resumeText = `PRASANNA BHURKE
Senior Software Engineer & AI/ML Specialist
Email: prasannapbhurke@gmail.com | GitHub: github.com/prasannapbhurke | LinkedIn: linkedin.com/in/prasanna-bhurke-25a10931a

TECHNICAL SKILLS
- Programming: Python, JavaScript, TypeScript, C++, SQL, HTML5, CSS3
- AI / Machine Learning: Scikit-Learn, NLTK, Pandas, NumPy, Streamlit, Supervised Learning (Naive Bayes, SVM, RBF)
- Web & Backend: React.js, FastAPI, Node.js, Express, Flask, MySQL, SQLite, MongoDB, RESTful APIs
- Tooling: Chrome Extension API, Git, Docker, Vite, Tailwind CSS

EXPERIENCE & PROJECTS
1. Software Engineer & AI Developer (2023 - Present)
   - Architected NLP classification pipelines achieving 98.2% accuracy.
   - Built Chrome Extension API for browser-based text threat scanning.
   - Built ACID-compliant relational DBMS architectures for enterprise management systems.

2. Competitive Algorithmic Programmer (2022 - Present)
   - 1,000+ Algorithmic Challenges Solved on LeetCode / Coding Platforms.
   - Ranked in top percentiles on competitive benchmarks; optimized sub-millisecond execution times.

EDUCATION
- Bachelor of Engineering (B.E.) in Computer Engineering
`;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prasanna_Bhurke_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
        isBatman ? 'bg-[#0a0d16] border-yellow-500/40' : 'bg-[#0d0e15] border-purple-500/30'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isBatman ? 'bg-[#060810] border-yellow-500/30' : 'bg-[#090a10] border-purple-500/20'
        }`}>
          <div className="flex items-center gap-3">
            {isBatman ? (
              <BatLogoSvg className="w-7 h-5" goldBackplate={true} />
            ) : (
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300">
                <Briefcase size={20} />
              </div>
            )}
            <div>
              <h2 className={`text-xl font-bold font-heading ${isBatman ? 'text-yellow-300' : 'text-white'}`}>
                Prasanna Bhurke — Engineering Resume
              </h2>
              <p className={`text-xs font-mono ${isBatman ? 'text-amber-400' : 'text-purple-300'}`}>
                {isBatman ? 'WayneTech Verified Candidate Profile' : 'Senior Software Engineer & AI/ML Specialist'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              onMouseEnter={() => sound.playHover()}
              className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isBatman
                  ? 'bg-slate-950 text-yellow-300 border-yellow-500/30 hover:border-yellow-400'
                  : 'bg-slate-900 text-purple-300 border-purple-500/30 hover:border-purple-400'
              }`}
              title="Print Resume"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md ${
                isBatman
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-yellow-500/30'
                  : 'glow-btn'
              }`}
            >
              <Download size={16} />
              <span>Download CV</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-4 text-xs font-mono overflow-x-auto">
          {['summary', 'skills', 'certifications', 'experience', 'education'].map((tab) => (
            <button
              key={tab}
              onClick={() => { sound.playClick(); setActiveTab(tab); }}
              className={`py-3 border-b-2 font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? isBatman
                    ? 'border-yellow-400 text-yellow-300'
                    : 'border-purple-400 text-purple-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              // {tab}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm leading-relaxed">
          
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`p-5 rounded-2xl border ${
                isBatman ? 'bg-slate-950/80 border-yellow-500/30' : 'bg-slate-900/60 border-purple-500/30'
              }`}>
                <h3 className={`text-base font-bold font-heading mb-2 ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
                  Executive Summary
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Senior Software Engineer and AI/ML Specialist certified in Oracle Agentic AI and AWS Cloud, with an EduSkills Android Developer Virtual Internship. Experienced in building NLP classification models, autonomous Agentic AI loops, native Android Studio Java applications, and high-concurrency C++ systems engines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-400 block">Direct Email</span>
                  <span className="font-mono text-sm font-bold text-white">prasannapbhurke@gmail.com</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-400 block">GitHub Portfolio</span>
                  <a href="https://github.com/prasannapbhurke" target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-purple-300 hover:underline flex items-center gap-1">
                    <span>github.com/prasannapbhurke</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'].map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">AI, Mobile & Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Oracle Agentic AI', 'Scikit-Learn', 'NLTK', 'Android Studio', 'Mistral AI', 'Quantum Computing', 'Blender 3D'].map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4 animate-fadeIn font-mono text-xs">
              {[
                { title: 'Oracle Certified Agentic AI Specialist', issuer: 'Oracle', badge: 'bg-red-950/80 border-red-500/40 text-red-300' },
                { title: 'AWS Cloud Certification', issuer: 'Amazon Web Services', badge: 'bg-amber-950/80 border-amber-500/40 text-amber-300' },
                { title: 'Android Developer Virtual Internship', issuer: 'AICTE / EduSkills', badge: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' },
                { title: 'Quantum Computing Virtual Internship', issuer: 'Quantum Computers R&D', badge: 'bg-sky-950/80 border-sky-500/40 text-sky-300' },
                { title: 'Comprehensive 48-Hour C++ & DS/OOP Mastery', issuer: 'Technical Training', badge: 'bg-blue-950/80 border-blue-500/40 text-blue-300' },
                { title: 'Python Data Structures & Algorithms', issuer: 'Python Institute', badge: 'bg-purple-950/80 border-purple-500/40 text-purple-300' },
                { title: 'Java 25-Hour OOP & Android Studio Development', issuer: 'Mobile & Software R&D', badge: 'bg-yellow-950/80 border-yellow-500/40 text-yellow-300' },
              ].map((cert, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between ${cert.badge}`}>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                      <span className="text-[11px] opacity-80">{cert.issuer}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-black/40 text-[10px] uppercase font-bold">Verified</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h4 className="font-bold text-white text-base">Senior Software Engineer & AI Architect</h4>
                    <span className="text-xs font-mono text-purple-300">WayneTech Open-Source & AI R&D</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">2023 – Present</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Certified in Oracle Agentic AI Specialist tools, building tool-calling agent loops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Completed EduSkills Android Developer Virtual Internship building native Android Studio apps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Engineered C++ 48-Hour high-performance memory engines and Python DS/Algo pipelines.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-950/80 text-purple-300">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold font-heading text-white text-base">Bachelor of Technology (B.Tech) in Computer Science & Engineering</h4>
                    <span className="text-xs font-mono text-purple-300">Semesters 3, 4, 5 Academic & Technical Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Prasanna Bhurke Resume Portfolio</span>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="hover:text-white transition-colors"
          >
            Press ESC or click close
          </button>
        </div>

      </div>
    </div>
  );
}
