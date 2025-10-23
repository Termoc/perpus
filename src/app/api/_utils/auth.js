import jwt from "jsonwebtoken";

export function verifyToken(req, requireLibrarian = true) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);
    if (!authHeader) throw new Error("Token tidak ditemukan");

    const token = authHeader.replace("Bearer ", "");
    console.log("Bearer:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ TAMBAHKAN INI
    console.log("Decoded token:", decoded);
    console.log("User role:", decoded.role);
    console.log("Require librarian:", requireLibrarian);

    if (
      requireLibrarian &&
      decoded.role !== "librarian" &&
      decoded.role !== "admin"
    ) {
      throw new Error("Akses ditolak. Bukan pustakawan.");
    }

    return decoded;
  } catch (err) {
    console.error("❌ Verify Token Error:", err.message); // ✅ TAMBAHKAN INI
    throw new Error(err.message || "Token tidak valid");
  }
}
