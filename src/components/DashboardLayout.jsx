"use client";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative min-h-screen bg-[var(--color-surface-alt)] py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 via-transparent to-[var(--color-accent-bg)]/20"></div>

      <div className="relative container mx-auto px-6 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-[var(--color-primary-dark)]">
          Dashboard{" "}
          <span className="text-[var(--color-accent)]">Pustakawan</span>
        </h1>

        <div className="bg-white/80 backdrop-blur-lg border border-[var(--color-primary-light)]/15 rounded-2xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
