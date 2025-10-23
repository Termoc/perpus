import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../_utils/auth";

const prisma = new PrismaClient();

// === GET ALL ===
export async function GET() {
  const articles = await prisma.article.findMany();
  return Response.json(articles);
}

// === CREATE ===
export async function POST(req) {
  try {
    const user = verifyToken(req);
    const { title, image, category, content } = await req.json();

    const newArticle = await prisma.article.create({
      data: { title, image, category, content },
    });

    return Response.json(
      { message: "Artikel ditambahkan", newArticle },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}

// === DELETE ===
export async function DELETE(req, { params }) {
  try {
    const user = await verifyToken(req, true);
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (!article) {
      return Response.json(
        { error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.article.delete({ where: { id: parseInt(id) } });
    return Response.json({ message: "Artikel berhasil dihapus." });
  } catch (err) {
    console.error("❌ Error DELETE article:", err.message);
    return Response.json({ error: err.message }, { status: 401 });
  }
}
