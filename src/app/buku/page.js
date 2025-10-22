"use client";
import React from "react";
import Categorycard from "@/components/Categorycard";

const categories = [
  {
    title: "Paket Pelajaran",
    description:
      "Kumpulan buku panduan dan materi pelajaran lengkap untuk mendukung kegiatan belajar mengajar di sekolah.",
    bgImage: "/books/mider.png",
  },
  {
    title: "Filsafat dan Psikologi",
    description:
      "Jelajahi pemikiran mendalam tentang eksistensi, pengetahuan, dan pemahaman tentang perilaku dan mental manusia.",
    bgImage:
      "https://images.unsplash.com/photo-1543187258-a5b67540265b?fit=crop&w=500&h=700",
  },
  {
    title: "Agama",
    description:
      "Koleksi sumber dan literatur keagamaan untuk memperkaya pemahaman spiritual dan nilai-nilai moral.",
    bgImage:
      "https://images.unsplash.com/photo-1594903348630-f210d3f7431c?fit=crop&w=500&h=700",
  },
  {
    title: "Ilmu Sosial",
    description:
      "Pelajari struktur masyarakat, hubungan antarmanusia, dan perkembangan budaya di seluruh dunia.",
    bgImage:
      "https://images.unsplash.com/photo-1549490349-f06b3a0e7f7b?fit=crop&w=500&h=700",
  },
  {
    title: "Bahasa",
    description:
      "Materi untuk mempelajari berbagai bahasa, dari tata bahasa hingga sastra dan komunikasi praktis.",
    bgImage:
      "https://images.unsplash.com/photo-1557766164-16a80479d2b2?fit=crop&w=500&h=700",
  },
  {
    title: "Sejarah dan Biografi",
    description:
      "Dokumentasi peristiwa masa lalu, peradaban, dan kisah hidup tokoh-tokoh inspiratif dunia.",
    bgImage:
      "https://images.unsplash.com/photo-1588636952758-c0b87c0401d8?fit=crop&w=500&h=700",
  },
];

function Buku() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-surface-alt)] overflow-hidden">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/15"></div>

      <div className="relative container mx-auto px-6 max-w-6xl text-center">
        {/* Judul Halaman */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-dark)] mb-16 drop-shadow-sm">
          Daftar Buku Berdasarkan{" "}
          <span className="text-[var(--color-accent)]">Kategori</span>
        </h2>

        {/* Grid Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category, index) => (
            <Categorycard
              key={index}
              title={category.title}
              description={category.description}
              bgImage={category.bgImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Buku;
