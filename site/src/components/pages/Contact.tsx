import { ScrambleText } from '../ScrambleText';
import { useMeta } from '../../hooks/useMeta';

const BODY = `[CHANNELS]
  Email     abhiram@lykoslabs.xyz
  X         @lykoslabs
  GitHub    github.com/lykoslabs

[AVAILABILITY]
  Open to:  protocol audits
            advisory roles
            research collaboration

  Not open to: unsolicited pitches
               non-technical outreach

[RESPONSE TIME]
  Async. Usually within 48h.

> link established.`;

export function Contact() {
  useMeta({ title: 'Contact — Abhiram Chandrasekhar', description: 'Open for protocol audits, advisory roles, and research collaboration.' });
  return (
    <pre>
      <ScrambleText text="COMMUNICATION_LINK_ESTABLISHED" className="accent" />
      {'\n\n'}
      {BODY}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
