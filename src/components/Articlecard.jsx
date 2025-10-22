"use client";

const Articlecard = ({ article }) => (
  <div className="flex flex-col sm:flex-row gap-6 mt-6 md:mt-8">
    {/* Gambar Artikel */}
    <div className="w-full sm:w-1/3 flex-shrink-0">
      <img
        src={article.image}
        alt="Artikel Terbaru"
        className="w-full h-48 sm:h-full object-cover rounded-lg shadow-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/300x200/cccccc/333333?text=Artikel";
        }}
      />
    </div>

    {/* Teks Artikel */}
    <div className="sm:w-2/3">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition duration-150 leading-snug">
        {article.title}
      </h3>
      <div className="text-sm text-gray-500 space-x-2">
        <span className="font-medium text-blue-600">{article.category}</span>
        <span>•</span>
        <span>{article.time}</span>
      </div>
    </div>
  </div>
);

export default Articlecard;
