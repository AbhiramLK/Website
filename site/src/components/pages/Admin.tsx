import { useState, useCallback } from 'react';
import { useSystem } from '../../contexts/SystemContext';
import type { Post } from '../../types/post';

type Mode = 'login' | 'list' | 'edit';

export function Admin() {
  const { adminToken, setAdminToken } = useSystem();
  const [mode, setMode] = useState<Mode>(adminToken ? 'list' : 'login');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post>>({});
  const [error, setError] = useState('');

  const loadPosts = useCallback(async (token: string) => {
    const res = await fetch('/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(await res.json() as Post[]);
  }, []);

  const login = useCallback(async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) { setError('ACCESS DENIED'); return; }
    const { token } = await res.json() as { token: string };
    setAdminToken(token);
    setMode('list');
    loadPosts(token);
  }, [password, setAdminToken, loadPosts]);

  const save = useCallback(async () => {
    if (!adminToken) return;
    const isNew = !editing.id;
    const post: Post = {
      id: editing.id ?? Date.now().toString(),
      slug: editing.slug ?? (editing.title ?? '').toLowerCase().replace(/\s+/g, '-'),
      title: editing.title ?? '',
      date: editing.date ?? new Date().toISOString().slice(0, 10),
      body: editing.body ?? '',
      meta: editing.meta ?? { description: '', keywords: [] },
    };
    await fetch('/api/posts', {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(post),
    });
    setMode('list');
    loadPosts(adminToken);
  }, [adminToken, editing, loadPosts]);

  const deletePost = useCallback(async (id: string) => {
    if (!adminToken) return;
    await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    loadPosts(adminToken);
  }, [adminToken, loadPosts]);

  if (mode === 'login') {
    return (
      <pre>
        {'> ADMIN ACCESS\n\n'}
        {'  PASSWORD: '}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--accent)', color: 'var(--text)', fontFamily: 'var(--font)', outline: 'none', width: '20ch' }}
        />
        {'\n\n'}
        {error && `  ${error}\n`}
        {'  [ENTER] to authenticate'}
      </pre>
    );
  }

  if (mode === 'list') {
    return (
      <pre>
        {'> ADMIN — POST MANAGEMENT\n\n'}
        {posts.map(p => (
          <span key={p.id}>
            {'  '}
            <span data-nav="true" style={{ cursor: 'pointer' }} onClick={() => { setEditing(p); setMode('edit'); }}>{p.title}</span>
            {'  '}
            <span data-nav="true" style={{ cursor: 'pointer', color: 'var(--dim)' }} onClick={() => deletePost(p.id)}>[DELETE]</span>
            {'\n'}
          </span>
        ))}
        {'\n  '}
        <span data-nav="true" style={{ cursor: 'pointer' }} onClick={() => { setEditing({}); setMode('edit'); }}>[+ NEW POST]</span>
        {'\n\n  '}
        <span data-nav="true" style={{ cursor: 'pointer', color: 'var(--dim)' }} onClick={() => { setAdminToken(null); setMode('login'); }}>[LOGOUT]</span>
      </pre>
    );
  }

  const field = (label: string, key: keyof Pick<Post, 'title' | 'slug' | 'date' | 'body'>, multiline = false) => (
    <span>
      {`  ${label}: `}
      {multiline ? (
        <textarea
          value={(editing[key] as string) ?? ''}
          onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
          rows={8}
          style={{ background: 'transparent', border: '1px solid var(--dim)', color: 'var(--text)', fontFamily: 'var(--font)', width: '60ch', verticalAlign: 'top', resize: 'vertical' }}
        />
      ) : (
        <input
          value={(editing[key] as string) ?? ''}
          onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--accent)', color: 'var(--text)', fontFamily: 'var(--font)', outline: 'none', width: '40ch' }}
        />
      )}
      {'\n'}
    </span>
  );

  return (
    <pre>
      {'> EDIT POST\n\n'}
      {field('TITLE', 'title')}
      {field('SLUG', 'slug')}
      {field('DATE', 'date')}
      {field('BODY', 'body', true)}
      {'\n  '}
      <span data-nav="true" style={{ cursor: 'pointer' }} onClick={save}>[SAVE]</span>
      {'  '}
      <span data-nav="true" style={{ cursor: 'pointer', color: 'var(--dim)' }} onClick={() => setMode('list')}>[CANCEL]</span>
    </pre>
  );
}
