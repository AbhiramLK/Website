import { ScrambleText } from '../ScrambleText';

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
  return (
    <pre>
      <ScrambleText text="USER_PROFILE_DATA" className="accent" />
      {'\n'}
      {BODY}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
