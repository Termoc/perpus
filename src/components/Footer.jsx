"use client";
import React from "react";
import Image from "next/image";

const socialLinks = [
  {
    icon: "instagram",
    text: "@kanesa.library",
    link: "https://instagram.com/kanesa.library",
  },
  {
    icon: "mail",
    text: "pusjaka.kanesa@gmail.com",
    link: "mailto:pusjaka.kanesa@gmail.com",
  },
  {
    icon: "whatsapp",
    text: "Saluran Whatsapp",
    link: "https://wa.me/6281234567890",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white pt-16 border-t border-[var(--color-primary)]/20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Atas */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12">
          {/* Kiri: Deskripsi */}
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4 gap-3">
              <div className="relative w-10 h-10 bg-white/90 rounded-lg p-1">
                <Image
                  src="/library.svg"
                  alt="Logo Perpustakaan"
                  fill
                  className="relative w-10 h-10 bg-white/90 rounded-lg p-1"
                  priority
                />
              </div>
              <span className="text-xl font-bold leading-tight text-[var(--color-accent)]">
                PERPUSTAKAAN DIGITAL <br /> SMKN 1 Kepanjen
              </span>
            </div>
            <p className="text-sm text-[var(--color-accent-bg)] leading-relaxed max-w-lg">
              Kami menjembatani semangat membaca siswa dengan dunia digital.
              Koleksi kami membuka wawasan, menumbuhkan kreativitas, dan
              mendukung pendidikan yang berkelanjutan.
            </p>
          </div>

          {/* Kanan: Sosial */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <ul className="space-y-4">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-transform duration-200"
                  >
                    <span className="p-3 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded-full shadow-md text-lg group-hover:scale-110 transition-transform">
                      {item.icon === "instagram" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000"
                            d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248a4.623 4.623 0 0 0 0-9.248m0 7.627a3.004 3.004 0 1 1 0-6.008a3.004 3.004 0 0 1 0 6.008"
                          ></path>
                          <circle
                            cx={16.806}
                            cy={7.207}
                            r={1.078}
                            fill="#000"
                          ></circle>
                          <path
                            fill="#000"
                            d="M20.533 6.111A4.6 4.6 0 0 0 17.9 3.479a6.6 6.6 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.6 6.6 0 0 0-2.184.42a4.6 4.6 0 0 0-2.633 2.632a6.6 6.6 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71s0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632a6.6 6.6 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.6 6.6 0 0 0 2.186-.419a4.6 4.6 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186c.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.6 6.6 0 0 0-.421-2.217m-1.218 9.532a5 5 0 0 1-.311 1.688a3 3 0 0 1-1.712 1.711a5 5 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055c-2.438 0-2.687 0-3.655-.055a5 5 0 0 1-1.669-.311a3 3 0 0 1-1.719-1.711a5.1 5.1 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654s0-2.686.053-3.655a5 5 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5 5 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a5 5 0 0 1 1.67.311a3 3 0 0 1 1.712 1.712a5.1 5.1 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s0 2.698-.043 3.654z"
                          ></path>
                        </svg>
                      )}
                      {item.icon === "mail" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000"
                            d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1 1 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2m-7 6.75L6.666 6h12.668z"
                          ></path>
                          <path
                            fill="#000"
                            d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"
                          ></path>
                        </svg>
                      )}
                      {item.icon === "whatsapp" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M18.403 5.633A8.92 8.92 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977c0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a9 9 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.93 8.93 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.45 7.45 0 0 1-3.798-1.041l-.272-.162l-2.824.741l.753-2.753l-.177-.282a7.45 7.45 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.4 7.4 0 0 1 5.275 2.188a7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73s-.354-.112-.504.112s-.58.729-.711.879s-.262.168-.486.056s-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393s.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666c-.181-.435-.366-.377-.504-.383a10 10 0 0 0-.429-.008a.83.83 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321s1.582 2.415 3.832 3.387c.536.231.954.369 1.279.473c.537.171 1.026.146 1.413.089c.431-.064 1.327-.542 1.514-1.066s.187-.973.131-1.067s-.207-.151-.43-.263"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </span>
                    <span className="text-[var(--color-accent-bg)] group-hover:text-white transition">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bawah */}
        <div className="text-center border-t border-[var(--color-accent)]/20 pt-6 pb-8 mt-4">
          <p className="text-xs text-[var(--color-accent-bg)]">
            © 2025 Perpustakaan Digital Kanesa | Dikembangkan oleh{" "}
            <span className="text-[var(--color-accent)] font-medium">
              TempVerse
            </span>{" "}
            | Dikelola oleh{" "}
            <span className="text-[var(--color-accent)] font-medium">
              Pustakawan Remaja Kanesa
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
