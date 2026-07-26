import React from 'react';
import { Briefcase, Award, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'Software Engineer & AI Developer',
      company: 'Open Source & Independent Engineering',
      period: '2023 – Present',
      description: 'Architecting machine learning classification pipelines, browser extensions, and full-stack web applications.',
      highlights: [
        'Trained and deployed NLP spam classification models achieving 98.2% accuracy',
        'Engineered real-time Chrome Extension API for browser-based text threat scanning',
        'Constructed ACID-compliant relational DBMS architectures for enterprise management systems'
      ],
      skills: ['Python', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'React', 'MySQL']
    },
    {
      title: 'Competitive Algorithmic Programmer',
      company: 'LeetCode / Coding Platforms',
      period: '2022 – Present',
      periodDetail: '1,000+ Algorithmic Challenges Solved',
      description: 'Solving complex algorithms across dynamic programming, graph theory, data structures, and string processing.',
      highlights: [
        'Consistently ranking in top percentiles on competitive coding benchmarks',
        'Optimized computational complexity to achieve sub-millisecond execution times',
        'Proficient in C++ and Python memory management'
      ],
      skills: ['C++', 'Python', 'Data Structures', 'Algorithms', 'Optimization']
    }
  ];

  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Briefcase size={14} className="text-purple-400" />
            <span>Engineering Career & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Experience & <span className="bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(233,213,255,0.5)]">Timeline</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Summary of software engineering roles, project achievements, and competitive milestones.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="mt-12 max-w-4xl mx-auto space-y-8 relative">
          
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-purple-600 via-indigo-600 to-transparent" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-14 sm:pl-20">
              
              {/* Timeline Node Dot */}
              <div className="absolute left-3.5 sm:left-5 top-1.5 w-6 h-6 rounded-full bg-purple-600 border-4 border-[#090a0f] flex items-center justify-center shadow-lg shadow-purple-600/50">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 space-y-4">
                
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {exp.title}
                    </h3>
                    <span className="text-sm font-semibold text-purple-300 block mt-0.5">
                      {exp.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2 pt-2">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {exp.skills.map((sk, sIdx) => (
                    <span key={sIdx} className="text-[11px] font-mono bg-slate-900 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
