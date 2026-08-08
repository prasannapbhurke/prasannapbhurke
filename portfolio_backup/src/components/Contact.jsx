import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { sound } from '../utils/sound';
import BatLogoSvg from './BatLogoSvg';
import confetti from 'canvas-confetti';

export default function Contact({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('prasannapbhurke@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (isBatman) {
      sound.playBatmanThemeSound();
    } else {
      sound.playSuccess();
    }

    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: isBatman ? ['#facc15', '#eab308', '#ffffff'] : ['#a855f7', '#7000ff', '#10b981']
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
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
            isBatman
              ? 'bg-amber-950/80 border border-yellow-500/50 text-yellow-300 shadow-md shadow-yellow-500/20'
              : 'bg-purple-950/60 border border-purple-500/40 text-purple-300'
          }`}>
            {isBatman ? <BatLogoSvg className="w-4 h-3" goldBackplate={true} /> : <Mail size={14} className="text-purple-400" />}
            <span>{isBatman ? 'TRANSMIT BAT-SIGNAL EMERGENCY SIGNAL' : "Let's Build Together"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight pb-2">
            {isBatman ? (
              <>Dispatch <span className="text-yellow-400 font-extrabold drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">Bat-Signal</span></>
            ) : (
              <>Get in <span className="text-purple-300 font-extrabold drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">Touch</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {isBatman
              ? 'Send encrypted emergency transmission directly to the Batcave mainframe console.'
              : 'Have a project in mind, hiring opportunity, or open-source collaboration? Feel free to reach out directly.'}
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Direct Contact Info Card */}
          <div className={`glass-card p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all duration-300 ${
            isBatman ? 'border-yellow-500/40 shadow-yellow-500/10' : ''
          }`}>
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold font-heading ${isBatman ? 'text-yellow-300' : 'text-white'}`}>
                {isBatman ? 'Batcave Comms Array' : 'Contact Information'}
              </h3>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                I am actively seeking Senior Software Engineering, AI Platform Architecture, and Full Stack Development opportunities.
              </p>

              {/* Email Copier */}
              <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                isBatman
                  ? 'bg-slate-950/90 border-yellow-500/30'
                  : 'bg-slate-900/90 border-purple-500/30'
              }`}>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    {isBatman ? 'Encrypted Batcave Email:' : 'Direct Email:'}
                  </span>
                  <span className={`text-sm font-mono font-bold ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
                    prasannapbhurke@gmail.com
                  </span>
                </div>
                
                <button
                  onClick={copyEmail}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBatman
                      ? 'bg-amber-950/60 text-yellow-300 hover:text-white border-yellow-500/40'
                      : 'bg-purple-950/60 text-purple-300 hover:text-white border-purple-500/30'
                  }`}
                  title="Copy Email"
                >
                  {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {isBatman ? 'Gotham External Networks:' : 'Direct Social Links:'}
              </span>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/prasannapbhurke"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    isBatman
                      ? 'bg-slate-950 text-slate-200 border-yellow-500/30 hover:border-yellow-400 hover:text-yellow-300'
                      : 'bg-slate-900 text-slate-200 border-purple-500/30 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <GithubIcon size={16} />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/prasanna-bhurke-25a10931a"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    isBatman
                      ? 'bg-slate-950 text-slate-200 border-yellow-500/30 hover:border-yellow-400 hover:text-yellow-300'
                      : 'bg-slate-900 text-slate-200 border-purple-500/30 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn Network</span>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className={`glass-card p-6 sm:p-8 space-y-4 transition-all duration-300 ${
            isBatman ? 'border-yellow-500/40 shadow-yellow-500/10' : ''
          }`}>
            <h3 className={`text-2xl font-bold font-heading ${isBatman ? 'text-yellow-300' : 'text-white'}`}>
              {isBatman ? '🦇 Dispatch Bat-Signal Message' : 'Send Message'}
            </h3>

            {submitted ? (
              <div className={`p-6 rounded-xl border text-center space-y-3 animate-fadeIn ${
                isBatman
                  ? 'bg-amber-950/80 border-yellow-500/60 text-yellow-300'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              }`}>
                <div className="flex justify-center">
                  {isBatman ? <BatLogoSvg className="w-12 h-8" goldBackplate={true} /> : <CheckCircle2 size={40} className="text-emerald-400" />}
                </div>
                <h4 className="text-lg font-bold">
                  {isBatman ? 'Bat-Signal Transmitted Successfully!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  {isBatman
                    ? 'Encrypted signal received at Batcave mainframe console.'
                    : 'Thank you for reaching out! Prasanna will respond shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder={isBatman ? "Bruce Wayne / Commissioner Gordon" : "Jane Doe"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-all ${
                      isBatman ? 'border-yellow-500/30 focus:border-yellow-400' : 'border-purple-500/30 focus:border-purple-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder={isBatman ? "wayne@enterprises.gotham" : "janedoe@company.com"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-all ${
                      isBatman ? 'border-yellow-500/30 focus:border-yellow-400' : 'border-purple-500/30 focus:border-purple-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Message Payload</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isBatman ? "Describe emergency Batman dispatch details..." : "Tell me about your project, role, or collaboration..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-all ${
                      isBatman ? 'border-yellow-500/30 focus:border-yellow-400' : 'border-purple-500/30 focus:border-purple-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full py-3 px-6 rounded-xl font-bold font-mono text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isBatman
                      ? 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-black shadow-yellow-500/50 hover:scale-[1.02]'
                      : 'glow-btn'
                  }`}
                >
                  {isBatman ? (
                    <>
                      <BatLogoSvg className="w-5 h-4" goldBackplate={true} />
                      <span>Transmit Bat-Signal</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
