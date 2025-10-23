import { prisma } from "@/lib/prisma";
import { verifyToken } from "../_utils/auth";

// === GET ===
export async function GET(req) {
  try {
    // Cek apakah ada token, tapi jangan wajib
    let user = null;
    try {
      user = await verifyToken(req);
    } catch {
      // Abaikan error token — tetap lanjut untuk akses publik
    }

    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    // Filter berdasarkan kategori (jika ada)
    if (categorySlug) {
      const categoryName = categorySlug
        .replace(/-/g, " ")
        .replace(/,/g, "")
        .toLowerCase();

      const booksByCategory = await prisma.book.findMany({
        where: {
          category: {
            name: { contains: categoryName, mode: "insensitive" },
          },
        },
        include: { category: true },
      });

      return Response.json(booksByCategory);
    }

    // Semua buku
    const books = await prisma.book.findMany({ include: { category: true } });
    return Response.json(books);
  } catch (err) {
    console.error("❌ Error di GET books:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// === POST ===
export async function POST(req) {
  try {
    const user = await verifyToken(req);
    const body = await req.json();
    const {
      title,
      author,
      year,
      cover,
      category,
      redirectType,
      redirectTarget,
    } = body;

    const yearInt = parseInt(year, 10);
    if (isNaN(yearInt)) {
      return Response.json({ error: "Tahun tidak valid." }, { status: 400 });
    }

    const existingCategory = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        year: yearInt,
        cover,
        redirectType,
        redirectTarget,
        categoryId: existingCategory.id,
      },
      include: { category: true },
    });

    return Response.json(
      { message: "Buku berhasil ditambahkan", newBook },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error di POST books:", err);
    return Response.json({ error: err.message }, { status: 401 });
  }
}

// === DELETE ===
export async function DELETE(req, { params }) {
  try {
    const user = await verifyToken(req, true);
    const { id } = params;

    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (!book) {
      return Response.json({ error: "Buku tidak ditemukan." }, { status: 404 });
    }

    await prisma.book.delete({ where: { id: parseInt(id) } });
    return Response.json({ message: "Buku berhasil dihapus." });
  } catch (err) {
    console.error("❌ Error DELETE book:", err.message);
    return Response.json({ error: err.message }, { status: 401 });
  }
}
