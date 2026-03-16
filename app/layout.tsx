import type { Metadata } from "next";
import Script from "next/script";
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
  title: "MD Reader — Gizlilik Oncelikli Markdown Okuyucu",
  description:
    "Markdown dosyalarınızı tarayıcınızda okuyun. Dosyalarınız asla sunucuya gönderilmez.",
};

// Blocking script: reads saved theme from localStorage and applies it
// on <html> BEFORE first paint. No flash.
const themeScript = `(function(){try{
var t=localStorage.getItem("mdreader-theme-id");
if(!t)return;
var m={paper:{bg:"#FAFAFA",t:"#1A1A2E"},sepia:{bg:"#FBF0D9",t:"#5C4B37"},sage:{bg:"#EEF1E6",t:"#37422A"},"soft-dark":{bg:"#1A1B23",t:"#CDD5E0"},oled:{bg:"#000000",t:"#D4D4D4"},dusk:{bg:"#1C1917",t:"#D6CEBF"}};
var d=m[t];if(!d)return;
var h=document.documentElement;
h.style.background=d.bg;
h.style.color=d.t;
}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
