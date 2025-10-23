import { PrismaClient } from "@prisma/client";

// Gunakan globalThis agar Prisma tidak diinisialisasi dua kali saat hot reload
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // opsional, bisa dihapus kalau tidak ingin log
  });

// Simpan instance ke globalThis saat development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
