import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animId;
    const updateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <>
      {/* Small Precision Dot */}
      <div 
        className="fixed w-3 h-3 rounded-full bg-purple-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-purple-500/80 hidden sm:block"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Trailing Neon Ring */}
      <div 
        className="fixed w-9 h-9 rounded-full border-2 border-purple-500/50 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 shadow-lg shadow-purple-600/30 hidden sm:block"
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      />
    </>
  );
}
