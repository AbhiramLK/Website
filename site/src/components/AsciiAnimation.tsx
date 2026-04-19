import { useEffect, useRef, useState } from 'react';

interface Props {
  frames: string[][];  // pre-imported JSON frames
  fps?: number;        // frames per second (default 15)
  className?: string;
}

export function AsciiAnimation({ frames, fps = 15, className }: Props) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (frames.length === 0) return;
    const delay = Math.round(1000 / fps);
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % frames.length);
    }, delay);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [frames, fps]);

  if (frames.length === 0) return null;

  return (
    <pre className={className} style={{ margin: 0 }}>
      {frames[index].join('\n')}
    </pre>
  );
}
