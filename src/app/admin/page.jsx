"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "../utils/authCheck";
import DashboardLayout from "@/components/DashboardLayout";
import BookManager from "@/components/BookManager";
import ArticleManager from "@/components/ArticleManager";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("books");

  useEffect(() => {
    const valid = isTokenValid();
    if (!valid) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("👋 Anda telah logout.");
    setTimeout(() => router.push("/login"), 500);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-full border border-[var(--color-primary-light)]/20 shadow-sm flex p-1">
          <button
            onClick={() => setActiveTab("books")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "books"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-bg)]"
            }`}
          >
            📚 Buku
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "articles"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-bg)]"
            }`}
          >
            📰 Artikel
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg shadow transition-all duration-300"
        >
          🚪 Keluar
        </button>
      </div>

      {activeTab === "books" ? <BookManager /> : <ArticleManager />}
    </DashboardLayout>
  );
}
