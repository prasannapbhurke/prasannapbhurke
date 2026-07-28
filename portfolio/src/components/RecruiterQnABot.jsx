import React, { useState } from 'react';
import { HelpCircle, Code2, CheckCircle2, Copy, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

export default function RecruiterQnABot() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [copied, setCopied] = useState(false);

  const qnaList = [
    {
      q: 'How do you handle concept and data drift in ML production models?',
      category: 'Machine Learning Architecture',
      answer: `To prevent model degradation over time, I implement continuous data distribution monitoring:

1. Statistical Drift Detection: Monitor feature distribution shifts using Kolmogorov-Smirnov (KS) tests and Population Stability Index (PSI) on incoming payloads.
2. Threshold Triggered Automated Retraining: Set automated retraining pipelines when prediction confidence metrics fall below defined SLAs.
3. Shadow Deployment: Deploy newly retrained candidate models in shadow mode parallel to production before promoting to primary inference traffic.`,
      snippet: `def detect_feature_drift(baseline_df, production_df, threshold=0.05):
    from scipy.stats import ks_2samp
    drift_report = {}
    for col in baseline_df.columns:
        stat, p_val = ks_2samp(baseline_df[col], production_df[col])
        drift_report[col] = {'drift_detected': p_val < threshold, 'p_value': p_val}
    return drift_report`
    },
    {
      q: 'Why choose FastAPI over Flask for high-concurrency microservices?',
      category: 'Backend Architecture & Concurrency',
      answer: `FastAPI provides fundamental performance and developer velocity advantages for high-concurrency systems:

1. Native Async/Await & ASGI: Built on Starlette and Pydantic, FastAPI leverages asynchronous I/O natively, handling 10,000+ concurrent connections with sub-20ms latency.
2. Automatic Pydantic Schema Validation: Payload typing errors are caught before hitting execution logic.
3. Auto-Generated OpenAPI / Swagger Docs: Zero-config interactive API documentation endpoints.`,
      snippet: `from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI(title="Spam Classifier Microservice")

class MessagePayload(BaseModel):
    text: str
    threshold: float = 0.5

@app.post("/api/v1/classify")
async def classify_message(payload: MessagePayload):
    prob = await model_runner.predict_async(payload.text)
    return {"is_spam": prob > payload.threshold, "confidence": prob}`
    },
    {
      q: 'Explain your NLP text vectorization and classification pipeline.',
      category: 'Natural Language Processing',
      answer: `My end-to-end NLP classification pipeline follows a rigorous 4-step architecture:

1. Preprocessing: Tokenization, lowercasing, punctuation stripping, NLTK stop-word filtration, and Porter Stemming.
2. Vectorization: TF-IDF (Term Frequency-Inverse Document Frequency) with n-gram range (1,2) to capture word context combinations.
3. Model Training: Multinomial Naive Bayes and Linear SVM classifiers evaluated with 5-fold cross-validation.
4. Validation: Precision, Recall, and Confusion Matrix scoring aiming for minimum 98%+ precision on spam detection benchmarks.`,
      snippet: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

nlp_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english')),
    ('clf', MultinomialNB(alpha=0.1))
])`
    },
    {
      q: 'How do you achieve sub-millisecond execution times in C++ & Python?',
      category: 'Algorithmic Optimization',
      answer: `Achieving sub-millisecond execution performance relies on strict computational complexity and memory cache alignment:

1. Cache Locality & Memory Alignment: Using contiguous vector memory layouts over pointers to eliminate CPU cache misses.
2. Bit Manipulation & Fast I/O: Employing bitwise masks for state tracking and disabling standard I/O synchronization in C++.
3. Optimal Algorithmic Complexity: Replacing O(N^2) nested comparisons with Hash Maps or Two-Pointer O(N) techniques.`,
      snippet: `#include <iostream>
#include <vector>

int main() {
    // Fast I/O Optimization for Competitive Benchmarks
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    std::vector<int> data = {4, 12, 19, 27, 34, 45};
    // Sub-millisecond execution logic...
    return 0;
}`
    }
  ];

  const current = qnaList[selectedQuestion];

  const copySnippet = () => {
    sound.playClick();
    navigator.clipboard.writeText(current.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <HelpCircle size={16} />
          <span>Recruiter & Engineering Lead Technical Q&A Assistant</span>
        </div>
        <span className="text-slate-400">Select any technical question below:</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Question Selector List */}
        <div className="space-y-3">
          {qnaList.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { sound.playClick(); setSelectedQuestion(idx); setCopied(false); }}
              onMouseEnter={() => sound.playHover()}
              className={`w-full p-4 rounded-2xl border text-left text-xs font-mono transition-all flex flex-col justify-between gap-2 ${
                selectedQuestion === idx
                  ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg shadow-purple-950/60 ring-1 ring-purple-400/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-purple-500/30'
              }`}
            >
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">{item.category}</span>
              <span className="font-semibold text-slate-200">{item.q}</span>
            </button>
          ))}
        </div>

        {/* Answer & Code Viewport */}
        <div className="lg:col-span-2 space-y-4 glass-card p-6 border-purple-500/30 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">{current.category}</span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Sparkles size={13} /> Verified Technical Architecture Answer
              </span>
            </div>

            <h3 className="text-lg font-bold font-heading text-white">{current.q}</h3>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {current.answer}
            </div>
          </div>

          {/* Solution Code Snippet */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
                <Code2 size={14} /> Production Implementation Snippet:
              </span>
              
              <button
                onClick={copySnippet}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
              >
                {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
              <code>{current.snippet}</code>
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}
