"use client";

import React from "react";
import Bookcard from "./Bookcard";
import Articlecard from "./Articlecard";

const recommendedBooks = [
  {
    title: "Mider Ing Rat: Proses Kreatif",
    cover: "https://placehold.co/150x220/E0E0E0/333333?text=Mider+ing+Rat",
    details: [
      "Penyusun: Pardi, Suratno",
      "Balai Bahasa Daerah Istimewa Yogyakarta",
      "Tahun Terbit: 2018",
    ],
  },
  {
    title: "Social Organism (Hafiz Rancajale)",
    cover: "https://placehold.co/150x220/FFC107/333333?text=Social+Organism",
    details: [
      "Penulis: Hafiz Rancajale",
      "Galeri Nasional Indonesia, Direktorat Jenderal Kebudayaan",
      "Tahun Terbit: 2018",
    ],
  },
  {
    title: "Ngelmu Iku Kelakone Kanathi Laku",
    cover: "https://placehold.co/150x220/333333/FFFFFF?text=Ngelmu+Iku",
    details: [
      "Penyusun: Tirto, Suwondo",
      "Balai Bahasa Daerah Istimewa Yogyakarta",
      "Tahun Terbit: 2016",
    ],
  },
  {
    title: "Sangiran Menjawab Dunia",
    cover: "https://placehold.co/150x220/8D6E63/FFFFFF?text=Sangiran",
    details: [
      "simanjuntak",
      "Balai Pelestarian Situs Manusia Purba Sangiran",
      "Tahun Terbit: 2009",
    ],
  },
];

// Data Dummy untuk Artikel
const latestArticle = {
  title:
    "Mengenal Lebih Dekat SMKN 1 Kepanjen: Pusat Pendidikan Vokasi di Malang",
  image:
    "https://placehold.co/300x200/2196F3/FFFFFF?text=Kanesa+Classic+Reunion",
  category: "#Pendidikan",
  time: "2 hari yang lalu",
};

function Suggestion() {
  return (
    <section className="bg-white py-16 md:py-24 text-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Judul Utama */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 md:mb-20">
          Rekomendasi Untuk Kamu
        </h2>

        {/* === Bagian Buku yang Sering Dibaca === */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl font-semibold mb-6">
            Buku yang sering dibaca
          </h3>

          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedBooks.map((book, index) => (
              <Bookcard key={index} book={book} />
            ))}
          </div>
        </div>

        {/* === Bagian Artikel Terbaru === */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Artikel Terbaru</h3>
          <Articlecard article={latestArticle} />
        </div>
      </div>
    </section>
  );
}

export default Suggestion;
