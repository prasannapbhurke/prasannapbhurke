import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

export default function Contact({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText('prasannapbhurke@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      if (onClose) onClose();
    }, 2500);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Mail size={14} className="text-purple-400" />
            <span>Let's Build Together</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Get in <span className="bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(233,213,255,0.5)]">Touch</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Have a project in mind, hiring opportunity, or open-source collaboration? Feel free to reach out directly.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Direct Contact Info Card */}
          <div className="glass-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-heading text-white">
                Contact Information
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                I am actively seeking Senior Software Engineering, AI Platform Architecture, and Full Stack Development opportunities.
              </p>

              {/* Email Copier */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Direct Email:</span>
                  <span className="text-sm font-mono font-bold text-purple-300">prasannapbhurke@gmail.com</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-purple-950/60 text-purple-300 hover:text-white border border-purple-500/30 transition-colors"
                  title="Copy Email"
                >
                  {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">Connect on Social Networks:</span>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/prasanna-bhurke-25a10931a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <LinkedinIcon size={16} className="text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href="https://github.com/prasannapbhurke"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="glass-card p-6 sm:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fadeIn">
                <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-xl font-bold font-heading text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">Thank you for reaching out. I will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-slate-950/80 border border-purple-500/30 focus:border-purple-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-slate-950/80 border border-purple-500/30 focus:border-purple-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or proposal..."
                    className="w-full bg-slate-950/80 border border-purple-500/30 focus:border-purple-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full glow-btn py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
