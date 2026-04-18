import { ScrambleText } from '../ScrambleText';
import { Typewriter } from '../Typewriter';
import { useSystem } from '../../contexts/SystemContext';

const CONTENT = [
  '> initializing identity...',
  '',
  'Abhiram Chandrasekhar',
  'CEO | Developer | Advisor',
  '',
  '[FOCUS]',
  '- Web3 Security',
  '- Transaction Simulation',
  '- Protocol Design',
  '',
  '[ACTIVE SYSTEMS]',
  '- LyKos Safe',
  '- g0 Protocol',
  '- Carbon Crowd',
  '',
  '> system ready.',
];

const SCRAMBLE_LINES = new Set([2, 5, 10]);

export function Home() {
  const { rendered, markRendered } = useSystem();
  const isRendered = rendered['home'];

  if (!isRendered) {
    return (
      <pre>
        <Typewriter
          text={CONTENT.join('\n')}
          speed={12}
          onComplete={() => markRendered('home')}
        />
        <span className="cursor cursor--active">_</span>
      </pre>
    );
  }

  return (
    <pre>
      {CONTENT.map((line, i) =>
        SCRAMBLE_LINES.has(i)
          ? <><ScrambleText key={i} text={line} className="accent" />{'\n'}</>
          : <span key={i}>{line}{'\n'}</span>
      )}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
