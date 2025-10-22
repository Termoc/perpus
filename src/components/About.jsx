"use client";
import React from "react";

function About() {
  const imageUrl = "/images/anggota.png";

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 overflow-hidden">
      {/* Ornamen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/15 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-[var(--color-primary)]/10 p-8 md:p-12">
          {/* Kiri: Gambar */}
          <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
            <div className="relative w-72 h-96 group">
              {/* Layer 3D belakang */}
              <div className="absolute inset-0 bg-[var(--color-primary)] rounded-2xl shadow-lg transform rotate-3 group-hover:rotate-0 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-500 ease-in-out"></div>

              {/* Gambar utama */}
              <img
                src={imageUrl}
                alt="Kelompok Pusjaka"
                className="relative w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x500/A0A0A0/ffffff?text=Pusjaka";
                }}
              />
            </div>
          </div>

          {/* Kanan: Teks */}
          <div className="w-full md:w-1/2 md:pl-12 text-[var(--color-text)]">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-[var(--color-primary-dark)] leading-tight">
              Jadi Bagian dari{" "}
              <span className="text-[var(--color-accent)]">Pusjaka!</span>
            </h2>

            <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
              Pusjaka (Pustakawan Remaja Kanesa) adalah wadah penggerak literasi
              di SMKN 1 Kepanjen. Kami mendorong semangat membaca, berpikir
              kritis, dan berkontribusi aktif dalam budaya literasi sekolah.
            </p>

            <button
              onClick={() =>
                alert("Anda akan diarahkan ke formulir pendaftaran Pusjaka.")
              }
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-[var(--color-primary-dark)] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-[var(--color-accent)]/40"
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
