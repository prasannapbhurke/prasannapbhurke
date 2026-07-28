# Technical Documentation & Developer Handoff

**Project Name**: Prasanna Bhurke — Senior Software Engineer & AI/ML Specialist Portfolio  
**Repository Path**: `c:\Users\PRASANNA\Desktop\github\portfolio`  
**Full Backup Path**: `c:\Users\PRASANNA\Desktop\github\portfolio_backup`  
**Tech Stack**: React 18, Vite 8, Tailwind CSS v4, Web Audio API, HTML5 Canvas 2D/3D WebGL Projection, Lucide Icons, Canvas Confetti.

---

## 1. 🏗️ Architecture & Key Concepts

### A. Dual Theme Engine System (`purple` vs `batman`)
The application supports two primary theme modes:
1. **Standard Custom Mode** (`purple`): High-contrast dark purple/slate luxury design system with constellation particle background.
2. **Gotham Batman Mode** (`batman`): Gotham City dark knight aesthetic with Gothic skyline, animated Batmobile, flying bat swarms, rain, sweeping Bat-Signal, and custom audio track.

- **Theme State**: Managed in `App.jsx` via `theme` state (`'purple'` | `'batman'`), initialized to `'purple'`.
- **CSS Variable Injection**: Driven by `document.documentElement.setAttribute('data-theme', theme)`.
- **Theme Observer**: Components (`TechStack.jsx`, `Experience.jsx`, `Contact.jsx`) use `MutationObserver` on `document.documentElement` to reactively update colors and titles when theme switches.

### B. Multi-Language i18n System
- Languages supported: **English (`en`)**, **German (`de`)**, **Japanese (`jp`)**.
- Controlled via Navbar selector pill. Broadcasts `app-lang-change` custom events.
- Hero typewriter titles and section subtitles reactively translate.

### C. Audio Synthesizer & Custom Music Engine (`sound.js`)
- Uses native **Web Audio API** (`AudioContext`) to generate synthesized UI sounds (hover bleeps, click feedback, success fanfares, brass Batman notes).
- Uses **HTML5 Audio Player** to stream the custom audio track (`batman-theme.mp4`) when Batman mode is activated.

---

## 2. 📂 File & Component Structure

```
portfolio/
├── index.html                  # HTML entry point (color-scheme: dark & darkreader-lock)
├── package.json                # Project dependencies and Vite build scripts
├── src/
│   ├── main.jsx                # React root DOM mount
│   ├── App.jsx                 # Application root & modal state orchestrator
│   ├── index.css               # Design tokens, 3D CSS utilities & theme overrides
│   ├── utils/
│   │   └── sound.js            # Web Audio API synth & HTML5 audio manager
│   └── components/
│       ├── Navbar.jsx          # Top nav, theme toggle, i18n switcher, audio & modal buttons
│       ├── Hero.jsx            # Hero banner, typewriter title, telemetry & 3D TechOrbitSphere
│       ├── AIPlayground.jsx    # Machine Learning Lab (8 view modes)
│       ├── Projects.jsx        # 6 Project cards, live code sandboxes & GitHub REST API
│       ├── TechStack.jsx       # Category bars, SkillRadarChart, ThreeDSkillCube & tooling
│       ├── Experience.jsx      # Interactive career timeline & mission logs
│       ├── Contact.jsx         # Contact form & Bat-Signal emergency transmission
│       ├── Footer.jsx          # Site footer & copyright
│       ├── TerminalModal.jsx   # Interactive CLI terminal (12 custom commands)
│       ├── ResumeModal.jsx     # Executive CV viewer with PDF download & print
│       ├── CommandPalette.jsx  # Cmd + K quick navigation palette
│       ├── ParticleBackground.jsx # Dual-engine 2D/3D background canvas
│       ├── BatLogoSvg.jsx      # Vector SVG Batman yellow oval emblem
│       ├── TechOrbitSphere.jsx # 3D point-cloud skill tag sphere
│       ├── DecisionBoundaryCanvas.jsx # 2D SVM/RBF boundary contour plot
│       ├── ConfusionMatrixSimulator.jsx # Interactive 2x2 matrix & ROC curve canvas
│       ├── RecruiterQnABot.jsx # Technical Q&A assistant with code snippets
│       ├── ThreeDNeuralBrain.jsx # 3D WebGL neural network brain graph
│       ├── ThreeDBatmobileGarage.jsx # 3D Batmobile wireframe with hotspots
│       ├── ThreeDTechGalaxy.jsx # 3D solar system tech galaxy
│       └── ThreeDSkillCube.jsx # Rotatable 3D Rubik's skill cube
```

---

## 3. 🧩 Core Component Details

### 1. `AIPlayground.jsx` (Machine Learning Lab)
Supports 8 view mode tabs:
- **Interactive**: Live SMS & Email classifier with threshold slider ($\tau$) and `NeuralNetworkVisualizer.jsx`.
- **2D Boundary**: `DecisionBoundaryCanvas.jsx` (RBF vs Linear SVM decision contour lines).
- **Matrix & ROC**: `ConfusionMatrixSimulator.jsx` (Interactive 2x2 matrix, real-time Precision/Recall/F1-score & ROC curve AUC canvas).
- **Recruiter Q&A**: `RecruiterQnABot.jsx` (Selectable engineering Q&A with copyable code snippets).
- **3D Neural Brain**: `ThreeDNeuralBrain.jsx` (3D WebGL neural brain graph with click-to-fire synapse pulses).
- **3D Tech Galaxy**: `ThreeDTechGalaxy.jsx` (3D solar system with orbiting domain planets and moons).
- **3D Batmobile**: `ThreeDBatmobileGarage.jsx` (3D Batmobile vehicle wireframe with exhaust flames).
- **API Code**: Executable API code snippets in Python, JavaScript, and cURL.

### 2. `Projects.jsx` (6 Software Engineering Projects)
1. **Email Spam Detector Extension** (`AI / ML & Web Extension`)
2. **SMS Spam Detector App** (`NLP & Web App`)
3. **Academic Student Portal** (`Full Stack Web Platform`)
4. **Airplane Reservation System** (`C++ Systems & SQL Engine`)
5. **Smart Expense Tracker App** (`Frontend & Data Visualization`)
6. **NLP Sentiment & Summarizer Engine** (`AI & NLP`)

- **Features**: Live GitHub REST API feed fetching stats from `https://api.github.com/users/prasannapbhurke`, interactive code execution playground with simulated stdout output.

### 3. `TechStack.jsx` & 3D Skill Visualizers
- **Category Progress Bars**: Category skill levels with animated fill bars.
- **`SkillRadarChart.jsx`**: SVG spider matrix comparing AI/ML, Full Stack, Systems C++, Database, and DevOps domains.
- **`ThreeDSkillCube.jsx`**: Rotatable 3D Rubik's skill cube using 3D CSS perspective transforms (`perspective-1000`, `transform-style-3d`).

### 4. `TerminalModal.jsx` (CLI Mode)
Opened via top navbar **`CLI Mode`** button. Auto-focuses command prompt. Supported commands:
- `help`, `about`, `skills`, `projects`, `contact`, `clear`, `sudo hire`, `stats`, `matrix`, `snake`, `batman`, `joker`.

---

## 4. 🛠️ How to Run & Build

```bash
# Install dependencies
npm install

# Start local dev server (default port 5173)
npm run dev

# Run Oxlint code verification
npm run lint

# Build production bundle
npm run build
```

---

## 💾 Project Backup Location
If you ever need to revert to a previous state, a complete mirror backup is stored at:  
`c:\Users\PRASANNA\Desktop\github\portfolio_backup`
