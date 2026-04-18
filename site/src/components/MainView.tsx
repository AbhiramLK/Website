// src/components/MainView.tsx
import { ReactiveGrid } from './ReactiveGrid';

export function MainView() {
  return (
    <>
      <ReactiveGrid />
      <pre style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
        SYSTEM READY_
      </pre>
    </>
  );
}
