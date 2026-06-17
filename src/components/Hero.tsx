import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Download, ArrowRight } from 'lucide-react';
import ParticleSystem from './ParticleSystem';
import TypeWriter from './TypeWriter';
import ProfileImage from './ProfileImage';
import cvFile from '../assets/Document/Ajay Kumavat CV.pdf';

const SOCIALS = [
  { icon: Github, href: 'https://github.com/ajay08081995', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ajay-kumavat-039671207/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ajay.kumavat0815@gmail.com', label: 'Email' },
];

const STATS = [
  { value: '4.5+', label: 'Years Experience' },
  { value: '6+', label: 'Enterprise Projects' },
  { value: '15+', label: 'Technologies' },
  { value: '100+', label: 'Features Delivered' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Hero({ onSectionVisible }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onSectionVisible('home'),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onSectionVisible]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050508' }}
    >
      {/* Canvas Particles */}
      <ParticleSystem />

      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-[0.05] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 pb-24 md:py-0 grid md:grid-cols-2 gap-8 lg:gap-20 items-center md:min-h-screen">
        {/* Left: Text — always first (order-1 on mobile AND desktop) */}
        <motion.div
          className="space-y-5 text-left order-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: 'rgba(124, 58, 237, 0.1)',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                color: '#a78bfa',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for hire · Pune, India
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={item} className="text-slate-400 text-lg font-medium">
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 variants={item} className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            <span
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #c4b5fd 50%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ajay Kumavat
            </span>
          </motion.h1>

          {/* Title with typing */}
          <motion.div variants={item} className="text-xl sm:text-2xl text-slate-300 font-medium h-8">
            <TypeWriter />
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={item} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Building scalable web applications with{' '}
            <span className="text-violet-400 font-medium">React</span>,{' '}
            <span className="text-blue-400 font-medium">Next.js</span>,{' '}
            <span className="text-cyan-400 font-medium">Node.js</span> and modern cloud technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            <motion.button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(124,58,237,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects <ArrowRight size={16} />
            </motion.button>
            <motion.a
              href={cvFile}
              download="Ajay_Kumavat_CV.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={16} /> Download CV
            </motion.a>
            <motion.button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={16} /> Contact Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-3 pt-2">
            <span className="text-xs text-slate-600 uppercase tracking-widest">Follow me</span>
            <div className="w-12 h-px bg-slate-700" />
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/[0.06] hover:border-violet-500/40"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.15, background: 'rgba(124, 58, 237, 0.15)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile image — second on mobile, right column on desktop */}
        <motion.div
          className="relative flex justify-center items-center order-2 overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <ProfileImage />
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        className="relative md:absolute bottom-0 left-0 right-0 border-t border-white/[0.04]"
        style={{ background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(10px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:flex sm:items-center sm:justify-between">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-violet-400 transition-colors"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
