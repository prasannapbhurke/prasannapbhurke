import React, { useState, useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code, Award, CheckCircle2, Rocket } from 'lucide-react';
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

================================================================================
EXECUTIVE SUMMARY
================================================================================
Senior Software Engineer and AI/ML Specialist certified in Oracle Agentic AI and AWS Cloud, with an EduSkills Android Developer Virtual Internship. Experienced in building NLP classification models, autonomous Agentic AI threat engines, native Android Kotlin/Java applications, and high-concurrency systems engines.

================================================================================
TECHNICAL SKILLS
================================================================================
- Programming Languages: Python, JavaScript, TypeScript, Java, Kotlin, C++, SQL, HTML5, CSS3
- AI / Machine Learning: Oracle Agentic AI, Scikit-Learn, NLTK, FastAPI, Librosa, LLM Agents, Supervised Learning
- Mobile & Systems: Android Studio, Kotlin MVVM, Room SQLite, Electron, Java AWT/Swing, Multi-threading
- Web & Databases: React.js, Node.js, Express.js, MySQL, PostgreSQL, SQLite, RESTful APIs, Tailwind CSS

================================================================================
FEATURED SOFTWARE ENGINEERING PROJECTS
================================================================================
1. Sentinel-AI-X (Autonomous AI Threat Intelligence Agent)
   - GitHub: https://github.com/prasannapbhurke/sentinel-Ai-X
   - Tech Stack: Python, FastAPI, AI Security Agent, LLM Prompt Loops
   - Built autonomous AI threat intelligence agent for sub-30ms vulnerability detection and payload quarantine.

2. DSA Visualizer Pro (Algorithm Execution Tracing Engine)
   - GitHub: https://github.com/prasannapbhurke/DSA-Visualizer-Pro
   - Tech Stack: Java, Android Studio, DSA Algorithms, AWT/Swing
   - Developed 30+ interactive algorithm animations with real-time Big-O time and space complexity graphing.

3. BeatMatch-Reel (AI Audio & Video Beat Sync Engine)
   - GitHub: https://github.com/prasannapbhurke/BeatMatch-Reel
   - Tech Stack: Python, Librosa, Audio Onset Processing, FFmpeg
   - Engineered spectral audio beat tracking algorithm to align video cuts to music transients with frame accuracy.

4. LogicLens (Desktop Programming Logic & AST Visualizer)
   - GitHub: https://github.com/prasannapbhurke/LogicLens
   - Tech Stack: JavaScript, Electron, React, Java/C AST Parser
   - Created cross-platform Electron app for step-by-step memory stack and heap allocation visualization.

5. ClassPulse (Native Android Classroom Analytics App)
   - GitHub: https://github.com/prasannapbhurke/ClassPulse
   - Tech Stack: Kotlin, Android Studio, Coroutines Flow, Room DB
   - Architected native Kotlin Android app with Room SQLite offline storage and real-time attendance telemetry.

6. WedCraft (Full Stack Event & Wedding Management Platform)
   - GitHub: https://github.com/prasannapbhurke/WedCraft
   - Tech Stack: JavaScript, React, Node.js, Express, Tailwind CSS
   - Full-stack web application for interactive guest RSVP management, vendor schedules, and budget tracking.

7. Student Portal (Academic Administration Platform)
   - GitHub: https://github.com/prasannapbhurke/student-portal
   - Tech Stack: Node.js, Express, MySQL, JavaScript, HTML5/CSS3
   - ACID-compliant relational academic platform for course enrollments, grade tracking, and transcripts.

8. Airplane Reservation System (High-Concurrency Systems Engine)
   - GitHub: https://github.com/prasannapbhurke/Airplane-Reservation-System
   - Tech Stack: Java, SQL Database, Data Structures, OOP Design
   - High-concurrency flight booking engine delivering sub-2ms index lookups and transactional integrity.

================================================================================
VERIFIED CERTIFICATIONS & CREDENTIALS
================================================================================
- Oracle Certified Agentic AI Specialist (Oracle)
- AWS Cloud Certification (Amazon Web Services)
- Android Developer Virtual Internship (AICTE / EduSkills)
- Quantum Computing Virtual Internship (Quantum Computers R&D)
- Comprehensive 48-Hour C++ & DS/OOP Mastery
- Python Data Structures & Algorithms (Python Institute)
- Java 25-Hour OOP & Android Studio Development

