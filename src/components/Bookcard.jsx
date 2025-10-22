"use client";

const Bookcard = ({ book }) => (
  <div className="w-40 sm:w-44 lg:w-56 flex-shrink-0 cursor-pointer group">
    {/* Cover Buku */}
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden h-64 sm:h-72 mb-3 relative transform transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
      <img
        src={book.cover}
        alt={`Cover ${book.title}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/150x220/cccccc/333333?text=No+Cover";
        }}
      />
    </div>

    {/* Detail Buku */}
    <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1 group-hover:text-blue-600 transition duration-150">
      {book.title}
    </h3>
    <p className="text-xs text-gray-500 space-y-0.5">
      {book.details.map((detail, i) => (
        <span key={i} className="block">
          {detail}
        </span>
      ))}
    </p>
  </div>
);

export default Bookcard;
