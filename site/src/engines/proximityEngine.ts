const DIM   = { r: 74,  g: 74,  b: 74  };
const ACCENT = { r: 102, g: 252, b: 241 };
const MAX_RADIUS = 200;
const LERP = 0.12;

export function initProximityEngine() {
  if (typeof window === 'undefined') return () => {};

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return () => {};

  let cx = -1000, cy = -1000;
  let raf: number;

  const cached = new WeakMap<HTMLElement, { factor: number }>();

  const getElements = () =>
    Array.from(document.querySelectorAll<HTMLElement>('[data-nav]')).slice(0, 20);

  const onMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
  window.addEventListener('mousemove', onMove);

  const tick = () => {
    for (const el of getElements()) {
      if (el.dataset.active === 'true') {
        el.style.color = '';
        el.style.opacity = '';
        continue;
      }
      const rect = el.getBoundingClientRect();
      const dx = Math.max(rect.left - cx, 0, cx - rect.right);
      const dy = Math.max(rect.top - cy, 0, cy - rect.bottom);
      const dist = Math.hypot(dx, dy);
      const targetFactor = dist < MAX_RADIUS ? 1 - dist / MAX_RADIUS : 0;

      let c = cached.get(el);
      if (!c) { c = { factor: 0 }; cached.set(el, c); }
      c.factor += (targetFactor - c.factor) * LERP;

      const r = Math.round(DIM.r + (ACCENT.r - DIM.r) * c.factor);
      const g = Math.round(DIM.g + (ACCENT.g - DIM.g) * c.factor);
      const b = Math.round(DIM.b + (ACCENT.b - DIM.b) * c.factor);

      el.style.color = `rgb(${r},${g},${b})`;
      el.style.opacity = (0.4 + 0.6 * c.factor).toFixed(3);
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
}
