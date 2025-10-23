"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";

const dummyArticle = {
  title:
    "Mengenal Lebih Dekat SMKN 1 Kepanjen: Pusat Pendidikan Vokasi di Malang",
  image: "/articles/kanesa.jpg",
  category: "#Pendidikan",
  time: "2 hari yang lalu",
  author: "Redaksi Kanesa Library",
  content: `
    SMKN 1 Kepanjen merupakan salah satu sekolah vokasi unggulan di Kabupaten Malang 
    yang terus berinovasi dalam bidang pendidikan kejuruan. Sekolah ini berfokus 
    pada pengembangan keterampilan praktis dan karakter profesional siswa.

    Dalam beberapa tahun terakhir, SMKN 1 Kepanjen berhasil mencetak berbagai prestasi 
    di tingkat provinsi maupun nasional, baik di bidang teknologi, seni, maupun kewirausahaan.

    Dengan visi menjadi lembaga pendidikan vokasi yang adaptif terhadap perkembangan 
    industri 4.0, sekolah ini terus bertransformasi melalui program literasi digital 
    dan kolaborasi dengan mitra industri.
  `,
};

export default function ArtikelDetail() {
  const { slug } = useParams();
  const article = dummyArticle; // nanti diganti fetch API pakai slug

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 min-h-screen overflow-hidden">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wide mb-2">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-dark)] mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            {article.time} • {article.author}
          </p>
        </div>

        {/* Gambar */}
        <div className="overflow-hidden rounded-2xl shadow-md mb-10">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Konten */}
        <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
          {article.content.split("\n").map((para, i) => (
            <p key={i} className="mb-5">
              {para.trim()}
            </p>
          ))}
        </div>

        {/* Aksen garis bawah */}
        <div className="mt-12 w-24 h-[3px] bg-[var(--color-accent)] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
