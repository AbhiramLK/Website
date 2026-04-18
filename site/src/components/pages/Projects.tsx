import { ScrambleText } from '../ScrambleText';
import { useMeta } from '../../hooks/useMeta';

const BODY = `[LYKOS SAFE]
  Multi-sig transaction simulation layer
  Pre-execution validation for EVM-based wallets
  Status: active

[g0 PROTOCOL]
  Decentralized gas optimization protocol
  On-chain fee abstraction + routing logic
  Status: active

[CARBON CROWD]
  Tokenized carbon credit infrastructure
  Smart contract + oracle integration
  Status: advisory

[INTERNAL TOOLING]
  Custom static analysis tools for Solidity
  Bytecode diff engine for upgrade detection
  Status: internal / unreleased

> index complete.`;

export function Projects() {
  useMeta({ title: 'Projects — Abhiram Chandrasekhar', description: 'LyKos Safe, g0 Protocol, Carbon Crowd and internal tooling.' });
  return (
    <pre>
      <ScrambleText text="PROJECT_DB_ACCESS" className="accent" />
      {'\n\n'}
      {BODY}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
