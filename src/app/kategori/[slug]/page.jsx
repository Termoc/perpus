"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Bookcard from "@/components/Bookcard";

const sampleBooks = [
  {
    title: "Pemrograman Web Modern",
    cover: "/books/web-modern.png",
    details: ["Penulis: Andi Firmansyah", "Tahun: 2021"],
  },
  {
    title: "Belajar React dari Nol",
    cover: "/books/react.png",
    details: ["Penulis: Wahyu Pratama", "Tahun: 2023"],
  },
  {
    title: "Dasar-dasar Jaringan Komputer",
    cover: "/books/network.png",
    details: ["Penulis: Rudi Santoso", "Tahun: 2019"],
  },
  {
    title: "Algoritma dan Struktur Data",
    cover: "/books/algodata.png",
    details: ["Penulis: Candra Wijaya", "Tahun: 2022"],
  },
  {
    title: "Pengantar AI dan Machine Learning",
    cover: "/books/ai.png",
    details: ["Penulis: Fitri Nurhaliza", "Tahun: 2024"],
  },
];

export default function KategoriDetail() {
  const { slug } = useParams(); // misal /kategori/teknologi
  const categoryTitle =
    slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredBooks = useMemo(() => {
    return sampleBooks
      .filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "asc") return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
      });
  }, [searchTerm, sortOrder]);

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 overflow-hidden min-h-screen">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[var(--color-primary-dark)]">
          Kategori: <span className="text-[var(--color-accent)]">{categoryTitle}</span>
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

        {/* Grid Buku */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book, index) => (
              <Bookcard key={index} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] mt-12">
            Tidak ada buku yang ditemukan di kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}
