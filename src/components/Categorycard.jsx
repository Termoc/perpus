"use client";

const Categorycard = ({ title, description, bgImage }) => {
  // Ganti dengan URL gambar dari folder public Anda
  const imageUrl =
    bgImage || "https://placehold.co/500x700/000000/FFFFFF?text=Category+Image";

  return (
    <div className="relative h-64 sm:h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer group transition-all duration-300 transform hover:scale-[1.02]">
      {/* Gambar Background */}
      <img
        src={imageUrl}
        alt={`Kategori ${title}`}
        className="absolute inset-0 w-full h-full object-cover"
        // Fallback jika gambar gagal dimuat
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/500x700/1f2937/ffffff?text=Kategori+Buku";
        }}
      />

      {/* Overlay Gelap Transparan (akan lebih gelap saat hover) */}
      {/* Opasitas awal 0.5, berubah menjadi 0.8 saat hover */}
      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-80 transition duration-300"></div>

      {/* Konten (Judul & Deskripsi) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        {/* Judul Utama (Tersembunyi, Muncul saat Hover) */}
        <h3
          className="text-white text-xl sm:text-2xl font-extrabold text-center leading-snug 
          opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
          transition-all duration-300"
        >
          {title}
        </h3>

        {/* Deskripsi Tambahan (Tersembunyi, Muncul saat Hover) */}
        {/* Catatan: Kita mengubah posisi default deskripsi ke bawah (translate-y-full) agar efeknya lebih dramatis dari bawah */}
        <p
          className="absolute bottom-0 p-4 text-center text-white text-sm 
          opacity-0 group-hover:opacity-100 
          transition-all duration-300 translate-y-full group-hover:translate-y-0"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Categorycard;
