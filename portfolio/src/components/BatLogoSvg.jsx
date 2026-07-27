import React from 'react';

export default function BatLogoSvg({ className = "w-6 h-6", goldBackplate = true }) {
  return (
    <svg 
      viewBox="0 0 512 320" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {goldBackplate && (
        <>
          {/* Golden Shield Backplate */}
          <ellipse cx="256" cy="160" rx="250" ry="150" fill="#FACC15" stroke="#EAB308" strokeWidth="12" />
          {/* Inner Golden Glow Ring */}
          <ellipse cx="256" cy="160" rx="235" ry="135" stroke="#CA8A04" strokeWidth="6" opacity="0.6" />
        </>
      )}
      
      {/* Pristine Authentic Batman Bat Silhouette */}
      <path
        d="M 256 50 
           C 264 50, 272 75, 296 75 
           C 328 75, 344 50, 396 50 
           C 455 50, 490 95, 480 170 
           C 460 270, 340 280, 256 310 
           C 172 280, 52 270, 32 170 
           C 22 95, 57 50, 116 50 
           C 168 50, 184 75, 216 75 
           C 240 75, 248 50, 256 50 Z"
        fill={goldBackplate ? "#07090E" : "currentColor"}
      />
    </svg>
  );
}
