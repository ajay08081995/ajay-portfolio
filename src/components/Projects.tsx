import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ExternalLink, Github, Tag } from 'lucide-react';

type FilterTag = 'All' | 'Full Stack' | 'Frontend' | 'Backend' | 'Next.js';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  tech: string[];
  tags: FilterTag[];
  gradient: string;
  features: string[];
  icon: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Workflow Management Platform',
    subtitle: 'CA Firm Management System',
    description: 'End-to-end CA firm management system handling tasks, client communication, billing, document management, and team collaboration.',
    longDesc: 'A comprehensive workflow management platform built for CA firms. Features task tracking, client communication portals, automated billing, document handling with version control, and real-time team collaboration tools. Handles complex business rules and multi-tenant architecture.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Redux', 'Express.js', 'JWT'],
    tags: ['All', 'Full Stack'],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    features: ['Task & Project Management', 'Client Communication Portal', 'Document Management', 'Automated Billing System', 'Team Collaboration', 'Real-time Notifications'],
    icon: '📋',
  },
  {
    id: 2,
    title: 'Executive Search Consultant Portal',
    subtitle: 'Enterprise CRM Platform',
    description: 'Real-time CRM platform for executive search consultants with candidate tracking, Fit Quotient scoring, and comprehensive client management.',
    longDesc: 'A sophisticated CRM application enabling executives to manage client data, candidate details, and Fit Quotients in real-time. Features include database migration from legacy systems, RESTful API integration, advanced search and filtering, and analytical reporting dashboards.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Redux Toolkit', 'REST APIs', 'Material UI'],
    tags: ['All', 'Full Stack'],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    features: ['Real-time Data Management', 'Candidate Tracking System', 'Fit Quotient Scoring', 'Client Management', 'Advanced Search', 'Analytical Reports'],
    icon: '🎯',
  },
  {
    id: 3,
    title: 'Report Builder Application',
    subtitle: 'Dynamic Report Generation Engine',
    description: 'Customizable report generation tool with template builder, manual field control, PDF export, and sharing capabilities for search positions.',
    longDesc: 'A powerful report builder enabling consultants to create customizable status reports with manual field control, template creation, and sharing capabilities. Features dynamic PDF generation, custom template builder, and integration with the consultant portal.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'PDF Generation', 'TypeScript'],
    tags: ['All', 'Full Stack', 'Frontend'],
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    features: ['Dynamic Report Generation', 'Template Builder', 'PDF Export', 'Field Control', 'Sharing Capabilities', 'Version History'],
    icon: '📊',
  },
  {
    id: 4,
    title: 'Candidate Sourcing Portal',
    subtitle: 'AI-Powered Candidate Platform',
    description: 'AI/ML-integrated candidate sourcing platform with third-party API integrations for contact details retrieval and comprehensive skill tracking.',
    longDesc: 'An intelligent candidate sourcing platform that integrates AI/ML tools for automated contact detail retrieval and comprehensive skill analysis. Features SFPA tracking, third-party API integrations, data analytics dashboard, and candidate comparison tools.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'AI Integration', 'REST APIs', 'Redis'],
    tags: ['All', 'Full Stack', 'Backend'],
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    features: ['AI/ML Integration', 'Contact Retrieval API', 'SFPA Tracking', 'Candidate Comparison', 'Data Analytics', 'Third-party APIs'],
    icon: '🤖',
  },
  {
    id: 5,
    title: 'HiveTrack',
    subtitle: 'Supplier Performance Analytics',
    description: 'Enterprise supplier performance tracking platform with interactive analytics dashboards, KPI monitoring, and third-party service integration.',
    longDesc: 'HiveTrack is an enterprise-grade supplier performance analytics platform. Features interactive dashboards for tracking KPIs, performance metrics visualization, automated reporting, cloud deployment on AWS, and integration with multiple third-party data sources.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Redux'],
    tags: ['All', 'Full Stack'],
    gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    features: ['Performance KPI Dashboard', 'Supplier Evaluation', 'Interactive Charts', 'Enterprise Reporting', 'Cloud Deployment', 'Third-party Integration'],
    icon: '📈',
  },
  {
    id: 6,
    title: 'DivineConnect',
    subtitle: 'Spiritual Education Platform',
    description: 'Scalable Next.js spiritual/educational platform with secure authentication, cloud deployment, and cross-browser optimized performance.',
    longDesc: 'DivineConnect is a spiritual and educational digital connection platform built with Next.js. Features server-side rendering for SEO optimization, secure authentication with JWT, cloud infrastructure on AWS with Docker, and cross-browser compatibility with responsive design.',
    tech: ['Next.js', 'Node.js', 'MySQL', 'Docker', 'AWS', 'TypeScript'],
    tags: ['All', 'Next.js', 'Full Stack'],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    features: ['SSR / SEO Optimized', 'Secure Authentication', 'Cloud Infrastructure', 'Docker Containerization', 'Responsive UI', 'Cross-browser Support'],
    icon: '✨',
  },
];

const FILTERS: FilterTag[] = ['All', 'Full Stack', 'Frontend', 'Backend', 'Next.js'];

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ModalProps) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[50000] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08] shadow-2xl"
          style={{ background: 'rgba(8, 8, 14, 0.97)', backdropFilter: 'blur(30px)' }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/[0.06]" style={{ background: project.gradient }}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={16} />
            </button>
            <div className="text-4xl mb-3">{project.icon}</div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-white/70 text-sm mt-1">{project.subtitle}</p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <p className="text-slate-400 text-sm leading-relaxed">{project.longDesc}</p>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-400 p-2 rounded-lg border border-white/[0.04]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-green-400 shrink-0">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Tag size={12} className="text-violet-400" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs font-medium rounded-lg border border-white/[0.08] text-slate-300"
                    style={{ background: 'rgba(124,58,237,0.1)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Projects({ onSectionVisible }: Props) {
  const [filter, setFilter] = useState<FilterTag>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });

  useEffect(() => {
    if (inView) onSectionVisible('projects');
  }, [inView, onSectionVisible]);

  const filtered = PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section ref={ref} id="projects" className="py-16 sm:py-28 relative overflow-hidden" style={{ background: '#070710' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Featured{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Enterprise-grade applications built with modern tech stacks.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 text-sm font-medium rounded-xl border transition-all duration-300"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.03)',
                borderColor: filter === f ? 'transparent' : 'rgba(255,255,255,0.06)',
                color: filter === f ? '#fff' : '#94a3b8',
                boxShadow: filter === f ? '0 4px 15px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                className="project-card glass rounded-2xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setSelected(project)}
                whileHover={{ y: -8 }}
              >
                {/* Card header with gradient */}
                <div
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: project.gradient }}
                >
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)' }} />
                  <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={14} className="text-white/70" />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{project.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{project.subtitle}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-md border border-white/[0.06] text-slate-400"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-md text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="pt-1 flex items-center gap-1 text-xs text-violet-400 font-medium">
                    View Details <ExternalLink size={10} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
