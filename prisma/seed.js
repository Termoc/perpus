import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Filsafat dan Psikologi",
      description:
        "Jelajahi pemikiran mendalam tentang eksistensi, pengetahuan, dan pemahaman tentang perilaku dan mental manusia.",
      bgImage: "/books/category/psikologi.png",
    },
    {
      name: "Sejarah dan Biografi",
      description:
        "Dokumentasi peristiwa masa lalu, peradaban, dan kisah hidup tokoh-tokoh inspiratif dunia.",
      bgImage: "/books/category/sejarah.png",
    },
    {
      name: "Budaya, Agama, dan Sosial",
      description:
        "Koleksi sumber dan literatur keagamaan untuk memperkaya pemahaman spiritual dan nilai-nilai moral.",
      bgImage: "/books/category/agama.jpg",
    },
    {
      name: "Sastra dan Bahasa",
      description:
        "Materi untuk mempelajari berbagai bahasa, dari tata bahasa hingga sastra dan komunikasi praktis.",
      bgImage: "/books/category/bahasa.jpg",
    },
    {
      name: "Seni dan Kreativitas",
      description:
        "Pelajari teknik dan karya seni, seperti seni rupa, seni musik, dan seni teater.",
      bgImage: "/books/category/seni.jpg",
    },
    {
      name: "Sains dan Teknologi Terapan",
      description:
        "Dokumentasi ilmu pengetahuan dan teknologi, dari fisika, kimia, dan teknologi informasi.",
      bgImage: "/books/category/teknologi.jpg",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
    });
  }

  console.log("✅ Semua kategori berhasil dimasukkan ke database!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
