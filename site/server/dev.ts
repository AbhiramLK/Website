import express from 'express';
import authHandler from '../api/auth';
import postsHandler from '../api/posts';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.post('/api/auth', authHandler);
app.all('/api/posts', postsHandler);
app.listen(3001, () => console.log('API dev server on :3001'));
