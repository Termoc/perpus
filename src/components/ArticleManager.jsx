"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import ReactDOM from "react-dom";

export default function ArticleManager() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    content: "",
  });
  const [uploading, setUploading] = useState({ cover: false });
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setForm({
      title: article.title,
      author: article.author,
      content: article.content,
      image: article.image || "",
    });
  };

  // === Fetch Artikel ===
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data))
        throw new Error(data.error || "Gagal memuat data");
      setArticles(data);
    } catch (err) {
      console.error("❌ fetchArticles:", err);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // === Delete buku ===
  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus artikel");
      alert("✅ Artikel berhasil dihapus!");
      fetchArticles();
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setSelectedArticle(null);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...form };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const method = selectedArticle ? "PUT" : "POST";
      const url = selectedArticle
        ? `/api/articles/${selectedArticle.id}`
        : "/api/articles";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan artikel");

      alert(
        selectedArticle
          ? "✅ Artikel berhasil diperbarui!"
          : "✅ Artikel berhasil ditambahkan!"
      );

      // Reset form dan refresh data
      setForm({
        title: "",
        author: "",
        image: "",
        content: "",
      });
      setSelectedArticle(null);
      fetchArticles();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [type]: true });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cover");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload gagal");

      setForm({
        ...form,
        [type === "pdf" ? "redirectTarget" : "image"]: data.url,
      });
      alert(`✅ ${data.type === "pdf" ? "PDF" : "Cover"} berhasil diunggah!`);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedArticle) return alert("Tidak ada artikel yang dipilih.");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memperbarui buku");
      alert("✅ Buku berhasil diperbarui!");
      setShowEdit(false);
      setSelectedArticle(null);
      fetchArticles();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // === Batal Edit ===
  const handleCancelEdit = () => {
    setSelectedArticle(null);
    setForm({
      title: "",
      author: "",
      content: "",
      image: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-6">
        Daftar Artikel
      </h2>

      {/* === Tabel Buku === */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-[var(--color-primary-light)]/20 rounded-lg overflow-hidden text-sm">
          <thead className="bg-[var(--color-accent-bg)] text-[var(--color-primary-dark)]">
            <tr>
              <th className="p-3 text-left">Cover</th>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Penulis</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((a) => (
                <tr
                  key={a.id}
                  className="border-t hover:bg-[var(--color-surface)]/40 transition"
                >
                  <td className="p-3">
                    {a.image ? (
                      <div className="relative w-12 h-16">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 font-semibold">{a.title}</td>
                  <td className="p-3">{a.author}</td>
                  <td className="p-3 flex items-center gap-3">
                    <button
                      onClick={() => handleEditClick(a)}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(a)}
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
                  Tidak ada data artikel
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Tambah Artikel */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Judul Artikel"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Penulis Artikel"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20"
          onChange={handleChange}
          value={form.author}
          required
        />

        {/* Upload Cover */}
        <div className="col-span-full">
          <label className="block mb-1 font-medium">Upload Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "cover")}
            disabled={uploading.image}
          />
          {form.image && (
            <div className="relative mt-2 w-24 h-32">
              <Image
                src={form.image}
                alt="Preview Cover"
                fill
                className="object-cover rounded"
                sizes="96px"
              />
            </div>
          )}
        </div>

        <textarea
          name="content"
          placeholder="Konten Artikel"
          className="p-3 rounded-md border border-[var(--color-primary-light)]/20 h-32"
          onChange={handleChange}
          value={form.content}
          required
        />
        <div className="col-span-full flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 rounded-md transition-all duration-300 flex justify-center items-center gap-3"
          >
            {selectedArticle ? "Simpan Perubahan" : "Tambah Artikel"}
          </button>

          {selectedArticle && (
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
        selectedArticle &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60 transition-opacity"
              onClick={() => setShowConfirm(false)}
            ></div>
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Hapus Artikel?
              </h3>
              <p className="mb-6 text-gray-700">
                Artikel <strong>{selectedArticle.title}</strong> akan dihapus
                secara permanen. Apakah kamu yakin?
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
    </div>
  );
}
