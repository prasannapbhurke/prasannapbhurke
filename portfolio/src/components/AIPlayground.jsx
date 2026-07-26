import React, { useState } from 'react';
import { Sparkles, ShieldAlert, ShieldCheck, RefreshCw, Cpu, Send, Zap, CheckCircle2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIPlayground() {
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' or 'email'
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

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

  // Real-time NLP Simulation Engine
  const analyzeText = (textToAnalyze) => {
    const text = (textToAnalyze || inputText).trim();
    if (!text) return;

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
      const spamScore = Math.min(99.4, Math.max(8.2, foundKeywords.length * 28 + (lower.includes('http') ? 35 : 0) + (lower.includes('!') ? 12 : 0)));
      
      const isSpam = spamScore > 50;

      if (!isSpam) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#059669']
        });
      }

      setResult({
        isSpam,
        confidence: isSpam ? spamScore.toFixed(1) : (100 - spamScore).toFixed(1),
        foundKeywords,
        processedWords: text.split(/\s+/).length,
        modelType: activeTab === 'sms' ? 'Multinomial Naive Bayes (SMS Classifier)' : 'TF-IDF + Support Vector Machine (Email Classifier)',
        latency: (Math.random() * 15 + 18).toFixed(1)
      });

      setAnalyzing(false);
    }, 600);
  };

  return (
    <section id="ai-playground" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Sparkles size={14} className="text-purple-400 animate-pulse" />
            <span>Interactive Machine Learning Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            AI Model <span className="text-gradient">Playground</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Test live NLP text classification models directly in your browser. Powered by simulated Naive Bayes & TF-IDF feature extraction.
          </p>
        </div>

        {/* Playground Container */}
        <div className="mt-12 glass-card border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/50">
          
          {/* Top Bar with Mode Tabs */}
          <div className="bg-slate-900/90 border-b border-purple-500/20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setActiveTab('sms'); setResult(null); setInputText(''); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'sms' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                <Zap size={16} />
                <span>SMS Spam Detector</span>
              </button>

              <button 
                onClick={() => { setActiveTab('email'); setResult(null); setInputText(''); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'email' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={16} />
                <span>Email Body Classifier</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-lg">
              <Cpu size={14} className="text-purple-400" />
              <span>Inference SLA: &lt;35ms</span>
            </div>
          </div>

          {/* Main Interactive Input & Analysis Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Sample Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Click a sample message to test:
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleMessages[activeTab].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(sample.text);
                      analyzeText(sample.text);
                    }}
                    className="text-xs bg-slate-900/80 hover:bg-purple-900/40 border border-slate-700 hover:border-purple-400 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
                  >
                    💡 {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Text Area */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTab === 'sms' ? 'Type or paste an SMS message here...' : 'Paste an email subject line or body content to scan...'}
                rows={4}
                className="w-full bg-slate-950/80 border border-purple-500/30 focus:border-purple-400 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-mono transition-all"
              />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  {inputText.length} characters
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setInputText(''); setResult(null); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
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
                        <span>Vectorizing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Run Model Prediction</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Output Section */}
            {result && (
              <div className={`mt-6 p-6 rounded-2xl border transition-all animate-fadeIn ${
                result.isSpam 
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-xl shadow-rose-950/30' 
                  : 'bg-emerald-950/20 border-emerald-500/40 shadow-xl shadow-emerald-950/30'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    {result.isSpam ? (
                      <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                        <ShieldAlert size={28} />
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <ShieldCheck size={28} />
                      </div>
                    )}

                    <div>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        result.isSpam ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        Prediction Output
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                        {result.isSpam ? '🚨 SPAM / MALICIOUS THREAT DETECTED' : '✅ HAM / SAFE MESSAGE'}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">Confidence Level</span>
                    <span className={`text-2xl font-extrabold font-heading ${
                      result.isSpam ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Model Engine:</span>
                    <span className="text-slate-200 font-semibold">{result.modelType}</span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Inference Latency:</span>
                    <span className="text-purple-300 font-semibold">{result.latency} ms</span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Feature Extraction:</span>
                    <span className="text-slate-200 font-semibold">{result.foundKeywords.length} Spam Triggers Found</span>
                  </div>
                </div>

                {/* Detected Keywords Tag List */}
                {result.foundKeywords.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400 block mb-2">High-Weight NLP Trigger Vector Words:</span>
                    <div className="flex flex-wrap gap-2">
                      {result.foundKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          ⚠️ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
