import { ScrambleText } from '../ScrambleText';
import { useMeta } from '../../hooks/useMeta';

const BODY = `[OPERATOR]
  Abhiram Chandrasekhar
  CEO | Developer | Advisor

[BACKGROUND]
  - Mechanical engineering foundation
  - Shifted focus to distributed systems + protocol design
  - Building at the intersection of security and infrastructure

[DOMAIN]
  - Web3 security research
  - Transaction simulation engines
  - Protocol architecture + on-chain risk systems

[AFFILIATIONS]
  - LyKos Labs  —  founder
  - g0 Protocol  —  core contributor
  - Carbon Crowd  —  technical advisor

> profile loaded.`;

export function About() {
  useMeta({ title: 'About — Abhiram Chandrasekhar', description: 'Background in mechanical engineering, now building at the intersection of security and distributed systems.' });
  return (
    <pre>
      <ScrambleText text="USER_PROFILE_DATA" className="accent" />
      {'\n'}
      {BODY}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
