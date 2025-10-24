import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../_utils/auth";

const prisma = new PrismaClient();

// === DELETE ===
export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const user = await verifyToken(req);

    await prisma.book.delete({ where: { id: parseInt(id) } });
    return Response.json({ message: "Buku berhasil dihapus." });
  } catch (err) {
    console.error("❌ Error DELETE book:", err);
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// === UPDATE ===
export async function PUT(req, context) {
  try {
    const user = await verifyToken(req);
    const params = await context.params;
    const { id } = params;
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

    // cari atau buat kategori baru kalau ada perubahan
    let categoryConnect = undefined;
    if (category) {
      const cat = await prisma.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });
      categoryConnect = { connect: { id: cat.id } };
    }

    const updated = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        year: yearInt,
        cover,
        redirectType,
        redirectTarget,
        ...(categoryConnect && { category: categoryConnect }),
      },
      include: { category: true },
    });

    return Response.json({ message: "Buku berhasil diperbarui.", updated });
  } catch (err) {
    console.error("❌ Error PUT book:", err);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
