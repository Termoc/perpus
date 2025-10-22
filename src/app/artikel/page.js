import Articlecard from "@/components/Articlecard";
import React from "react";

const latestArticle = {
  title:
    "Mengenal Lebih Dekat SMKN 1 Kepanjen: Pusat Pendidikan Vokasi di Malang",
  image:
    "https://placehold.co/300x200/2196F3/FFFFFF?text=Kanesa+Classic+Reunion",
  category: "#Pendidikan",
  time: "2 hari yang lalu",
};

function Artikel() {
  return (
    <div className="text-xl font-semibold mb-6 h-auto p-10 flex flex-col items-center gap-5">
      <Articlecard article={latestArticle} />
      <Articlecard article={latestArticle} />
      <Articlecard article={latestArticle} />
      <Articlecard article={latestArticle} />
    </div>
  );
}

export default Artikel;
