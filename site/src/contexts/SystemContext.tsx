import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type Page = 'home' | 'about' | 'projects' | 'blog' | 'contact';

interface Ctx {
  activePage: Page;
  setActivePage: (p: Page) => void;
  isIdle: boolean;
  setIdle: (v: boolean) => void;
  rendered: Partial<Record<Page, boolean>>;
  markRendered: (p: Page) => void;
}

const SystemContext = createContext<Ctx | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isIdle, setIdle] = useState(false);
  const [rendered, setRendered] = useState<Partial<Record<Page, boolean>>>({});

  const markRendered = useCallback((p: Page) => {
    setRendered(prev => ({ ...prev, [p]: true }));
  }, []);

  return (
    <SystemContext.Provider value={{ activePage, setActivePage, isIdle, setIdle, rendered, markRendered }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error('useSystem outside SystemProvider');
  return ctx;
}
