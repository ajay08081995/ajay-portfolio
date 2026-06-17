import { useState, useEffect } from 'react';

const TEXTS = [
  'React Developer',
  'MERN Stack Developer',
  'Full Stack Engineer',
  'Next.js Developer',
  'Node.js Developer',
];

export default function TypeWriter() {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const current = TEXTS[idx];
    const speed = deleting ? 45 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setPaused(true);
          setTimeout(() => {
            setPaused(false);
            setDeleting(true);
          }, 2200);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setIdx((prev) => (prev + 1) % TEXTS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, idx, deleting, paused]);

  return (
    <span
      className="font-semibold"
      style={{
        background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
      <span
        className="ml-0.5 inline-block w-0.5 h-[1em] align-middle animate-pulse"
        style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', verticalAlign: 'middle' }}
      />
    </span>
  );
}
