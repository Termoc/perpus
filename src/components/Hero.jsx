"use client";

import React from "react";

function Hero() {
  // URL gambar dari folder public
  const bgUrl = "/images/perpus.png";

  // Komponen modal box pengganti alert()
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <section
        // Menggunakan min-h-screen untuk tinggi seukuran satu layar penuh
        className="relative overflow-hidden bg-gray-900 flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          // Perbaikan: backgroundPositio menjadi backgroundPosition
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Gelap untuk Kontras Teks */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Konten Utama */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Teks Utama */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fadeInUp">
            Revolusi Cara Anda Belajar
          </h1>

          {/* Teks Pendukung */}
          <p className="text-lg sm:text-xl font-light mb-8 max-w-xl mx-auto opacity-90 animate-fadeInUp delay-200">
            Akses perpustakaan digital terluas di Asia. Mulai baca, tonton, dan
            dengarkan sekarang juga.
          </p>

          {/* Call-to-Action (CTA) Button */}
          <div className="mt-8 animate-fadeInUp delay-400">
            <button
              onClick={() => setShowModal(true)} // Menggunakan modal box pengganti alert
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
            >
              Daftar Gratis Hari Ini
            </button>
          </div>
        </div>

        {/* CSS Tambahan untuk Animasi */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
        `}</style>
      </section>

      {/* Modal Box Sederhana */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Aksi CTA Dipicu!</h3>
            <p className="mb-6 text-gray-700">
              Tombol ini akan mengarahkan pengguna ke halaman pendaftaran atau
              login.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
