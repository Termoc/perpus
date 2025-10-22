import React from "react";

const socialLinks = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8v5c0 .324-.055.637-.156.924M17 8H8m-2.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
        {/* Ikon Instagram (sebagai pengganti, karena ikon asli tidak standar) */}
      </svg>
    ),
    text: "@kanesa.library",
    link: "https://instagram.com/kanesa.library",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.263l3.89 2.593L21 8m-10 12l-7 4V8a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4"
        />
        {/* Ikon Email */}
      </svg>
    ),
    text: "pusjaka.kanesa@gmail.com",
    link: "mailto:pusjaka.kanesa@gmail.com",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11.233a10.024 10.024 0 012.333-2.333M7.388 7.388l1.414 1.414M11 5h1a10 10 0 0110 10v1a10 10 0 01-10 10h-1a10 10 0 01-10-10V9a2 2 0 012-2h2"
        />
        {/* Ikon Telepon/WhatsApp */}
      </svg>
    ),
    text: "Saluran Whatsapp",
    link: "https://wa.me/6281234567890", // Ganti dengan nomor yang benar
  },
];

function Footer() {
  return (
    <footer className="bg-white pt-16 border-t border-gray-100 bottom-0">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Bagian Atas: Deskripsi dan Kontak */}
        <div className="flex flex-col md:flex-row justify-between pb-12 gap-10">
          {/* Kolom Kiri: Logo & Deskripsi */}
          <div className="w-full md:w-3/5 lg:w-2/5">
            <div className="flex items-center mb-4">
              {/* Placeholder Logo Buku - Gunakan SVG atau Gambar Asli Anda */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-amber-800 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5A2.5 2.5 0 005 7.5c0 1.348.835 2.529 2.074 3.013M12 6.253C13.168 5.477 14.795 5 16.5 5A2.5 2.5 0 0119 7.5c0 1.348-.835 2.529-2.074 3.013M12 12h.01M12 19.253v-2.677M12 19.253c-1.168.776-2.694 1.246-4.253.978M12 19.253c1.168.776 2.694 1.246 4.253.978"
                />
              </svg>
              <span className="text-xl font-bold text-gray-800 leading-tight">
                PERPUSTAKAAN DIGITAL <br /> SMKN 1 Kepanjen
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
              Perpustakaan Digital SMKN 1 Kepanjen ada untuk menjembatani
              kebutuhan baca siswa dengan dunia pengetahuan digital. Kami
              menyediakan koleksi buku, artikel, dan sumber belajar yang mudah
              diakses, mendukung belajar yang sehat, cerdas, dan berkelanjutan.
              Kami merayakan kekayaan ilmu dari berbagai bidang dan
              menyajikannya jadi bacaan yang menambah wawasan, menumbuhkan
              kreativitas, dan mendukung pendidikan yang lebih baik.
            </p>
          </div>

          {/* Kolom Kanan: Kontak Sosial */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <ul className="space-y-4">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-orange-500 transition duration-150"
                  >
                    {/* Lingkaran Ikon Oranye */}
                    <span className="p-3 mr-4 bg-orange-400 rounded-full text-white shadow-md">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bagian Bawah: Hak Cipta */}
        <div className="text-center border-t border-gray-100 pt-6 pb-8 mt-4">
          <p className="text-xs text-gray-500">
            Hak Cipta © 2025 Perpustakaan Digital Kanesa | Dikembangkan oleh
            Teamverse | Dikelola oleh Pustakawan Remaja Kanesa
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
