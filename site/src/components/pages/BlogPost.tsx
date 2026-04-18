import posts from '../../data/posts.json';
import { useSystem } from '../../contexts/SystemContext';
import { ScrambleText } from '../ScrambleText';
import type { Post } from '../../types/post';
import { useMeta } from '../../hooks/useMeta';

export function BlogPost() {
  const { blogSlug, setBlogSlug } = useSystem();
  const post = (posts as Post[]).find(p => p.slug === blogSlug);

  useMeta({
    title: post ? `${post.title} — Abhiram Chandrasekhar` : 'Post Not Found',
    description: post?.meta.description ?? '',
    keywords: post?.meta.keywords.join(', '),
  });

  if (!post) return <pre>{'> post not found.'}</pre>;

  return (
    <pre>
      <ScrambleText text={post.title.toUpperCase()} className="accent" />
      {`\n  ${post.date}\n\n`}
      {post.body}
      {'\n\n'}
      <span
        data-nav="true"
        style={{ cursor: 'pointer' }}
        onClick={() => setBlogSlug(null)}
      >
        {'< back to stream'}
      </span>
      <span className="cursor cursor--active">_</span>
    </pre>
  );
}
