import type { ReactNode } from 'react';
import { ReactiveGrid } from './ReactiveGrid';
import { Nav } from './Nav';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export function Layout({ left, right }: Props) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ReactiveGrid />
      <Nav />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        height: '100vh',
        paddingTop: '3rem',
      }}>
        {/* LEFT — ASCII visual */}
        <div style={{
          flexShrink: 0,
          padding: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          overflowY: 'auto',
        }}>
          {left}
        </div>

        {/* RIGHT — content */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          borderLeft: '1px solid rgba(74,74,74,0.3)',
        }}>
          {right}
        </div>
      </div>
    </div>
  );
}
