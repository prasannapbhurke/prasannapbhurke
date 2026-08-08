import React from 'react';
import { MapPinned, Crosshair } from 'lucide-react';

const districts = [
  ['ARKHAM NETWORK', 'email-spam-extension', 'THREAT ANALYSIS'],
  ['NARROWS NODE', 'sms-spam-detector', 'NLP INTELLIGENCE'],
  ['WAYNE TOWER', 'student-portal', 'FULL STACK'],
  ['GOTHAM AIRSPACE', 'airplane-reservation', 'SYSTEMS'],
  ['FINANCIAL DISTRICT', 'expense-tracker', 'DATA VIZ'],
  ['ORACLE ARCHIVE', 'nlp-sentiment-summarizer', 'AI ENGINE']
];

export default function GothamProjectMap({ active }) {
  if (!active) return null;
  const locate = (project) => document.getElementById(`case-${project}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return (
    <section className="gotham-map relative z-10" aria-label="Gotham project district map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gotham-map__frame">
          <div className="gotham-map__header"><span><MapPinned size={15} /> GOTHAM PROJECT GRID</span><span>LIVE DISTRICTS // 06</span></div>
          <div className="gotham-map__districts">
            {districts.map(([name, project, type], index) => (
              <button key={project} className={`gotham-map__district gotham-map__district--${index + 1}`} onClick={() => locate(project)}>
                <Crosshair size={15} /><strong>{name}</strong><small>{type}</small>
              </button>
            ))}
          </div>
          <p className="gotham-map__hint">Select a lit district to inspect its encrypted case file.</p>
        </div>
      </div>
    </section>
  );
}