================================================================================
EDUCATION
================================================================================
- Bachelor of Technology (B.Tech) in Computer Science & Engineering
  Semesters 3, 4, 5 Academic & Technical Excellence
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

  const resumeProjects = [
    {
      title: 'Sentinel-AI-X',
      subtitle: 'Autonomous AI Threat Intelligence Agent',
      tech: 'Python, FastAPI, AI Agent Loops',
      repo: 'https://github.com/prasannapbhurke/sentinel-Ai-X',
      points: [
        'Architected autonomous AI threat agent delivering sub-30ms payload inspection.',
        'Built zero-trust evaluation pipeline for instant malicious pattern quarantine.'
      ]
    },
    {
      title: 'DSA Visualizer Pro',
      subtitle: 'Algorithm Execution Tracing Engine',
      tech: 'Java, Android Studio, DSA Algorithms',
      repo: 'https://github.com/prasannapbhurke/DSA-Visualizer-Pro',
      points: [
        'Developed 30+ interactive algorithm animations with real-time Big-O complexity grapher.',
        'Engineered dual-platform APK and desktop AWT/Swing control center.'
      ]
    },
    {
      title: 'BeatMatch-Reel',
      subtitle: 'AI Audio & Video Beat Sync Engine',
      tech: 'Python, Librosa, FFmpeg',
      repo: 'https://github.com/prasannapbhurke/BeatMatch-Reel',
      points: [
        'Spectral Librosa audio beat tracking aligning video cutpoints to musical transients.',
        'Automated FFmpeg video rendering pipeline producing ready-to-publish reels.'
      ]
    },
    {
      title: 'LogicLens',
      subtitle: 'Desktop Programming Logic & AST Visualizer',
      tech: 'JavaScript, Electron, React, Java/C',
      repo: 'https://github.com/prasannapbhurke/LogicLens',
      points: [
        'Cross-platform Electron app inspecting AST stack frames and heap allocations.',
        'Real-time step-by-step code execution tracing for Java and C programs.'
      ]
    },
    {
      title: 'ClassPulse',
      subtitle: 'Native Android Classroom Analytics App',
      tech: 'Kotlin, Android Studio, Room DB',
      repo: 'https://github.com/prasannapbhurke/ClassPulse',
      points: [
        'Native Kotlin Android app using Room SQLite offline storage and Coroutines Flow.',
        'Real-time classroom engagement telemetry and student attendance pulse.'
      ]
    },
    {
      title: 'WedCraft',
      subtitle: 'Full Stack Event & Wedding Platform',
      tech: 'React, Node.js, Express, Tailwind CSS',
      repo: 'https://github.com/prasannapbhurke/WedCraft',
      points: [
        'Full-stack platform featuring guest RSVP management and seating arrangements.',
        'Responsive glassmorphism UI styled with Tailwind CSS.'
      ]
    },
    {
      title: 'Student Portal',
      subtitle: 'Academic Administration Platform',
      tech: 'Node.js, Express, MySQL',
      repo: 'https://github.com/prasannapbhurke/student-portal',
      points: [
        'ACID-compliant relational database platform for course enrollments and grades.',
        'Role-based session authentication for students and faculty administrators.'
      ]
    },
    {
      title: 'Airplane Reservation System',
      subtitle: 'High-Concurrency Systems Engine',
      tech: 'Java, C++, SQL Database',
      repo: 'https://github.com/prasannapbhurke/Airplane-Reservation-System',
      points: [
        'High-concurrency flight booking engine delivering sub-2ms seat allocation lookups.',
        'Mutex-locked database transactions preventing double-booking race conditions.'
      ]
    }
  ];

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
              className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md ${
                isBatman
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-yellow-500/30'
                  : 'glow-btn'
              }`}
            >
              <Download size={15} />
              <span>Download CV</span>
            </button>

            <button
              onClick={() => {
                sound.playSuccess();
                const latexCode = `%-------------------------
