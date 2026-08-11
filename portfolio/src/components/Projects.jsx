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
    repos: 18,
    stars: 32,
    followers: 16,
    loaded: false
  });

  useEffect(() => {
    fetch('https://api.github.com/users/prasannapbhurke')
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          setGithubStats({
            repos: data.public_repos,
            stars: 32,
            followers: data.followers || 16,
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
      id: 'sentinel-ai-x',
      title: 'Sentinel-AI-X',
      category: 'AI Security & Threat Intelligence',
      description: 'Autonomous AI agent system designed for real-time cybersecurity threat analysis, vulnerability detection, and automated incident response.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'FastAPI', 'AI Security Agent', 'Threat Intelligence', 'LLM Agents'],
      metrics: {
        agent: 'Autonomous Threat Inspector',
        speed: 'Sub-30ms Detection',
        security: 'Zero Trust Agent'
      },
      githubUrl: 'https://github.com/prasannapbhurke/sentinel-Ai-X',
      sampleCode: `import asyncio

class SentinelAgent:
    async def analyze_payload(self, telemetry_data):
        # AI Threat Detection Loop
        threat_score = self.model.predict(telemetry_data)
        if threat_score > 0.85:
            return {"status": "BLOCKED", "threat_level": "CRITICAL"}
        return {"status": "CLEARED", "threat_level": "LOW"}`,
      expectedOutput: `[SENTINEL DAEMON] Initializing threat intelligence agent...
[TELEMETRY] Inspecting incoming payload stream...
[AGENT DECISION] Threat Score: 0.94 (Suspicious Shellcode Pattern)
[ACTION] Status: BLOCKED | Triggered Incident Alert ID #904`,
      details: {
        architecture: 'Engineered as an autonomous AI agent architecture in Python using FastAPI microservice endpoints. Features zero-trust threat evaluation loops and LLM verification pipelines.',
        features: [
          'Autonomous LLM threat intelligence agent loops',
          'FastAPI microservice returning sub-30ms security assessments',
          'Automated incident logging and payload quarantine triggers',
          'Zero-trust verification pipeline for API endpoint security'
        ]
      }
    },
    {
      id: 'dsa-visualizer-pro',
      title: 'DSA Visualizer Pro',
      category: 'Mobile & Systems',
      description: 'Interactive Data Structures & Algorithms Control Center and Android application for real-time algorithm execution tracing and visual complexity analysis.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Android Studio', 'DSA Algorithms', 'Execution Tracing', 'APK'],
      metrics: {
        visualizers: '30+ Interactive Algorithms',
        platform: 'Android & Desktop Java',
        analysis: 'Real-time Big-O'
      },
      githubUrl: 'https://github.com/prasannapbhurke/DSA-Visualizer-Pro',
      sampleCode: `public class QuickSortVisualizer {
    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
}`,
      expectedOutput: `[ALGORITHM] Executing QuickSort on Array[16]...
[PIVOT] Selected Element 45 as Pivot @ Index 8
[SWAP] Swapping Index 3 (78) with Index 6 (12)
[VISUALIZER] Rendered step-by-step memory stack & complexity graph`,
      details: {
        architecture: 'Developed in Java and Android Studio featuring interactive step-by-step animation callbacks for Sorting, Trees, Graphs, and Dynamic Programming algorithms.',
        features: [
          '30+ interactive algorithm animations (Sorting, Graph, Trees, DP)',
          'Native Android APK build + Desktop AWT/Swing control center',
          'Real-time Big-O time & space complexity grapher',
          'Step-by-step execution playback controls (Play, Pause, Step Next)'
        ]
      }
    },
    {
      id: 'beatmatch-reel',
      title: 'BeatMatch-Reel',
      category: 'AI Audio & Video Processing',
      description: 'Automated AI audio-video synchronization tool that aligns music beats with video cutpoints for seamless social media reel generation.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Audio Processing', 'Beat Detection', 'Video Sync', 'FFmpeg'],
      metrics: {
        tempo: 'Real-time BPM Tracking',
        sync: 'Sub-frame Precision',
        export: 'Automated MP4 Reel'
      },
      githubUrl: 'https://github.com/prasannapbhurke/BeatMatch-Reel',
      sampleCode: `import librosa

def extract_beats(audio_path):
    y, sr = librosa.load(audio_path)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)
    return tempo, beat_times`,
      expectedOutput: `[AUDIO ENGINE] Analyzing track tempo...
[BPM DETECTED] 128.0 BPM (Transients identified: 42 beat markers)
[VIDEO SYNC] Aligning 6 clip transitions to peak beat frames
[RENDER] Successfully exported BeatMatched Reel (reel_output.mp4)`,
      details: {
        architecture: 'Uses Librosa spectral audio processing in Python to detect audio onset transients and BPM tempo, pairing peak beat timestamps with FFmpeg video editing cuts.',
        features: [
          'Librosa audio spectral analysis & transient peak detection',
          'Automated frame-accurate video cut alignment to music beats',
          'FFmpeg video rendering pipeline for high-quality MP4 output',
          'Configurable BPM thresholds and transition effects'
        ]
      }
    },
    {
      id: 'logiclens',
      title: 'LogicLens',
      category: 'Desktop App & Programming Logic',
      description: 'Interactive desktop application for Java & C programming logic visualization, step-by-step memory inspection, and AST execution tracing.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'Electron', 'React', 'Java', 'C', 'Vite'],
      metrics: {
        execution: 'AST Inspection',
        platform: 'Electron Cross-Platform',
        memory: 'Stack & Heap Visualizer'
      },
      githubUrl: 'https://github.com/prasannapbhurke/LogicLens',
      sampleCode: `// LogicLens Execution Tracer
const { spawn } = require('child_process');

function traceExecution(sourceFile) {
  console.log(\`[LOGIC LENS] Compiling \${sourceFile} and tracing AST stack frames...\`);
}`,
      expectedOutput: `[PARSER] Parsing Java AST Tree...
[STACK FRAME 1] main(args) -> Local Variables: i = 0, sum = 0
[STACK FRAME 2] calculateFactorial(n = 5) -> Pushed to Call Stack
[VISUALIZER] Rendered active stack pointers & heap allocations`,
      details: {
        architecture: 'Engineered as an Electron desktop application running React frontend components connected to native Java/C compiler processes.',
        features: [
          'Interactive step-by-step memory stack & heap allocation graph',
          'Integrated Java & C compilation scripts and AST parser',
          'Cross-platform desktop installer packaged with Electron',
          'Real-time syntax diagnostics and variable state inspector'
        ]
      }
    },
    {
      id: 'classpulse',
      title: 'ClassPulse',
      category: 'Native Android Mobile App',
      description: 'Native Kotlin Android mobile application designed for real-time classroom analytics, attendance pulse tracking, and student engagement telemetry.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      tags: ['Kotlin', 'Android Studio', 'Coroutines Flow', 'Room Database', 'Material UI'],
      metrics: {
        platform: 'Android Native',
        lang: 'Kotlin MVVM',
        db: 'Room SQLite Persistence'
      },
      githubUrl: 'https://github.com/prasannapbhurke/ClassPulse',
      sampleCode: `// ClassPulse Student Activity Flow
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.StateFlow

class ClassPulseViewModel : ViewModel() {
    val studentEngagement: StateFlow<PulseScore> = repository.getLivePulse()
}`,
      expectedOutput: `[CLASSPULSE RUNTIME] Launching Android Native Activity...
[ROOM DB] Synchronized 45 student classroom records
[LIVE PULSE] Attendance status: 96% Present | Active engagement score: High
[UI] Rendered Kotlin Material 3 Dashboard Card`,
      details: {
        architecture: 'Built in Kotlin using MVVM architecture, Coroutines Flow, Room SQLite persistence, and Jetpack Material 3 UI components.',
        features: [
          'Native Kotlin Android application with clean MVVM architecture',
          'Room SQLite database for offline-first classroom record storage',
          'Real-time engagement telemetry and attendance pulse metrics',
          'Smooth Material 3 UI components and dynamic theme support'
        ]
      }
    },
    {
      id: 'documimic-ai',
      title: 'DocuMimic-AI',
      category: 'AI Document Synthesis',
      description: 'AI document synthesis engine that analyzes reference document structures and generates automated technical project reports and formatted documentation.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'Python', 'AI Synthesis', 'LLM Prompts', 'Markdown'],
      metrics: {
        generation: 'Full Project Reports',
        precision: 'Template Matching',
        format: 'PDF / Docx / MD'
      },
      githubUrl: 'https://github.com/prasannapbhurke/DocuMimic-AI',
      sampleCode: `function synthesizeDoc(template, data) {
  console.log("[DOCUMIMIC AI] Extracting section headers and generating content...");
}`,
      expectedOutput: `[ANALYZER] Extracted 8 structural sections from reference document...
[SYNTHESIS] Generating Section 1: Abstract & System Overview...
[SYNTHESIS] Generating Section 2: Architecture & Data Flow...
[OUTPUT] Successfully exported 14-page document (DocuMimic_Report.pdf)`,
      details: {
        architecture: 'Analyzes document headers, table structures, and styling guidelines to automatically populate comprehensive technical project documentation.',
        features: [
          'Automated technical report generation matching input styles',
          'Extractive and abstractive NLP text synthesis algorithms',
          'Export support for Markdown, PDF, and Microsoft Word (.docx)',
          'Template structure parsing and token optimization'
        ]
      }
    },
    {
      id: 'java-grid-compiler',
      title: 'Java Grid Compiler (JGC)',
      category: 'Distributed Systems & Compilers',
      description: 'Distributed Java compiler engine designed for grid computing, multi-threaded task allocation, and parallel source code compilation.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Grid Computing', 'Distributed Systems', 'Multi-threading'],
      metrics: {
        throughput: 'Parallel Node Compilation',
        concurrency: 'ThreadPool Executor',
        latency: 'Sub-second AST Build'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Java-Grid-Compiler-JGC-',
      sampleCode: `public class DistributedCompilerNode {
    private ExecutorService threadPool = Executors.newFixedThreadPool(8);
    public void compileChunk(List<File> files) {
        // Parallel grid compilation logic
    }
}`,
      expectedOutput: `[JGC GRID] Master node initialized on port 8080.
[WORKER NODES] 4 Grid worker compilation threads active
[ALLOCATE] Distributed 32 .java source files across worker pool
[STATUS] Build Succeeded in 380ms (0 Compilation Errors)`,
      details: {
        architecture: 'Engineered with Java Concurrency utilities and javax.tools.JavaCompiler. Distributes large Java codebase compilation tasks across grid worker nodes.',
        features: [
          'Parallel multi-threaded Java compilation engine',
          'Grid node task distribution and load balancing',
          'Real-time build status monitoring and error aggregation',
          'Zero-dependency standalone Java compilation suite'
        ]
      }
    },
    {
      id: 'wedcraft',
      title: 'WedCraft',
      category: 'Full Stack Web Platform',
      description: 'Modern full-stack event and wedding planning management platform featuring interactive RSVP workflows, guest list analytics, and vendor scheduling.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
      metrics: {
        ui: 'Responsive Web Platform',
        rsvp: 'Real-time Event Tracking',
        db: 'Relational Data Storage'
      },
      githubUrl: 'https://github.com/prasannapbhurke/WedCraft',
      sampleCode: `const express = require('express');
const app = express();

app.post('/api/rsvp', (req, res) => {
    const { guestName, attending, count } = req.body;
    console.log(\`[WEDCRAFT] RSVP Confirmed for \${guestName} (\${count} guests)\`);
    res.json({ success: true, message: "RSVP Recorded" });
});`,
      expectedOutput: `[WEDCRAFT SERVER] Event management API active...
[RSVP RECEIVED] Guest: Prasanna Bhurke | Attending: YES | Count: 2
[DATABASE] Updated guest list status (Total Confirmed: 142)`,
      details: {
        architecture: 'Full-stack Node.js & Express REST API backend paired with a dynamic React single-page application frontend styled with Tailwind CSS.',
        features: [
          'Interactive RSVP portal with instant real-time confirmation',
          'Guest list management dashboard with seating arrangement planner',
          'Vendor booking calendar and budget expense calculator',
          'Responsive glassmorphism UI designed with Tailwind CSS'
        ]
      }
    },
    {
      id: 'dypcet-portal',
      title: 'DYPCET-Portal',
      category: 'Academic Institution Portal',
      description: 'Web development academic portal designed for DYPCET engineering institution, featuring course catalogues, department resources, and admissions portals.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Academic Portal', 'DOM Parser'],
      metrics: {
        portal: 'Multi-Department Website',
        speed: 'Instant Static Load',
        ui: 'Clean Academic Interface'
      },
      githubUrl: 'https://github.com/prasannapbhurke/DYPCET-Portal',
      sampleCode: `document.addEventListener('DOMContentLoaded', () => {
  console.log("[DYPCET PORTAL] Initialized academic department navigation...");
});`,
      expectedOutput: `[PORTAL] Loaded DYPCET Academic Department Modules...
[COURSES] Rendered 12 Engineering Stream Catalogues
[STATUS] Academic Web Portal Ready`,
      details: {
        architecture: 'Multi-page academic institution web portal built with HTML5, CSS3, and vanilla JavaScript to showcase department curricula and student resources.',
        features: [
          'Multi-department academic course catalogue viewer',
          'Responsive navigation layouts for desktop and mobile viewports',
          'Interactive admissions form and faculty contact directory',
          'Fast lightweight page load speeds without external frameworks'
        ]
      }
    },
    {
      id: 'expense-tracker-app',
      title: 'Expense Tracker App',
      category: 'Full Stack Financial App',
      description: 'Full-stack expense management application featuring an Android mobile app and web application for category budget analytics and offline expense logging.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Android Native', 'SQLite', 'Web Analytics', 'Chart.js'],
      metrics: {
        platform: 'Android & Web',
        storage: 'Offline-First SQLite',
        stats: 'Category Analytics'
      },
      githubUrl: 'https://github.com/prasannapbhurke/expense-tracker-app',
      sampleCode: `public class ExpenseDbHelper extends SQLiteOpenHelper {
    public void addExpense(String category, double amount, String date) {
        // SQLite local database insert logic
    }
}`,
      expectedOutput: `[EXPENSE TRACKER] Loaded SQLite expense database...
[INSERT] Added Expense: $42.50 (Category: Tech & Equipment)
[ANALYTICS] Updated monthly spending summary ($640 total)`,
      details: {
        architecture: 'Built with an offline-first SQLite database architecture on Android native Java paired with web analytics reporting.',
        features: [
          'Offline-first mobile expense logging with SQLite persistence',
          'Interactive spending category pie charts and monthly cap warnings',
          'Multi-currency support and CSV transaction export',
          'Clean dual-platform mobile and web UI interfaces'
        ]
      }
    },
    {
      id: 'email-spam-detector-extension',
      title: 'Email Spam Detector Extension',
      category: 'AI Security & Web Extension',
      description: 'Real-time browser extension that automatically scans incoming email bodies and classifies them as Spam or Ham using an integrated Machine Learning backend.',
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

vectorizer = text.TfidfVectorizer(stop_words='english')
clf = MultinomialNB()`,
      expectedOutput: `[INFERENCE] Input payload: "Win cash prizes instantly"
[RESULT] Confidence Score: 0.964
[OUTPUT] Prediction: SPAM (High Risk)`,
      details: {
        architecture: 'Trained Multinomial Naive Bayes model utilizing TF-IDF vectorization. Built background script listeners and DOM content injection scripts.',
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
      category: 'NLP & Mobile Application',
      description: 'End-to-end NLP-driven web application and Android mobile app for detection and filtering of malicious SMS text messages with interactive confidence metrics.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Python', 'NLTK', 'Scikit-Learn', 'Streamlit'],
      metrics: {
        f1Score: '97.8%',
        dataset: '5,500+ SMS Corpus',
        ui: 'Streamlit & Android App'
      },
      githubUrl: 'https://github.com/prasannapbhurke/sms-spam-detector',
      sampleCode: `import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()`,
      expectedOutput: `[TOKENIZER] Lowercasing & removing punctuation...
[FILTER] Stripping 12 English stop words...
[OUTPUT] Cleaned String: "free entri 2 wkli comp win fa cup final tkt"`,
      details: {
        architecture: 'Applied comprehensive text preprocessing including lowercasing, punctuation stripping, NLTK stopword filtering, and Porter stemming.',
        features: [
          'Comprehensive text cleaning pipeline with NLTK tokenizer',
          'Interactive Streamlit GUI + Android Java App',
          'Hyperparameter tuned Multinomial Naive Bayes classifier',
          'Detailed model performance metric visualizations'
        ]
      }
    },
    {
      id: 'ai-email-spam-detector',
      title: 'AI Email Spam Detector Microservice',
      category: 'AI & Machine Learning Microservice',
      description: 'Dedicated Python machine learning microservice API for high-precision email text classification and spam probability scoring.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Scikit-Learn', 'FastAPI', 'TF-IDF', 'REST API'],
      metrics: {
        accuracy: '98.5%',
        api: 'FastAPI JSON Endpoint',
        speed: '<35ms Inference'
      },
      githubUrl: 'https://github.com/prasannapbhurke/AI-Email-Spam-Detector',
      sampleCode: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class EmailPayload(BaseModel):
    text: str

@app.post("/predict")
def predict_spam(payload: EmailPayload):
    # Model inference logic
    return {"is_spam": True, "confidence": 0.985}`,
      expectedOutput: `[FASTAPI] Microservice active on port 8000
[POST /predict] Received text payload (142 words)
[INFERENCE] Confidence: 0.985 | Status: 200 OK`,
      details: {
        architecture: 'Built as a standalone lightweight FastAPI service providing REST endpoints for text classification with serialized Scikit-Learn pipelines.',
        features: [
          'FastAPI asynchronous REST API microservice endpoints',
          'Serialized TF-IDF vectorizer and Naive Bayes classifier pipeline',
          'Swagger UI interactive endpoint documentation',
          'Sub-35ms JSON response latency'
        ]
      }
    },
    {
      id: 'student-portal',
      title: 'Student Portal',
      category: 'Full Stack Academic Management',
      description: 'Full-stack web application designed for academic management, allowing students and administrators to manage courses, track grades, and view attendance.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'CSS3'],
      metrics: {
        db: 'ACID Compliant SQL',
        security: 'Session Auth',
        scale: 'Multi-Role Portal'
      },
      githubUrl: 'https://github.com/prasannapbhurke/student-portal',
      sampleCode: `const express = require('express');
const mysql = require('mysql2/promise');

const app = express();`,
      expectedOutput: `[SERVER] Connection pool initialized to MySQL database.
[ROUTE] GET /api/students/104/grades
[RESPONSE] 200 OK (3 courses fetched: CS101: A, CS102: A-, MA201: B+)`,
      details: {
        architecture: 'Designed a normalized 3NF relational database schema in MySQL. Implemented RESTful Express routing and session middleware authentication.',
        features: [
          'Normalized relational database with foreign key integrity constraints',
          'Secure password hashing with bcrypt and session persistence',
          'Dynamic transcript rendering and attendance calculation',
          'Responsive administrative dashboard layout'
        ]
      }
    },
    {
      id: 'airplane-reservation-system',
      title: 'Airplane Reservation System',
      category: 'High-Concurrency Systems Engine',
      description: 'High-concurrency Java flight booking engine integrated with relational database for seat allocation, ticket generation, and real-time passenger tracking.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'SQL', 'Data Structures', 'OOP Design', 'Swing UI'],
      metrics: {
        speed: '<2ms Lookup',
        algo: 'Vector Indexing',
        concurrency: 'Thread-Safe'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Airplane-Reservation-System',
      sampleCode: `public class FlightEngine {
    public void bookSeat(String name, int seat, String flight) {
        // Seat allocation logic
    }
}`,
      expectedOutput: `[SYSTEM] Flight Engine Allocation Daemon Started...
[CONFIRMED] Seat 14A allocated for Prasanna Bhurke on flight AI-802`,
      details: {
        architecture: 'Engineered using object-oriented Java design patterns with thread safety and relational storage integration.',
        features: [
          'Sub-2ms seat allocation using vector indexing and memory caching',
          'ACID transaction locks preventing double-booking race conditions',
          'Automated PNR ticket generation and passenger manifest export',
          'Modular Java class structure with clean error recovery'
        ]
      }
    },
    {
      id: 'java-arithmetic-calculator',
      title: 'Java Arithmetic Calculator',
      category: 'Java Desktop & Database Systems',
      description: 'Java desktop calculation and audit logging application connected to MySQL database via JDBC for real-time transaction persistence.',
      image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'JDBC', 'MySQL 9.7.0', 'Swing UI'],
      metrics: {
        driver: 'MySQL Connector/J 9.7',
        db: 'Audit Log Persistence',
        ui: 'Java Swing'
      },
      githubUrl: 'https://github.com/prasannapbhurke/Java-Arithmetic-Calculator',
      sampleCode: `import java.sql.Connection;
import java.sql.DriverManager;

public class AuditLogger {
    public static void logCalc(String expr, double res) throws Exception {
        // JDBC calculation audit logging
    }
}`,
      expectedOutput: `[JDBC] Connected to MySQL Database calc_db
[CALCULATION] 458.50 * 12.40 = 5685.40
[AUDIT LOG] Inserted record into calc_history table (ID: 804)`,
      details: {
        architecture: 'Built with Java Swing UI components and JDBC MySQL Connector/J to record all mathematical calculations into relational database tables.',
        features: [
          'Precision arithmetic computation engine',
          'Direct JDBC connection to MySQL database',
          'Transaction audit logging and history retrieval',
          'Clean Java desktop Swing user interface'
        ]
      }
    }
  ];

  const categories = ['All', 'AI & Machine Learning', 'Mobile Applications', 'Desktop & Systems', 'Full Stack Web Platforms'];

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
              16 verified software engineering repositories and applications built by Prasanna Bhurke.
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
