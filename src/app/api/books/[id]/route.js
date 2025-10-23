import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../_utils/auth";

const prisma = new PrismaClient();

// === UPDATE ===
export async function PUT(req, { params }) {
  try {
    const user = verifyToken(req);
    const data = await req.json();

    const updated = await prisma.book.update({
      where: { id: parseInt(params.id) },
      data,
    });

    return Response.json({ message: "Buku diperbarui", updated });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}

// === DELETE ===
export async function DELETE(req, { params }) {
  try {
    const user = verifyToken(req);
    await prisma.book.delete({ where: { id: parseInt(params.id) } });
    return Response.json({ message: "Buku dihapus" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 401 });
  }
}
