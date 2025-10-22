"use client";
import React from "react";
import Articlecard from "@/components/Articlecard";

const articles = [
  {
    title:
      "Mengenal Lebih Dekat SMKN 1 Kepanjen: Pusat Pendidikan Vokasi di Malang",
    image:
      "/articles/kanesa.jpg",
    category: "#Pendidikan",
    time: "2 hari yang lalu",
  },
  {
    title: "Peran Literasi Digital dalam Pembelajaran Modern",
    image: "https://placehold.co/300x200/FFB22C/FFFFFF?text=Digital+Learning",
    category: "#Teknologi",
    time: "5 hari yang lalu",
  },
  {
    title: "Menumbuhkan Budaya Membaca di Kalangan Siswa",
    image: "https://placehold.co/300x200/643629/FFFFFF?text=Budaya+Membaca",
    category: "#Literasi",
    time: "1 minggu yang lalu",
  },
  {
    title: "Pusjaka: Wadah Siswa Penggerak Literasi di Kanesa",
    image: "https://placehold.co/300x200/854836/FFFFFF?text=Pusjaka+Spirit",
    category: "#Organisasi",
    time: "2 minggu yang lalu",
  },
];

function Artikel() {
  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 overflow-hidden">
      {/* Ornamen gradasi halus */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/15"></div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Judul Halaman */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[var(--color-primary-dark)]">
          Artikel & Wawasan{" "}
          <span className="text-[var(--color-accent)]">Terbaru</span>
        </h2>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Articlecard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Artikel;
