import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  const { email, password } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'User exists' });
  await prisma.user.create({
    data: { email, password: await hash(password, 10), role: 'user' },
  });
  res.status(201).json({ ok: true });
}
