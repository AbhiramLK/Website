import fs from 'fs';
import posts from '../src/data/posts.json' assert { type: 'json' };
import type { Post } from '../src/types/post';

const BASE = 'https://abhiram.xyz';
const PAGES = ['', '/about', '/projects', '/blog', '/contact'];

const urls = [
  ...PAGES.map(p => `<url><loc>${BASE}${p}</loc><changefreq>monthly</changefreq></url>`),
  ...(posts as Post[]).map(p =>
    `<url><loc>${BASE}/blog/${p.slug}</loc><changefreq>never</changefreq><lastmod>${p.date}</lastmod></url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml generated');
