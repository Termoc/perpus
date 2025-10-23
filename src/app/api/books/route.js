import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../_utils/auth";

const prisma = new PrismaClient();

// === GET ALL ===
export async function GET() {
  const books = await prisma.book.findMany();
  return Response.json(books);
}

// === CREATE ===
export async function POST(req) {
  try {
    const user = await verifyToken(req);
    const { title, author, year, cover, category } = await req.json();

    const newBook = await prisma.book.create({
      data: { title, author, year, cover, category },
    });

    return Response.json(
      { message: "Buku ditambahkan", newBook },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}
