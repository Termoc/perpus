import { PrismaClient } from "@prisma/client";

// Create a global variable to preserve the PrismaClient across module reloads in development
// This prevents exhausting database connections when Next.js hot-reloads modules.
const globalForPrisma = globalThis;

const prisma = globalForPrisma.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.__prisma = prisma;

export default prisma;
