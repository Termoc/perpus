import { prisma } from "@/lib/prisma";
import { verifyToken } from "../_utils/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");

  if (categorySlug) {
    // convert slug "sastra-dan-bahasa" -> "sastra dan bahasa"
    const categoryName = categorySlug
      .replace(/-/g, " ")
      .replace(/,/g, "")
      .toLowerCase();

    const booksByCategory = await prisma.book.findMany({
      where: {
        category: {
          name: {
            contains: categoryName,
            mode: "insensitive",
          },
        },
      },
      include: { category: true },
    });

    return Response.json(booksByCategory);
  }

  // default: semua buku
  const books = await prisma.book.findMany({
    include: { category: true },
  });
  return Response.json(books);
}

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

    // Pastikan kategori ada, atau buat baru
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
