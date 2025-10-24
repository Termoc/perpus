"use client";
import React, { useEffect, useState } from "react";
import Articlecard from "@/components/Articlecard";

function Artikel() {
  const [articles, setArticles] = useState([]); // 🗃️ Data artikel dari API
  const [loading, setLoading] = useState(true); // ⏳ Status loading
  const [error, setError] = useState(null); // ❌ Error handler

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles"); // 🔗 Panggil API Next.js kamu
        if (!res.ok) throw new Error("Gagal memuat data artikel");

        const data = await res.json();
        setArticles(data); // ✅ Simpan hasil ke state
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Sedang memuat artikel...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        Terjadi kesalahan: {error}
      </section>
    );
  }

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
          {articles.length > 0 ? (
            articles.map((article) => (
              <Articlecard key={article.id} article={article} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Belum ada artikel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Artikel;
