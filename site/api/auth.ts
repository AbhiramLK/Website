import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body as { password: string };
  const hash = process.env.ADMIN_HASH;
  const secret = process.env.JWT_SECRET;

  if (!hash || !secret) return res.status(500).json({ error: 'server misconfigured' });

  const valid = await bcrypt.compare(password, hash);
  if (!valid) return res.status(401).json({ error: 'unauthorized' });

  const token = jwt.sign({ admin: true }, secret, { expiresIn: '8h' });
  res.json({ token });
}
