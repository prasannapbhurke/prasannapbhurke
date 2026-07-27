import { BrainCircuit, Code2, Database, Workflow } from 'lucide-react';
const capabilities = [
  { icon: BrainCircuit, title: 'Applied AI', items: ['Text classification', 'Feature engineering', 'Model evaluation', 'NLP workflows'] },
  { icon: Code2, title: 'Product engineering', items: ['React interfaces', 'JavaScript', 'Responsive design', 'Browser extensions'] },
  { icon: Database, title: 'Backend systems', items: ['Python services', 'REST APIs', 'SQL data modeling', 'Authentication flows'] },
  { icon: Workflow, title: 'How I work', items: ['Problem framing', 'Iterative delivery', 'Readable code', 'Measured trade-offs'] },
];
export default function TechStack() { return <section id="tech-stack" className="section-shell py-24 sm:py-32"><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="section-heading"><p className="section-label">CAPABILITIES</p><h2>Tools matter.<br /><em>Judgment matters more.</em></h2><p>A practical toolkit for taking an idea from an early sketch to a usable, maintainable system.</p></div><div className="capability-grid mt-14">{capabilities.map(({ icon: Icon, title, items }, i) => <article className="capability-card" key={title}><span className="capability-index">0{i + 1}</span><Icon size={25} strokeWidth={1.4}/><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>; }
