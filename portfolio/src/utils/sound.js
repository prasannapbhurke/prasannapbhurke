// Web Audio API Synthesizer & Music Engine for Portfolio

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.batmanMusicInterval = null;
    this.batmanAudio = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBatmanThemeMusic();
    }
    return this.muted;
  }

  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.12);
      });
    } catch {
      // Ignore
    }
  }

  playBatmanThemeSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Dramatic Gotham Brass Chime
      const freqs = [146.83, 174.61, 220.00, 293.66]; // D3, F3, A3, D4
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, this.ctx.currentTime + idx * 0.08 + 0.3);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // Ignore
    }
  }

  playBatmanThemeMusic() {
    if (this.muted) return;
    this.init();
    this.stopBatmanThemeMusic();

    // Check if external mp3 file exists in assets
    if (!this.batmanAudio && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/assets/batman-theme.mp3');
        audio.loop = true;
        audio.volume = 0.4;
        this.batmanAudio = audio;
      } catch {
        // Fallback to Web Audio Synth
      }
    }

    if (this.batmanAudio) {
      this.batmanAudio.play().catch(() => {
        // Autoplay policy fallback: start synth loop
        this.startSynthThemeLoop();
      });
    } else {
      this.startSynthThemeLoop();
    }
  }

  startSynthThemeLoop() {
    if (!this.ctx) return;
    const motif = [
      { note: 73.42, dur: 0.3 },  // D2
      { note: 73.42, dur: 0.3 },  // D2
      { note: 77.78, dur: 0.35 }, // D#2
      { note: 73.42, dur: 0.3 },  // D2
      { note: 110.00, dur: 0.4 }, // A2
      { note: 146.83, dur: 0.7 }, // D3 (Brass Fanfare)
    ];

    let step = 0;
    this.batmanMusicInterval = setInterval(() => {
      if (this.muted || !this.ctx) return;
      try {
        const n = motif[step % motif.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = step % 6 === 5 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(n.note, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(n.note * 1.03, this.ctx.currentTime + n.dur);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + n.dur);

        step++;
      } catch {
        // Ignore
      }
    }, 420);
  }

  stopBatmanThemeMusic() {
    if (this.batmanAudio) {
      try {
        this.batmanAudio.pause();
        this.batmanAudio.currentTime = 0;
      } catch {
        // Ignore
      }
    }
    if (this.batmanMusicInterval) {
      clearInterval(this.batmanMusicInterval);
      this.batmanMusicInterval = null;
    }
  }
}

export const sound = new SoundManager();
