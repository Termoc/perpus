import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../_utils/auth";

const prisma = new PrismaClient();

export async function GET(req, context) {
  let user = null;
  try {
    // Coba verifikasi, tapi gak wajib
    user = verifyToken(req);
  } catch (err) {
    // Kalau gagal, abaikan aja biar publik tetap bisa akses
    console.warn("⚠️ Akses publik tanpa token, diizinkan");
  }

  const params = await context.params
  const { id } = params;
  const article = await prisma.article.findUnique({
    where: { id: parseInt(id) },
  });
  if (!article) {
    return Response.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }
  return Response.json(article);
}

export async function PUT(req, context) {
  try {
    const user = await verifyToken(req);
    const params = await context.params;
    const { id } = params;
    const data = await req.json();

    const updated = await prisma.article.update({
      where: { id: parseInt(id) },
      data,
    });

    return Response.json({ message: "Artikel diperbarui", updated });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const user = verifyToken(req);
    await prisma.article.delete({ where: { id: parseInt(id) } });
    return Response.json({ message: "Artikel dihapus" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}
