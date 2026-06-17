import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Cloud, Layers, Zap } from 'lucide-react';

const STATS = [
  { value: 4.5, suffix: '+', label: 'Years Experience', icon: Zap, color: '#a78bfa' },
  { value: 6, suffix: '+', label: 'Enterprise Projects', icon: Layers, color: '#60a5fa' },
  { value: 15, suffix: '+', label: 'Technologies', icon: Code2, color: '#34d399' },
  { value: 100, suffix: '+', label: 'Features Delivered', icon: Server, color: '#fb923c' },
];

const EXPERTISE = [
  { icon: Code2, label: 'Frontend Development', desc: 'React, Next.js, TypeScript, Tailwind CSS' },
  { icon: Server, label: 'Backend Development', desc: 'Node.js, Express.js, REST APIs, JWT' },
  { icon: Database, label: 'Database Management', desc: 'PostgreSQL, MongoDB, Redis, MySQL' },
  { icon: Cloud, label: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD, Playwright' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(parseFloat(current.toFixed(target % 1 !== 0 ? 1 : 0)));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function About({ onSectionVisible }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });

  useEffect(() => {
    if (inView) onSectionVisible('about');
  }, [inView, onSectionVisible]);

  return (
    <section ref={ref} id="about" className="py-28 relative overflow-hidden" style={{ background: '#070710' }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Crafting Digital{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Experiences</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A passionate Senior MERN Stack Developer with 4.5+ years of building enterprise-grade applications
            that scale, perform, and delight users.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ value, suffix, label, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}20`, color }}
              >
                <Icon size={20} />
              </div>
              <div
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{ color }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div className="text-xs text-slate-400 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: About text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
            <p className="text-slate-400 leading-relaxed">
              I'm a full-stack developer specializing in the MERN stack, with deep expertise in building
              CRM systems, workflow management platforms, report generation tools, and enterprise SaaS products.
              My experience spans from architecting scalable backends to crafting pixel-perfect UIs.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I excel at transforming complex business requirements into clean, maintainable code.
              Whether it's real-time data processing with Redis, complex PostgreSQL queries, or
              interactive dashboards with React, I bring engineering discipline to every project.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['REST API Design', 'System Architecture', 'Performance Optimization', 'Agile / Scrum', 'Code Reviews', 'CI/CD Pipelines'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/[0.08] text-slate-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact info */}
            <div className="pt-4 flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>📍 Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>📱 +91-8380988087</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>✉️ ajay.kumavat0815@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Expertise cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {EXPERTISE.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="glass rounded-2xl p-5 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa' }}
                >
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{label}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
