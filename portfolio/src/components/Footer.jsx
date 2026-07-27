import { ArrowUp } from 'lucide-react';
export default function Footer() { return <footer><div className="max-w-7xl mx-auto px-5 sm:px-8 footer-inner"><p>© {new Date().getFullYear()} Prasanna Bhurke</p><p>Designed with intention. Built with React.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp size={15}/></button></div></footer>; }
