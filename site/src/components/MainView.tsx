import { useSystem } from '../contexts/SystemContext';
import { Layout } from './Layout';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { initProximityEngine } from '../engines/proximityEngine';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { AsciiAnimation } from './AsciiAnimation';

const ASCII_LEFT = `
 ██████╗
██╔════╝
███████╗
╚════██║
 ██████║
 ╚═════╝
`.trim();

export function MainView() {
  const { activePage, blogSlug, isIdle, setIdle } = useSystem();
  useKeyboardNav();

  useEffect(() => {
    return initProximityEngine();
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => { setIdle(false); clearTimeout(t); t = setTimeout(() => setIdle(true), 5000); };
    window.addEventListener('mousemove', reset);
    window.addEventListener('keydown', reset);
    reset();
    return () => { clearTimeout(t); window.removeEventListener('mousemove', reset); window.removeEventListener('keydown', reset); };
  }, [setIdle]);

  const pages = { home: <Home />, about: <About />, projects: <Projects />, blog: blogSlug ? <BlogPost /> : <Blog />, contact: <Contact />, admin: <Admin /> };

  const leftPanel = activePage === 'home'
    ? <AsciiAnimation src="/ascii-frames.json" fps={15} className={isIdle ? '' : 'accent'} />
    : <pre className={isIdle ? '' : 'accent'}>{ASCII_LEFT}</pre>;

  return (
    <Layout
      left={leftPanel}
      right={pages[activePage]}
    />
  );
}
