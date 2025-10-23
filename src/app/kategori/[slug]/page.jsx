"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Bookcard from "@/components/Bookcard";

export default function KategoriDetail() {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  const formatted = decodedSlug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const categoryTitle = formatted;

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // === Fetch buku berdasarkan kategori ===
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(`/api/books?category=${slug}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await res.json();

        if (!res.ok || !Array.isArray(data)) {
          console.error("❌ Gagal ambil data:", data);
          setErrorMsg(data.error || "Tidak dapat memuat data buku.");
          setBooks([]);
          return;
        }

        setBooks(data);
      } catch (err) {
        console.error("❌ Gagal ambil buku:", err);
        setErrorMsg("Terjadi kesalahan koneksi ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [slug]);

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];

    let result = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Terapkan urutan sesuai dropdown
    if (sortOrder === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [books, searchTerm, sortOrder]);

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 overflow-hidden min-h-screen">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[var(--color-primary-dark)]">
          Kategori:{" "}
          <span className="text-[var(--color-accent)]">{categoryTitle}</span>
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-md border border-[var(--color-primary-light)]/20 rounded-xl p-4 shadow-sm mb-10">
          <input
            type="text"
            placeholder="Cari judul buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-full border border-[var(--color-primary-light)]/20 focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all duration-300 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="py-2.5 px-4 rounded-full border border-[var(--color-primary-light)]/20 bg-white/90 shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text)]"
          >
            <option value="asc">Urutkan A → Z</option>
            <option value="desc">Urutkan Z → A</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-[var(--color-text-muted)] mt-12 animate-pulse">
            ⏳ Memuat buku...
          </p>
        ) : errorMsg ? (
          <p className="text-center text-[var(--color-danger)] mt-12">
            ⚠️ {errorMsg}
          </p>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <Bookcard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] mt-12">
            Tidak ada buku di kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}
