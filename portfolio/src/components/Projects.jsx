import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, Play, Code2, GitFork, Users, X, CheckCircle2, Search, Filter } from 'lucide-react';
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
            followers: data.followers || 0,
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

  // Repository-backed portfolio: descriptions and stacks are taken from the project READMEs.
  const projects = [
    {
      id: 'beatmatch-reel',
      title: 'BeatMatch-Reel',
      category: 'Computer Vision & Video Automation',
      description: 'Automated video-editing engine that creates beat-synchronised vertical reels from raw clips, with audio analysis, cinematic color grading, and smart 9:16 cropping.',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'OpenCV', 'FFmpeg', 'NumPy', 'SciPy'],
      githubUrl: 'https://github.com/prasannapbhurke/BeatMatch-Reel',
      sampleCode: '# Beat-synchronised video rendering pipeline\npython src/build_reel.py --audio master_audio.wav --output instagram_reel.mp4',
      expectedOutput: '[RENDER] Beat markers detected\n[EXPORT] Vertical reel generated successfully',
      details: { architecture: 'Python video-rendering pipeline combining waveform-energy analysis, OpenCV frame processing, NumPy interpolation, and FFmpeg export.', features: ['Millisecond-level audio beat detection', 'Portrait 9:16 auto-cropping with smooth panning', 'Cinematic grading and slow-motion interpolation', 'Shot and reference-frame matching utilities'] }
    },
    {
      id: 'sentinel-ai-x',
      title: 'Sentinel AI X',
      category: 'AI Security & Computer Vision',
      description: 'Autonomous laptop-security ecosystem with facial recognition, liveness scoring, smart auto-locking, forensic incident capture, and remote companion controls.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'OpenCV', 'PyQt6', 'SQLite', 'Android'],
      githubUrl: 'https://github.com/prasannapbhurke/sentinel-Ai-X',
      sampleCode: 'python -m sentinel_ai_x.app --headless',
      expectedOutput: '[SENTINEL] Threat monitor running\n[SECURITY] Workstation protection active',
      details: { architecture: 'A Python security engine with computer-vision detection, desktop and web dashboards, local audit storage, and Android/cloud relay integrations.', features: ['Face recognition and anti-spoof liveness checks', 'Automatic lock on absence or intruder detection', 'Timestamped forensic snapshots and audit trails', 'Desktop, web, Android, and Telegram control paths'] }
    },
    {
      id: 'classpulse',
      title: 'ClassPulse',
      category: 'Mobile & Full-Stack Education Platform',
      description: 'Attendance-management platform with Android teacher/student apps, rotating QR check-ins, offline sync, reporting, and a Firebase-backed admin dashboard.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'JavaScript', 'Chart.js'],
      githubUrl: 'https://github.com/prasannapbhurke/ClassPulse',
      sampleCode: './gradlew assembleDebug',
      expectedOutput: '[BUILD] Android debug APK generated',
      details: { architecture: 'Kotlin Android clients and a Firebase web dashboard supporting role-based school workflows, offline data collection, and analytics.', features: ['Role-based teacher, HOD, owner, and student access', 'Rotating QR attendance with timed expiry', 'Offline marking with automatic sync', 'PDF, Excel, and CSV attendance exports'] }
    },
    {
      id: 'documimic-ai',
      title: 'DocuMimic AI',
      category: 'Generative AI & Document Automation',
      description: 'Desktop application that analyses a reference document and produces a new academic or professional report matching its structure and writing style.',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
      tags: ['Electron', 'Node.js', 'Express', 'Python', 'Ollama'],
      githubUrl: 'https://github.com/prasannapbhurke/DocuMimic-AI',
      sampleCode: 'npm start',
      expectedOutput: '[DOCUMIMIC] Desktop interface and local generation service started',
      details: { architecture: 'Electron and Express interface paired with Python document-parsing and export scripts, with OpenAI, Ollama, and local fallback generation options.', features: ['PDF and Word style/outline extraction', 'AI-assisted report drafting with local Ollama option', 'Interactive section review before export', 'Formatted DOCX and PDF report output'] }
    },
    {
      id: 'dsa-visualizer-pro',
      title: 'DSA Visualizer Pro',
      category: 'Full-Stack Learning Platform',
      description: 'Cross-platform data-structures and algorithms learning system with Android, React, and Node/Express applications, role-based learning workflows, and visualisers.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'React', 'Node.js', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/prasannapbhurke/DSA-Visualizer-Pro',
      sampleCode: 'npm run install-all',
      expectedOutput: '[DSA] Client and API dependencies installed',
      details: { architecture: 'Android and React clients share a Node/Express API with Google authentication, optional PostgreSQL storage, resource workflows, and admin analytics.', features: ['Canvas-based algorithm visualisers', 'Role-based classrooms and progress synchronisation', 'Feedback, resource, and admin workflows', 'Production deployment and scale documentation'] }
    },
    {
      id: 'logiclens',
      title: 'LogicLens',
      category: 'Desktop Learning Application',
      description: 'Interactive Electron desktop app that teaches Java and C programming logic through visual execution tracing, guided explanations, lessons, and quizzes.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Electron', 'JavaScript', 'C', 'Java'],
      githubUrl: 'https://github.com/prasannapbhurke/LogicLens',
      sampleCode: 'npm start',
      expectedOutput: '[LOGICLENS] Electron learning workspace launched',
      details: { architecture: 'React 19 learning workspace packaged with Electron, using custom code parsers and animation logic for step-by-step code exploration.', features: ['Animated line-by-line logic tracing', 'Java and C learning paths', 'DSA lessons and practice modules', 'Interactive playground, quizzes, and progress tracking'] }
    },
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
      category: 'Django Study Management Platform',
      description: 'Django study-management portal for notes, homework, tasks, study sessions, flashcards, quizzes, and practical reference tools.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Django', 'Bootstrap', 'Celery', 'Redis'],
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
      category: 'Java Reservation System',
      description: 'Java flight-booking application with CLI and Swing modes, role-based users, seat selection, booking history, and persistent reservation data.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Swing', 'OOP', 'Concurrency', 'File I/O'],
      metrics: {
        mode: 'CLI + Swing',
        pattern: 'Object-Oriented',
        persistence: 'File Storage'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Airplane-Reservation-System',
      sampleCode: `public class ReservationService {
    public Ticket bookSeat(User user, Flight flight, String seatNo) {
        if (!flight.isSeatAvailable(seatNo)) {
            throw new IllegalStateException("Seat already booked");
        }
        Ticket ticket = new Ticket(user.getName(), flight.getCode(), seatNo);
        flight.reserve(seatNo);
        return ticket;
    }
}`,
      expectedOutput: `[SYSTEM] Flight Engine Allocation Daemon Started...
[ALLOCATE] Requesting Seat 14A on Flight AI-802...
[CONFIRMED] Seat 14A allocated for Prasanna Bhurke on flight AI-802 (PNR: 98A72B)`,
      details: {
        architecture: 'Engineered as a Java booking system with object-oriented entities for flights, users, seats, reservations, and ticket generation across CLI and Swing flows.',
        features: [
          'Role-based user and admin booking flows',
          'Interactive seat selection and reservation history',
          'Automated PNR ticket generation and passenger manifest export',
          'Modular Java class structure with persistence-oriented data handling'
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

  const additionalRepositories = [
    {
      title: 'WedCraft',
      category: 'Interactive Frontend Experience',
      description: 'Premium digital wedding invitation built with Vite, GSAP, Lenis, Swiper, and responsive web animation.',
      tags: ['Vite', 'JavaScript', 'GSAP', 'Lenis'],
      url: 'https://github.com/prasannapbhurke/WedCraft'
    },
    {
      title: 'DYPCET Portal',
      category: 'College Web Portal',
      description: 'Admission-focused portal using HTML, CSS, XML, XSLT, and XPath for structured college information flows.',
      tags: ['HTML', 'CSS', 'XML', 'XSLT'],
      url: 'https://github.com/prasannapbhurke/DYPCET-Portal'
    },
    {
      title: 'Java Grid Compiler',
      category: 'Distributed Java System',
      description: 'Master-worker Java compiler/runtime with sockets, Swing UI, MySQL-backed records, and distributed execution design.',
      tags: ['Java', 'Swing', 'Sockets', 'MySQL'],
      url: 'https://github.com/prasannapbhurke/Java-Grid-Compiler-JGC-'
    },
    {
      title: 'Java Arithmetic Calculator',
      category: 'Java Desktop Utility',
      description: 'Console and Swing calculator with operation history, logging, multithreaded execution, and MySQL persistence.',
      tags: ['Java', 'Swing', 'MySQL', 'Threads'],
      url: 'https://github.com/prasannapbhurke/Java-Arithmetic-Calculator'
    },
    {
      title: 'AI Email Spam Detector',
      category: 'Machine Learning Classifier',
      description: 'Python NLP spam-detection project using preprocessing, model training, serialized ML pipelines, and Gmail-oriented classification workflows.',
      tags: ['Python', 'spaCy', 'NLTK', 'scikit-learn'],
      url: 'https://github.com/prasannapbhurke/AI-Email-Spam-Detector'
    },
    {
      title: 'Expense Tracker App',
      category: 'Full Stack Finance App',
      description: 'Expense-tracking product spanning Android and web interfaces for recording, organizing, and reviewing personal spending.',
      tags: ['Java', 'Android', 'Web App', 'Finance'],
      url: 'https://github.com/prasannapbhurke/expense-tracker-app'
    },
    {
      title: 'Portfolio Source',
      category: 'Personal Brand System',
      description: 'Source repository for the portfolio and GitHub profile ecosystem, including the live Gotham-themed presentation layer.',
      tags: ['React', 'Vite', 'Portfolio', 'GitHub Pages'],
      url: 'https://github.com/prasannapbhurke/prasannaportfolio'
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];

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
              <span className="text-xs font-mono block opacity-80">Followers</span>
              <span className="text-lg font-bold font-mono text-amber-400 flex items-center gap-1">
                <Users size={16} /> {githubStats.followers}
              </span>
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

        <div className="mt-12 rounded-2xl border border-slate-700/70 bg-slate-950/55 p-5 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-purple-300">Repository dossier</p>
              <h3 className="mt-2 text-2xl font-bold text-white">More engineering work</h3>
            </div>
            <a href="https://github.com/prasannapbhurke" target="_blank" rel="noreferrer" className="font-mono text-xs text-purple-300 hover:text-white">Open GitHub profile ↗</a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {additionalRepositories.map((repo) => (
              <a key={repo.title} href={repo.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:-translate-y-0.5 hover:border-purple-400/70">
                <p className="text-xs font-mono text-purple-300">{repo.category}</p>
                <h4 className="mt-2 font-bold text-white group-hover:text-purple-200">{repo.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{repo.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{repo.tags.map(tag => <span key={tag} className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300">{tag}</span>)}</div>
              </a>
            ))}
          </div>
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
