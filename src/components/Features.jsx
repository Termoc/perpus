import React from "react";

function Features() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-1-3m-6.938-2.525a4.5 4.5 0 116.364 0L12 17l-1.414-1.414a4.5 4.5 0 01-6.364 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      title: "Akses Mudah",
      description:
        "Buka koleksi buku dan artikel kapan saja, di mana saja, tanpa batas ruang dan waktu.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5A2.5 2.5 0 005 7.5c0 1.348.835 2.529 2.074 3.013M12 6.253C13.168 5.477 14.795 5 16.5 5A2.5 2.5 0 0119 7.5c0 1.348-.835 2.529-2.074 3.013M12 12h.01M12 19.253v-2.677M12 19.253c-1.168.776-2.694 1.246-4.253.978M12 19.253c1.168.776 2.694 1.246 4.253.978M4.25 10.25h15.5c.414 0 .75.336.75.75v3.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-3.5c0-.414.336-.75.75-.75z"
          />
        </svg>
      ),
      title: "Belajar Modern",
      description:
        "Buka koleksi buku dan artikel kapan saja, di mana saja, tanpa batas ruang dan waktu.", // Menggunakan deskripsi yang sama seperti contoh
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9h2m-2 4h4m-4 4h4m-4 4h4m-4 4h4m-4 4h4"
          />
        </svg>
      ),
      title: "Kreatif & Inovatif",
      description:
        "Mendorong siswa untuk gemar membaca, memperluas wawasan, dan berkembang lebih kreatif.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 text-gray-800 flex justify-center">
      <div className="flex flex-col md:flex-row max-w-7xl items-center bg-white rounded-xl shadow-2xl overflow-hidden p-8 md:p-12 justify-center">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Judul Utama */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 leading-tight">
            Belajar Lebih Mudah dengan Perpustakaan{" "}
            <br className="hidden sm:inline" /> Digital Kanesa
          </h2>

          {/* Grid Fitur */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
