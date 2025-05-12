// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error('Пользователь не найден');
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error('Неверный пароль');
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
});
