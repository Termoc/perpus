export default function Bookcard({ book }) {
  const handleClick = () => {
    if (book.redirectType === "external" && book.redirectTarget) {
      window.open(book.redirectTarget, "_blank");
    } else if (book.redirectType === "pdf" && book.redirectTarget) {
      window.open(book.redirectTarget, "_blank");
    } else {
      alert("Link belum tersedia 😅");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group bg-white/80 backdrop-blur-md border border-[var(--color-primary-light)]/30 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden hover:scale-[1.03]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.cover || "/images/default-cover.jpg"}
          alt={book.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-primary-dark)] truncate">
          {book.title}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-1">
          Author: {book.author}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">Tahun Terbit: {book.year}</p>
        {book.category && (
          <span className="text-[10px] mt-1 px-2 py-1 bg-[var(--color-accent-bg)] text-[var(--color-accent)] rounded-md inline-block">
            {book.category.name}
          </span>
        )}
      </div>
    </div>
  );
}
