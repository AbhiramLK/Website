import { useEffect } from 'react';

interface Meta {
  title: string;
  description: string;
  keywords?: string;
}

export function useMeta({ title, description, keywords }: Meta) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setOg('title', title);
    setOg('description', description);
  }, [title, description, keywords]);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}

function setOg(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="og:${property}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', `og:${property}`); document.head.appendChild(el); }
  el.content = content;
}
