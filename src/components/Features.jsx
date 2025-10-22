import React from "react";

function Features() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-[var(--color-primary)]"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 18H2V3h20v2M6 21h5"
          />
        </svg>
      ),
      title: "Akses Mudah",
      description:
        "Nikmati kebebasan membaca di mana pun, kapan pun, tanpa batas ruang dan waktu.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-[var(--color-primary)]"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-2v7l-2.5-1.5L11 11V4H6zm0 0V4zm5-9l2.5-1.5L16 11l-2.5-1.5z"
          />
        </svg>
      ),
      title: "Belajar Modern",
      description:
        "Teknologi dan literasi berpadu: akses koleksi digital interaktif untuk mendukung gaya belajar masa kini.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-[var(--color-primary)]"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.3}
            d="M4.194 8.094a1.86 1.86 0 1 0 0-3.719a1.86 1.86 0 0 0 0 3.719M.523 13.479A3.7 3.7 0 0 1 1 11.705a3.71 3.71 0 0 1 3.195-1.868c1.31.003 2.55.727 3.195 1.868a3.7 3.7 0 0 1 .477 1.773m2.02-12.095v-.82m2.799 1.827l.671-.471m-6.271.471l-.672-.471m5.506 3.139a2.055 2.055 0 0 0-2.077-2.042a2.055 2.055 0 0 0-1.99 2.127a2.07 2.07 0 0 0 1.126 1.73v1a.227.227 0 0 0 .226.22h1.361a.227.227 0 0 0 .227-.22V6.855a2.07 2.07 0 0 0 1.128-1.797"
          />
        </svg>
      ),
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
