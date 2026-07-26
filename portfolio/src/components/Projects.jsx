import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, ShieldCheck, Zap, Server, ChevronRight, X } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'email-spam-extension',
      title: 'Email Spam Detector Extension',
      category: 'AI / Machine Learning & Web Extension',
      description: 'Real-time browser extension that automatically scans incoming email bodies and classifies them as Spam or Ham using an integrated Machine Learning model backend.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'Chrome Extension API'],
      metrics: {
        accuracy: '98.2%',
        latency: '<50ms',
        impact: 'Real-time Client Protection'
      },
      githubUrl: 'https://github.com/prasannapbhurke/email-spam-detector-extension',
      details: {
        architecture: 'Trained an optimized Multinomial Naive Bayes & Support Vector Classifier model utilizing TF-IDF n-gram vectorization on large email message datasets. Built background script listeners and DOM content injection scripts to highlight spam risk levels directly within email client interfaces.',
        features: [
          'Client-side privacy preservation with local inference cache',
          'Dynamic DOM highlight overlay for suspicious email elements',
          'FastAPI microservice endpoint returning sub-50ms JSON threat scores',
          'Confusion matrix validation with 98.2% precision score'
        ]
      }
    },
    {
      id: 'sms-spam-detector',
      title: 'SMS Spam Detector App',
      category: 'Natural Language Processing & Web App',
      description: 'End-to-end NLP-driven web application for detection and filtering of malicious SMS text messages with interactive confidence metrics.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'NLTK', 'Scikit-Learn', 'Streamlit', 'Pandas', 'NumPy'],
      metrics: {
        f1Score: '97.8%',
        dataset: '5,500+ SMS Corpus',
        ui: 'Streamlit Interactive'
      },
      githubUrl: 'https://github.com/prasannapbhurke/sms-spam-detector',
      details: {
        architecture: 'Applied comprehensive text preprocessing including lowercasing, punctuation stripping, NLTK stopword filtering, and Porter stemming. Evaluated multiple classifiers (Naive Bayes, Random Forest, Logistic Regression) to select the optimal model pipeline.',
        features: [
          'Comprehensive text cleaning pipeline with NLTK tokenizer',
          'Interactive Streamlit GUI for real-time text testing',
          'Hyperparameter tuned Multinomial Naive Bayes classifier',
          'Detailed model performance metric visualizations'
        ]
      }
    },
    {
      id: 'student-portal',
      title: 'Academic Student Portal',
      category: 'Full Stack Web Platform',
      description: 'Full-stack web application designed for academic management, allowing students and administrators to manage courses, track grades, and view attendance.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'HTML5/CSS3'],
      metrics: {
        roles: 'Multi-Role Admin/Student',
        auth: 'Session Security',
        db: 'Relational Schema'
      },
      githubUrl: 'https://github.com/prasannapbhurke/student-portal',
      details: {
        architecture: 'Designed structured relational database schemas for managing student records, course enrollments, grade sheets, and admin authorizations. Implemented secure authentication middleware and RESTful endpoints for CRUD actions.',
        features: [
          'Role-based access control (Admin vs Student dashboards)',
          'Course enrollment management and grade tracking',
          'Optimized SQL queries for fast report generation',
          'Responsive glassmorphism dashboard UI'
        ]
      }
    },
    {
      id: 'airplane-reservation',
      title: 'Airplane Reservation System',
      category: 'Database Systems & Desktop App',
      description: 'Desktop/web management application facilitating flight scheduling, passenger seat booking, ticket generation, and flight availability status queries.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      tags: ['C++', 'Python', 'SQL', 'DBMS', 'Relational Engine'],
      metrics: {
        concurrency: 'ACID Compliant',
        integrity: 'Zero Double-Booking',
        speed: 'Indexed Query Execution'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Airplane-Reservation-System',
      details: {
        architecture: 'Constructed relational database schemas with foreign key constraints to prevent overbooking and schedule conflicts. Programmed business logic routines for real-time seat assignment, fare calculation, and ticket cancellation workflows.',
        features: [
          'Real-time seat matrix allocation engine',
          'Automated ticket generation and cancellation logic',
          'Transactional integrity guarantees with SQL rollbacks',
          'CLI and GUI interfaces for passenger flight lookup'
        ]
      }
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker Application',
      category: 'Frontend & Personal Finance App',
      description: 'Responsive personal finance management application enabling users to track income, record daily expenditures, visualize monthly budgets, and categorize spending.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'React', 'HTML5', 'CSS3', 'LocalStorage'],
      metrics: {
        state: 'React Hooks State',
        storage: 'Persistent Local Storage',
        ui: 'Responsive Mobile First'
      },
      githubUrl: 'https://github.com/prasannapbhurke/expense-tracker-app',
      details: {
        architecture: 'Built dynamic UI dashboards displaying total balance, income vs. expense breakdown charts, and dynamic category filters. Implemented robust state management and local storage persistence for reliable data retention.',
        features: [
          'Real-time financial summary calculations (Balance, Income, Expense)',
          'Category filtering (Food, Travel, Bills, Entertainment)',
          'Local Storage persistence across page reloads',
          'Clean, modern responsive UI design'
        ]
      }
    }
  ];

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Layers size={14} className="text-purple-400" />
            <span>Featured Software Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Engineering <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Explore production-grade AI platforms, NLP classifiers, browser extensions, and full-stack web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass-card flex flex-col overflow-hidden group">
              
              {/* Project Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-purple-950/90 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono bg-slate-900/80 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group/btn"
                  >
                    <span>View Architecture</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-purple-950 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all"
                    title="View Code on GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border-purple-500/40 shadow-2xl">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
              {selectedProject.category}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
              {selectedProject.title}
            </h3>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Architecture Section */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-purple-500/20">
              <h4 className="text-sm font-bold font-mono text-purple-300 flex items-center gap-2 mb-2">
                <Server size={16} /> System Architecture & Engineering Approach
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedProject.details.architecture}
              </p>
            </div>

            {/* Key Feature Bullets */}
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-bold font-mono text-slate-200">Key Technical Capabilities:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedProject.details.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Action Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <a 
                href={selectedProject.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="glow-btn px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
              >
                <GithubIcon size={16} />
                <span>Explore GitHub Repository</span>
                <ExternalLink size={14} />
              </a>

              <button 
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
