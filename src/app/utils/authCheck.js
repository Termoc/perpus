export function isTokenValid() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // detik → ms
    return Date.now() < exp; // true kalau belum expired
  } catch (err) {
    return false;
  }
}
