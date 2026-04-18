import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

export type Page = 'home' | 'about' | 'projects' | 'blog' | 'contact' | 'admin';

interface Ctx {
  activePage: Page;
  setActivePage: (p: Page) => void;
  isIdle: boolean;
  setIdle: (v: boolean) => void;
  rendered: Partial<Record<Page, boolean>>;
  markRendered: (p: Page) => void;
  blogSlug: string | null;
  setBlogSlug: (s: string | null) => void;
  adminToken: string | null;
  setAdminToken: (t: string | null) => void;
}

const SystemContext = createContext<Ctx | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isIdle, setIdle] = useState(false);
  const [rendered, setRendered] = useState<Partial<Record<Page, boolean>>>({});
  const [blogSlug, setBlogSlug] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(
    () => sessionStorage.getItem('admin_token')
  );
  const setAdminTokenPersist = (t: string | null) => {
    if (t) sessionStorage.setItem('admin_token', t);
    else sessionStorage.removeItem('admin_token');
    setAdminToken(t);
  };

  const markRendered = useCallback((p: Page) => {
    setRendered(prev => ({ ...prev, [p]: true }));
  }, []);

  const value = useMemo(
    () => ({ activePage, setActivePage, isIdle, setIdle, rendered, markRendered, blogSlug, setBlogSlug, adminToken, setAdminToken: setAdminTokenPersist }),
    [activePage, isIdle, rendered, markRendered, blogSlug, adminToken]
  );

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error('useSystem outside SystemProvider');
  return ctx;
}
