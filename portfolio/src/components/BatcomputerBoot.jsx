import React, { useEffect, useState } from 'react';
import BatLogoSvg from './BatLogoSvg';

const BOOT_LINES = [
  'WAYNE ENTERPRISES // SECURE UPLINK',
  'GOTHAM GRID: ONLINE',
  'ENCRYPTING CASE FILES...',
  'BATMOBILE TELEMETRY: LINKED',
  'VIGILANTE MAINFRAME: READY'
];

export default function BatcomputerBoot({ active }) {
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    setLineCount(0);
    const lines = BOOT_LINES.map((_, index) => setTimeout(() => setLineCount(index + 1), 240 + index * 280));
    const done = setTimeout(() => setVisible(false), 2100);
    return () => { lines.forEach(clearTimeout); clearTimeout(done); };
  }, [active]);

  if (!visible) return null;
  return (
    <div className="batcomputer-boot" role="status" aria-live="polite">
      <div className="batcomputer-boot__scan" />
      <div className="batcomputer-boot__panel">
        <BatLogoSvg className="w-24 h-14 mx-auto mb-5" goldBackplate />
        <p className="batcomputer-boot__title">BATCOMPUTER BOOT SEQUENCE</p>
        <div className="space-y-2 text-left">
          {BOOT_LINES.slice(0, lineCount).map((line) => <p key={line} className="batcomputer-boot__line">&gt; {line} <span>✓</span></p>)}
        </div>
        <div className="batcomputer-boot__progress"><span style={{ width: `${Math.min(100, lineCount * 20)}%` }} /></div>
      </div>
    </div>
  );
}
