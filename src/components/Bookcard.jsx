"use client";

const Bookcard = ({ book }) => (
  <div className="w-44 sm:w-52 lg:w-56 flex-shrink-0 cursor-pointer group transition-all duration-300">
    {/* Cover */}
    <div className="relative bg-[var(--color-surface-alt)] rounded-xl shadow-md overflow-hidden h-72 mb-4 transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-[var(--color-accent)]/40 transition-all duration-300">
      <img
        src={book.cover}
        alt={`Cover ${book.title}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/150x220/cccccc/333333?text=No+Cover";
        }}
      />
    </div>

    {/* Teks */}
    <h3 className="text-base font-bold text-[var(--color-primary-dark)] group-hover:text-[var(--color-accent-dark)] transition duration-300 mb-1">
      {book.title}
    </h3>
    <p className="text-xs text-[var(--color-text-muted)] leading-snug">
      {book.details.map((detail, i) => (
        <span key={i} className="block">
          {detail}
        </span>
      ))}
    </p>
  </div>
);

export default Bookcard;
