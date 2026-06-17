import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Server, Code2, Globe, BarChart3, Building2, Rocket } from 'lucide-react';

interface Service {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
  gradient: string;
  features: string[];
}

const SERVICES: Service[] = [
  {
    icon: Monitor,
    title: 'Frontend Development',
    desc: 'Pixel-perfect, responsive UIs built with React.js, Next.js, and TypeScript. From design systems to complex SPAs.',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    features: ['React.js / Next.js', 'TypeScript', 'Tailwind CSS', 'Redux State Management'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Scalable, secure server-side applications with Node.js, Express.js, and robust database architecture.',
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    features: ['Node.js / Express.js', 'REST APIs', 'Authentication & JWT', 'Microservices'],
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    desc: 'End-to-end web application development from database design to UI implementation with the MERN stack.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    features: ['MERN Stack', 'TypeScript', 'PostgreSQL / MongoDB', 'Cloud Deployment'],
  },
  {
    icon: Globe,
    title: 'API Development',
    desc: 'RESTful and GraphQL APIs designed for performance, security, and developer experience.',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    features: ['REST API Design', 'GraphQL', 'API Documentation', 'Rate Limiting / Security'],
  },
  {
    icon: BarChart3,
    title: 'Dashboard Development',
    desc: 'Interactive data dashboards and analytics platforms with real-time charts and reporting capabilities.',
    gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
    features: ['Data Visualization', 'Real-time Charts', 'Report Generation', 'KPI Dashboards'],
  },
  {
    icon: Building2,
    title: 'Enterprise Applications',
    desc: 'Complex business applications including CRM systems, workflow platforms, and multi-tenant SaaS products.',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    features: ['CRM Systems', 'Workflow Management', 'Multi-tenant Architecture', 'Role-based Access'],
  },
  {
    icon: Rocket,
    title: 'SaaS Product Development',
    desc: 'Full-cycle SaaS development with subscription management, multi-tenancy, and cloud-native architecture.',
    gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    features: ['SaaS Architecture', 'Subscription Management', 'AWS Deployment', 'Scalable Infrastructure'],
  },
];

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Services({ onSectionVisible }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });

  useEffect(() => {
    if (inView) onSectionVisible('services');
  }, [inView, onSectionVisible]);

  return (
    <section ref={ref} id="services" className="py-16 sm:py-28 relative overflow-hidden" style={{ background: '#070710' }}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">What I Offer</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Services</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Specialized development services to help your business build, scale, and succeed.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, gradient, features }, i) => (
            <motion.div
              key={title}
              className="service-card glass rounded-2xl p-4 sm:p-6 group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Icon */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ background: gradient }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Icon size={22} />
              </motion.div>

              <h3 className="text-sm font-bold text-white mb-2 leading-tight">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{desc}</p>

              {/* Feature list */}
              <ul className="space-y-1.5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: gradient }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom gradient line on hover */}
              <div
                className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
