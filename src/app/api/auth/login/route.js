import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Cek user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return Response.json({ error: "Password salah" }, { status: 401 });

    // Buat token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return Response.json({ message: "Login berhasil", token });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
