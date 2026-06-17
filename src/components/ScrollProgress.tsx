import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const scrollY = useMotionValue(0);
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const scaleX = useTransform(scrollYSpring, [0, 100], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      scrollY.set(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollY]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)',
        scaleX,
        transformOrigin: 'left',
      }}
    />
  );
}
