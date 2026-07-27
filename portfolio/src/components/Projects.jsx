import { ArrowUpRight, Braces, Database, ShieldCheck } from 'lucide-react';

const projects = [
  { number: '01', title: 'Email Spam Detector Extension', type: 'Browser extension · NLP', copy: 'A browser extension and ML-backed workflow for identifying risky email content while keeping the interaction immediate and understandable.', tags: ['Python', 'Scikit-learn', 'FastAPI', 'JavaScript'], url: 'https://github.com/prasannapbhurke/email-spam-detector-extension', icon: ShieldCheck },
  { number: '02', title: 'SMS Spam Detector', type: 'Applied machine learning', copy: 'An end-to-end text classification application exploring preprocessing, vectorization, model evaluation, and a simple interface for testing messages.', tags: ['Python', 'NLTK', 'Streamlit', 'Pandas'], url: 'https://github.com/prasannapbhurke/sms-spam-detector', icon: Braces },
  { number: '03', title: 'Student Portal', type: 'Full-stack application', copy: 'A structured academic management platform for handling records, workflows, and role-based information in one cohesive product.', tags: ['JavaScript', 'Node.js', 'SQL', 'REST APIs'], url: 'https://github.com/prasannapbhurke/student-portal', icon: Database },
];

export default function Projects() {
  return <section id="projects" className="section-shell py-24 sm:py-32"><div className="max-w-7xl mx-auto px-5 sm:px-8">
    <div className="section-heading"><p className="section-label">SELECTED WORK</p><h2>Built to solve a real<br /><em>problem.</em></h2><p>Three projects that best represent how I think: begin with the problem, make the systems dependable, and keep the experience human.</p></div>
    <div className="projects-grid mt-14">{projects.map((project, index) => { const Icon = project.icon; return <article className={`project-card project-card-${index + 1}`} key={project.title}><div className="project-topline"><span>{project.number}</span><Icon size={20} strokeWidth={1.6} /></div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-copy">{project.copy}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={17} /></a></article>})}</div>
  </div></section>;
}
