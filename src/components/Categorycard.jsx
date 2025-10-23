"use client";
import Link from "next/link";

const Categorycard = ({ title, description, bgImage }) => {
  const imageUrl =
    bgImage || "https://placehold.co/500x700/000000/FFFFFF?text=Category+Image";
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/kategori/${slug}`}
      className="block relative h-64 sm:h-80 overflow-hidden rounded-2xl cursor-pointer group
      transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Background */}
      <img
        src={imageUrl}
        alt={`Kategori ${title}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/500x700/1f2937/ffffff?text=Kategori+Buku";
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 
        via-[var(--color-primary)]/40 to-transparent group-hover:from-[var(--color-primary-dark)]/80 
        group-hover:via-[var(--color-accent-dark)]/50 transition-all duration-500"
      ></div>

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h3
          className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight 
          drop-shadow-md mb-2 transition-all duration-500 group-hover:text-[var(--color-accent)]"
        >
          {title}
        </h3>

        <p
          className="text-white/90 text-sm sm:text-base opacity-0 translate-y-4 
          group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out max-w-xs"
        >
          {description}
        </p>

        <div className="mt-4 h-[3px] w-10 bg-[var(--color-accent)] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>
    </Link>
  );
};

export default Categorycard;
