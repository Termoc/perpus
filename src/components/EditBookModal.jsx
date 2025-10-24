"use client";
import { useState, useEffect } from "react";
import { POST } from "@/app/api/upload/route";

export default function EditBookModal({
  book,
  categories,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    redirectType: "link",
    redirectTarget: "",
    cover: null,
    pdf: null,
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        year: book.year || "",
        category: book.category?.name || "",
        redirectType: book.redirectType || "link",
        redirectTarget: book.redirectTarget || "",
        cover: null,
        pdf: null,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") setForm((prev) => ({ ...prev, [name]: files[0] }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl = book.cover;
    let fileUrl = form.redirectTarget;

    // upload cover baru
    if (form.cover) {
      coverUrl = await POST(form.cover, "covers");
    }

    // kalau redirectType file → upload PDF
    if (form.redirectType === "file" && form.pdf) {
      fileUrl = await POST(form.pdf, "pdfs");
    }

    const res = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        cover: coverUrl,
        redirectTarget: fileUrl,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      onUpdated();
      onClose();
    } else {
      alert("Gagal update: " + data.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-[450px] flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold mb-2">Edit Buku</h2>

        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Penulis"
          value={form.author}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Tahun Terbit"
          value={form.year}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* Dropdown kategori */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Radio redirectType */}
        <div className="flex gap-3 items-center">
          <label>
            <input
              type="radio"
              name="redirectType"
              value="link"
              checked={form.redirectType === "link"}
              onChange={handleChange}
            />{" "}
            Link
          </label>
          <label>
            <input
              type="radio"
              name="redirectType"
              value="file"
              checked={form.redirectType === "file"}
              onChange={handleChange}
            />{" "}
            File
          </label>
        </div>

        {form.redirectType === "link" ? (
          <input
            type="text"
            name="redirectTarget"
            placeholder="Link Buku"
            value={form.redirectTarget}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        ) : (
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        )}

        <input
          type="file"
          name="cover"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <div className="flex justify-end gap-3 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
