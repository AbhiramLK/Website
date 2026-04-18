import { useSystem } from '../contexts/SystemContext';
import type { Page } from '../contexts/SystemContext';

const ITEMS: { key: string; page: Page; label: string }[] = [
  { key: 'H', page: 'home',     label: '[ H ]' },
  { key: 'A', page: 'about',    label: '[ A ]' },
  { key: 'P', page: 'projects', label: '[ P ]' },
  { key: 'B', page: 'blog',     label: '[ B ]' },
  { key: 'C', page: 'contact',  label: '[ C ]' },
];

export function Nav() {
  const { activePage, setActivePage } = useSystem();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
      padding: '0.75rem 2rem',
      display: 'flex', gap: '1rem', alignItems: 'center',
      background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 80%, transparent)',
      fontFamily: 'var(--font)',
      fontSize: 'clamp(8px, 0.8vw, 12px)',
    }}>
      {ITEMS.map(item => (
        <span
          key={item.page}
          data-nav="true"
          data-active={activePage === item.page ? 'true' : 'false'}
          onClick={() => setActivePage(item.page)}
          style={{ cursor: 'pointer' }}
        >
          {item.label}
        </span>
      ))}
      <span style={{ marginLeft: 'auto', color: 'var(--dim)', fontSize: '0.9em' }}>
        v1.0.0
      </span>
    </nav>
  );
}
