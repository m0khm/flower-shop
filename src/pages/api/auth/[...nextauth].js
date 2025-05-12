import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prisma from '@/lib/prisma';

export default NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error('No user');
        const ok = await compare(credentials.password, user.password);
        if (!ok) throw new Error('Bad pass');
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
});
