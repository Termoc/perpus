"use client";
import React, { useEffect, useState } from "react";

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    redirectType: "link",
    redirectTarget: "",
  });
  const [uploading, setUploading] = useState({ cover: false, pdf: false });

  const categories = [
    "Fiksi",
    "Non-Fiksi",
    "Teknologi",
    "Sains",
    "Sejarah",
    "Pendidikan",
  ];

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.error("Gagal ambil buku:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // === Upload File ke Supabase ===
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [type]: true });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", type);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload gagal");

      setForm({ ...form, [type]: data.url });
      alert(`✅ ${type === "cover" ? "Cover" : "PDF"} berhasil diunggah!`);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  // === Simpan Buku ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal tambah buku");
      alert("✅ Buku berhasil ditambahkan!");
      location.reload();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-6">
        Daftar Buku
      </h2>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-[var(--color-primary-light)]/20 rounded-lg overflow-hidden text-sm">
          <thead className="bg-[var(--color-accent-bg)] text-[var(--color-primary-dark)]">
            <tr>
              <th className="p-3 text-left">Cover</th>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Penulis</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">PDF</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-[var(--color-surface)]/40 transition"
              >
                <td className="p-3">
                  {b.cover ? (
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 font-semibold">{b.title}</td>
                <td className="p-3">{b.author}</td>
                <td className="p-3">{b.category}</td>
                <td className="p-3">
                  {b.pdf ? (
                    <a
                      href={b.pdf}
                      target="_blank"
                      className="text-[var(--color-accent-dark)] underline"
                    >
                      Lihat PDF
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Penulis"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Tahun"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
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
            <img
              src={form.cover}
              alt="Preview"
              className="mt-2 w-24 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Pilihan redirect */}
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

        {/* Input sesuai pilihan */}
        {form.redirectType === "link" ? (
          <input
            type="url"
            name="redirectTarget"
            placeholder="Masukkan URL link eksternal (misal Google Drive, website, dsb)"
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
              onChange={(e) => handleUpload(e, "redirectTarget")}
              disabled={uploading?.redirectTarget}
            />
            {form.redirectTarget && (
              <a
                href={form.redirectTarget}
                target="_blank"
                className="text-[var(--color-accent-dark)] underline mt-2 block"
              >
                📄 Lihat PDF
              </a>
            )}
          </div>
        )}
        <button
          type="submit"
          className="col-span-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 rounded-md transition-all duration-300"
        >
          Tambah Buku 📘
        </button>
      </form>
    </div>
  );
}
