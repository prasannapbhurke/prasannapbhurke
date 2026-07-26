import React from 'react';
import { Code, Cpu, Database, Cloud, Terminal, Wrench, CheckCircle2 } from 'lucide-react';

export default function TechStack() {
  const categories = [
    {
      title: 'Programming Languages',
      icon: <Code size={20} className="text-purple-400" />,
      skills: [
        { name: 'Python', level: '95%' },
        { name: 'JavaScript / TypeScript', level: '90%' },
        { name: 'C++', level: '85%' },
        { name: 'SQL', level: '90%' },
        { name: 'HTML5 & CSS3', level: '95%' }
      ]
    },
    {
      title: 'AI / ML & Data Science',
      icon: <Cpu size={20} className="text-purple-400" />,
      skills: [
        { name: 'Scikit-Learn', level: '92%' },
        { name: 'NLTK / NLP Text Vectorization', level: '90%' },
        { name: 'Pandas & NumPy', level: '92%' },
        { name: 'Streamlit', level: '88%' },
        { name: 'Supervised Learning (Naive Bayes, SVM)', level: '95%' }
      ]
    },
    {
      title: 'Frontend & Web Extensions',
      icon: <Terminal size={20} className="text-purple-400" />,
      skills: [
        { name: 'React.js', level: '90%' },
        { name: 'Chrome Extension API', level: '85%' },
        { name: 'Tailwind CSS / Bootstrap', level: '92%' },
        { name: 'DOM Scripting & State Management', level: '90%' }
      ]
    },
    {
      title: 'Backend & Databases',
      icon: <Database size={20} className="text-purple-400" />,
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Wrench size={14} className="text-purple-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Tech Stack & <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Comprehensive overview of languages, frameworks, AI libraries, and database technologies.
          </p>
        </div>

        {/* Skill Matrix Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="glass-card p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span className="text-purple-400 font-bold">{skill.level}</span>
                    </div>
                    
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-400 transition-all duration-1000 shadow-md shadow-purple-500/50"
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Skill Icons Matrix */}
        <div className="mt-12 glass-card p-6 text-center">
          <span className="text-xs font-mono text-slate-400 block mb-4">Integrations & Tooling Matrix:</span>
          <img 
            src="https://skillicons.dev/icons?i=python,cpp,js,html,css,postgres,mongodb,sqlite,react,nodejs,flask,fastapi,docker,git,github,vscode&theme=dark" 
            alt="Skill Icons Matrix" 
            className="mx-auto max-w-full"
          />
        </div>

      </div>
    </section>
  );
}
