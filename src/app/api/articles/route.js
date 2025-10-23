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
