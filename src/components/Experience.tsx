import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Job {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  color: string;
  responsibilities: string[];
  tech: string[];
  current?: boolean;
}

const JOBS: Job[] = [
  {
    id: 1,
    role: 'SDE-I',
    company: 'PaperLite Pvt Ltd',
    period: 'Feb 2026 – Present',
    location: 'Pune, India',
    type: 'Full-time',
    color: '#a78bfa',
    current: true,
    responsibilities: [
      'Leading development of the Workflow Management Platform for CA firms',
      'Architecting scalable backend services with Node.js and PostgreSQL',
      'Implementing real-time features using WebSocket and Redis',
      'Collaborating with product team on feature design and technical roadmap',
    ],
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
  },
  {
    id: 2,
    role: 'Associate Software Developer',
    company: 'Aspire SoftServes Pvt Ltd',
    period: 'May 2021 – Aug 2025',
    location: 'Ahmedabad, India',
    type: 'Full-time',
    color: '#60a5fa',
    responsibilities: [
      'Built Executive Search CRM platform serving 500+ consultants with real-time data management',
      'Developed Report Builder with dynamic PDF generation and template customization engine',
      'Integrated AI/ML tools for automated candidate sourcing and contact retrieval',
      'Implemented Redis caching reducing API response times by 60%',
      'Migrated legacy database to PostgreSQL, improving query performance by 40%',
      'Led team of 4 developers, conducted code reviews and mentored junior developers',
    ],
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redux', 'TypeScript', 'REST APIs', 'JWT'],
  },
  {
    id: 3,
    role: 'Trainee Software Engineer',
    company: 'Hefshine Software Pvt Ltd',
    period: 'Nov 2020 – May 2021',
    location: 'Pune, India',
    type: 'Internship → Full-time',
    color: '#34d399',
    responsibilities: [
      'Gained foundational experience in MERN stack development',
      'Developed responsive web interfaces with React.js and CSS3',
      'Built RESTful APIs with Node.js and Express.js',
      'Collaborated in Agile sprints and participated in code reviews',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3'],
  },
];

interface TimelineItemProps {
  job: Job;
  index: number;
  isLast: boolean;
}

function TimelineItem({ job, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-6">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.08] shadow-lg z-10"
          style={{ background: `${job.color}20`, color: job.color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <Briefcase size={18} />
          {job.current && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-dark animate-pulse" />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-2 origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(59,130,246,0.2))' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 flex-1 group hover:border-white/[0.12] transition-all duration-300"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-white">{job.role}</h3>
              {job.current && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full text-green-400 border border-green-400/30"
                  style={{ background: 'rgba(52,211,153,0.1)' }}>
                  CURRENT
                </span>
              )}
            </div>
            <p className="text-sm font-semibold" style={{ color: job.color }}>{job.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={11} />
              <span>{job.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-2 mb-4">
          {job.responsibilities.map((r, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06 }}
            >
              <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: job.color }} />
              {r}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
          {job.tech.map((t) => (
            <span key={t}
              className="px-2.5 py-1 text-[10px] font-medium rounded-lg border border-white/[0.06] text-slate-400"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Experience({ onSectionVisible }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });

  useEffect(() => {
    if (inView) onSectionVisible('experience');
  }, [inView, onSectionVisible]);

  return (
    <section ref={ref} id="experience" className="py-16 sm:py-28 relative overflow-hidden" style={{ background: '#050508' }}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Career Journey</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Work{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Experience</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            4.5+ years of progressive growth from trainee to senior developer, building enterprise applications.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {JOBS.map((job, i) => (
            <TimelineItem key={job.id} job={job} index={i} isLast={i === JOBS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
