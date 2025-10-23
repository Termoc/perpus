"use client";

import React from "react";
import Bookcard from "./Bookcard";
import Articlecard from "./Articlecard";

const recommendedBooks = [
  {
    title: "Mider Ing Rat: Proses Kreatif",
    cover: "/books/mider.png",
    details: [
      "Penyusun: Pardi, Suratno",
      "Balai Bahasa DIY",
      "Tahun Terbit: 2018",
    ],
  },
  {
    title: "Social Organism (Hafiz Rancajale)",
    cover: "/books/social-organism.png",
    details: [
      "Penulis: Hafiz Rancajale",
      "Galeri Nasional Indonesia",
      "Tahun Terbit: 2018",
    ],
  },
  {
    title: "Ngelmu Iku Kelakone Kanthi Laku",
    cover: "/books/ngelmu-iku.png",
    details: [
      "Penyusun: Tirto, Suwondo",
      "Balai Bahasa DIY",
      "Tahun Terbit: 2016",
    ],
  },
  {
    title: "Sangiran Menjawab Dunia",
    cover: "/books/sangiran-mengubah.png",
    details: ["Simanjuntak", "BPSMP Sangiran", "Tahun Terbit: 2009"],
  },
];

const latestArticle = {
  title:
    "Mengenal Lebih Dekat SMKN 1 Kepanjen: Pusat Pendidikan Vokasi di Malang",
  image: "/articles/kanesa.jpg",
  category: "#Pendidikan",
  time: "2 hari yang lalu",
};

function Suggestion() {
  return (
    <section className="relative bg-[var(--color-surface)] py-20 md:py-28 overflow-hidden">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/15"></div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[var(--color-primary-dark)]">
          Rekomendasi Untuk Kamu
        </h2>

        {/* Buku */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6 flex items-center justify-between">
            Buku yang sering dibaca
            <span className="text-sm text-[var(--color-text-muted)] italic">
              — pilihan terbaik minggu ini
            </span>
          </h3>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {recommendedBooks.map((book, index) => (
              <div key={index} className="snap-center">
                <Bookcard book={book} />
              </div>
            ))}
          </div>
        </div>

        {/* Artikel */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6">
            Artikel Terbaru
          </h3>
          <Articlecard article={latestArticle} />
        </div>
      </div>
    </section>
  );
}

export default Suggestion;
