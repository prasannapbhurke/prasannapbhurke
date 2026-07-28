import React, { useEffect, useRef } from 'react';

export default function TechOrbitSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = 380);
    let height = (canvas.height = 340);

    const skills = [
      'Python', 'PyTorch', 'React.js', 'C++', 'FastAPI', 
      'Scikit-Learn', 'Docker', 'SQL', 'TypeScript', 'Node.js', 
      'NLTK', 'Pandas', 'Tailwind', 'Git', 'REST API'
    ];

    // Distribute skills evenly on a 3D sphere using Fibonacci Sphere distribution
    const radius = 130;
    const nodes = skills.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return {
        text,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    });

    let rotX = 0.005;
    let rotY = 0.008;
    let mouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.x = (e.clientX - cx) * 0.0001;
      mouse.y = (e.clientY - cy) * 0.0001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const angleX = rotY + mouse.x;
      const angleY = rotX + mouse.y;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate nodes and sort by depth (z) for 3D rendering order
      nodes.forEach((node) => {
        // Rotate around Y axis
        let x1 = node.x * cosX - node.z * sinX;
        let z1 = node.z * cosX + node.x * sinX;

        // Rotate around X axis
        let y1 = node.y * cosY - z1 * sinY;
        let z2 = z1 * cosY + node.y * sinY;

        node.x = x1;
        node.y = y1;
        node.z = z2;
      });

      nodes.sort((a, b) => b.z - a.z);

      nodes.forEach((node) => {
        const scale = 260 / (260 - node.z); // Perspective projection scale
        const px = cx + node.x * scale;
        const py = cy + node.y * scale;

        const alpha = Math.max(0.2, (node.z + radius) / (2 * radius));
        const fontSize = Math.floor(10 * scale);

        ctx.font = `600 ${fontSize}px "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Depth glow effect
        ctx.fillStyle = `rgba(216, 180, 254, ${alpha})`;
        ctx.shadowBlur = alpha > 0.6 ? 12 : 0;
        ctx.shadowColor = '#c084fc';
        ctx.fillText(node.text, px, py);
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div className="relative p-2 rounded-3xl bg-slate-950/60 border border-purple-500/30 backdrop-blur-md shadow-2xl">
        <canvas ref={canvasRef} className="w-[380px] h-[340px] block" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-purple-300/80 bg-slate-900/90 px-3 py-1 rounded-full border border-purple-500/30">
          ✨ 3D Interactive Tech Orbit Sphere
        </div>
      </div>
    </div>
  );
}
