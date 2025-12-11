import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotang Damar Finance Track",
  description: "Prototype pencatatan keuangan sederhana.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {/* Navbar */}
        <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">
              Hotang Damar Finance Track
            </div>
            <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
              <Link href="/">Dashboard</Link>
              <Link href="/pendapatan-karyawan">Pendapatan Karyawan</Link>
              <Link href="/gaji-dibayar">Gaji Dibayar</Link>
              <Link href="/pengeluaran-barang">Pengeluaran Barang</Link>
              <Link href="/penjualan-barang">Penjualan Barang</Link>
              <Link href="/biaya-lain-lain">Biaya Lain-lain</Link>
              <Link href="/laporan">Laporan</Link>
            </nav>
          </div>
        </header>

        {/* Konten halaman */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
