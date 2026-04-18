import posts from '../../data/posts.json';
import { useSystem } from '../../contexts/SystemContext';
import { ScrambleText } from '../ScrambleText';
import type { Post } from '../../types/post';
import { useMeta } from '../../hooks/useMeta';

export function Blog() {
  useMeta({ title: 'Blog — Abhiram Chandrasekhar', description: 'Technical writing on EVM security, protocol design, and infrastructure.' });
  const { setBlogSlug, setActivePage } = useSystem();
  const sorted = [...(posts as Post[])].sort((a, b) => b.date.localeCompare(a.date));

  const open = (slug: string) => {
    setBlogSlug(slug);
    setActivePage('blog');
  };

  return (
    <pre>
      <ScrambleText text="CONTENT_STREAM_ACTIVE" className="accent" />
      {'\n\n[LATEST ENTRIES]\n\n'}
      {sorted.map((p, i) => (
        <span key={p.id}>
          {'  '}
          <span
            data-nav="true"
            style={{ cursor: 'pointer' }}
            onClick={() => open(p.slug)}
          >
            {String(i + 1).padStart(3, '0')}  —  {p.title}
          </span>
          {'\n           '}
          {p.meta.description}
          {'\n\n'}
        </span>
      ))}
      {'[STATUS]\n  Irregular cadence.\n  Technical focus.\n  No padding.\n\n> stream loaded.'}
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
