"use client";
import Link from "next/link";
import Image from "next/image";

export default function Articlecard({ article }) {
  if (!article) return null;

  const id = article.title
    ? article.title.toLowerCase().replace(/\s+/g, "-")
    : "artikel";

  return (
    <Link
      href={`/artikel/${id}`}
      className="block flex flex-col sm:flex-row gap-6 items-center 
      bg-white/80 backdrop-blur-md border border-[var(--color-primary-light)]/15 
      rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 
      transition-all duration-300"
    >
      {/* Gambar */}
      <div className="w-full sm:w-1/3 relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={
            article.image ||
            "https://placehold.co/300x200/cccccc/333333?text=Artikel"
          }
          alt={article.title || "Gambar Artikel"}
          fill
          className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
          priority={false}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x200/cccccc/333333?text=Artikel";
          }}
        />
      </div>

      {/* Teks */}
      <div className="sm:w-2/3 text-left">
        <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2 hover:text-[var(--color-accent-dark)] transition duration-200 line-clamp-2">
          {article.title}
        </h3>
        <div className="text-sm text-[var(--color-text-muted)] flex items-center gap-2 flex-wrap">
          <span className="font-medium text-[var(--color-accent)]">
            {article.category || "Umum"}
          </span>
          <span>•</span>
          <span>{article.time || "Tidak diketahui"}</span>
        </div>
      </div>
    </Link>
  );
}
