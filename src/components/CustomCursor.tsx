import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const animate = () => {
      dotX = lerp(dotX, pos.x, 0.8);
      dotY = lerp(dotY, pos.y, 0.8);
      setDotPos({ x: dotX, y: dotY });
      animId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!(el.closest('a, button, [data-hover], input, textarea, select, label')));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border border-violet-400/60"
        animate={{
          x: pos.x - (hovered ? 20 : 14),
          y: pos.y - (hovered ? 20 : 14),
          width: hovered ? 40 : 28,
          height: hovered ? 40 : 28,
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.8 : 1,
          borderColor: hovered ? 'rgba(167, 139, 250, 0.9)' : 'rgba(167, 139, 250, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-1.5 h-1.5 rounded-full bg-violet-400"
        animate={{
          x: dotPos.x - 3,
          y: dotPos.y - 3,
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.5 : hovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
      {/* Glow on click */}
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
          style={{
            x: pos.x - 20,
            y: pos.y - 20,
            width: 40,
            height: 40,
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  );
}
