import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../_utils/auth";
import slugify from "slugify";

const prisma = new PrismaClient();

// === GET ALL ===
export async function GET(req) {
  try {
    // Cek apakah ada token, tapi jangan wajib
    let user = null;
    try {
      user = await verifyToken(req);
    } catch {
      // Abaikan error token — tetap lanjut untuk akses publik
    }

    // Semua buku
    const article = await prisma.article.findMany({});
    return Response.json(article);
  } catch (err) {
    console.error("❌ Error di GET :", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// === CREATE ===
export async function POST(req) {
  try {
    const user = verifyToken(req);
    const { title, image, author, content } = await req.json();

    // buat slug otomatis dari judul
    // Generate slug unik dari judul
    let slugBase = title.toLowerCase().replace(/\s+/g, "-");
    let slug = slugBase;

    // Cek apakah slug sudah ada
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slugBase}-${Date.now()}`; // tambah timestamp biar unik
    }

    // Buat artikel
    const newArticle = await prisma.article.create({
      data: {
        title,
        slug,
        image,
        author,
        content,
      },
    });

    return Response.json(
      { message: "Artikel ditambahkan", newArticle },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error di POST article:", err.message);
    return Response.json({ error: err.message }, { status: 401 });
  }
}
