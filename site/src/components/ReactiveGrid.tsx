import { useEffect, useRef, useCallback } from 'react';

const CHARS = ['.', '+', '*', '@', '#'];
const CELL = 28;
const BASE_ALPHA = 0.06;
const PEAK_ALPHA = 0.55;
const RADIUS = 180;

interface Cell { x: number; y: number; char: string; }

export function ReactiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dirtyRef = useRef(true);
  const rafRef = useRef(0);

  const build = useCallback((w: number, h: number) => {
    const cols = Math.ceil(w / CELL) + 1;
    const rows = Math.ceil(h / CELL) + 1;
    cellsRef.current = Array.from({ length: rows * cols }, (_, i) => ({
      x: (i % cols) * CELL,
      y: Math.floor(i / cols) * CELL,
      char: CHARS[(i + Math.floor(i / cols) * 3) % CHARS.length]!,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(innerWidth, innerHeight);
      dirtyRef.current = true;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dirtyRef.current = true;
    });
    window.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -9999, y: -9999 };
      dirtyRef.current = true;
    });

    const render = () => {
      if (dirtyRef.current) {
        dirtyRef.current = false;
        const { x: mx, y: my } = mouseRef.current;
        const r2 = RADIUS * RADIUS;

        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.font = `10px "JetBrains Mono", monospace`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        for (const c of cellsRef.current) {
          const dx = c.x - mx, dy = c.y - my;
          const d2 = dx * dx + dy * dy;
          let alpha = BASE_ALPHA;
          if (d2 < r2) {
            const t = 1 - Math.sqrt(d2) / RADIUS;
            alpha = BASE_ALPHA + t * t * (3 - 2 * t) * (PEAK_ALPHA - BASE_ALPHA);
          }
          ctx.fillStyle = `rgba(200,200,200,${alpha.toFixed(3)})`;
          ctx.fillText(c.char, c.x, c.y);
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [build]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
