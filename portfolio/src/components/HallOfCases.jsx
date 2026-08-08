import React from 'react';
import { Award, GitBranch, ShieldCheck, Trophy } from 'lucide-react';

const cases = [
  { icon: ShieldCheck, code: 'CASE 98.2', title: 'Threat Classification', detail: 'Validated ML spam-detection accuracy', status: 'SOLVED' },
  { icon: Trophy, code: 'CASE 1000+', title: 'Algorithmic Missions', detail: 'Data structures, graphs, DP and optimization', status: 'ACTIVE' },
  { icon: GitBranch, code: 'GITHUB NODE', title: 'Open-Source Record', detail: 'Repositories and engineering experiments', status: 'LINKED' },
  { icon: Award, code: 'CREDENTIAL VAULT', title: 'Achievement Archive', detail: 'Reserved for verified certificates and awards', status: 'SECURE' }
];

export default function HallOfCases({ active }) {
  if (!active) return null;
  return (
    <section className="hall-of-cases relative z-10" id="hall-of-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10"><p className="hall-of-cases__eyebrow">WAYNE MANOR // PRIVATE ARCHIVE</p><h2>Hall of <span>Cases</span></h2><p>Selected engineering milestones preserved as Gotham evidence records.</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map(({ icon: Icon, code, title, detail, status }) => <article key={code} className="case-trophy"><div className="case-trophy__seal"><Icon size={24} /></div><span>{code}</span><h3>{title}</h3><p>{detail}</p><footer><i /> {status}</footer></article>)}
        </div>
      </div>
    </section>
  );
}
