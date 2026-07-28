import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (theme === 'batman') initBuildings();
    };
    window.addEventListener('resize', handleResize);

    const isBatman = theme === 'batman';

    let mouse = { x: width * 0.75, y: height * 0.25 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // =============================================================
    // MODE 1: STANDARD NEON PURPLE PARTICLE CONSTELLATION ENGINE
    // =============================================================
    const particleCount = Math.min(Math.floor(width / 16), 75);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.6 + 0.3
    }));

    // =============================================================
    // MODE 2: GOTHAM CITY SKYLINE & BATMOBILE ENGINE
    // =============================================================
    let buildingsLayer1 = [];
    let buildingsLayer2 = [];
    let buildingsLayer3 = [];

    const initBuildings = () => {
      buildingsLayer1 = [];
      buildingsLayer2 = [];
      buildingsLayer3 = [];

      // Layer 1: Background Distant Spires
      let x = 0;
      while (x < width) {
        const w = Math.random() * 60 + 40;
        const h = Math.random() * (height * 0.48) + (height * 0.25);
        const hasSpire = Math.random() > 0.35;
        buildingsLayer1.push({ x, w, h, hasSpire });
        x += w + Math.random() * 10;
      }

      // Layer 2: Midground Gothic Skyscrapers with Lit Windows
      x = -20;
      while (x < width + 40) {
        const w = Math.random() * 80 + 50;
        const h = Math.random() * (height * 0.38) + (height * 0.2);
        const windows = [];
        const cols = Math.floor(w / 12);
        const rows = Math.floor(h / 18);
        for (let r = 1; r < rows - 1; r++) {
          for (let c = 1; c < cols - 1; c++) {
            if (Math.random() > 0.4) {
              windows.push({
                rx: c * 12 + 3,
                ry: r * 18 + 5,
                color: Math.random() > 0.8 ? '#facc15' : Math.random() > 0.4 ? '#eab308' : '#713f12',
                lit: Math.random() > 0.15
              });
            }
          }
        }
        buildingsLayer2.push({ x, w, h, windows, style: Math.floor(Math.random() * 3) });
        x += w - Math.random() * 15;
      }

      // Layer 3: Foreground Roofs
      x = -10;
      while (x < width + 20) {
        const w = Math.random() * 120 + 80;
        const h = Math.random() * (height * 0.18) + (height * 0.08);
        buildingsLayer3.push({ x, w, h });
        x += w + Math.random() * 15;
      }
    };

    if (isBatman) initBuildings();

    // Flying Bats Simulation
    const batCount = 20;
    const bats = Array.from({ length: batCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      speed: Math.random() * 2.5 + 1.5,
      size: Math.random() * 14 + 8,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.18 + 0.1,
      sinOffset: Math.random() * Math.PI * 2
    }));

    // Rain Simulation
    const rainCount = 90;
    const rain = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: Math.random() * 24 + 12,
      speed: Math.random() * 15 + 12
    }));

    // Batmobile Patrol Object
    let batmobile = {
      x: -180,
      speed: 4.8
    };

    const drawBatLogo = (targetCtx, cx, cy, scale) => {
      targetCtx.save();
      targetCtx.translate(cx, cy);
      targetCtx.scale(scale, scale);

      // Black Oval Field with Yellow Border Ring
      targetCtx.beginPath();
      targetCtx.ellipse(0, 0, 38, 24, 0, 0, Math.PI * 2);
      targetCtx.fillStyle = '#000000';
      targetCtx.shadowBlur = 35;
      targetCtx.shadowColor = '#facc15';
      targetCtx.fill();
      targetCtx.lineWidth = 3;
      targetCtx.strokeStyle = '#facc15';
      targetCtx.stroke();
      targetCtx.shadowBlur = 0;

      // Bright Yellow Batman Bat Silhouette
      targetCtx.beginPath();
      targetCtx.moveTo(0, -15);
      targetCtx.lineTo(3, -15);
      targetCtx.lineTo(5, -9);
      targetCtx.bezierCurveTo(10, -9, 15, -15, 24, -15);
      targetCtx.bezierCurveTo(30, -15, 33, -9, 32, 0);
      targetCtx.bezierCurveTo(26, 8, 17, 13, 12, 7);
      targetCtx.bezierCurveTo(8, 15, 3, 18, 0, 20);
      targetCtx.bezierCurveTo(-3, 18, -8, 15, -12, 7);
      targetCtx.bezierCurveTo(-17, 13, -26, 8, -32, 0);
      targetCtx.bezierCurveTo(-33, -9, -30, -15, -24, -15);
      targetCtx.bezierCurveTo(-15, -15, -10, -9, -5, -9);
      targetCtx.lineTo(-3, -15);
      targetCtx.closePath();
      targetCtx.fillStyle = '#facc15';
      targetCtx.fill();

      targetCtx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      if (!isBatman) {
        // =========================================================
        // STANDARD PURPLE PARTICLE CONSTELLATION RENDER
        // =========================================================
        ctx.fillStyle = '#090a0f';
        ctx.fillRect(0, 0, width, height);

        // Render particle connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.25;
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Render particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse proximity attraction
          if (mouse.x && mouse.y) {
            const mdx = mouse.x - p.x;
            const mdy = mouse.y - p.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 140) {
              const alpha = (1 - mdist / 140) * 0.35;
              ctx.strokeStyle = `rgba(216, 180, 254, ${alpha})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }

          ctx.fillStyle = 'rgba(192, 132, 252, 0.8)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#a855f7';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else {
        // =========================================================
        // GOTHAM CITY ATMOSPHERIC CANVAS RENDER
        // =========================================================
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
        skyGradient.addColorStop(0, '#020305');
        skyGradient.addColorStop(0.5, '#070912');
        skyGradient.addColorStop(0.85, '#1e1706');
        skyGradient.addColorStop(1, '#040508');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height);

        // Bat-Signal Searchlight Beam
        const signalOriginX = width * 0.22;
        const signalOriginY = height;
        const targetX = mouse.x ? mouse.x : width * 0.7 + Math.sin(time * 0.5) * 120;
        const targetY = mouse.y ? Math.min(mouse.y, height * 0.45) : height * 0.2 + Math.cos(time * 0.7) * 40;

        ctx.save();
        const beamGradient = ctx.createLinearGradient(signalOriginX, signalOriginY, targetX, targetY);
        beamGradient.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
        beamGradient.addColorStop(0.4, 'rgba(250, 204, 21, 0.35)');
        beamGradient.addColorStop(0.8, 'rgba(234, 179, 8, 0.18)');
        beamGradient.addColorStop(1, 'rgba(202, 138, 4, 0.03)');

        ctx.beginPath();
        ctx.moveTo(signalOriginX - 20, signalOriginY);
        ctx.lineTo(targetX - 105, targetY);
        ctx.lineTo(targetX + 105, targetY);
        ctx.lineTo(signalOriginX + 20, signalOriginY);
        ctx.closePath();
        ctx.fillStyle = beamGradient;
        ctx.fill();

        const cloudGlow = ctx.createRadialGradient(targetX, targetY, 15, targetX, targetY, 135);
        cloudGlow.addColorStop(0, 'rgba(254, 240, 138, 0.98)');
        cloudGlow.addColorStop(0.4, 'rgba(250, 204, 21, 0.7)');
        cloudGlow.addColorStop(0.75, 'rgba(234, 179, 8, 0.3)');
        cloudGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(targetX, targetY, 135, 0, Math.PI * 2);
        ctx.fillStyle = cloudGlow;
        ctx.fill();

        drawBatLogo(ctx, targetX, targetY, 2.4);
        ctx.restore();

        // Layer 1 Buildings
        ctx.fillStyle = '#0a0d16';
        buildingsLayer1.forEach((b) => {
          const topY = height - b.h;
          ctx.fillRect(b.x, topY, b.w, b.h);
          if (b.hasSpire) {
            ctx.beginPath();
            ctx.moveTo(b.x + b.w * 0.5 - 2, topY);
            ctx.lineTo(b.x + b.w * 0.5, topY - 40);
            ctx.lineTo(b.x + b.w * 0.5 + 2, topY);
            ctx.fillStyle = '#0d111d';
            ctx.fill();
            ctx.fillStyle = '#0a0d16';
          }
        });

        // Layer 2 Buildings with Windows
        buildingsLayer2.forEach((b) => {
          const topY = height - b.h;
          ctx.fillStyle = '#0e121e';
          ctx.fillRect(b.x, topY, b.w, b.h);

          if (b.style === 1) {
            ctx.beginPath();
            ctx.moveTo(b.x, topY);
            ctx.lineTo(b.x + b.w * 0.5, topY - 24);
            ctx.lineTo(b.x + b.w, topY);
            ctx.fill();
          }

          b.windows.forEach((win) => {
            if (win.lit) {
              ctx.fillStyle = win.color;
              ctx.shadowBlur = 5;
              ctx.shadowColor = '#facc15';
              ctx.fillRect(b.x + win.rx, topY + win.ry, 6, 9);
              ctx.shadowBlur = 0;
            }
          });
        });

        // Layer 3 Buildings
        ctx.fillStyle = '#06080e';
        buildingsLayer3.forEach((b) => {
          ctx.fillRect(b.x, height - b.h, b.w, b.h);
        });

        // Flying Bats
        bats.forEach((bat) => {
          bat.x += bat.speed;
          bat.y += Math.sin(time * 2 + bat.sinOffset) * 0.9;
          bat.wingAngle += bat.wingSpeed;

          if (bat.x > width + 40) {
            bat.x = -50;
            bat.y = Math.random() * (height * 0.45);
          }

          ctx.save();
          ctx.translate(bat.x, bat.y);
          ctx.fillStyle = '#040508';

          const wingY = Math.sin(bat.wingAngle) * (bat.size * 0.5);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(bat.size * 0.5, -bat.size * 0.6 + wingY, bat.size, wingY);
          ctx.quadraticCurveTo(bat.size * 0.4, bat.size * 0.2, 0, bat.size * 0.4);
          ctx.quadraticCurveTo(-bat.size * 0.4, bat.size * 0.2, -bat.size, wingY);
          ctx.quadraticCurveTo(-bat.size * 0.5, -bat.size * 0.6 + wingY, 0, 0);
          ctx.fill();
          ctx.restore();
        });

        // Animated Batmobile Patrol
        batmobile.x += batmobile.speed;
        if (batmobile.x > width + 220) {
          batmobile.x = -240;
        }

        const bY = height - 26;

        ctx.save();
        ctx.translate(batmobile.x, bY);

        // Headlight Beams
        const headlightGrad = ctx.createLinearGradient(60, 0, 260, 0);
        headlightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
        headlightGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.4)');
        headlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.moveTo(60, -2);
        ctx.lineTo(260, -20);
        ctx.lineTo(260, 12);
        ctx.lineTo(60, 4);
        ctx.closePath();
        ctx.fillStyle = headlightGrad;
        ctx.fill();

        // Flame Exhaust
        const flameGrad = ctx.createLinearGradient(-5, 0, -55, 0);
        flameGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
        flameGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.9)');
        flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.beginPath();
        ctx.moveTo(-5, -4);
        ctx.lineTo(-50 + Math.random() * 12, -9);
        ctx.lineTo(-50 + Math.random() * 12, 5);
        ctx.closePath();
        ctx.fillStyle = flameGrad;
        ctx.fill();

        // Armored Body
        ctx.fillStyle = '#0a0d14';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(65, 0);
        ctx.lineTo(40, -14);
        ctx.lineTo(15, -18);
        ctx.lineTo(-10, -24);
        ctx.lineTo(-20, -9);
        ctx.lineTo(-25, -2);
        ctx.lineTo(-25, 4);
        ctx.lineTo(65, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit
        ctx.fillStyle = '#facc15';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.moveTo(38, -11);
        ctx.lineTo(20, -15);
        ctx.lineTo(12, -9);
        ctx.lineTo(34, -7);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Wheels
        ctx.fillStyle = '#030406';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(48, 4, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-10, 4, 9.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Rain
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.22)';
        ctx.lineWidth = 1;
        rain.forEach((r) => {
          r.y += r.speed;
          r.x -= 2;
          if (r.y > height) {
            r.y = -20;
            r.x = Math.random() * (width + 100);
          }
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x - 3, r.y + r.len);
          ctx.stroke();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
