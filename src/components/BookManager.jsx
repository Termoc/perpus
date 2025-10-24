"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2, BookPlus } from "lucide-react";
import ReactDOM from "react-dom";

export default function BookManager() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    cover: "",
    redirectType: "link",
    redirectTarget: "",
  });
  const [uploading, setUploading] = useState({ cover: false, pdf: false });

  const categories = [
    "Filsafat dan Psikologi",
    "Sejarah dan Biografi",
    "Budaya, Agama, dan Sosial",
    "Sastra dan Bahasa",
    "Seni dan Kreativitas",
    "Sains dan Teknologi Terapan",
  ];

  // === Fetch Buku ===
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data))
        throw new Error(data.error || "Gagal memuat data");
      setBooks(data);
    } catch (err) {
      console.error("❌ fetchBooks:", err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // === Delete buku ===
  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/books/${selectedBook.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus buku");
      alert("✅ Buku berhasil dihapus!");
      fetchBooks();
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setSelectedBook(null);
    }
  };

  // === Input & Upload ===
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [type]: true });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", type === "pdf" ? "pdf" : "cover");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload gagal");

      setForm({
        ...form,
        [type === "pdf" ? "redirectTarget" : "cover"]: data.url,
      });
      alert(`✅ ${data.type === "pdf" ? "PDF" : "Cover"} berhasil diunggah!`);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  // === Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...form, year: parseInt(form.year, 10) };
    if (isNaN(dataToSend.year)) {
      alert("❌ Tahun tidak valid");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const method = selectedBook ? "PUT" : "POST";
      const url = selectedBook ? `/api/books/${selectedBook.id}` : "/api/books";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan buku");

      alert(
        selectedBook
          ? "✅ Buku berhasil diperbarui!"
          : "✅ Buku berhasil ditambahkan!"
      );

      // Reset form dan refresh data
      setForm({
        title: "",
        author: "",
        year: "",
        category: "",
        cover: "",
        redirectType: "link",
        redirectTarget: "",
      });
      setSelectedBook(null);
      fetchBooks();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setForm({
      title: book.title,
      author: book.author,
      year: book.year,
      category: book.category?.name || "",
      cover: book.cover || "",
      redirectType: book.redirectType || "link",
      redirectTarget: book.redirectTarget || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBook) return alert("Tidak ada buku yang dipilih.");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/books/${selectedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          year: parseInt(form.year, 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memperbarui buku");
      alert("✅ Buku berhasil diperbarui!");
      setShowEdit(false);
      setSelectedBook(null);
      fetchBooks();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // === Batal Edit ===
  const handleCancelEdit = () => {
    setSelectedBook(null);
    setForm({
      title: "",
      author: "",
      year: "",
      category: "",
      cover: "",
      redirectType: "link",
      redirectTarget: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-6">
        Daftar Buku
      </h2>

      {/* === Tabel Buku === */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-[var(--color-primary-light)]/20 rounded-lg overflow-hidden text-sm">
          <thead className="bg-[var(--color-accent-bg)] text-[var(--color-primary-dark)]">
            <tr>
              <th className="p-3 text-left">Cover</th>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Penulis</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Redirect</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-[var(--color-surface)]/40 transition"
                >
                  <td className="p-3">
                    {b.cover ? (
                      <div className="relative w-12 h-16">
                        <Image
                          src={b.cover}
                          alt={b.title}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 font-semibold">{b.title}</td>
                  <td className="p-3">{b.author}</td>
                  <td className="p-3">{b.category?.name || "—"}</td>
                  <td className="p-3">
                    {b.redirectTarget ? (
                      <Link
                        href={b.redirectTarget}
                        target="_blank"
                        className="text-[var(--color-accent-dark)] underline"
                      >
                        {b.redirectType === "pdf"
                          ? "Lihat PDF"
                          : "Kunjungi Link"}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(b)}
                      className="text-red-600 hover:text-red-800 font-bold flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data buku
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Form Tambah Buku === */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Judul Buku"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Penulis"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          value={form.author}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Tahun"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          value={form.year}
          required
        />

        <select
          name="category"
          onChange={handleChange}
          value={form.category}
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          required
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Upload Cover */}
        <div className="col-span-full">
          <label className="block mb-1 font-medium">Upload Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "cover")}
            disabled={uploading.cover}
          />
          {form.cover && (
            <div className="relative mt-2 w-24 h-32">
              <Image
                src={form.cover}
                alt="Preview Cover"
                fill
                className="object-cover rounded"
                sizes="96px"
              />
            </div>
          )}
        </div>

        {/* Pilihan Redirect */}
        <div className="col-span-full flex gap-6 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="redirectType"
              value="link"
              checked={form.redirectType === "link"}
              onChange={handleChange}
            />
            <span>Gunakan Link</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="redirectType"
              value="pdf"
              checked={form.redirectType === "pdf"}
              onChange={handleChange}
            />
            <span>Upload PDF</span>
          </label>
        </div>

        {/* Redirect Input */}
        {form.redirectType === "link" ? (
          <input
            type="url"
            name="redirectTarget"
            placeholder="Masukkan URL eksternal"
            className="col-span-full p-3 rounded-md border border-[var(--color-primary-light)]/20"
            onChange={handleChange}
            value={form.redirectTarget}
            required
          />
        ) : (
          <div className="col-span-full">
            <label className="block mb-1 font-medium">Upload PDF Buku</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleUpload(e, "pdf")}
              disabled={uploading.pdf}
            />
            {form.redirectTarget && (
              <Link
                href={form.redirectTarget}
                target="_blank"
                className="text-[var(--color-accent-dark)] underline mt-2 flex items-center gap-1"
              >
                <Eye size={16} /> Lihat PDF
              </Link>
            )}
          </div>
        )}

        <div className="col-span-full flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 rounded-md transition-all duration-300 flex justify-center items-center gap-3"
          >
            {selectedBook ? "Simpan Perubahan" : "Tambah Buku"} <BookPlus />
          </button>

          {selectedBook && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-5 rounded-md transition-all duration-300"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      {/* === Modal Konfirmasi Hapus === */}
      {showConfirm &&
        selectedBook &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60 transition-opacity"
              onClick={() => setShowConfirm(false)}
            ></div>
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Hapus Buku?
              </h3>
              <p className="mb-6 text-gray-700">
                Buku <strong>{selectedBook.title}</strong> akan dihapus secara
                permanen. Apakah kamu yakin?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-lg transition duration-300"
                  disabled={isDeleting}
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      {/* {selectedBook &&
        ReactDOM.createPortal(
          <EditBookModal
            book={selectedBook}
            categories={categories}
            onClose={() => setSelectedBook(null)}
            onUpdated={fetchBooks}
          />,
          document.body
        )} */}
    </div>
  );
}
