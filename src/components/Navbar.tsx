import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

interface Props {
  activeSection: string;
}

export default function Navbar({ activeSection }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9000]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'mx-4 mt-3 rounded-2xl border border-white/[0.08]'
              : 'mx-0 mt-0 rounded-none border-transparent'
          }`}
          style={{
            background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo('home')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
              >
                AK
              </div>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', filter: 'blur(8px)' }}
              />
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                    style={{ color: isActive ? '#a78bfa' : '#94a3b8' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(124, 58, 237, 0.12)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 hover:text-slate-200 transition-colors">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-2xl p-4 border border-white/[0.08]"
              style={{ background: 'rgba(8, 8, 14, 0.95)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: activeSection === id ? '#a78bfa' : '#94a3b8',
                    background: activeSection === id ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ background: 'rgba(124, 58, 237, 0.08)', color: '#e2e8f0' }}
                >
                  {label}
                </motion.button>
              ))}
              <div className="mt-2 pt-2 border-t border-white/[0.06]">
                <motion.button
                  onClick={() => scrollTo('contact')}
                  className="w-full py-3 text-sm font-semibold text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
