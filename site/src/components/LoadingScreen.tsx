import { useState, useRef, useCallback } from 'react';
import { Typewriter } from './Typewriter';

const LINES = [
  'INITIALIZING SYSTEM...',
  '> loading identity block........',
  '> loading project index........',
  '> establishing secure session.',
  '> done.',
];

interface Props { onComplete: () => void; }

export function LoadingScreen({ onComplete }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLineComplete = useCallback(() => {
    const current = LINES[lineIndex]!;
    if (lineIndex < LINES.length - 1) {
      setDone(prev => [...prev, current]);
      setLineIndex(i => i + 1);
    } else {
      setDone(prev => [...prev, current]);
      timerRef.current = setTimeout(onComplete, 400);
    }
  }, [lineIndex, onComplete]);

  return (
    <pre style={{ padding: '2rem' }}>
      {done.join('\n')}
      {done.length > 0 && '\n'}
      {lineIndex < LINES.length && (
        <Typewriter
          key={lineIndex}
          text={LINES[lineIndex]!}
          speed={18}
          onComplete={handleLineComplete}
        />
      )}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