% Resume in LaTeX
% Author : Prasanna Bhurke
%------------------------

\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{tabularx}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\vline height 1.5pt \\hrule height 0.5pt \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Prasanna Bhurke} \\\\ \\vspace{4pt}
    \\small Senior Software Engineer $|$ AI/ML Specialist $|$ Full Stack Architect \\\\ \\vspace{2pt}
    \\small \\href{mailto:prasannapbhurke@gmail.com}{\\underline{prasannapbhurke@gmail.com}} $|$ 
    \\href{https://github.com/prasannapbhurke}{\\underline{github.com/prasannapbhurke}} $|$ 
    \\href{https://www.linkedin.com/in/prasanna-bhurke-25a10931a}{\\underline{linkedin.com/in/prasanna-bhurke}} $|$
    \\href{https://prasannapbhurke.github.io/prasannapbhurke/}{\\underline{prasannapbhurke.github.io}}
\\end{center}

\\section{Education}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\resumeSubheading
      {Bachelor of Technology (B.Tech) in Computer Science \\& Engineering}{2022 -- 2026}
      {Relevant Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks}{Kolhapur, MH}
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Python, Java, Kotlin, C++, JavaScript, TypeScript, SQL, HTML5, CSS3} \\\\
     \\textbf{AI / Machine Learning}{: Oracle Agentic AI, Scikit-Learn, NLTK, FastAPI, Librosa, LLM Prompting} \\\\
     \\textbf{Mobile \\& Systems}{: Android Studio, Kotlin MVVM, Room SQLite, Electron, Java Swing/AWT, Multi-threading} \\\\
     \\textbf{Web \\& Frameworks}{: React.js, Node.js, Express.js, Flask, Tailwind CSS, RESTful APIs} \\\\
     \\textbf{Databases \\& Tools}{: MySQL, PostgreSQL, SQLite, Git, GitHub Actions, Vite, Chrome Extension API}
    }}
 \\end{itemize}

\\section{Featured Projects}
    \\begin{itemize}[leftmargin=0.15in, label={}]

      \\resumeProjectHeading
          {\\textbf{Sentinel-AI-X} $|$ \\emph{Python, FastAPI, AI Threat Agents}}{Aug 2024}
          \\begin{itemize}
            \\resumeItem{Architected autonomous AI threat intelligence agent delivering sub-30ms vulnerability detection.}
            \\resumeItem{Engineered zero-trust inspection pipeline providing instant malicious pattern quarantine.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{DSA Visualizer Pro} $|$ \\emph{Java, Android Studio, DSA Algorithms}}{Jul 2024}
          \\begin{itemize}
            \\resumeItem{Developed 30+ interactive algorithm visualizers with real-time Big-O complexity graphing.}
            \\resumeItem{Engineered dual-platform APK and desktop AWT/Swing control center.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{BeatMatch-Reel} $|$ \\emph{Python, Librosa, Audio Onset Processing, FFmpeg}}{Jun 2024}
          \\begin{itemize}
            \\resumeItem{Spectral audio beat tracking aligning video cutpoints to musical transients.}
            \\resumeItem{Automated FFmpeg video rendering pipeline producing ready-to-publish reels.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{LogicLens} $|$ \\emph{JavaScript, Electron, React, Java/C}}{May 2024}
          \\begin{itemize}
            \\resumeItem{Cross-platform Electron app inspecting AST stack frames and heap allocations.}
            \\resumeItem{Real-time step-by-step code execution tracing for Java and C programs.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{ClassPulse} $|$ \\emph{Kotlin, Android Studio, Room DB}}{Apr 2024}
          \\begin{itemize}
            \\resumeItem{Native Kotlin Android app using Room SQLite offline storage and Coroutines Flow.}
            \\resumeItem{Real-time classroom engagement telemetry and student attendance pulse.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{WedCraft} $|$ \\emph{React, Node.js, Express, Tailwind CSS}}{Mar 2024}
          \\begin{itemize}
            \\resumeItem{Full-stack platform featuring guest RSVP management and seating arrangements.}
            \\resumeItem{Responsive glassmorphism UI styled with Tailwind CSS.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{Student Portal} $|$ \\emph{Node.js, Express, MySQL}}{Feb 2024}
          \\begin{itemize}
            \\resumeItem{ACID-compliant relational database platform for course enrollments and grades.}
            \\resumeItem{Role-based session authentication for students and faculty administrators.}
          \\end{itemize}

      \\resumeProjectHeading
          {\\textbf{Airplane Reservation System} $|$ \\emph{Java, C++, SQL Database}}{Jan 2024}
          \\begin{itemize}
            \\resumeItem{High-concurrency flight booking engine delivering sub-2ms seat allocation lookups.}
            \\resumeItem{Mutex-locked database transactions preventing double-booking race conditions.}
          \\end{itemize}

    \\end{itemize}

