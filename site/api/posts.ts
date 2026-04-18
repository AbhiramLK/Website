import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import type { Post } from '../src/types/post';

const POSTS_PATH = path.join(process.cwd(), 'src/data/posts.json');

function readPosts(): Post[] {
  return JSON.parse(fs.readFileSync(POSTS_PATH, 'utf-8')) as Post[];
}

function writePosts(posts: Post[]) {
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));
}

function authGuard(req: Request): boolean {
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    const token = (req.headers.authorization ?? '').replace('Bearer ', '');
    jwt.verify(token, secret);
    return true;
  } catch { return false; }
}

export default function handler(req: Request, res: Response) {
  if (req.method === 'GET') {
    return res.json(readPosts());
  }

  if (!authGuard(req)) return res.status(401).json({ error: 'unauthorized' });

  if (req.method === 'POST') {
    const posts = readPosts();
    const post = req.body as Post;
    if (!post.id || !post.slug) return res.status(400).json({ error: 'id and slug required' });
    posts.push(post);
    writePosts(posts);
    return res.status(201).json(post);
  }

  if (req.method === 'PUT') {
    const posts = readPosts();
    const updated = req.body as Post;
    const idx = posts.findIndex(p => p.id === updated.id);
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    posts[idx] = updated;
    writePosts(posts);
    return res.json(updated);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query as { id: string };
    const posts = readPosts().filter(p => p.id !== id);
    writePosts(posts);
    return res.status(204).end();
  }

  res.status(405).end();
}
