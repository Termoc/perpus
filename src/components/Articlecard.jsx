"use client";

const Articlecard = ({ article }) => (
  <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/80 backdrop-blur-md border border-[var(--color-primary-light)]/15 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    {/* Gambar */}
    <div className="w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-xl">
      <img
        src={article.image}
        alt="Artikel Terbaru"
        className="w-full h-48 sm:h-40 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/300x200/cccccc/333333?text=Artikel";
        }}
      />
    </div>

    {/* Teks */}
    <div className="sm:w-2/3 text-left">
      <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2 hover:text-[var(--color-accent-dark)] transition duration-200">
        {article.title}
      </h3>
      <div className="text-sm text-[var(--color-text-muted)] space-x-2">
        <span className="font-medium text-[var(--color-accent)]">
          {article.category}
        </span>
        <span>•</span>
        <span>{article.time}</span>
      </div>
    </div>
  </div>
);

export default Articlecard;
