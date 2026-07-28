import React, { useState, useEffect } from 'react';
import { Code, Cpu, Database, Terminal, Wrench } from 'lucide-react';
import BatLogoSvg from './BatLogoSvg';
import SkillRadarChart from './SkillRadarChart';
import ThreeDSkillCube from './ThreeDSkillCube';

export default function TechStack() {
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

  const categories = [
    {
      title: isBatman ? '🦇 Batcave Core Languages' : 'Programming Languages',
      icon: isBatman ? <BatLogoSvg className="w-5 h-4" goldBackplate={true} /> : <Code size={20} className="text-purple-400" />,
      skills: [
        { name: 'Python', level: '95%' },
        { name: 'JavaScript / TypeScript', level: '90%' },
        { name: 'C++', level: '85%' },
        { name: 'SQL', level: '90%' },
        { name: 'HTML5 & CSS3', level: '95%' }
      ]
    },
    {
      title: isBatman ? '🦇 Gotham Threat Predictive AI' : 'AI / ML & Data Science',
      icon: isBatman ? <BatLogoSvg className="w-5 h-4" goldBackplate={true} /> : <Cpu size={20} className="text-purple-400" />,
      skills: [
        { name: 'Scikit-Learn', level: '92%' },
        { name: 'NLTK / NLP Text Vectorization', level: '90%' },
        { name: 'Pandas & NumPy', level: '92%' },
        { name: 'Streamlit', level: '88%' },
        { name: 'Supervised Learning (Naive Bayes, SVM)', level: '95%' }
      ]
    },
    {
      title: isBatman ? '🦇 Tactical HUD & Web Extensions' : 'Frontend & Web Extensions',
      icon: isBatman ? <BatLogoSvg className="w-5 h-4" goldBackplate={true} /> : <Terminal size={20} className="text-purple-400" />,
      skills: [
        { name: 'React.js', level: '90%' },
        { name: 'Chrome Extension API', level: '85%' },
        { name: 'Tailwind CSS / Bootstrap', level: '92%' },
        { name: 'DOM Scripting & State Management', level: '90%' }
      ]
    },
    {
      title: isBatman ? '🦇 WayneTech Microservices Cloud' : 'Backend & Databases',
      icon: isBatman ? <BatLogoSvg className="w-5 h-4" goldBackplate={true} /> : <Database size={20} className="text-purple-400" />,
      skills: [
        { name: 'FastAPI / Flask', level: '92%' },
        { name: 'Node.js / Express', level: '88%' },
        { name: 'MySQL & SQLite', level: '90%' },
        { name: 'MongoDB', level: '85%' },
        { name: 'RESTful Microservices', level: '92%' }
      ]
    }
  ];

  return (
    <section id="tech-stack" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
            isBatman
              ? 'bg-amber-950/80 border border-yellow-500/50 text-yellow-300 shadow-md shadow-yellow-500/20'
              : 'bg-purple-950/60 border border-purple-500/40 text-purple-300'
          }`}>
            {isBatman ? <BatLogoSvg className="w-4 h-3" goldBackplate={true} /> : <Wrench size={14} className="text-purple-400" />}
            <span>{isBatman ? 'WAYNE TECH R&D INVENTORY' : 'Technical Capabilities'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight pb-2">
            {isBatman ? (
              <>Gotham Arsenal & <span className="text-yellow-400 font-extrabold drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">Ecosystem</span></>
            ) : (
              <>Tech Stack & <span className="text-purple-300 font-extrabold drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">Ecosystem</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {isBatman 
              ? 'High-voltage tactical algorithms, AI threat classifiers, and Batcave mainframe infrastructure.' 
              : 'Comprehensive overview of languages, frameworks, AI libraries, and database technologies.'}
          </p>
        </div>

        {/* Skill Matrix Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-6 sm:p-8 space-y-6 transition-all duration-300 ${
                isBatman ? 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-yellow-500/20' : ''
              }`}
            >
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                {cat.icon}
                <h3 className={`text-xl font-bold font-heading ${isBatman ? 'text-yellow-300' : 'text-white'}`}>
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm font-mono">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span className={isBatman ? 'text-yellow-400 font-bold' : 'text-purple-300 font-bold'}>
                        {skill.level}
                      </span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isBatman
                            ? 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-300 shadow-md shadow-yellow-500/50'
                            : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 shadow-md shadow-purple-600/50'
                        }`}
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive 3D Skill Cube & Competency Radar Spider Matrix */}
        <div className="mt-12 space-y-8">
          <ThreeDSkillCube />
          <SkillRadarChart />
        </div>

        {/* Tooling Matrix Footer */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            {isBatman ? '🦇 WayneTech Hardware & Defense Tooling Matrix:' : 'Integrations & Tooling Matrix:'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {['Python', 'C++', 'JavaScript', 'HTML5', 'CSS3', 'PostgreSQL', 'MongoDB', 'SQLite', 'React', 'Node.js', 'FastAPI', 'Flask', 'Docker', 'Git', 'GitHub', 'VSCode'].map((tool, tIdx) => (
              <span 
                key={tIdx}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  isBatman
                    ? 'bg-slate-950 text-yellow-300 border-yellow-500/30 hover:border-yellow-400 hover:shadow-md hover:shadow-yellow-500/30'
                    : 'bg-slate-900/90 text-purple-300 border-purple-500/30 hover:border-purple-400'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
