import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1A1B23" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lookmd.dev"),
  title: "LookMD — Privacy-First Markdown Reader",
  description:
    "Read and preview Markdown files beautifully in your browser. No uploads, no tracking, no cookies. 100% client-side — your files never leave your device.",
  keywords: [
    "markdown reader",
    "markdown viewer",
    "markdown preview",
    "md reader",
    "md viewer",
    "privacy markdown",
    "offline markdown reader",
    "browser markdown reader",
    "github flavored markdown",
    "gfm viewer",
    "markdown dosya okuyucu",
    "markdown renderer",
    "client-side markdown",
    "no upload markdown",
    "free markdown reader",
  ],
  applicationName: "LookMD",
  authors: [{ name: "LookMD", url: "https://lookmd.dev" }],
  creator: "LookMD",
  publisher: "LookMD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://lookmd.dev",
    title: "LookMD — Privacy-First Markdown Reader",
    description:
      "Read and preview Markdown files beautifully in your browser. No uploads, no tracking, no cookies. Your files never leave your device.",
    siteName: "LookMD",
    locale: "en_US",
    alternateLocale: ["tr_TR", "es_ES", "fr_FR", "de_DE", "pt_BR", "ja_JP", "ko_KR", "zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LookMD — Privacy-First Markdown Reader",
    description:
      "Read Markdown files beautifully in your browser. No uploads, no tracking, no cookies.",
  },
  alternates: {
    canonical: "https://lookmd.dev",
  },
  category: "Utility",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LookMD",
              url: "https://lookmd.dev",
              description:
                "Privacy-first Markdown reader. Read your Markdown files beautifully in your browser with zero data collection.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              browserRequirements: "Requires a modern web browser",
              featureList: [
                "Client-side Markdown rendering",
                "GitHub Flavored Markdown support",
                "Zero data collection",
                "No cookies or tracking",
                "Drag and drop file upload",
                "Paste from clipboard",
                "6 beautiful reading themes",
                "18 language support",
                "Resizable content width",
                "Multiple file tabs",
              ],
              inLanguage: [
                "en", "tr", "es", "fr", "de", "pt",
                "ru", "zh", "ja", "ko", "ar", "hi",
                "it", "nl", "pl", "uk", "sv", "id",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
try{
var t=localStorage.getItem("mdreader-theme-id");
if(!t||t==="soft-dark")return;
var m={paper:{bg:"#FAFAFA",c:"#1A1A2E",hd:"#0F0F1A",mu:"#6B7280",lk:"#2563EB",cb:"#F0F0F5",bd:"#E2E4E9",pb:"#E2E4E9",bb:"#F5F5FA",bc:"#D0D4E0",th:"#F0F0F5"},sepia:{bg:"#FBF0D9",c:"#5C4B37",hd:"#3E2F20",mu:"#8B7355",lk:"#7C4D1A",cb:"#F0E4C8",bd:"#E6D5B8",pb:"#E6D5B8",bb:"#F5EBD4",bc:"#D4C09A",th:"#F0E4C8"},sage:{bg:"#EEF1E6",c:"#37422A",hd:"#2A331F",mu:"#6B7A5E",lk:"#4A6741",cb:"#E2E8D5",bd:"#CDD5BC",pb:"#CDD5BC",bb:"#E5EAD9",bc:"#B5C09A",th:"#E2E8D5"},"soft-dark":{bg:"#1A1B23",c:"#CDD5E0",hd:"#E4E8EF",mu:"#8891A0",lk:"#7DAED4",cb:"#22242E",bd:"#2E3140",pb:"#2E3140",bb:"#20222C",bc:"#3A4058",th:"#22242E"},oled:{bg:"#000000",c:"#D4D4D4",hd:"#E8E8E8",mu:"#7A7A7A",lk:"#6DB3F2",cb:"#111111",bd:"#222222",pb:"#222222",bb:"#0A0A0A",bc:"#333333",th:"#111111"},dusk:{bg:"#1C1917",c:"#D6CEBF",hd:"#E8E0D0",mu:"#8C8478",lk:"#C4915C",cb:"#252119",bd:"#33302A",pb:"#33302A",bb:"#221F19",bc:"#4A4238",th:"#252119"}};
var d=m[t];if(!d)return;
var s=document.documentElement.style;
s.setProperty("--theme-bg",d.bg);
s.setProperty("--theme-text",d.c);
s.setProperty("--theme-heading",d.hd);
s.setProperty("--theme-muted",d.mu);
s.setProperty("--theme-link",d.lk);
s.setProperty("--theme-code-bg",d.cb);
s.setProperty("--theme-border",d.bd);
s.setProperty("--theme-pre-border",d.pb);
s.setProperty("--theme-blockquote-bg",d.bb);
s.setProperty("--theme-blockquote-border",d.bc);
s.setProperty("--theme-table-head-bg",d.th);
document.documentElement.style.background=d.bg;
}catch(e){}})()`,
          }}
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
