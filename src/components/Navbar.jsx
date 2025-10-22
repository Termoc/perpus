"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar utama */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-[var(--color-surface)]/80 shadow-md border-b border-[var(--color-primary)]/15"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3 md:py-4 max-w-7xl mx-auto">
          {/* Tombol Menu (mobile) */}
          <button
            className="p-2 rounded-lg bg-white/70 hover:bg-[var(--color-accent-bg)] transition-all shadow-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} className="text-[var(--color-primary-dark)]" />
          </button>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <Searchbar />
          </div>

          {/* Logo + Text */}
          <div className="flex items-center bg-white/90 rounded-xl px-3 py-2 shadow-sm border border-[var(--color-primary)]/10">
            <img src="library.svg" alt="logo" className="w-8 h-8 mr-2" />
            <div className="leading-tight">
              <p className="text-[var(--color-primary)] font-bold text-sm">
                PERPUSTAKAAN DIGITAL
              </p>
              <p className="text-[var(--color-text-muted)] text-xs font-semibold">
                SMKN 1 Kepanjen
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-surface)] shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-[var(--color-primary)]/10">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            Menu
          </h2>
          <button
            className="p-2 hover:bg-[var(--color-surface-alt)] rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Isi sidebar */}
        <ul className="flex flex-col gap-2 p-4">
          {["Beranda", "Daftar Buku", "Artikel", "Pustakawan"].map(
            (item, i) => (
              <li
                key={i}
                className="p-2 rounded-md hover:bg-[var(--color-accent-bg)] transition-all"
              >
                <a
                  href="#"
                  className="flex items-center text-[var(--color-primary-dark)] font-medium hover:text-[var(--color-accent-dark)]"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
