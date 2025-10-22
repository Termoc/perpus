import { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Panggil fungsi pencarian yang diberikan dari komponen parent
    if (onSearch) {
      console.log("Searching for:", searchTerm);
      onSearch(searchTerm);
    }
  };

  return (
    <form
      // Styling ringkas untuk di dalam Navbar
      className="w-full max-w-xl flex items-center bg-gray-100 border border-gray-300 rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Cari buku atau artikel..."
        className="flex-grow py-2 px-1 text-gray-700 leading-tight focus:outline-none bg-transparent ml-4"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search"
      />

      <button
        type="submit"
        // Tombol kecil hanya berisi ikon
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 h-full transition duration-150 ease-in-out"
        aria-label="Search Submit"
      >
        <div className="p-2 pl-3">
          {/* Ikon Pencarian */}
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </button>
    </form>
  );
};

export default Searchbar;
