import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import BatLogoSvg from './BatLogoSvg';
import useScrollReveal from '../hooks/useScrollReveal';

function ExperienceCard({ exp, idx, isBatman }) {
  const cardRef = useScrollReveal({ direction: 'left', delay: idx * 150 });
  const accent = isBatman ? 'text-yellow-300' : 'text-purple-300';

  return (
    <div ref={cardRef} className="relative pl-14 sm:pl-20">
      <div className={`absolute left-3.5 sm:left-5 top-1.5 w-6 h-6 rounded-full border-4 border-[#090a0f] flex items-center justify-center shadow-lg ${
        isBatman ? 'bg-yellow-400 shadow-yellow-500/60' : 'bg-purple-600 shadow-purple-600/50'
      }`}>
        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
      </div>

      <article className={`glass-card p-6 sm:p-8 space-y-4 ${isBatman ? 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-yellow-500/20' : ''}`}>
        <header className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className={`text-xl sm:text-2xl font-bold font-heading ${isBatman ? 'text-yellow-300' : 'text-white'}`}>{exp.title}</h3>
            <p className={`text-xs sm:text-sm font-mono font-medium ${accent}`}>{exp.company}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-1.5 ${isBatman ? 'bg-amber-950/80 text-yellow-300 border-yellow-500/40' : 'bg-purple-950/60 text-purple-300 border-purple-500/40'}`}>
            <Calendar size={13} /><span>{exp.period}</span>
          </div>
        </header>

        {exp.periodDetail && <p className="text-[11px] font-mono text-emerald-400 font-bold">{exp.periodDetail}</p>}
        <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Key achievements:</span>
          {exp.highlights.map((highlight) => <div key={highlight} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isBatman ? 'text-yellow-400' : 'text-emerald-400'}`} /><span>{highlight}</span></div>)}
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {exp.skills.map((skill) => <span key={skill} className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${isBatman ? 'bg-slate-950 text-yellow-300 border-yellow-500/30' : 'bg-slate-900 text-purple-300 border-purple-500/30'}`}>{skill}</span>)}
        </div>
      </article>
    </div>
  );
}

export default function Experience() {
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

  const experiences = isBatman 
    ? [
        {
          title: '🦇 Senior Software Engineer & Batcave AI Architect',
          company: 'Wayne Enterprises Open-Source R&D Node',
          period: '2023 – Present',
          description: 'Architecting machine learning threat classification pipelines, browser extensions, and Batcave mainframe infrastructure.',
          highlights: [
            'Trained and deployed NLP spam & threat classification models achieving 98.2% accuracy',
            'Engineered real-time Chrome Extension API for Gotham PD browser threat scanning',
            'Constructed ACID-compliant relational DBMS architectures for WayneTech enterprise node'
          ],
          skills: ['Python', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'React', 'MySQL']
        },
        {
          title: '🦇 Tactical Algorithmic Specialist & Cipher Decrypter',
          company: 'Batcave Mainframe / LeetCode Platform',
          period: '2022 – Present',
          periodDetail: '1,000+ Algorithmic Tactical Ciphers Solved',
          description: 'Solving complex algorithms across dynamic programming, graph theory, data structures, and string processing.',
          highlights: [
            'Consistently ranking in top percentiles on competitive coding benchmarks',
            'Optimized computational complexity to achieve sub-millisecond execution times',
            'Proficient in C++ and Python memory management'
          ],
          skills: ['C++', 'Python', 'Data Structures', 'Algorithms', 'Optimization']
        }
      ]
    : [
        {
          title: 'AI / ML & Web Engineering Projects',
          company: 'Open Source & Independent Engineering',
          period: '2023 – Present',
          description: 'Building machine learning classification pipelines, browser extensions, and full-stack web applications with a focus on practical outcomes.',
          highlights: [
            'Trained and deployed NLP spam classification models achieving 98.2% accuracy',
            'Engineered real-time Chrome Extension API for browser-based text threat scanning',
            'Designed relational data models and API workflows for full-stack applications'
          ],
          skills: ['Python', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'React', 'MySQL']
        },
        {
          title: 'Competitive Algorithmic Programmer',
          company: 'LeetCode / Coding Platforms',
          period: '2022 – Present',
          periodDetail: '1,000+ Algorithmic Challenges Solved',
          title: 'AI & Full-Stack Portfolio Projects',
          company: 'Independent Project Work',
          period: '2023 – Present',
          periodDetail: 'NLP, React, FastAPI, and data-focused applications',
          description: 'Developing end-to-end NLP and full-stack projects that demonstrate model evaluation, interface design, and service integration.',
          highlights: [
            'Engineered real-time Email & SMS spam classification pipelines using Scikit-Learn, NLTK, and FastAPI',
            'Developed full-stack web platforms and interactive 3D WebGL user interfaces in React 19 & Vite 8',
            'Applied structured data flows and clean API design across project implementations'
          ],
          skills: ['Python', 'FastAPI', 'React', 'Vite', 'Machine Learning', 'Docker', 'MySQL']
        },
        {
          title: 'Systems, Algorithms & Data Projects',
          company: 'Academic & Independent Project Work',
          period: '2021 – 2023',
          description: 'Built C++ systems, SQL-backed applications, and academic portals to apply core data structures, database, and backend concepts.',
          highlights: [
            'Built C++ systems projects handling structured data and file I/O persistence',
            'Designed Node.js, Express, and MySQL application workflows using REST conventions',
            'Used Git and repeatable build workflows across project repositories'
          ],
          skills: ['C++', 'SQL', 'Node.js', 'Express', 'JavaScript', 'Git', 'Linux']
        }
      ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300">
            {isBatman ? <BatLogoSvg className="w-3.5 h-3.5 fill-yellow-400" /> : <Briefcase size={14} />}
            <span>{isBatman ? 'WAYNE TECH DOSSIER' : 'CAREER & IMPACT'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            {isBatman ? 'Gotham Mission Logs' : 'Professional Journey'}
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            {isBatman
              ? 'Chronology of high-impact engineering operations, AI deployments, and Gotham security milestones.'
              : 'Summary of software engineering roles, project achievements, and competitive milestones.'}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="mt-12 max-w-4xl mx-auto space-y-8 relative">
          
          <div className={`absolute top-0 bottom-0 left-6 sm:left-8 w-0.5 ${
            isBatman
              ? 'bg-gradient-to-b from-yellow-500 via-amber-600 to-transparent'
              : 'bg-gradient-to-b from-purple-600 via-indigo-600 to-transparent'
          }`} />

          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} idx={idx} isBatman={isBatman} />
          ))}

        </div>

      </div>
    </section>
  );
}
