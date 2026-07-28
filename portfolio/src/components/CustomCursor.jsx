import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 12;

export default function CustomCursor({ theme }) {
  const isBatman = theme === 'batman';
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: -200, y: -200 });
  const trailPos = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));
  const frame = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const animate = () => {
      // Shift trail
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trailPos.current[i] = { ...trailPos.current[i - 1] };
      }
      trailPos.current[0] = { ...pos.current };

      // Update cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        cursorRef.current.style.opacity = hidden ? '0' : '1';
      }
      // Update trail
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = trailPos.current[i];
        const scale = 1 - i / TRAIL_LENGTH;
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.opacity = hidden ? '0' : String((1 - i / TRAIL_LENGTH) * 0.45);
      });

      frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(frame.current);
    };
  }, [hidden]);

  const color = isBatman ? '#facc15' : '#a855f7';
  const glowColor = isBatman ? 'rgba(250,204,21,0.4)' : 'rgba(168,85,247,0.4)';

  return (
    <>
      {/* Main cursor: crosshair (Batman) or dot (purple) */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99997] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0, willChange: 'transform' }}
      >
        {isBatman ? (
          // WayneTech Crosshair
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
            <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.5" fill="none" />
            <line x1="14" y1="0" x2="14" y2="8" stroke={color} strokeWidth="1.2" />
            <line x1="14" y1="20" x2="14" y2="28" stroke={color} strokeWidth="1.2" />
            <line x1="0" y1="14" x2="8" y2="14" stroke={color} strokeWidth="1.2" />
            <line x1="20" y1="14" x2="28" y2="14" stroke={color} strokeWidth="1.2" />
          </svg>
        ) : (
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: `2px solid ${color}`,
              boxShadow: `0 0 8px ${glowColor}`,
              background: 'transparent',
            }}
          />
        )}
      </div>

      {/* Particle trail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="fixed pointer-events-none z-[99996] -translate-x-1/2 -translate-y-1/2"
          style={{
            top: 0,
            left: 0,
            willChange: 'transform',
            width: isBatman ? 6 : 8,
            height: isBatman ? 6 : 8,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 6px ${glowColor}`,
          }}
        />
      ))}
    </>
  );
}
