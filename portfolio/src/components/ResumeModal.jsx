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
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Prasanna_Pradeep_Bhurke_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md ${
                isBatman
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-yellow-500/30'
                  : 'glow-btn'
              }`}
              title="Download Resume (PDF)"
            >
              <Download size={16} />
              <span>Download PDF</span>
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
                  { title: 'BeatMatch-Reel (AI Beat Sync)', points: ['Implemented Librosa audio spectral analysis to detect tempo onset transients and music BPM', 'Automated FFmpeg video editing pipeline aligning clip transition cuts to musical beats'] },
                  { title: 'WedCraft (Full Stack Event Platform)', points: ['Designed full-stack event and wedding planning platform with real-time guest RSVP workflows', 'Structured responsive glassmorphism user interface using Tailwind CSS and Express REST endpoints'] },
                  { title: 'SMS Spam Detection (ML)', points: ['Developed NLP-based model to classify spam messages', 'Applied text preprocessing and feature extraction techniques'] },
                  { title: 'Biometric Attendance System', points: ['Designed Arduino-based fingerprint authentication system', 'Enabled real-time attendance tracking'] }
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
