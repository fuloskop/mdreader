import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "MD Reader",
  description:
    "Markdown dosyalarınızı güzel bir tasarımla okuyun. Sıfır veri toplama, sıfır cookie, sıfır takip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100`}
      >
        <header className="border-b border-stone-200 dark:border-stone-800">
          <nav className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
            >
              MD Reader
            </Link>
            <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Veri toplamıyoruz
            </span>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>

        <footer className="border-t border-stone-200 dark:border-stone-800 mt-20">
          <div className="mx-auto max-w-3xl px-6 py-6 text-center text-sm text-stone-400 dark:text-stone-500">
            Sıfır cookie · Sıfır analytics · Sıfır takip · Tamamen statik
          </div>
        </footer>
      </body>
    </html>
  );
}
