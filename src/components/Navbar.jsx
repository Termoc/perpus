"use client";

import React from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";

const Navbar = () => {
  // Handler fiktif untuk demo, di aplikasi nyata ini akan memicu routing atau API call
  const handleSearch = (query) => {
    // Tampilkan hasil pencarian di konsol untuk demo
    console.log("Pencarian dipicu untuk:", query);
    alert(`Pencarian dipicu untuk: ${query}. Cek konsol untuk detail.`);
  };

  return (
    <div className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="bg-blue-300 w-full h-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-blue-600 tracking-wider">
            My<span className="text-gray-800">Library</span>
          </div>

          {/* Search Bar di Tengah */}
          <div className="flex-1 hidden mx-80 md:block">
            <Searchbar onSearch={handleSearch} />
          </div>

          {/* Navigasi Link */}
          <ul className="flex items-center space-x-6 text-gray-600 font-medium">
            <li className="hover:text-blue-600 transition duration-150 cursor-pointer p-2 rounded-lg">
              <Link href={"/"}>Beranda</Link>
            </li>
            <li className="hover:text-blue-600 transition duration-150 cursor-pointer p-2 rounded-lg">
              <Link href={"/buku"}>Buku</Link>
            </li>
            <li className="hover:text-blue-600 transition duration-150 cursor-pointer p-2 rounded-lg">
              <Link href={"/artikel"}>Artikel</Link>
            </li>
          </ul>
        </div>

        {/* Search Bar untuk tampilan Mobile/Kecil (Opsional) */}
        <div className="md:hidden pb-4">
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
