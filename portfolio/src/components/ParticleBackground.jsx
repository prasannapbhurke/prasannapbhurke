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
      initBuildings();
    };
    window.addEventListener('resize', handleResize);

    const isBatman = theme === 'batman';

    // -------------------------------------------------------------
    // PURPLE MODE: High-tech Neural Network Particle Mesh
    // -------------------------------------------------------------
    const particleCount = Math.min(Math.floor(width / 18), 70);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2
    }));

    // -------------------------------------------------------------
    // BATMAN MODE: Gotham City Skyline & Bat-Signal Canvas Engine
    // -------------------------------------------------------------
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
        const h = Math.random() * (height * 0.45) + (height * 0.25);
        const hasSpire = Math.random() > 0.4;
        buildingsLayer1.push({ x, w, h, hasSpire });
        x += w + Math.random() * 10;
      }

      // Layer 2: Midground Gothic Skyscrapers with Lit Windows
      x = -20;
      while (x < width + 40) {
        const w = Math.random() * 80 + 50;
        const h = Math.random() * (height * 0.35) + (height * 0.2);
        const windows = [];
        const cols = Math.floor(w / 12);
        const rows = Math.floor(h / 18);
        for (let r = 1; r < rows - 1; r++) {
          for (let c = 1; c < cols - 1; c++) {
            if (Math.random() > 0.45) {
              windows.push({
                rx: c * 12 + 3,
                ry: r * 18 + 5,
                color: Math.random() > 0.85 ? '#facc15' : Math.random() > 0.5 ? '#eab308' : '#713f12',
                lit: Math.random() > 0.2
              });
            }
          }
        }
        buildingsLayer2.push({ x, w, h, windows, style: Math.floor(Math.random() * 3) });
        x += w - Math.random() * 15;
      }

      // Layer 3: Foreground Roofs & Street Level
      x = -10;
      while (x < width + 20) {
        const w = Math.random() * 120 + 80;
        const h = Math.random() * (height * 0.18) + (height * 0.08);
        buildingsLayer3.push({ x, w, h });
        x += w + Math.random() * 15;
      }
    };

    if (isBatman) {
      initBuildings();
    }

    // Flying Bats Simulation
    const batCount = 18;
    const bats = Array.from({ length: batCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      speed: Math.random() * 2.2 + 1.4,
      size: Math.random() * 12 + 8,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.15 + 0.1,
      sinOffset: Math.random() * Math.PI * 2
    }));

    // Rain Simulation
    const rainCount = 90;
    const rain = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: Math.random() * 22 + 12,
      speed: Math.random() * 14 + 12,
      alpha: Math.random() * 0.4 + 0.1
    }));

    // Batmobile Simulation Object
    let batmobile = {
      x: -180,
      speed: 4.5,
      width: 75,
      height: 22,
      flames: []
    };

    let mouse = { x: width * 0.75, y: height * 0.25 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // =============================================================
    // ULTRA-CLEAR CRISP BATMAN EMBLEM VECTOR RENDERER
    // =============================================================
    const drawBatLogo = (targetCtx, cx, cy, scale) => {
      targetCtx.save();
      targetCtx.translate(cx, cy);
      targetCtx.scale(scale, scale);

      // 1. Bright Golden Oval Backplate with High Glow
      targetCtx.beginPath();
      targetCtx.ellipse(0, 0, 36, 22, 0, 0, Math.PI * 2);
      targetCtx.fillStyle = '#facc15';
      targetCtx.shadowBlur = 30;
      targetCtx.shadowColor = '#facc15';
      targetCtx.fill();
      targetCtx.lineWidth = 2.5;
      targetCtx.strokeStyle = '#eab308';
      targetCtx.stroke();
      targetCtx.shadowBlur = 0;

      // 2. High-Precision Crisp Black Bat Silhouette
      targetCtx.beginPath();
      targetCtx.moveTo(0, -14);
      targetCtx.lineTo(2.5, -14);
      targetCtx.lineTo(4, -8);
      targetCtx.bezierCurveTo(9, -8, 14, -14, 22, -14);
      targetCtx.bezierCurveTo(28, -14, 31, -8, 30, 0);
      targetCtx.bezierCurveTo(24, 7, 16, 12, 11, 6);
      targetCtx.bezierCurveTo(7, 14, 3, 17, 0, 19);
      targetCtx.bezierCurveTo(-3, 17, -7, 14, -11, 6);
      targetCtx.bezierCurveTo(-16, 12, -24, 7, -30, 0);
      targetCtx.bezierCurveTo(-31, -8, -28, -14, -22, -14);
      targetCtx.bezierCurveTo(-14, -14, -9, -8, -4, -8);
      targetCtx.lineTo(-2.5, -14);
      targetCtx.closePath();
      targetCtx.fillStyle = '#050609';
      targetCtx.fill();

      targetCtx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      if (!isBatman) {
        // =========================================================
        // STANDARD PURPLE THEME RENDER
        // =========================================================
        const dotColor = 'rgba(157, 78, 221, ';
        const lineColor = 'rgba(112, 0, 255, ';
        const mouseColor = 'rgba(168, 85, 247, ';

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;

          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${dotColor}${p1.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#7000ff';
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${lineColor}${(1 - dist / 130) * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          if (mouse.x && mouse.y) {
            const dx = p1.x - mouse.x;
            const dy = p1.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `${mouseColor}${(1 - dist / 160) * 0.4})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      } else {
        // =========================================================
        // BATMAN GOTHAM CITY ATMOSPHERIC CANVAS RENDER
        // =========================================================

        // 1. Gotham Night Sky Gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
        skyGradient.addColorStop(0, '#020305');
        skyGradient.addColorStop(0.5, '#070912');
        skyGradient.addColorStop(0.85, '#1e1706');
        skyGradient.addColorStop(1, '#040508');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height);

        // 2. Bat-Signal Searchlight Beam projecting from Gotham
        const signalOriginX = width * 0.22;
        const signalOriginY = height;
        
        const targetX = mouse.x ? mouse.x : width * 0.7 + Math.sin(time * 0.5) * 120;
        const targetY = mouse.y ? Math.min(mouse.y, height * 0.45) : height * 0.2 + Math.cos(time * 0.7) * 40;

        // Draw Searchlight Cone Beam
        ctx.save();
        const beamGradient = ctx.createLinearGradient(signalOriginX, signalOriginY, targetX, targetY);
        beamGradient.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
        beamGradient.addColorStop(0.4, 'rgba(250, 204, 21, 0.3)');
        beamGradient.addColorStop(0.8, 'rgba(234, 179, 8, 0.15)');
        beamGradient.addColorStop(1, 'rgba(202, 138, 4, 0.02)');

        ctx.beginPath();
        ctx.moveTo(signalOriginX - 15, signalOriginY);
        ctx.lineTo(targetX - 95, targetY);
        ctx.lineTo(targetX + 95, targetY);
        ctx.lineTo(signalOriginX + 15, signalOriginY);
        ctx.closePath();
        ctx.fillStyle = beamGradient;
        ctx.fill();

        // Outer Cloud Glow Circle
        const cloudGlow = ctx.createRadialGradient(targetX, targetY, 15, targetX, targetY, 125);
        cloudGlow.addColorStop(0, 'rgba(254, 240, 138, 0.98)');
        cloudGlow.addColorStop(0.4, 'rgba(250, 204, 21, 0.65)');
        cloudGlow.addColorStop(0.75, 'rgba(234, 179, 8, 0.28)');
        cloudGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(targetX, targetY, 125, 0, Math.PI * 2);
        ctx.fillStyle = cloudGlow;
        ctx.fill();

        // Project Ultra-Clear Bat-Signal Emblem inside Cloud Glow
        drawBatLogo(ctx, targetX, targetY, 2.2);
        ctx.restore();

        // 3. Render Gotham Skyline Layer 1 (Distant Spires)
        ctx.fillStyle = '#0a0d16';
        buildingsLayer1.forEach((b) => {
          const topY = height - b.h;
          ctx.fillRect(b.x, topY, b.w, b.h);
          if (b.hasSpire) {
            ctx.beginPath();
            ctx.moveTo(b.x + b.w * 0.5 - 2, topY);
            ctx.lineTo(b.x + b.w * 0.5, topY - 35);
            ctx.lineTo(b.x + b.w * 0.5 + 2, topY);
            ctx.fillStyle = '#0d111d';
            ctx.fill();
            ctx.fillStyle = '#0a0d16';
          }
        });

        // 4. Render Gotham Skyline Layer 2 (Midground Towers with Lit Windows)
        buildingsLayer2.forEach((b) => {
          const topY = height - b.h;
          ctx.fillStyle = '#0e121e';
          ctx.fillRect(b.x, topY, b.w, b.h);

          if (b.style === 1) {
            ctx.beginPath();
            ctx.moveTo(b.x, topY);
            ctx.lineTo(b.x + b.w * 0.5, topY - 20);
            ctx.lineTo(b.x + b.w, topY);
            ctx.fill();
          }

          b.windows.forEach((win) => {
            if (win.lit) {
              ctx.fillStyle = win.color;
              ctx.shadowBlur = 4;
              ctx.shadowColor = '#facc15';
              ctx.fillRect(b.x + win.rx, topY + win.ry, 6, 9);
              ctx.shadowBlur = 0;
            }
          });
        });

        // 5. Render Gotham Skyline Layer 3 (Foreground Roofs & Street Level)
        ctx.fillStyle = '#06080e';
        buildingsLayer3.forEach((b) => {
          ctx.fillRect(b.x, height - b.h, b.w, b.h);
        });

        // 6. Flying Bats Simulation across Gotham Sky
        bats.forEach((bat) => {
          bat.x += bat.speed;
          bat.y += Math.sin(time * 2 + bat.sinOffset) * 0.8;
          bat.wingAngle += bat.wingSpeed;

          if (bat.x > width + 30) {
            bat.x = -40;
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

        // 7. REAL-TIME ANIMATED BATMOBILE PATROL ALONG GOTHAM STREET
        batmobile.x += batmobile.speed;
        if (batmobile.x > width + 200) {
          batmobile.x = -220;
        }

        const bY = height - 26;

        ctx.save();
        ctx.translate(batmobile.x, bY);

        // Headlight Beams (Forward Yellow/White Beams)
        const headlightGrad = ctx.createLinearGradient(60, 0, 240, 0);
        headlightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.8)');
        headlightGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.35)');
        headlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.moveTo(60, -2);
        ctx.lineTo(240, -18);
        ctx.lineTo(240, 10);
        ctx.lineTo(60, 4);
        ctx.closePath();
        ctx.fillStyle = headlightGrad;
        ctx.fill();

        // Afterburner Jet Exhaust Flame
        const flameGrad = ctx.createLinearGradient(-5, 0, -50, 0);
        flameGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)'); // Cyan core
        flameGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.85)'); // Gold flame
        flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');     // Red smoke
        ctx.beginPath();
        ctx.moveTo(-5, -4);
        ctx.lineTo(-45 + Math.random() * 10, -8);
        ctx.lineTo(-45 + Math.random() * 10, 4);
        ctx.closePath();
        ctx.fillStyle = flameGrad;
        ctx.fill();

        // Batmobile Armored Body Silhouette
        ctx.fillStyle = '#090b10';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        // Nose cone
        ctx.moveTo(65, 0);
        // Windshield slope
        ctx.lineTo(40, -12);
        ctx.lineTo(15, -16);
        // Roof line & Bat-fin tip
        ctx.lineTo(-10, -22);
        ctx.lineTo(-20, -8);
        // Rear armor & Tail fin
        ctx.lineTo(-25, -2);
        ctx.lineTo(-25, 4);
        ctx.lineTo(65, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // High-Tech Yellow Cockpit Windshield Glow
        ctx.fillStyle = '#facc15';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.moveTo(38, -10);
        ctx.lineTo(20, -14);
        ctx.lineTo(12, -8);
        ctx.lineTo(34, -6);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Front & Rear Heavy Offroad Wheels
        ctx.fillStyle = '#030406';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 1.5;

        // Front wheel
        ctx.beginPath();
        ctx.arc(48, 4, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Rear wheel
        ctx.beginPath();
        ctx.arc(-10, 4, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // 8. Atmospheric Gotham Rain Streaks
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.2)';
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
