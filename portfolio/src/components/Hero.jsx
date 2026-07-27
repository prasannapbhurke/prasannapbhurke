import { ArrowDownRight, Command, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Hero({ onOpenTerminal, onOpenContact }) {
  return (
    <section id="about" className="hero relative isolate pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="max-w-5xl">
          <div className="eyebrow mb-8"><span className="eyebrow-dot" /> Available for thoughtful engineering work</div>
          <p className="hero-kicker">PRASANNA BHURKE — SOFTWARE ENGINEER</p>
          <h1 className="hero-title mt-4">I build <em>intelligent</em><br />products with clarity.</h1>
          <p className="hero-copy mt-8 max-w-2xl">A software engineer focused on practical AI, reliable backend systems, and polished web experiences. I turn uncertain ideas into tools people can actually use.</p>
          <div className="flex flex-wrap gap-3 mt-9">
            <a className="primary-action" href="#projects">Selected work <ArrowDownRight size={18} /></a>
            <button className="secondary-action" onClick={onOpenContact}>Start a conversation <Mail size={17} /></button>
          </div>
          <div className="hero-meta mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><span>FOCUS</span><strong>AI · Full stack · Systems</strong></div>
            <div><span>BASED IN</span><strong>India · Remote friendly</strong></div>
            <button onClick={onOpenTerminal}><span>QUICK ACCESS</span><strong><Command size={14} /> Explore via CLI</strong></button>
          </div>
        </div>
        <aside className="hero-statement hidden lg:block" aria-label="Design statement"><Sparkles size={18} /><p>Craft over spectacle.<br />Evidence over noise.</p></aside>
        <div className="hero-socials flex gap-3 mt-10">
          <a href="https://github.com/prasannapbhurke" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/prasanna-bhurke-25a10931a" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
        </div>
      </div>
    </section>
  );
}

