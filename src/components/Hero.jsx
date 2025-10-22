"use client";
import React from "react";

function Hero() {
  const bgUrl = "/images/perpus.png";
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `linear-gradient(
              rgba(47, 25, 19, 0.7),
              rgba(47, 25, 19, 0.5)
            ), url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Ornamen cahaya lembut */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary-dark)]/60 via-transparent to-[var(--color-accent-bg)]/30"></div>

        {/* Konten utama */}
        <div className="z-10 container text-center text-white backdrop-blur-md bg-[var(--color-primary-dark)]/30 border border-white/20 rounded-2xl shadow-2xl py-14 px-8 sm:px-12 max-w-3xl animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-md">
            Perpustakaan Digital <br />
            <span className="text-[var(--color-accent)]">SMKN 1 Kepanjen</span>
          </h1>

          <p className="text-lg sm:text-xl font-light mb-10 max-w-xl mx-auto text-[var(--color-accent-bg)] leading-relaxed">
            Jelajahi ribuan buku dan artikel digital, kapan pun dan di mana pun.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-[var(--color-primary-dark)] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/50"
            >
              Lihat Buku
            </button>
            <button className="border border-white/70 hover:bg-white/10 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg transition-all duration-300 hover:scale-105">
              Tentang Kami
            </button>
          </div>
        </div>

        {/* Animasi */}
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
            animation: fadeInUp 1s ease-out forwards;
          }
        `}</style>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Aksi CTA Dipicu!
            </h3>
            <p className="mb-6 text-gray-700">
              Tombol ini akan mengarahkan pengguna ke halaman login atau daftar
              buku.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[var(--color-danger)] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
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
