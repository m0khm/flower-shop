import { PrismaClient } from '@prisma/client';
const globalForPrisma = global;
export default globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient());
