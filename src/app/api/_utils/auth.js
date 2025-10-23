import jwt from "jsonwebtoken";

export function verifyToken(req, requireLibrarian = true) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);
    if (!authHeader) throw new Error("Token tidak ditemukan");

    const token = authHeader.replace("Bearer ", "");
    console.log("Bearer:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      requireLibrarian &&
      decoded.role !== "librarian" &&
      decoded.role !== "admin"
    ) {
      throw new Error("Akses ditolak. Bukan pustakawan.");
    }

    return decoded;
  } catch (err) {
    throw new Error(err.message || "Token tidak valid");
  }
}
