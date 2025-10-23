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
                  className="object-contain"
                  sizes="40px"
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
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                          <circle cx="16.8" cy="7.2" r="1.1" />
                          <path d="M20.5 6.1A4.6 4.6 0 0 0 17.9 3.5a6.5 6.5 0 0 0-2.2-.4c-.9 0-1.3-.1-3.7-.1s-2.8 0-3.7.1A6.5 6.5 0 0 0 6.1 3.5 4.6 4.6 0 0 0 3.5 6.1 6.5 6.5 0 0 0 3 8.3c0 .9 0 1.3 0 3.7s0 2.8 0 3.7a6.5 6.5 0 0 0 .4 2.2 4.6 4.6 0 0 0 2.6 2.6 6.5 6.5 0 0 0 2.2.4c.9 0 1.3.1 3.7.1s2.8 0 3.7-.1a6.5 6.5 0 0 0 2.2-.4 4.6 4.6 0 0 0 2.6-2.6 6.5 6.5 0 0 0 .4-2.2c0-.9.1-1.3.1-3.7s0-2.8-.1-3.7a6.5 6.5 0 0 0-.4-2.2Z" />
                        </svg>
                      )}
                      {item.icon === "mail" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20 4H6a2 2 0 0 0-2 2v5h2V8l6.4 4.8a1 1 0 0 0 1.2 0L20 8v9h-8v2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-7 6.7L6.7 6h12.6L13 10.7Z" />
                          <path d="M2 12h7v2H2Zm2 3h6v2H4Zm3 3h4v2H7Z" />
                        </svg>
                      )}
                      {item.icon === "whatsapp" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12.05 3A9 9 0 0 0 3 12.05a9 9 0 0 0 1.2 4.5L3 21l4.6-1.2A9 9 0 1 0 12.05 3Zm0 15.5a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2.4.6.6-2.4-.2-.3A6.5 6.5 0 1 1 12 18.5Zm3.2-4.1c-.2-.1-1.2-.6-1.4-.7s-.3-.1-.4.1l-.7.8c-.1.1-.2.2-.4.1s-.8-.3-1.6-1.1-1.1-1.3-1.2-1.5-.01-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3s.03-.2 0-.3-.5-1.2-.7-1.6c-.2-.4-.4-.4-.5-.4H8a.8.8 0 0 0-.6.3c-.2.2-.8.8-.8 1.8s.8 2.2.9 2.3 1.4 2.1 3.5 3.1c.5.2.9.4 1.2.5.5.1 1 .1 1.4.1.4-.1 1.2-.5 1.4-1s.2-.9.1-1-.2-.1-.4-.2Z" />
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