\\section{Experience \\& Virtual Internships}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\resumeSubheading
      {Senior Software Engineer \\& AI Architect}{2023 -- Present}
      {Open-Source AI \\& Systems Development}{Remote}
      \\begin{itemize}
        \\resumeItem{Certified in Oracle Agentic AI Specialist tools, building autonomous tool-calling agent loops.}
        \\resumeItem{Architected high-accuracy NLP threat classification models and browser extension security scanners.}
      \\end{itemize}
      
    \\resumeSubheading
      {Android Developer Virtual Intern}{2024}
      {AICTE / EduSkills Virtual Internship}{Remote}
      \\begin{itemize}
        \\resumeItem{Developed native Android application modules in Kotlin and Java adhering to clean Android MVVM architecture.}
      \\end{itemize}
  \\end{itemize}

\\section{Verified Certifications \\& Credentials}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Oracle Certified Agentic AI Specialist} -- Oracle Corporation \\\\
     \\textbf{AWS Cloud Certification} -- Amazon Web Services \\\\
     \\textbf{Android Developer Virtual Internship} -- AICTE / EduSkills \\\\
     \\textbf{Quantum Computing Virtual Internship} -- Quantum Computers R\\&D
    }}
 \\end{itemize}

\\end{document}`;

                const blob = new Blob([latexCode], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Prasanna_Bhurke_Resume.tex';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
                isBatman
                  ? 'bg-slate-950 text-amber-300 border-amber-500/40 hover:border-amber-400'
                  : 'bg-purple-950/80 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
              title="Download LaTeX Source File (.tex)"
            >
              <Code size={15} />
              <span>LaTeX (.tex)</span>
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
          {['summary', 'projects', 'skills', 'certifications', 'experience', 'education'].map((tab) => (
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
                  Senior Software Engineer and AI/ML Specialist certified in Oracle Agentic AI and AWS Cloud, with an EduSkills Android Developer Virtual Internship. Experienced in building NLP classification models, autonomous Agentic AI threat engines, native Android Kotlin/Java applications, and high-concurrency systems engines.
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

          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">Featured Technical Projects</h4>
                <span className="text-xs font-mono text-slate-400">8 Verified Repositories</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeProjects.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-white text-sm font-heading">{p.title}</h5>
                        <a href={p.repo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-300 transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <p className="text-xs text-purple-300 font-mono font-medium">{p.subtitle}</p>
                      <p className="text-[11px] font-mono text-slate-400 pt-0.5">Stack: {p.tech}</p>
                    </div>

                    <ul className="space-y-1 pt-1 border-t border-slate-800/60">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-purple-400 shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'C++', 'Java', 'Kotlin', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'].map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest">AI, Mobile & Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Oracle Agentic AI', 'Scikit-Learn', 'NLTK', 'Android Studio', 'Kotlin MVVM', 'Room DB', 'Electron', 'FastAPI', 'Librosa', 'MySQL'].map((s, idx) => (
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
                    <span className="text-xs font-mono text-purple-300">Open-Source AI & Systems Development</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">2023 – Present</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Certified in Oracle Agentic AI Specialist tools, building autonomous AI threat agents and tool loops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Completed EduSkills Android Developer Virtual Internship building native Android Studio apps in Kotlin and Java.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Engineered high-performance C++ systems engines and distributed Java Grid compilers.</span>
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
