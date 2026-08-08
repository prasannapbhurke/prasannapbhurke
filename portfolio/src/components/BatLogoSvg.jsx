import React from 'react';

export default function BatLogoSvg({ 
  className = "w-8 h-5", 
  goldBackplate = true,
  batColor = "#000000",
  yellowColor = "#FED000",
  ...props 
}) {
  return (
    <svg 
      viewBox="0 0 500 310" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {goldBackplate && (
        <g>
          {/* Outer yellow oval background & ring border */}
          <ellipse 
            cx="250" 
            cy="155" 
            rx="244" 
            ry="148" 
            fill={yellowColor} 
            stroke={yellowColor} 
            strokeWidth="4" 
          />
          {/* Inner subtle black outline for comic emblem definition */}
          <ellipse 
            cx="250" 
            cy="155" 
            rx="236" 
            ry="140" 
            fill={yellowColor} 
            stroke="#000000" 
            strokeWidth="3.5" 
          />
        </g>
      )}
      
      {/* Authentic Classic Black Bat Emblem Silhouette */}
      <path 
        d="M 250 90
           C 246 90, 241 78, 236 68
           C 232 76, 225 95, 225 95
           C 198 118, 138 100, 102 78
           C 70 104, 38 132, 42 162
           C 48 185, 78 208, 104 208
           C 120 208, 138 196, 148 180
           C 160 196, 180 208, 196 208
           C 208 208, 214 194, 218 180
           C 226 195, 244 225, 250 242
           C 256 225, 274 195, 282 180
           C 286 194, 292 208, 304 208
           C 320 208, 340 196, 352 180
           C 362 196, 380 208, 396 208
           C 422 208, 452 185, 458 162
           C 462 132, 430 104, 398 78
           C 362 100, 302 118, 275 95
           C 275 95, 268 76, 264 68
           C 259 78, 254 90, 250 90 Z"
        fill={batColor}
      />
    </svg>
  );
}

