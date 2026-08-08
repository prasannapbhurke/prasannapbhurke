import React from 'react';

// The portfolio uses the user-supplied reference artwork directly so the signal
// remains pixel-for-pixel faithful to the requested classic emblem.
export default function BatLogoSvg({ className = 'w-8 h-5', ...props }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}bat-signal-reference.png`}
      alt="Bat-Signal"
      className={className}
      style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
      {...props}
    />
  );
}
