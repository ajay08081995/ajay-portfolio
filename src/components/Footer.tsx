import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/ajay08081995', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ajay-kumavat-039671207/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ajay.kumavat0815@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer
      className="relative border-t border-white/[0.04]"
      style={{ background: '#030305' }}
    >
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ x: 2 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
              >
                AK
              </div>
              <div>
                <div className="text-base font-bold text-white">Ajay Kumavat</div>
                <div className="text-xs text-slate-500">Senior MERN Stack Developer</div>
              </div>
            </motion.div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Building scalable web applications with React, Node.js, and modern cloud technologies.
              Open to full-time roles and exciting collaborations.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white border border-white/[0.06] hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {LINKS.slice(0, 4).map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-slate-500 hover:text-violet-400 transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">More</h4>
            <ul className="space-y-2.5">
              {LINKS.slice(4).map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-slate-500 hover:text-violet-400 transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="mailto:ajay.kumavat0815@gmail.com"
                  className="text-sm text-slate-500 hover:text-violet-400 transition-colors"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            © 2026 Ajay Kumavat · Built with{' '}
            <Heart size={10} className="text-red-400 inline" fill="currentColor" />{' '}
            using React & Tailwind CSS
          </p>

          <motion.button
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white border border-white/[0.06] hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={12} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
