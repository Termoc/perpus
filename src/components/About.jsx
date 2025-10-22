"use client";

import React from "react";

function About() {
  const imageUrl = "/images/anggota.png";

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-2xl overflow-hidden p-8 md:p-12">
          {/* Kolom Kiri: Gambar dengan Efek Tumpukan 3D */}
          <div className="w-full md:w-1/2 flex justify-center p-4 md:p-0 mb-8 md:mb-0">
            <div className="relative w-72 h-96 group perspective-1000">
              {/* Kartu Belakang (Cokelat) */}
              <div className="absolute w-full h-full bg-amber-800 rounded-xl shadow-xl transform rotate-3 origin-bottom-left transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:translate-x-4 group-hover:-translate-y-4"></div>

              {/* Kartu Depan (Gambar) */}
              <div className="absolute w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-0 transition-all duration-500 ease-in-out group-hover:rotate-[-3deg] group-hover:translate-x-0 group-hover:translate-y-0">
                <img
                  src={imageUrl}
                  alt="Kelompok Pusjaka"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  // Fallback jika gambar tidak dimuat (walaupun kita pakai placeholder)
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x500/A0A0A0/ffffff?text=Pusjaka";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Teks dan CTA */}
          <div className="w-full md:w-1/2 md:pl-12 text-gray-800">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
              Jadi Bagian dari Pusjaka!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Pusjaka (Pustakawan Remaja KANESA) merupakan organisasi yang
              berperan dalam pengelolaan perpustakaan serta pengembangan budaya
              literasi di SMKN 1 Kepanjen. Melalui kegiatan-kegiatannya, Pusjaka
              menjadi wadah bagi siswa untuk menumbuhkan minat baca, mengasah
              kemampuan berpikir kritis, dan berkontribusi dalam menciptakan
              lingkungan sekolah yang gemar membaca dan berbagi pengetahuan.
            </p>

            {/* CTA Button */}
            <button
              onClick={() =>
                alert("Anda akan diarahkan ke formulir pendaftaran Pusjaka.")
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
