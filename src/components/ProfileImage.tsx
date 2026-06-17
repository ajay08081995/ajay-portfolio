import { useRef, useCallback, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import profileNoBg from '../assets/images/ajay_nobg.png';

/* ─── design constants (all scaled proportionally) ─── */
const BASE_W = 420;
const BASE_H = 520;

/* ─── sparkle ─── */
function Sparkle({ x, y, delay, color = '#a78bfa' }: { x: string; y: string; delay: number; color?: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{ left: x, top: y, width: 5, height: 5, background: color, boxShadow: `0 0 6px ${color}` }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], y: [0, -28, -55] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

/* ─── orbit ring ─── */
function OrbitRing({ size, color, duration, delay = 0, reverse = false, dotSize = 7 }: {
  size: number; color: string; duration: number; delay?: number; reverse?: boolean; dotSize?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: '50%', top: '50%',
        marginLeft: -size / 2, marginTop: -size / 2,
        border: `1px solid ${color}`, opacity: 0.35,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        style={{
          position: 'absolute', width: dotSize, height: dotSize, borderRadius: '50%',
          background: color, boxShadow: `0 0 ${dotSize * 2}px ${color}, 0 0 ${dotSize * 4}px ${color}40`,
          top: -dotSize / 2, left: '50%', marginLeft: -dotSize / 2,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </motion.div>
  );
}

/* ─── floating badge ─── */
function FloatingBadge({ children, x, y, delay, rotateZ = 0 }: {
  children: React.ReactNode; x: number; y: number; delay: number; rotateZ?: number;
}) {
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: rotateZ - 15 }}
      animate={{ opacity: 1, scale: 1, rotate: rotateZ, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, type: 'spring', stiffness: 200, damping: 16 },
        rotate: { delay, type: 'spring', stiffness: 200, damping: 16 },
        y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ProfileImage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  /* ── compute scale so it fits its parent column ── */
  useEffect(() => {
    const measure = () => {
      const parent = outerRef.current?.parentElement;
      if (!parent) return;
      const available = parent.offsetWidth;
      // leave some horizontal breathing room
      const target = Math.min(BASE_W, available * 0.88);
      setScale(target / BASE_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current?.parentElement) ro.observe(outerRef.current.parentElement);
    return () => ro.disconnect();
  }, []);

  /* ── 3-D tilt ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { stiffness: 280, damping: 28 });
  const highlightX = useTransform(mouseX, [-0.5, 0.5], ['72%', '28%']);
  const highlightY = useTransform(mouseY, [-0.5, 0.5], ['72%', '28%']);
  const shadowX    = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const shadowY    = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }, [mouseX, mouseY]);

  const onLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  return (
    /* outer: responsive size driven by scale */
    <div
      ref={outerRef}
      style={{ width: BASE_W * scale, height: BASE_H * scale, position: 'relative' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* inner: fixed BASE_W × BASE_H, scaled to fit */}
      <div
        style={{
          width: BASE_W, height: BASE_H,
          position: 'absolute', top: 0, left: 0,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        {/* ── glow pools ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{
            width: 340, height: 340,
            left: '50%', top: '50%', marginLeft: -170, marginTop: -170,
            background: 'radial-gradient(circle, #7c3aed88 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{
            width: 260, height: 260,
            left: '50%', top: '50%', marginLeft: -130, marginTop: -130,
            background: 'radial-gradient(circle, #3b82f666, transparent)',
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />

        {/* ── orbit rings ── */}
        <OrbitRing size={370} color="#a78bfa" duration={16} delay={0} />
        <OrbitRing size={420} color="#60a5fa" duration={24} delay={1.5} reverse dotSize={5} />
        <OrbitRing size={310} color="#34d399" duration={11} delay={0.8} dotSize={5} />

        {/* ── sparkles ── */}
        {[
          { x: '8%', y: '18%', d: 0.0, c: '#a78bfa' }, { x: '88%', y: '12%', d: 0.7, c: '#60a5fa' },
          { x: '92%', y: '55%', d: 1.3, c: '#a78bfa' }, { x: '80%', y: '82%', d: 0.4, c: '#34d399' },
          { x: '4%',  y: '72%', d: 1.8, c: '#60a5fa' }, { x: '48%', y: '3%',  d: 1.0, c: '#34d399' },
          { x: '18%', y: '90%', d: 2.1, c: '#a78bfa' }, { x: '65%', y: '6%',  d: 0.3, c: '#60a5fa' },
          { x: '3%',  y: '44%', d: 1.6, c: '#34d399' }, { x: '85%', y: '30%', d: 2.4, c: '#a78bfa' },
        ].map((s, i) => <Sparkle key={i} x={s.x} y={s.y} delay={s.d} color={s.c} />)}

        {/* ── 3-D card ── */}
        <motion.div
          style={{
            position: 'absolute', left: '50%', top: '50%',
            marginLeft: -135, marginTop: -185,
            perspective: 1100, rotateX: rotX, rotateY: rotY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.82, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: [0, -18, 0] }}
          transition={{
            opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            scale:   { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
          }}
        >
          <div
            style={{
              width: 270, height: 370, borderRadius: 28,
              overflow: 'hidden', position: 'relative', background: 'transparent',
              boxShadow: '0 25px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* specular highlight */}
            <motion.div
              style={{
                position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none', borderRadius: 28,
                background: `radial-gradient(circle at ${highlightX} ${highlightY}, rgba(255,255,255,0.12) 0%, transparent 55%)`,
              }}
            />
            {/* edge glow */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 19, pointerEvents: 'none', borderRadius: 28,
                background: 'linear-gradient(135deg,rgba(167,139,250,.15) 0%,transparent 50%,rgba(96,165,250,.1) 100%)',
              }}
            />
            {/* photo */}
            <motion.img
              src={profileNoBg}
              alt="Ajay Kumavat"
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                objectPosition: '50% 10%', display: 'block',
                position: 'relative', zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          {/* dynamic floor shadow */}
          <motion.div
            style={{
              position: 'absolute', bottom: -20, left: '50%',
              width: 200, height: 36,
              translateX: '-50%', translateZ: -60,
              x: shadowX, y: shadowY,
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, transparent 70%)',
              filter: 'blur(14px)', pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* ── Experience badge ── */}
        <FloatingBadge x={270} y={370} delay={0.9} rotateZ={3}>
          <div
            className="px-4 py-2.5 rounded-2xl border border-white/[0.08] shadow-2xl"
            style={{ background: 'rgba(8,8,14,0.9)', backdropFilter: 'blur(18px)' }}
          >
            <div
              className="text-2xl font-bold leading-none"
              style={{
                background: 'linear-gradient(135deg,#a78bfa,#60a5fa)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              4.5+
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Years of<br />Experience</div>
          </div>
        </FloatingBadge>

        {/* ── Available badge ── */}
        <FloatingBadge x={18} y={80} delay={1.1} rotateZ={-4}>
          <div
            className="px-3 py-2 rounded-xl border border-white/[0.08] shadow-xl"
            style={{ background: 'rgba(8,8,14,0.9)', backdropFilter: 'blur(18px)' }}
          >
            <div className="text-[9px] text-slate-400 mb-1 font-medium">Status</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              <span className="text-[11px] text-green-400 font-semibold whitespace-nowrap">Open to work</span>
            </div>
          </div>
        </FloatingBadge>

        {/* ── MERN stack badge ── */}
        <FloatingBadge x={286} y={60} delay={1.3} rotateZ={5}>
          <div
            className="px-3 py-2 rounded-xl border border-white/[0.06] shadow-lg"
            style={{ background: 'rgba(8,8,14,0.9)', backdropFilter: 'blur(18px)' }}
          >
            <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-wide">Stack</div>
            <div className="flex gap-1">
              {['⚛️', '🟢', '🗄️', '☁️'].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
            </div>
          </div>
        </FloatingBadge>
      </div>
    </div>
  );
}
