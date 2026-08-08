import React from 'react';

/**
 * Classic yellow-oval Bat-Signal, drawn as an original clean vector so it stays crisp
 * from the navbar to the full Gotham skyline projection.
 */
export default function BatLogoSvg({
  className = 'w-8 h-5',
  goldBackplate = true,
  batColor = '#000000',
  yellowColor = '#FFEA1A',
  ...props
}) {
  return (
    <svg viewBox="0 0 1200 720" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {goldBackplate && (
        <>
          <ellipse cx="600" cy="360" rx="555" ry="315" fill={yellowColor} stroke="#000000" strokeWidth="24" />
          <ellipse cx="600" cy="360" rx="522" ry="285" stroke="#FFE100" strokeWidth="12" opacity="0.9" />
        </>
      )}
      <path
        d="M600 116 C579 150 560 202 547 252 C480 249 397 211 314 165 C358 231 342 304 331 349 C318 403 282 448 240 451 C206 454 177 434 160 408 C165 495 225 577 344 606 C313 557 301 519 313 484 C329 438 380 421 422 448 C474 481 520 540 554 612 L600 686 L646 612 C680 540 726 481 778 448 C820 421 871 438 887 484 C899 519 887 557 856 606 C975 577 1035 495 1040 408 C1023 434 994 454 960 451 C918 448 882 403 869 349 C858 304 842 231 886 165 C803 211 720 249 653 252 C640 202 621 150 600 116 Z"
        fill={batColor}
      />
    </svg>
  );
}
