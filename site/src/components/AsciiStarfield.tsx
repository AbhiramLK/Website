import { useEffect, useRef } from 'react';

const CHARS = ['·', '+', '*', '✦', '•'];
const COUNT = 120;

interface Star {
  x: number; y: number;
  speed: number; char: string; alpha: number;
  size: number;
}

export function AsciiStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.5,
        char: CHARS[Math.floor(Math.random() * CHARS.length)]!,
        alpha: 0.1 + Math.random() * 0.6,
        size: 10 + Math.random() * 6,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (const s of starsRef.current) {
        s.y += s.speed;
        if (s.y > canvas.height + 20) s.y = -20;

        ctx.font = `${s.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(102,252,241,${s.alpha.toFixed(2)})`;
        ctx.fillText(s.char, s.x, s.y);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
