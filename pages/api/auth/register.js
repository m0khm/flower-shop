import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, password } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Пользователь уже есть' });
  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });
  res.status(201).json({ user });
}
