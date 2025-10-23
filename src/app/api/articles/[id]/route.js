import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../_utils/auth";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const user = verifyToken(req);
    const data = await req.json();

    const updated = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data,
    });

    return Response.json({ message: "Artikel diperbarui", updated });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = verifyToken(req);
    await prisma.article.delete({ where: { id: parseInt(params.id) } });
    return Response.json({ message: "Artikel dihapus" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}
