import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET semua kategori beserta jumlah buku
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { books: true },
  });
  return Response.json(categories);
}
