import { useState, useRef, useCallback } from 'react';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*!?/\|[]{}';
const STEPS = 8;
const STEP_MS = 40;

interface Props {
  text: string;
  className?: string;
  tag?: 'span' | 'pre';
}

export function ScrambleText({ text, className, tag: Tag = 'span' }: Props) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    let step = 0;
    const run = () => {
      if (step >= STEPS) { setDisplay(text); return; }
      setDisplay(
        text.split('').map((ch, i) =>
          i < Math.floor((step / STEPS) * text.length)
            ? ch
            : ch === ' ' ? ' ' : POOL[Math.floor(Math.random() * POOL.length)]!
        ).join('')
      );
      step++;
      rafRef.current = setTimeout(run, STEP_MS);
    };
    run();
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    setDisplay(text);
  }, [text]);

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ display: 'inline' }}
    >
      {display}
    </Tag>
  );
}
