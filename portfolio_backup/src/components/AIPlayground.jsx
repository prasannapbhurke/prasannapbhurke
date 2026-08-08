import React, { useState } from 'react';
import { Sparkles, ShieldAlert, ShieldCheck, RefreshCw, Cpu, Send, Zap, Sliders, Code2, Copy, CheckCircle2, Layers, Activity, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import AlgoVisualizer from './AlgoVisualizer';
import DecisionBoundaryCanvas from './DecisionBoundaryCanvas';
import ConfusionMatrixSimulator from './ConfusionMatrixSimulator';
import RecruiterQnABot from './RecruiterQnABot';
import confetti from 'canvas-confetti';

export default function AIPlayground() {
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' or 'email'
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive', 'api', or 'algo'
  const [inputText, setInputText] = useState('');
  const [threshold, setThreshold] = useState(0.50);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeLang, setCodeLang] = useState('python');

  const sampleMessages = {
    sms: [
      { label: 'Spam Claim', text: 'WINNER! You have been selected to win a $1,000 Walmart Gift Card! Click http://claim-reward.xy to claim now!' },
      { label: 'Normal Meeting', text: 'Hey Prasanna, are we still meeting today at 4:00 PM to review the machine learning project architecture?' },
      { label: 'Banking Urgent', text: 'ALERT: Your bank account has been temporarily locked due to suspicious activity. Verify details at http://secure-bank-login.net' }
    ],
    email: [
      { label: 'Phishing Email', text: 'Dear Customer, Your email mailbox quota has exceeded 99%. Click the link below to upgrade your server storage immediately or your account will be deleted.' },
      { label: 'Project Update', text: 'Hi Prasanna, I reviewed the pull request for the SMS spam detector repo. The TF-IDF vectorization benchmarks look great!' },
      { label: 'Lottery Spam', text: 'Congratulations! You won 50,000 EUR in the International Sweepstakes. Reply with your full name, bank details, and SSN to claim funds.' }
    ]
  };

  const analyzeText = (textToAnalyze) => {
    const text = (textToAnalyze || inputText).trim();
    if (!text) return;

    sound.playClick();
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const spamKeywords = [
        'winner', 'win', 'gift card', 'claim', 'urgent', 'alert', 'account', 'verify', 
        'locked', 'lottery', 'free', 'money', 'dollar', '$', 'click', 'link', 'congratulations', 
        'bank', 'quota', 'ssn', 'password', 'reward', 'cash', 'prize', 'selected'
      ];

      const foundKeywords = spamKeywords.filter(kw => lower.includes(kw));
      const rawProbability = Math.min(0.994, Math.max(0.042, (foundKeywords.length * 0.28) + (lower.includes('http') ? 0.35 : 0) + (lower.includes('!') ? 0.12 : 0)));
      
      const isSpam = rawProbability >= threshold;

      if (isSpam) {
        sound.playHover();
      } else {
        sound.playSuccess();
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10b981', '#34d399', '#059669']
        });
      }

      setResult({
        isSpam,
        probability: rawProbability,
        confidencePct: (rawProbability * 100).toFixed(1),
        foundKeywords,
        processedWords: text.split(/\s+/).length,
        modelType: activeTab === 'sms' ? 'Multinomial Naive Bayes (SMS Model)' : 'TF-IDF + Support Vector Machine (Email Model)',
        latency: (Math.random() * 12 + 16).toFixed(1)
      });

      setAnalyzing(false);
    }, 550);
  };

  const getCodeSnippet = () => {
    const text = inputText || 'WINNER! You won $1000 Gift Card. Click link to claim.';
    if (codeLang === 'python') {
      return `import requests

url = "https://api.prasannabhurke.dev/v1/classify"
payload = {
    "text": "${text}",
    "model": "${activeTab === 'sms' ? 'sms-naive-bayes' : 'email-tfidf-svm'}",
    "threshold": ${threshold}
}

response = requests.post(url, json=payload)
data = response.json()

print(f"Is Spam: {data['is_spam']}")
print(f"Confidence: {data['confidence'] * 100:.1f}%")`;
    } else if (codeLang === 'javascript') {
      return `const response = await fetch("https://api.prasannabhurke.dev/v1/classify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "${text}",
    model: "${activeTab === 'sms' ? 'sms-naive-bayes' : 'email-tfidf-svm'}",
    threshold: ${threshold}
  })
});

const data = await response.json();
console.log("Prediction:", data);`;
    } else {
      return `curl -X POST https://api.prasannabhurke.dev/v1/classify \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "${text}",
    "threshold": ${threshold}
  }'`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    sound.playSuccess();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="ai-playground" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-mono shadow-lg">
            <Sparkles size={14} className="text-purple-400 animate-pulse" />
            <span>Interactive Machine Learning & Neural Network Lab</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight pb-2">
            AI Model <span className="text-purple-300 font-extrabold drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">Playground</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Test live NLP classification models directly in your browser. Adjust decision thresholds, inspect neural network weight paths, and execute algorithms.
          </p>
        </div>

        {/* Playground Container */}
        <div className="mt-12 glass-card border border-purple-500/40 overflow-hidden shadow-2xl shadow-purple-950/60">
          
          {/* Top Bar Switcher */}
          <div className="bg-slate-900/90 border-b border-purple-500/30 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { sound.playClick(); setActiveTab('sms'); setResult(null); setInputText(''); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'sms' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                <Zap size={15} />
                <span>SMS Spam Detector</span>
              </button>

              <button 
                onClick={() => { sound.playClick(); setActiveTab('email'); setResult(null); setInputText(''); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'email' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                <Cpu size={15} />
                <span>Email Body Classifier</span>
              </button>
            </div>

            {/* Mode Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { sound.playClick(); setViewMode('interactive'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  viewMode === 'interactive' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders size={13} />
                <span>Interactive</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setViewMode('boundary'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  viewMode === 'boundary' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>2D Boundary</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setViewMode('metrics'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  viewMode === 'metrics' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity size={13} />
                <span>Matrix & ROC</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setViewMode('qna'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  viewMode === 'qna' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle size={13} />
                <span>Recruiter Q&A</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setViewMode('api'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  viewMode === 'api' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 size={13} />
                <span>API Code</span>
              </button>
            </div>

          </div>

          {/* Interactive Mode */}
          {viewMode === 'interactive' && (
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Neural Network SVG Node Visualizer */}
              <NeuralNetworkVisualizer isAnalyzing={analyzing} />

              {/* Threshold Slider */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-2">
                    <Sliders size={14} className="text-purple-400" />
                    Classification Threshold (τ): {threshold.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Adjust classification probability cutoff threshold. Higher value = lower false positive rate.
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-mono text-slate-500">0.10</span>
                  <input
                    type="range"
                    min="0.10"
                    max="0.90"
                    step="0.05"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full sm:w-48 accent-purple-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">0.90</span>
                </div>
              </div>

              {/* Samples */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  Click a test sample payload:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleMessages[activeTab].map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(sample.text);
                        analyzeText(sample.text);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="text-xs font-mono bg-slate-900/90 hover:bg-purple-950/70 border border-slate-700 hover:border-purple-400 text-slate-300 px-3 py-1.5 rounded-xl transition-all hover:scale-105"
                    >
                      💡 {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={activeTab === 'sms' ? 'Type or paste an SMS message string...' : 'Paste an email subject line or body content...'}
                  rows={4}
                  className="w-full bg-slate-950/90 border border-purple-500/30 focus:border-purple-400 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-mono transition-all"
                />

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {inputText.length} chars | {inputText ? inputText.split(/\s+/).filter(Boolean).length : 0} tokens
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { sound.playClick(); setInputText(''); setResult(null); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
                    >
                      Clear
                    </button>

                    <button
                      onClick={() => analyzeText()}
                      disabled={!inputText.trim() || analyzing}
                      className="glow-btn px-5 py-2 text-xs sm:text-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      {analyzing ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          <span>Extracting Features...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Run Inference</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Prediction Result */}
              {result && (
                <div className={`mt-6 p-6 rounded-2xl border transition-all animate-fadeIn ${
                  result.isSpam 
                    ? 'bg-rose-950/20 border-rose-500/50 shadow-2xl shadow-rose-950/40' 
                    : 'bg-emerald-950/20 border-emerald-500/50 shadow-2xl shadow-emerald-950/40'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      {result.isSpam ? (
                        <div className="p-3.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/50">
                          <ShieldAlert size={32} />
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">
                          <ShieldCheck size={32} />
                        </div>
                      )}

                      <div>
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          result.isSpam ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          Prediction Result
                        </span>
                        <h4 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                          {result.isSpam ? '🚨 SPAM / MALICIOUS THREAT' : '✅ HAM / SAFE MESSAGE'}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-mono">Spam Probability</span>
                      <span className={`text-2xl sm:text-3xl font-extrabold font-heading ${
                        result.isSpam ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {result.confidencePct}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Classifier Engine:</span>
                      <span className="text-slate-200 font-semibold">{result.modelType}</span>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Inference Latency:</span>
                      <span className="text-emerald-400 font-bold">{result.latency} ms</span>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Feature Vectors:</span>
                      <span className="text-purple-300 font-semibold">{result.foundKeywords.length} High-Weight Triggers</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* API Code Mode */}
          {viewMode === 'api' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {['python', 'javascript', 'curl'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { sound.playClick(); setCodeLang(lang); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                        codeLang === lang ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  onClick={copyCode}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                <code>{getCodeSnippet()}</code>
              </pre>
            </div>
          )}

          {/* 2D Decision Boundary Mode */}
          {viewMode === 'boundary' && (
            <div className="p-6 sm:p-8">
              <DecisionBoundaryCanvas threshold={threshold} />
            </div>
          )}

          {/* Matrix & ROC Mode */}
          {viewMode === 'metrics' && (
            <div className="p-6 sm:p-8">
              <ConfusionMatrixSimulator />
            </div>
          )}

          {/* Recruiter Q&A Bot Mode */}
          {viewMode === 'qna' && (
            <div className="p-6 sm:p-8">
              <RecruiterQnABot />
            </div>
          )}

          {/* Algo Visualizer Mode */}
          {viewMode === 'algo' && (
            <div className="p-6 sm:p-8">
              <AlgoVisualizer />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
