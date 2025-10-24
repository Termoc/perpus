"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ArtikelDetail() {
  const { slug } = useParams(); // URL misalnya /artikel/mengenal-smkn-1
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        // 1️⃣ Cari artikel by slug (pakai endpoint all)
        const resAll = await fetch(`/api/articles`);
        const allArticles = await resAll.json();

        // 2️⃣ Temukan artikel yang slug-nya cocok
        const found = allArticles.find(
          (a) => a.slug?.toLowerCase() === slug.toLowerCase()
        );

        if (!found) throw new Error("Artikel tidak ditemukan");

        // 3️⃣ Ambil artikel detail by ID
        const resDetail = await fetch(`/api/articles/${found.id}`);
        if (!resDetail.ok) throw new Error("Gagal ambil detail artikel");

        const data = await resDetail.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Sedang memuat...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!article) return <p className="text-center py-20">Tidak ada artikel.</p>;

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          {article.title}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          {article.author}
        </p>
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="rounded-xl mb-10 object-cover w-full"
          />
        )}
        <article className="prose max-w-none whitespace-pre-line">
          {article.content}
        </article>
      </div>
    </section>
  );
}
