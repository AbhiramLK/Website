import { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 20, onComplete }: Props) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');

    const tick = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(tick);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => clearInterval(tick);
  }, [text, speed]);

  return <>{displayed}</>;
}
