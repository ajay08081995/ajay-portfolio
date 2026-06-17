import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiRedux, SiTailwindcss, SiMui, SiHtml5, SiTypescript,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiGithub, SiGitlab, SiDocker, SiPostman,
  SiJavascript, SiCss,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscSymbolOperator } from 'react-icons/vsc';

type Category = 'All' | 'Frontend' | 'Backend' | 'Database' | 'Cloud & Tools';

type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string; style?: React.CSSProperties }>;

interface Skill {
  name: string;
  icon: IconComponent;
  color: string;
  category: Category[];
  level: number;
}

const SKILLS: Skill[] = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB', category: ['All', 'Frontend'], level: 95 },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: ['All', 'Frontend'], level: 88 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: ['All', 'Frontend'], level: 85 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: ['All', 'Frontend'], level: 92 },
  { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC', category: ['All', 'Frontend'], level: 87 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: ['All', 'Frontend'], level: 90 },
  { name: 'Material UI', icon: SiMui, color: '#007FFF', category: ['All', 'Frontend'], level: 82 },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: ['All', 'Frontend'], level: 98 },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', category: ['All', 'Frontend'], level: 92 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: ['All', 'Backend'], level: 88 },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff', category: ['All', 'Backend'], level: 90 },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: ['All', 'Backend'], level: 72 },
  { name: 'JWT / Auth', icon: SiJsonwebtokens, color: '#d63aff', category: ['All', 'Backend'], level: 88 },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: ['All', 'Database'], level: 85 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: ['All', 'Database'], level: 82 },
  { name: 'Redis', icon: SiRedis, color: '#DC382D', category: ['All', 'Database'], level: 78 },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: ['All', 'Database'], level: 80 },
  { name: 'AWS', icon: FaAws, color: '#FF9900', category: ['All', 'Cloud & Tools'], level: 72 },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: ['All', 'Cloud & Tools'], level: 70 },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: ['All', 'Cloud & Tools'], level: 90 },
  { name: 'GitLab', icon: SiGitlab, color: '#FC6D26', category: ['All', 'Cloud & Tools'], level: 85 },
  { name: 'Playwright', icon: VscSymbolOperator, color: '#2EAD33', category: ['All', 'Cloud & Tools'], level: 75 },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: ['All', 'Cloud & Tools'], level: 90 },
];

const CATEGORIES: Category[] = ['All', 'Frontend', 'Backend', 'Database', 'Cloud & Tools'];

const MARQUEE_SKILLS = [...SKILLS, ...SKILLS];

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Skills({ onSectionVisible }: Props) {
  const [active, setActive] = useState<Category>('All');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });

  useEffect(() => {
    if (inView) onSectionVisible('skills');
  }, [inView, onSectionVisible]);

  const filtered = SKILLS.filter((s) => s.category.includes(active));

  return (
    <section ref={ref} id="skills" className="py-28 relative overflow-hidden" style={{ background: '#050508' }}>
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Technical Skills</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Tech{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Arsenal</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            A curated set of technologies I've mastered to build production-grade web applications.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden mb-12 py-3">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #050508, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #050508, transparent)' }} />
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {MARQUEE_SKILLS.map(({ name, icon: Icon, color }, i) => (
              <div
                key={`${name}-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] shrink-0"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <Icon size={16} color={color} />
                <span className="text-xs text-slate-400 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border"
              style={{
                background: active === cat ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.03)',
                borderColor: active === cat ? 'transparent' : 'rgba(255,255,255,0.06)',
                color: active === cat ? '#ffffff' : '#94a3b8',
                boxShadow: active === cat ? '0 4px 15px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          layout
        >
          {filtered.map(({ name, icon: Icon, color, level }, i) => (
            <motion.div
              key={name}
              layout
              className="skill-card glass rounded-2xl p-5 flex flex-col items-center gap-3 group cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background: `${color}15` }}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <Icon size={26} color={color} />
              </motion.div>
              <span className="text-xs font-semibold text-slate-300 text-center leading-tight">{name}</span>
              {/* Level bar */}
              <div className="w-full h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
