import React, { useState, useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code, Award, CheckCircle2, Trophy, Star } from 'lucide-react';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('education');
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
    const resumeText = `PRASANNA PRADEEP BHURKE
Kolhapur, India | +91 7620809814 | prasannapbhurke@gmail.com
LinkedIn: linkedin.com/in/prasanna-bhurke-25a10931a | GitHub: github.com/prasannapbhurke | Portfolio: prasannapbhurke.github.io

================================================================================
EDUCATION
================================================================================
B.Tech in Computer Science Engineering
DYPCET, Kolhapur
2025 – 2028
CGPA: 8.0

Diploma in Electronics and Computer Engineering
New Institute of Technology
2023 – 2025
Percentage: 91.00%

================================================================================
TECHNICAL SKILLS
================================================================================
Languages: C, C++, Python, Java, HTML, ASM, MATLAB, SPICE (circuit simulation)
Web: HTML, CSS, JavaScript, PHP, SQL
Embedded: Arduino, Sensors, UART, RT Systems
ML/CV: NLP, OpenCV, YOLO, SSD
Tools: Git, GitHub, VS Code

================================================================================
ACHIEVEMENTS
================================================================================
- Scored 91% in Diploma (Top academic performance)
- Organized and led multiple technical and non-technical events
- Built multiple real-world projects in ML and Embedded Systems

================================================================================
INTERESTS
================================================================================
Chess, Problem Solving, Networking, Reading

================================================================================
PROJECTS
================================================================================
1. Sentinel-AI-X (Threat Intelligence)
   - Architected autonomous AI threat agent delivering sub-30ms vulnerability payload detection.
   - Engineered zero-trust inspection pipeline providing instant malicious pattern quarantine.

2. DSA Visualizer Pro
   - Developed 30+ interactive algorithm visualizers with real-time Big-O complexity graphing.
   - Engineered dual-platform APK and desktop AWT/Swing control center.

3. SMS Spam Detection (ML)
   - Developed NLP-based model to classify spam messages.
   - Applied text preprocessing and feature extraction techniques.

4. Portfolio Builder (Web App)
   - Built dynamic web app using HTML, JS, PHP, SQL.
   - Generates customizable personal portfolio websites.

5. Biometric Attendance System
   - Designed Arduino-based fingerprint authentication system.
   - Enabled real-time attendance tracking.

6. Object Detection System
   - Implemented YOLO and SSD models.
   - Achieved real-time performance using OpenCV.

================================================================================
LEADERSHIP & ACTIVITIES
================================================================================
1. Event Coordinator (2023–2025)
   - Led planning and execution of technical and sports events.
   - Managed teams and coordinated logistics.

2. Core Team Member, NIT Kolhapur
   - Organized large-scale institutional events.
   - Coordinated logistics and team operations.
`;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prasanna_Pradeep_Bhurke_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadLatex = () => {
    sound.playSuccess();
    const latexCode = `%-------------------------------------------------------------------------------
% Prasanna Pradeep Bhurke - Two-Column Engineering Resume
% Format: pdflatex / Overleaf Compatible
%-------------------------------------------------------------------------------

\\documentclass[letterpaper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.45in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{tabularx}
\\usepackage{paracol}

\\definecolor{primary}{RGB}{70, 130, 180} % Steel blue title lines

\\titleformat{\\section}
  {\\color{primary}\\large\\bfseries}
  {}{0em}{}
  [\\color{primary}\\hrule height 0.6pt \\vspace{-3pt}]

\\setlist[itemize]{leftmargin=*,noitemsep,topsep=2pt}
\\pagestyle{empty}

\\begin{document}

\\begin{center}
    {\\Huge \\bfseries Prasanna Pradeep Bhurke} \\\\[4pt]
    Kolhapur, India \\quad $|$ \\quad \\href{tel:+917620809814}{+91 7620809814} \\quad $|$ \\quad \\href{mailto:prasannapbhurke@gmail.com}{prasannapbhurke@gmail.com} \\\\[2pt]
    \\href{https://www.linkedin.com/in/prasanna-bhurke-25a10931a}{LinkedIn} \\quad $|$ \\quad \\href{https://github.com/prasannapbhurke}{GitHub} \\quad $|$ \\quad \\href{https://prasannapbhurke.github.io/prasannapbhurke/}{Portfolio}
\\end{center}

\\vspace{-4pt}

\\columnratio{0.46}
\\begin{paracol}{2}

\\section*{Education}

\\textbf{B.Tech in Computer Science Engineering} \\\\
DYPCET, Kolhapur \\\\
2025 -- 2028 \\\\
CGPA: 8.0 \\\\[6pt]

\\textbf{Diploma in Electronics and Computer Engineering} \\\\
New Institute of Technology \\\\
2023 -- 2025 \\\\
Percentage: 91.00\\%

\\section*{Technical Skills}

\\textbf{Languages:} C, C++, Python, Java, HTML, ASM, MATLAB, SPICE (circuit simulation) \\\\
\\textbf{Web:} HTML, CSS, JavaScript, PHP, SQL \\\\
\\textbf{Embedded:} Arduino, Sensors, UART, RT Systems \\\\
\\textbf{ML/CV:} NLP, OpenCV, YOLO, SSD \\\\
\\textbf{Tools:} Git, GitHub, VS Code

\\section*{Achievements}
\\begin{itemize}
    \\item Scored \\textbf{91\\%} in Diploma (Top academic performance)
    \\item Organized and led multiple technical and non-technical events
    \\item Built multiple real-world projects in ML and Embedded Systems
\\end{itemize}

\\section*{Interests}
Chess, Problem Solving, Networking, Reading

\\switchcolumn

\\section*{Projects}

\\textbf{Sentinel-AI-X (Threat Intelligence)}
\\begin{itemize}
    \\item Architected autonomous AI threat agent delivering sub-30ms vulnerability payload detection
    \\item Engineered zero-trust inspection pipeline providing instant malicious pattern quarantine
\\end{itemize}
\\vspace{4pt}

\\textbf{DSA Visualizer Pro}
\\begin{itemize}
    \\item Developed 30+ interactive algorithm visualizers with real-time Big-O complexity graphing
    \\item Engineered dual-platform APK and desktop AWT/Swing control center
\\end{itemize}
\\vspace{4pt}

\\textbf{SMS Spam Detection (ML)}
\\begin{itemize}
    \\item Developed NLP-based model to classify spam messages
    \\item Applied text preprocessing and feature extraction techniques
\\end{itemize}
\\vspace{4pt}

\\textbf{Portfolio Builder (Web App)}
\\begin{itemize}
    \\item Built dynamic web app using HTML, JS, PHP, SQL
    \\item Generates customizable personal portfolio websites
\\end{itemize}
\\vspace{4pt}

\\textbf{Biometric Attendance System}
\\begin{itemize}
    \\item Designed Arduino-based fingerprint authentication system
    \\item Enabled real-time attendance tracking
\\end{itemize}
\\vspace{4pt}

\\textbf{Object Detection System}
\\begin{itemize}
    \\item Implemented YOLO and SSD models
    \\item Achieved real-time performance using OpenCV
\\end{itemize}

\\section*{Leadership \\& Activities}

\\textbf{Event Coordinator} (2023--2025)
\\begin{itemize}
    \\item Led planning and execution of technical and sports events
    \\item Managed teams and coordinated logistics
\\end{itemize}
\\vspace{4pt}

\\textbf{Core Team Member, NIT Kolhapur}
\\begin{itemize}
    \\item Organized large-scale institutional events
    \\item Coordinated logistics and team operations
\\end{itemize}

\\end{paracol}

\\end{document}`;

    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prasanna_Pradeep_Bhurke_Resume.tex';
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
                Prasanna Pradeep Bhurke — Resume
              </h2>
              <p className={`text-xs font-mono ${isBatman ? 'text-amber-400' : 'text-purple-300'}`}>
                Kolhapur, India | +91 7620809814 | prasannapbhurke@gmail.com
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
              onClick={handleDownloadLatex}
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
          {['education', 'skills', 'projects', 'achievements', 'leadership', 'interests'].map((tab) => (
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
          
          {activeTab === 'education' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 space-y-2">
                  <h4 className="font-bold text-white text-base">B.Tech in Computer Science Engineering</h4>
                  <p className="text-xs font-mono text-purple-300">DYPCET, Kolhapur</p>
                  <p className="text-xs font-mono text-slate-400">2025 – 2028</p>
                  <div className="pt-2">
                    <span className="px-3 py-1 rounded bg-purple-950 border border-purple-500/40 text-xs font-mono font-bold text-purple-200">
                      CGPA: 8.0
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 space-y-2">
                  <h4 className="font-bold text-white text-base">Diploma in Electronics and Computer Engineering</h4>
                  <p className="text-xs font-mono text-purple-300">New Institute of Technology</p>
                  <p className="text-xs font-mono text-slate-400">2023 – 2025</p>
                  <div className="pt-2">
                    <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-200">
                      Percentage: 91.00%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4 animate-fadeIn font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold">Languages:</span>
                <p className="text-slate-200">C, C++, Python, Java, HTML, ASM, MATLAB, SPICE (circuit simulation)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold">Web:</span>
                <p className="text-slate-200">HTML, CSS, JavaScript, PHP, SQL</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold">Embedded:</span>
                <p className="text-slate-200">Arduino, Sensors, UART, RT Systems</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold">ML / Computer Vision:</span>
                <p className="text-slate-200">NLP, OpenCV, YOLO, SSD</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold">Tools:</span>
                <p className="text-slate-200">Git, GitHub, VS Code</p>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Sentinel-AI-X (Threat Intelligence)', points: ['Architected autonomous AI threat agent delivering sub-30ms vulnerability payload detection', 'Engineered zero-trust inspection pipeline providing instant malicious pattern quarantine'] },
                  { title: 'DSA Visualizer Pro', points: ['Developed 30+ interactive algorithm visualizers with real-time Big-O complexity graphing', 'Engineered dual-platform APK and desktop AWT/Swing control center'] },
                  { title: 'SMS Spam Detection (ML)', points: ['Developed NLP-based model to classify spam messages', 'Applied text preprocessing and feature extraction techniques'] },
                  { title: 'Portfolio Builder (Web App)', points: ['Built dynamic web app using HTML, JS, PHP, SQL', 'Generates customizable personal portfolio websites'] },
                  { title: 'Biometric Attendance System', points: ['Designed Arduino-based fingerprint authentication system', 'Enabled real-time attendance tracking'] },
                  { title: 'Object Detection System', points: ['Implemented YOLO and SSD models', 'Achieved real-time performance using OpenCV'] }
                ].map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <h5 className="font-bold text-white text-sm font-heading">{p.title}</h5>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
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

          {activeTab === 'achievements' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Trophy size={18} />
                  <span>Key Academic & Engineering Accomplishments</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Scored <strong>91%</strong> in Diploma (Top academic performance).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Organized and led multiple technical and non-technical events.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Built multiple real-world projects in ML and Embedded Systems.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-white text-sm font-heading">Event Coordinator</h5>
                  <span className="text-xs font-mono text-slate-400">2023 – 2025</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5"><span className="text-purple-400">•</span><span>Led planning and execution of technical and sports events</span></li>
                  <li className="flex items-start gap-1.5"><span className="text-purple-400">•</span><span>Managed teams and coordinated logistics</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h5 className="font-bold text-white text-sm font-heading">Core Team Member, NIT Kolhapur</h5>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5"><span className="text-purple-400">•</span><span>Organized large-scale institutional events</span></li>
                  <li className="flex items-start gap-1.5"><span className="text-purple-400">•</span><span>Coordinated logistics and team operations</span></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 animate-fadeIn">
              <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-widest mb-3">Personal Interests</h4>
              <div className="flex flex-wrap gap-2">
                {['Chess', 'Problem Solving', 'Networking', 'Reading'].map((interest, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono text-slate-200">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Prasanna Pradeep Bhurke Resume Portfolio</span>
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
