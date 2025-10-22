import Categorycard from "@/components/Categorycard";

const categories = [
  {
    title: "Paket Pelajaran",
    description:
      "Kumpulan buku panduan dan materi pelajaran lengkap untuk mendukung kegiatan belajar mengajar di sekolah.",
    bgImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a714?fit=crop&w=500&h=700",
  },
  {
    title: "Filsafat dan Psikologi",
    description:
      "Jelajahi pemikiran mendalam tentang eksistensi, pengetahuan, dan pemahaman tentang perilaku dan mental manusia.",
    bgImage:
      "https://images.unsplash.com/photo-1543187258-a5b67540265b?fit=crop&w=500&h=700",
  },
  {
    title: "Agama",
    description:
      "Koleksi sumber dan literatur keagamaan untuk memperkaya pemahaman spiritual dan nilai-nilai moral.",
    bgImage:
      "https://images.unsplash.com/photo-1594903348630-f210d3f7431c?fit=crop&w=500&h=700",
  },
  {
    title: "Ilmu Sosial",
    description:
      "Pelajari struktur masyarakat, hubungan antarmanusia, dan perkembangan budaya di seluruh dunia.",
    bgImage:
      "https://images.unsplash.com/photo-1549490349-f06b3a0e7f7b?fit=crop&w=500&h=700",
  },
  {
    title: "Bahasa",
    description:
      "Materi untuk mempelajari berbagai bahasa, dari tata bahasa hingga sastra dan komunikasi praktis.",
    bgImage:
      "https://images.unsplash.com/photo-1557766164-16a80479d2b2?fit=crop&w=500&h=700",
  },
  {
    title: "Sejarah dan Biografi",
    description:
      "Dokumentasi peristiwa masa lalu, peradaban, dan kisah hidup tokoh-tokoh inspiratif dunia.",
    bgImage:
      "https://images.unsplash.com/photo-1588636952758-c0b87c0401d8?fit=crop&w=500&h=700",
  },
];

function Buku() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Daftar Buku Berdasarkan Kategori
        </h2>

        {/* Grid Kategori */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Categorycard
              key={index}
              title={category.title}
              description={category.description} // Meneruskan deskripsi
              bgImage={category.bgImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Buku;
