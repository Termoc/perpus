import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// === Font Configuration ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// === Metadata Configuration ===
export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3000"),
  title: {
    default: "Perpustakaan Digital SMKN 1 Kepanjen",
    template: "%s | Perpus SMKN 1 Kepanjen",
  },
  description:
    "Jelajahi ribuan koleksi buku dan artikel digital — kapan pun, di mana pun.",
  keywords: [
    "perpustakaan digital",
    "SMKN 1 Kepanjen",
    "buku online",
    "artikel",
    "literasi sekolah",
  ],
  authors: [{ name: "Tim Perpustakaan SMKN 1 Kepanjen" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Perpustakaan Digital SMKN 1 Kepanjen",
    description: "Platform baca digital modern untuk pelajar SMKN 1 Kepanjen.",
    url: "https://pusjaka.vercel.app/",
    siteName: "Perpus SMKN 1 Kepanjen",
    images: [
      {
        url: "/images/perpus.png",
        width: 1200,
        height: 630,
        alt: "Perpustakaan Digital SMKN 1 Kepanjen",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perpustakaan Digital SMKN 1 Kepanjen",
    description: "Eksplorasi buku dan artikel digital dari Pusjaka Kanesa.",
    images: ["/images/perpus.png"],
  },
};

// === Root Layout ===
export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-surface)] text-[var(--color-text)]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
