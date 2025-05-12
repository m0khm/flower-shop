import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ message: 'Пользователь уже существует' });
  }
  await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
      role: 'user',
    },
  });
  return res.status(201).json({ ok: true });
}
