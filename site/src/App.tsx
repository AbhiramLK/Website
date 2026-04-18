import { useState, useEffect, useCallback } from 'react';
import { SystemProvider } from './contexts/SystemContext';
import { AsciiStarfield } from './components/AsciiStarfield';
import { LoadingScreen } from './components/LoadingScreen';
import { MainView } from './components/MainView';

type Stage = 'starfield' | 'starfield-out' | 'loading' | 'loading-out' | 'ready';

export default function App() {
  const [stage, setStage] = useState<Stage>('starfield');
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    if (stage === 'starfield') {
      const t = setTimeout(() => setStage('starfield-out'), 1800);
      return () => clearTimeout(t);
    }
    if (stage === 'starfield-out') {
      const t = setTimeout(() => setStage('loading'), 300);
      return () => clearTimeout(t);
    }
    if (stage === 'loading-out') {
      const t = setTimeout(() => setStage('ready'), 300);
      return () => clearTimeout(t);
    }
    if (stage === 'ready') {
      const id = requestAnimationFrame(() => setAppVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [stage]);

  const handleLoadingDone = useCallback(() => setStage('loading-out'), []);

  return (
    <SystemProvider>
      {(stage === 'starfield' || stage === 'starfield-out') && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'var(--bg)',
          opacity: stage === 'starfield-out' ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}>
          <AsciiStarfield />
        </div>
      )}

      {(stage === 'loading' || stage === 'loading-out') && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90, background: 'var(--bg)',
          opacity: stage === 'loading-out' ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}>
          <LoadingScreen onComplete={handleLoadingDone} />
        </div>
      )}

      {stage === 'ready' && (
        <div className={`app-root ${appVisible ? 'ready' : ''}`}>
          <MainView />
        </div>
      )}
    </SystemProvider>
  );
}
