import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'ajay.kumavat0815@gmail.com', href: 'mailto:ajay.kumavat0815@gmail.com', color: '#a78bfa' },
  { icon: Phone, label: 'Phone', value: '+91-8380988087', href: 'tel:+918380988087', color: '#60a5fa' },
  { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India', href: '#', color: '#34d399' },
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ajay08081995', color: '#f8fafc' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajay-kumavat-039671207/', color: '#0ea5e9' },
  { icon: Mail, label: 'Email', href: 'mailto:ajay.kumavat0815@gmail.com', color: '#a78bfa' },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Please enter a valid email address';
  if (!data.subject.trim() || data.subject.length < 3) errors.subject = 'Subject must be at least 3 characters';
  if (!data.message.trim() || data.message.length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

interface Props {
  onSectionVisible: (section: string) => void;
}

export default function Contact({ onSectionVisible }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (inView) onSectionVisible('contact');
  }, [inView, onSectionVisible]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setStatus('loading');
    // Simulate form submission (replace with actual API call)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section ref={ref} id="contact" className="py-28 relative overflow-hidden" style={{ background: '#050508' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05] blur-[120px] rounded-full"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Let's{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Connect</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            I'm open to full-time roles, freelance projects, and exciting collaborations. Let's build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to collaborate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you're looking for a dedicated developer to join your team or need help building your next product,
                I'm here to make it happen. Response within 24 hours.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 glass rounded-2xl group hover:scale-[1.02] transition-transform duration-200"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{label}</div>
                    <div className="text-sm text-slate-200 group-hover:text-white transition-colors">{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-3">Find me on</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 border border-white/[0.06] hover:border-white/20 transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    whileHover={{ scale: 1.1, color, borderColor: `${color}40`, background: `${color}10` }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/20"
              style={{ background: 'rgba(52,211,153,0.05)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Available for new opportunities</span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl p-6 sm:p-8 space-y-5"
              noValidate
            >
              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-xl border border-green-500/20"
                  style={{ background: 'rgba(52,211,153,0.08)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={18} className="text-green-400 shrink-0" />
                  <p className="text-sm text-green-400">Message sent! I'll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {/* Grid row for name + email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="John Doe"
                    className="w-full form-input px-4 py-3 rounded-xl text-sm placeholder-slate-600"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="john@company.com"
                    className="w-full form-input px-4 py-3 rounded-xl text-sm placeholder-slate-600"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Project inquiry / Full-time opportunity / Collaboration"
                  className="w-full form-input px-4 py-3 rounded-xl text-sm placeholder-slate-600"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className="w-full form-input px-4 py-3 rounded-xl text-sm placeholder-slate-600 resize-none"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                whileHover={{ scale: status !== 'loading' ? 1.02 : 1, boxShadow: '0 8px 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
