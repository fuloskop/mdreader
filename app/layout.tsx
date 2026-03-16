import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script that runs before paint to prevent white flash.
  // Reads saved theme from localStorage and sets CSS variables immediately.
  const themeScript = `(function(){try{var t=localStorage.getItem("mdreader-theme-id");if(!t)return;var m={paper:{bg:"#FAFAFA",text:"#1A1A2E",heading:"#0F0F1A",muted:"#6B7280",link:"#2563EB",codeBg:"#F0F0F5",border:"#E2E4E9",preBorder:"#E2E4E9",blockquoteBg:"#F5F5FA",blockquoteBorder:"#D0D4E0",tableHeadBg:"#F0F0F5"},sepia:{bg:"#FBF0D9",text:"#5C4B37",heading:"#3E2F20",muted:"#8B7355",link:"#7C4D1A",codeBg:"#F0E4C8",border:"#E6D5B8",preBorder:"#E6D5B8",blockquoteBg:"#F5EBD4",blockquoteBorder:"#D4C09A",tableHeadBg:"#F0E4C8"},sage:{bg:"#EEF1E6",text:"#37422A",heading:"#2A331F",muted:"#6B7A5E",link:"#4A6741",codeBg:"#E2E8D5",border:"#CDD5BC",preBorder:"#CDD5BC",blockquoteBg:"#E5EAD9",blockquoteBorder:"#B5C09A",tableHeadBg:"#E2E8D5"},"soft-dark":{bg:"#1A1B23",text:"#CDD5E0",heading:"#E4E8EF",muted:"#8891A0",link:"#7DAED4",codeBg:"#22242E",border:"#2E3140",preBorder:"#2E3140",blockquoteBg:"#20222C",blockquoteBorder:"#3A4058",tableHeadBg:"#22242E"},oled:{bg:"#000000",text:"#D4D4D4",heading:"#E8E8E8",muted:"#7A7A7A",link:"#6DB3F2",codeBg:"#111111",border:"#222222",preBorder:"#222222",blockquoteBg:"#0A0A0A",blockquoteBorder:"#333333",tableHeadBg:"#111111"},dusk:{bg:"#1C1917",text:"#D6CEBF",heading:"#E8E0D0",muted:"#8C8478",link:"#C4915C",codeBg:"#252119",border:"#33302A",preBorder:"#33302A",blockquoteBg:"#221F19",blockquoteBorder:"#4A4238",tableHeadBg:"#252119"}};var d=m[t];if(!d)return;var s=document.documentElement.style;s.setProperty("--theme-bg",d.bg);s.setProperty("--theme-text",d.text);s.setProperty("--theme-heading",d.heading);s.setProperty("--theme-muted",d.muted);s.setProperty("--theme-link",d.link);s.setProperty("--theme-code-bg",d.codeBg);s.setProperty("--theme-border",d.border);s.setProperty("--theme-pre-border",d.preBorder);s.setProperty("--theme-blockquote-bg",d.blockquoteBg);s.setProperty("--theme-blockquote-border",d.blockquoteBorder);s.setProperty("--theme-table-head-bg",d.tableHeadBg);document.body.style.background=d.bg;document.body.style.color=d.text}catch(e){}})()`;

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
