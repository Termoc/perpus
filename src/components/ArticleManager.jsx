"use client";
import React, { useEffect, useState } from "react";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles)
      .catch((err) => console.error("Gagal ambil artikel:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal tambah artikel");
      alert("✅ Artikel berhasil ditambahkan!");
      location.reload();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-6">
        Daftar Artikel
      </h2>

      {/* List Artikel */}
      <ul className="mb-8 space-y-3">
        {articles.map((a) => (
          <li
            key={a.id}
            className="p-4 rounded-lg border border-[var(--color-primary-light)]/20 bg-white/60 backdrop-blur-sm hover:bg-[var(--color-accent-bg)]/60 transition-all duration-300"
          >
            <p className="font-semibold text-[var(--color-primary-dark)]">
              {a.title}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {a.category}
            </p>
          </li>
        ))}
      </ul>

      {/* Form Tambah Artikel */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Judul Artikel"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Kategori"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL Gambar (opsional)"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Konten Artikel"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20 h-32"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 rounded-md transition-all duration-300"
        >
          Tambah Artikel
        </button>
      </form>
    </div>
  );
}
