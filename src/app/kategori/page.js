"use client";
import React, { useEffect, useState } from "react";
import Categorycard from "@/components/Categorycard";

const staticCategories = [
  {
    name: "Filsafat dan Psikologi",
    description:
      "Jelajahi pemikiran mendalam tentang eksistensi, pengetahuan, dan pemahaman tentang perilaku dan mental manusia.",
    bgImage: "/books/category/psikologi.png",
  },
  {
    name: "Sejarah dan Biografi",
    description:
      "Dokumentasi peristiwa masa lalu, peradaban, dan kisah hidup tokoh-tokoh inspiratif dunia.",
    bgImage: "/books/category/sejarah.png",
  },
  {
    name: "Budaya, Agama, dan Sosial",
    description:
      "Koleksi sumber dan literatur keagamaan untuk memperkaya pemahaman spiritual dan nilai-nilai moral.",
    bgImage: "/books/category/agama.jpg",
  },
  {
    name: "Sastra dan Bahasa",
    description:
      "Materi untuk mempelajari berbagai bahasa, dari tata bahasa hingga sastra dan komunikasi praktis.",
    bgImage: "/books/category/bahasa.jpg",
  },
  {
    name: "Seni dan Kreativitas",
    description:
      "Pelajari teknik dan karya seni, seperti seni rupa, seni musik, dan seni teater.",
    bgImage: "/books/category/seni.jpg",
  },
  {
    name: "Sains dan Teknologi Terapan",
    description:
      "Dokumentasi ilmu pengetahuan dan teknologi, dari fisika, kimia, dan teknologi informasi.",
    bgImage: "/books/category/teknologi.jpg",
  },
];

function Buku() {
  const [dbCategories, setDbCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setDbCategories(data))
      .catch((err) => console.error("❌ Gagal fetch kategori:", err));
  }, []);

  // Merge kategori statis + data dari DB (jumlah buku)
  const mergedCategories = staticCategories.map((localCat) => {
    const dbCat = dbCategories.find((c) => c.name === localCat.name);
    return {
      ...localCat,
      bookCount: dbCat?.books?.length || 0,
    };
  });

  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-surface-alt)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/15"></div>

      <div className="relative container mx-auto px-6 max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-dark)] mb-16 drop-shadow-sm">
          Daftar Buku Berdasarkan{" "}
          <span className="text-[var(--color-accent)]">Kategori</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {mergedCategories.map((category, index) => (
            <Categorycard
              key={index}
              title={category.name}
              description={`${category.description} ${category.bookCount} buku tersedia`}
              bgImage={category.bgImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Buku;
