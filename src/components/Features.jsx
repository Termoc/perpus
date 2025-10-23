import React from "react";
import { BookCheck, LaptopMinimal, Lightbulb } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <BookCheck size={50} />,
      title: "Akses Mudah",
      description:
        "Nikmati kebebasan membaca di mana pun, kapan pun, tanpa batas ruang dan waktu.",
    },
    {
      icon: <LaptopMinimal size={50} />,
      title: "Belajar Modern",
      description:
        "Teknologi dan literasi berpadu: akses koleksi digital interaktif untuk mendukung gaya belajar masa kini.",
    },
    {
      icon: <Lightbulb size={50} />,
      title: "Kreatif & Inovatif",
      description:
        "Dorong imajinasi tanpa batas dan kembangkan ide-ide brilian melalui sumber bacaan inspiratif.",
    },
  ];

  return (
    <section className="relative bg-[var(--color-surface-alt)] py-20 md:py-28 overflow-hidden">
      {/* Ornamen gradient halus */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-6xl text-center">
        {/* Judul Utama */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-16 text-[var(--color-primary-dark)]">
          Belajar Lebih Mudah dengan{" "}
          <span className="text-[var(--color-accent)]">
            Perpustakaan Kanesa
          </span>
        </h2>

        {/* Grid Fitur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-[var(--color-primary-light)]/10 hover:border-[var(--color-accent)]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Ikon */}
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-[var(--color-accent-bg)] text-[var(--color-primary)] shadow-inner ring-4 ring-[var(--color-accent)]/20 group-hover:ring-[var(--color-accent)]/40 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Teks */}
              <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-dark)]">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
