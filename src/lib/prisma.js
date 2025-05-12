import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // в режиме dev сохраняем единый экземпляр в глобале, чтобы при “хот-релоаде” не плодить соединения
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma   // именно default-экспорт!
