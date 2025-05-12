// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // В продакшне всегда создаём новый клиент
  prisma = new PrismaClient();
} else {
  // В режиме разработки сохраняем клиент в глобальном объекте,
  // чтобы при хот-релоаде не создавать нового подключения каждый раз
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
