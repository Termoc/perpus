import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password, role, secret } = await req.json();

    // 🧱 Proteksi agar tidak sembarang orang bisa daftar
    if (secret !== process.env.ADMIN_SECRET) {
      return Response.json(
        { error: "Akses ditolak. Token tidak valid." },
        { status: 403 }
      );
    }

    if (!email || !password)
      return Response.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return Response.json({ error: "Email sudah terdaftar" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: role || "librarian", // default pustakawan
      },
    });

    return Response.json(
      { message: `Akun ${user.role} berhasil dibuat`, user },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
