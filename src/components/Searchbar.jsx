import { useState } from "react";
import { Search } from "lucide-react";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => setSearchTerm(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-xl mx-auto"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Cari buku, penulis, atau kategori..."
        className="w-full rounded-full py-2.5 pl-5 pr-12 text-[var(--color-text)] bg-white/80 backdrop-blur-md border border-[var(--color-primary-light)]/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300 placeholder:text-[var(--color-text-muted)]"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search"
      />

      {/* Tombol ikon */}
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--color-accent)] text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-dark)] transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-[var(--color-accent)]/50"
        aria-label="Submit Search"
      >
        <Search size={20} className="font-bold" />
      </button>
    </form>
  );
};

export default Searchbar;
