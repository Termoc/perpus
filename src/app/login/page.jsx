"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login gagal");

      localStorage.setItem("token", data.token);
      alert("✅ Login berhasil!");
      router.push("/admin");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-surface-alt)] px-4">
      <div className="bg-white/80 backdrop-blur-md border border-[var(--color-primary-light)]/20 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center text-[var(--color-primary-dark)] mb-6">
          Login <span className="text-[var(--color-accent)]">Pustakawan</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email pustakawan"
            className="w-full p-3 border border-[var(--color-primary-light)]/20 rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Kata sandi"
            className="w-full p-3 border border-[var(--color-primary-light)]/20 rounded-md"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold rounded-md transition-all duration-300"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </section>
  );
}
