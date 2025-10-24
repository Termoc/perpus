"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "../utils/authCheck";
import DashboardLayout from "@/components/DashboardLayout";
import BookManager from "@/components/BookManager";
import ArticleManager from "@/components/ArticleManager";
import { LogOut, Newspaper, BookCopy } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("books");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const valid = isTokenValid();
    if (!valid) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      setIsVerified(true);
    }
  }, [router]);

  if (!isVerified) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("👋 Anda telah logout.");
    setTimeout(() => router.push("/login"), 500);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        {/* Tab Navigasi */}
        <div className="bg-white/80 backdrop-blur-md rounded-full border border-[var(--color-primary-light)]/20 shadow-sm flex p-1">
          <button
            onClick={() => setActiveTab("books")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
              activeTab === "books"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-bg)]"
            }`}
          >
            <BookCopy className="w-5 h-5" />
            <span className="hidden sm:inline">Buku</span>
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer ${
              activeTab === "articles"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-bg)]"
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="hidden sm:inline">Artikel</span>
          </button>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg shadow transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer"
          title="Keluar"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>

      {activeTab === "books" ? <BookManager /> : <ArticleManager />}
    </DashboardLayout>
  );
}
