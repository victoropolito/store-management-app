import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/', (_req, res) => {
  res.send('Store Management API running 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
