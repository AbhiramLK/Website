import { useEffect } from 'react';
import { useSystem } from '../contexts/SystemContext';
import type { Page } from '../contexts/SystemContext';

const MAP: Record<string, Page> = {
  h: 'home', a: 'about', p: 'projects', b: 'blog', c: 'contact',
};

export function useKeyboardNav() {
  const { setActivePage } = useSystem();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const page = MAP[e.key.toLowerCase()];
      if (page) { e.preventDefault(); setActivePage(page); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setActivePage]);
}
