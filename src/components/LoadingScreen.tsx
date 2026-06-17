import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(30), 300),
      setTimeout(() => setProgress(60), 700),
      setTimeout(() => setProgress(85), 1200),
      setTimeout(() => setProgress(100), 1700),
      setTimeout(() => setPhase('done'), 1900),
      setTimeout(() => onComplete(), 2400),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ background: '#050508' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
            />
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10 mb-12"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              AK
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', filter: 'blur(20px)', opacity: 0.5 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            className="relative z-10 mb-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-white tracking-wide">Ajay Kumavat</h1>
            <p className="text-sm text-slate-400 mt-1 tracking-widest uppercase">Senior MERN Stack Developer</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative z-10 mt-10 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-500">Loading</span>
              <span className="text-xs text-slate-400">{progress}%</span>
            </div>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            className="relative z-10 mt-6 flex gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-violet-400"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
