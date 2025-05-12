import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, password } = req.body;
  if (await prisma.user.findUnique({ where:{ email } })) {
    return res.status(400).json({ message: 'Пользователь существует' });
  }
  const user = await prisma.user.create({
    data: { name, email, password: await hash(password, 10) },
  });
  res.status(201).json({ id: user.id });
}
