import React from 'react';

export default function BatLogoSvg({ className = "w-8 h-5" }) {
  return (
    <svg 
      viewBox="0 0 500 300" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Thick Yellow Oval Ring */}
      <ellipse cx="250" cy="150" rx="230" ry="130" fill="#000000" stroke="#facc15" strokeWidth="16" />
      
      {/* Exact Bright Yellow Batman Bat Emblem */}
      <path 
        d="M 250 82
           C 255 82, 258 95, 264 95
           C 275 95, 285 75, 335 75
           C 390 75, 420 110, 440 160
           C 400 170, 360 215, 330 215
           C 300 215, 280 185, 270 185
           C 260 185, 255 245, 250 245
           C 245 245, 240 185, 230 185
           C 220 185, 200 215, 170 215
           C 140 215, 100 170, 60 160
           C 80 110, 110 75, 165 75
           C 215 75, 225 95, 236 95
           C 242 95, 245 82, 250 82 Z"
        fill="#facc15"
      />
    </svg>
  );
}
