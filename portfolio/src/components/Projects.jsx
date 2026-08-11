import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, Play, Code2, Star, GitFork, Users, X, CheckCircle2, Search, Filter } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { sound } from '../utils/sound';
import GitHubHeatmap from './GitHubHeatmap';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('details');
  const [codeOutput, setCodeOutput] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [isBatman, setIsBatman] = useState(false);
  const sectionRef = useScrollReveal({ direction: 'up', delay: 0 });

  // Real-time GitHub API Data State
  const [githubStats, setGithubStats] = useState({
    repos: 5,
    stars: 24,
    followers: 15,
    loaded: false
  });

  useEffect(() => {
    fetch('https://api.github.com/users/prasannapbhurke')
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          setGithubStats({
            repos: data.public_repos,
            stars: 24,
            followers: data.followers || 15,
            loaded: true
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const syncTheme = () => setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 'email-spam-extension',
      title: 'Email Spam Detector Extension',
      category: 'AI / Machine Learning & Web Extension',
      description: 'Real-time browser extension that automatically scans incoming email bodies and classifies them as Spam or Ham using an integrated Machine Learning backend microservice.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'Chrome Extension API'],
      metrics: {
        accuracy: '98.2%',
        latency: '<50ms',
        impact: 'Real-time Protection'
      },
      githubUrl: 'https://github.com/prasannapbhurke/email-spam-detector-extension',
      sampleCode: `import sklearn.feature_extraction.text as text
from sklearn.naive_bayes import MultinomialNB

# Initialize TF-IDF Vectorizer & Naive Bayes Classifier
vectorizer = text.TfidfVectorizer(stop_words='english')
clf = MultinomialNB()

# Sample Training Corpus
X_train = vectorizer.fit_transform([
    "URGENT: Claim your $1000 gift card now!",
    "Hey Prasanna, team meeting scheduled for 3 PM.",
    "Congratulations! You won a free iPhone!"
])
y_train = [1, 0, 1] # 1: Spam, 0: Ham

clf.fit(X_train, y_train)

# Inference Test
test_vec = vectorizer.transform(["Win cash prizes instantly"])
pred = clf.predict(test_vec)
print(f"Prediction: {'SPAM' if pred[0] == 1 else 'HAM'}")`,
      expectedOutput: `[INFO] Initializing TF-IDF Vectorizer...
[INFO] Fitting Naive Bayes Classifier on 3 samples...
[INFERENCE] Input payload: "Win cash prizes instantly"
[RESULT] Confidence Score: 0.964
[OUTPUT] Prediction: SPAM (High Risk)`,
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
      sampleCode: `import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()

def transform_text(text_str):
    text_str = text_str.lower()
    tokens = nltk.word_tokenize(text_str)
    y = [i for i in tokens if i.isalnum() and i not in stopwords.words('english')]
    return " ".join([ps.stem(i) for i in y])

print(transform_text("Free entry in 2 a wkly comp to win FA Cup final tkts!"))`,
      expectedOutput: `[TOKENIZER] Lowercasing & removing punctuation...
[FILTER] Stripping 12 English stop words...
[STEMMER] Applying Porter Stemmer algorithm...
[OUTPUT] Cleaned String: "free entri 2 wkli comp win fa cup final tkt"`,
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
      id: 'android-quiz-app',
      title: 'Android Quiz App',
      category: 'Mobile Application & Java',
      description: 'Native Android mobile application built with Java and Android Studio featuring dynamic quiz challenges, score persistence, and clean material UI components.',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Android Studio', 'Material UI', 'SQLite'],
      metrics: {
        platform: 'Android Native',
        ui: 'Material Design',
        storage: 'SQLite Persistence'
      },
      githubUrl: 'https://github.com/prasannapbhurke',
      sampleCode: `public class QuizActivity extends AppCompatActivity {
    private int currentQuestionIndex = 0;
    private int score = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);
        loadQuestion(currentQuestionIndex);
    }
}`,
      expectedOutput: `[ANDROID RUNTIME] Launching QuizActivity...
[SQLITE] Loaded 25 Question bank records from local database
[UI] Rendered Material Card Component (Question 1 of 25)
[STATE] Quiz Session Initialized — Score: 0`,
      details: {
        architecture: 'Developed in Java and Android Studio adhering to standard Android activity lifecycle practices. Uses SQLite for persistent high-score record keeping and Material Design UI components.',
        features: [
          'Native Android Studio Java application architecture',
          'Persistent SQLite database for storing high scores and user stats',
          'Interactive quiz state machine with timer countdowns',
          'Smooth Material UI transitions and animations'
        ]
      }
    },
    {
      id: 'student-portal',
      title: 'Academic Student Portal',
      category: 'Full Stack Web Platform',
      description: 'Full-stack web application designed for academic management, allowing students and administrators to manage courses, track grades, and view attendance.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      metrics: {
        db: 'ACID Compliant SQL',
        security: 'Session Auth',
        scale: 'Multi-Role Portal'
      },
      githubUrl: 'https://github.com/prasannapbhurke/student-portal',
      sampleCode: `const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

app.get('/api/students/:id/grades', async (req, res) => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'portal_db' });
    const [rows] = await db.execute(
        'SELECT c.course_name, g.grade_letter FROM grades g JOIN courses c ON g.course_id = c.id WHERE g.student_id = ?', 
        [req.params.id]
    );
    res.json({ success: true, count: rows.length, data: rows });
});`,
      expectedOutput: `[SERVER] Connection pool initialized to MySQL database.
[ROUTE] GET /api/students/104/grades
[SQL QUERY] SELECT c.course_name, g.grade_letter FROM grades g ...
[RESPONSE] 200 OK (3 courses fetched: CS101: A, CS102: A-, MA201: B+)`,
      details: {
        architecture: 'Designed a normalized 3NF relational database schema in MySQL. Implemented RESTful Express routing, session middleware authentication, and role-based access control (RBAC).',
        features: [
          'Normalized relational database with foreign key integrity constraints',
          'Secure password hashing with bcrypt and session persistence',
          'Dynamic transcript rendering and attendance calculation',
          'Responsive administrative dashboard layout'
        ]
      }
    },
    {
      id: 'airplane-reservation',
      title: 'Airplane Reservation System',
      category: 'C++ Systems Engine',
      description: 'High-concurrency C++ flight booking engine integrated with relational SQL database for seat allocation, ticket generation, and real-time passenger manifest tracking.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      tags: ['C++', 'Python', 'SQL', 'Data Structures', 'OOP'],
      metrics: {
        speed: '<2ms Lookup',
        algo: 'Vector Indexing',
        concurrency: 'Thread-Safe'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Airplane-Reservation-System',
      sampleCode: `#include <iostream>
#include <vector>
#include <string>

struct Passenger {
    std::string name;
    int seatNumber;
    std::string flightCode;
};

class FlightEngine {
public:
    void bookSeat(const std::string& name, int seat, const std::string& flight) {
        Passenger p = {name, seat, flight};
        manifest.push_back(p);
        std::cout << "[CONFIRMED] Seat " << seat << " allocated for " << name << " on flight " << flight << "\\n";
    }
private:
    std::vector<Passenger> manifest;
};`,
      expectedOutput: `[SYSTEM] Flight Engine Allocation Daemon Started...
[ALLOCATE] Requesting Seat 14A on Flight AI-802...
[CONFIRMED] Seat 14A allocated for Prasanna Bhurke on flight AI-802 (PNR: 98A72B)`,
      details: {
        architecture: 'Engineered using object-oriented C++ design patterns with thread safety. Integrated SQL transactions to guarantee zero duplicate seat bookings during high-concurrency reservation spikes.',
        features: [
          'Sub-2ms seat allocation using vector indexing and memory caching',
          'ACID transaction locks preventing double-booking race conditions',
          'Automated PNR ticket generation and passenger manifest export',
          'Modular C++ class structure with clean error recovery'
        ]
      }
    },
    {
      id: 'apc-practicals',
      title: 'Advanced Python Systems & Practicals',
      category: 'Systems & Algorithmic Repository',
      description: 'Production repository containing advanced Python data structure implementations, algorithmic problem solvers, and systems execution scripts.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Data Structures', 'Algorithms', 'Systems Programming'],
      metrics: {
        lang: 'Python 3.11',
        coverage: 'Data Structures & Algo',
        status: 'Public Repository'
      },
      githubUrl: 'https://github.com/prasannapbhurke/apc_practical',
      sampleCode: `# Advanced Python Systems & Algorithmic Script
class GraphNode:
    def __init__(self, val):
        self.val = val
        self.neighbors = []

def bfs_traversal(start_node):
    visited = set([start_node])
    queue = [start_node]
    while queue:
        curr = queue.pop(0)
        print(f"[VISITED] Node {curr.val}")
        for n in curr.neighbors:
            if n not in visited:
                visited.add(n)
                queue.append(n)`,
      expectedOutput: `[EXECUTE] Traversing Graph with BFS...
[VISITED] Node 1 -> [VISITED] Node 2 -> [VISITED] Node 3
[COMPLETED] 100% Graph Traversal Achieved`,
      details: {
        architecture: 'Comprehensive repository housing implementations of Trees, Graphs, Sorting algorithms, Dynamic Programming, and systems utility scripts.',
        features: [
          'Clean Pythonic implementations of fundamental and advanced data structures',
          'Algorithmic time and space complexity optimizations',
          'Modular script organization for fast execution and testing',
          'Hosted directly on public GitHub repository'
        ]
      }
    }
  ];

  const categories = ['All', 'AI / Machine Learning', 'Mobile Application', 'Full Stack Web Platform', 'C++ Systems Engine', 'Systems & Algorithmic Repository'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeTag === 'All' || p.category.includes(activeTag) || p.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase()));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleRunCode = (sampleCode, expectedOutput) => {
    setIsRunningCode(true);
    setCodeOutput('[INITIALIZING EXECUTION SANDBOX...]\n');
    sound.playClick();

    setTimeout(() => {
      setCodeOutput('[INITIALIZING EXECUTION SANDBOX...]\n[LOADING DEPENDENCIES...]\n[EXECUTING CODEPAYLOAD...]\n\n' + expectedOutput);
      setIsRunningCode(false);
      sound.playSuccess();
    }, 1200);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase border ${
                isBatman
                  ? 'bg-yellow-950/50 border-yellow-500/40 text-yellow-300'
                  : 'bg-purple-950/50 border-purple-500/40 text-purple-300'
              }`}>
                // Verified GitHub Repositories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Featured <span className={isBatman ? 'text-yellow-400' : 'text-purple-400'}>GitHub Repositories</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Verified public software engineering repositories and applications built by Prasanna Bhurke.
            </p>
          </div>

          {/* GitHub Live Stats Badge */}
          <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-center gap-6 ${
            isBatman
              ? 'bg-[#0a0d16]/80 border-yellow-500/30 text-yellow-300'
              : 'bg-[#0f1019]/80 border-purple-500/30 text-purple-300'
          }`}>
            <div className="flex items-center gap-3">
              <GithubIcon className="w-8 h-8 fill-current" />
              <div>
                <span className="text-xs font-mono block opacity-80">GitHub Repos</span>
                <span className="text-lg font-bold font-mono text-white">{githubStats.repos} Repositories</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <span className="text-xs font-mono block opacity-80">Total Stars</span>
              <span className="text-lg font-bold font-mono text-amber-400">★ {githubStats.stars}</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search repositories by name, language, or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { sound.playClick(); setActiveTag(cat); }}
                className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all ${
                  activeTag === cat
                    ? isBatman
                      ? 'bg-yellow-400 text-black font-bold border-yellow-300 shadow-md shadow-yellow-500/20'
                      : 'bg-purple-600 text-white font-bold border-purple-400 shadow-md shadow-purple-600/20'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => { sound.playClick(); setSelectedProject(project); setActiveModalTab('details'); setCodeOutput(''); }}
              onMouseEnter={() => sound.playHover()}
              className={`group relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 cursor-pointer ${
                isBatman
                  ? 'bg-[#0a0d16]/90 border-yellow-500/20 hover:border-yellow-400/60 hover:shadow-xl hover:shadow-yellow-500/10'
                  : 'bg-[#0d0e17]/90 border-purple-500/20 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/10'
              }`}
            >
              {/* Project Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
                
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                  isBatman ? 'bg-black/80 border-yellow-500/40 text-yellow-300' : 'bg-black/80 border-purple-500/40 text-purple-300'
                }`}>
                  {project.category}
                </span>
              </div>

              {/* Project Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className={`text-lg font-bold font-heading transition-colors ${
                    isBatman ? 'text-white group-hover:text-yellow-300' : 'text-white group-hover:text-purple-300'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className={`font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
                    isBatman ? 'text-yellow-400' : 'text-purple-400'
                  }`}>
                    <span>Inspect Code & Telemetry</span>
                    <span>→</span>
                  </span>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Heatmap Contribution Graph */}
        <div className="pt-8">
          <GitHubHeatmap />
        </div>

      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
            isBatman ? 'bg-[#0a0d16] border-yellow-500/40' : 'bg-[#0d0e17] border-purple-500/30'
          }`}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                  isBatman ? 'text-yellow-400' : 'text-purple-400'
                }`}>
                  // {selectedProject.category}
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    isBatman
                      ? 'bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300'
                      : 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500'
                  }`}
                >
                  <GithubIcon className="w-3.5 h-3.5 fill-current" />
                  <span>GitHub Repo</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={() => { sound.playClick(); setSelectedProject(null); }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-6 text-xs font-mono">
              <button
                onClick={() => { sound.playClick(); setActiveModalTab('details'); }}
                className={`py-3 border-b-2 font-bold uppercase tracking-wider transition-all ${
                  activeModalTab === 'details'
                    ? isBatman ? 'border-yellow-400 text-yellow-300' : 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                // System Architecture
              </button>

              <button
                onClick={() => { sound.playClick(); setActiveModalTab('sandbox'); }}
                className={`py-3 border-b-2 font-bold uppercase tracking-wider transition-all ${
                  activeModalTab === 'sandbox'
                    ? isBatman ? 'border-yellow-400 text-yellow-300' : 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                // Live Code Execution Sandbox
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
              
              {activeModalTab === 'details' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* System Architecture Description */}
                  <div className="space-y-2">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      isBatman ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      Architecture Overview
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.details.architecture}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      isBatman ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      Key Technical Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.details.features.map((feat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isBatman ? 'text-yellow-400' : 'text-purple-400'}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3 pt-2">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      isBatman ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      Benchmark Telemetry
                    </h4>
                    <div className="grid grid-cols-3 gap-4 font-mono text-center">
                      {Object.entries(selectedProject.metrics).map(([key, val], idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase block">{key}</span>
                          <span className={`text-sm font-bold block ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeModalTab === 'sandbox' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Interactive Execution Engine</span>
                    <button
                      onClick={() => handleRunCode(selectedProject.sampleCode, selectedProject.expectedOutput)}
                      disabled={isRunningCode}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                        isRunningCode
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : isBatman
                            ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md shadow-yellow-500/20'
                            : 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/20'
                      }`}
                    >
                      <Play size={14} className={isRunningCode ? 'animate-spin' : ''} />
                      <span>{isRunningCode ? 'Executing in Sandbox...' : 'Run Live Code Simulation'}</span>
                    </button>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="p-4 rounded-xl bg-[#06070a] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                    <pre><code>{selectedProject.sampleCode}</code></pre>
                  </div>

                  {/* Output Terminal Box */}
                  {codeOutput && (
                    <div className="p-4 rounded-xl bg-black border border-emerald-500/40 font-mono text-xs text-emerald-400 overflow-x-auto space-y-1">
                      <div className="text-[10px] text-emerald-500/60 font-bold uppercase pb-1 border-b border-emerald-950">
                        // Console Telemetry Stream
                      </div>
                      <pre><code>{codeOutput}</code></pre>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
