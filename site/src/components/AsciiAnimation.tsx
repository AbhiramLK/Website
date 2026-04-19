import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;       // URL to the JSON frames file
  fps?: number;      // frames per second (default 12)
  className?: string;
}

export function AsciiAnimation({ src, fps = 12, className }: Props) {
  const [frames, setFrames] = useState<string[][]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then(r => r.json())
      .then((data: string[][]) => {
        if (!cancelled) setFrames(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [src]);

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
