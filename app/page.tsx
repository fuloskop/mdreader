"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MdFile {
  name: string;
  content: string;
}

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        dark
          ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
          : "bg-gray-100 hover:bg-gray-200 text-gray-500"
      }`}
      title={dark ? "Açık mod" : "Koyu mod"}
    >
      {dark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Home() {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dark, setDark] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mdreader-theme");
    if (saved === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark", next);
      localStorage.setItem("mdreader-theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const mdFiles = Array.from(fileList).filter(
        (f) => f.name.endsWith(".md") || f.name.endsWith(".markdown")
      );

      if (mdFiles.length === 0) return;

      Promise.all(
        mdFiles.map(
          (f) =>
            new Promise<MdFile>((resolve) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({ name: f.name, content: reader.result as string });
              reader.readAsText(f);
            })
        )
      ).then((newFiles) => {
        setFiles((prev) => {
          const existingNames = new Set(prev.map((p) => p.name));
          const unique = newFiles.filter((f) => !existingNames.has(f.name));
          return [...prev, ...unique];
        });
        if (files.length === 0) setActiveIndex(0);
      });
    },
    [files.length]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (activeIndex >= index && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const activeFile = files[activeIndex] ?? null;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        dark ? "bg-[#111111] text-[#e5e5e5]" : "bg-white text-[#1a1a1a]"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b backdrop-blur-sm sticky top-0 z-10 transition-colors ${
          dark
            ? "border-gray-800 bg-[#111111]/90"
            : "border-gray-100 bg-white/90"
        }`}
      >
        <nav className="mx-auto max-w-5xl px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => {
              setFiles([]);
              setActiveIndex(0);
            }}
            className={`text-lg font-semibold tracking-tight transition-colors ${
              dark
                ? "text-white hover:text-blue-400"
                : "text-gray-900 hover:text-blue-600"
            }`}
          >
            MD Reader
          </button>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs flex items-center gap-1.5 ${
                dark ? "text-gray-500" : "text-gray-400"
              }`}
            >
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
              <span className="hidden sm:inline">
                Dosyalarınız tarayıcınızdan çıkmaz
              </span>
            </span>
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1">
        {files.length === 0 ? (
          /* Drop Zone */
          <div
            className={`flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 transition-all duration-200 ${
              dragging
                ? dark
                  ? "bg-blue-950/30"
                  : "bg-blue-50"
                : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <div className="text-center max-w-md">
              <div
                className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200 ${
                  dragging
                    ? "bg-blue-100 scale-110"
                    : dark
                      ? "bg-gray-800/50"
                      : "bg-gray-50"
                }`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-colors ${
                    dragging
                      ? "text-blue-500"
                      : dark
                        ? "text-gray-600"
                        : "text-gray-300"
                  }`}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="12" />
                  <line x1="15" y1="15" x2="12" y2="12" />
                </svg>
              </div>

              <h1
                className={`text-2xl font-bold tracking-tight mb-2 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Markdown dosyanızı bırakın
              </h1>
              <p
                className={`mb-8 leading-relaxed ${
                  dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Dosyalarınız sunucuya gönderilmez.
                <br />
                Her şey tarayıcınızda kalır.
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-600/20"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Dosya Seç
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown"
                multiple
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFiles(e.target.files)
                }
              />

              <p
                className={`text-xs mt-4 ${
                  dark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                .md ve .markdown dosyaları desteklenir
              </p>
            </div>

            {/* Trust Badges */}
            <div
              className={`mt-20 flex flex-wrap justify-center gap-8 text-xs ${
                dark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Sıfır veri toplama
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                Sıfır cookie
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Sıfır takip
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Açık kaynak
              </span>
            </div>
          </div>
        ) : (
          /* Reader View */
          <div
            className="min-h-[calc(100vh-120px)]"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            {/* File Tabs */}
            {files.length > 1 && (
              <div
                className={`border-b ${
                  dark
                    ? "border-gray-800 bg-[#151515]"
                    : "border-gray-100 bg-gray-50/50"
                }`}
              >
                <div className="mx-auto max-w-3xl px-6 flex gap-1 overflow-x-auto py-2">
                  {files.map((file, i) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        i === activeIndex
                          ? dark
                            ? "bg-gray-800 text-white shadow-sm"
                            : "bg-white text-gray-900 shadow-sm"
                          : dark
                            ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                      }`}
                    >
                      {file.name.replace(/\.(md|markdown)$/, "")}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className={`ml-1 transition-colors ${
                          dark
                            ? "text-gray-600 hover:text-gray-400"
                            : "text-gray-300 hover:text-gray-500"
                        }`}
                      >
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Drag overlay hint */}
            {dragging && (
              <div className="fixed inset-0 bg-blue-500/10 z-20 flex items-center justify-center pointer-events-none">
                <div
                  className={`px-6 py-4 rounded-xl shadow-lg text-sm font-medium border ${
                    dark
                      ? "bg-gray-900 text-blue-400 border-blue-900"
                      : "bg-white text-blue-600 border-blue-100"
                  }`}
                >
                  Dosyayı bırakarak ekleyin
                </div>
              </div>
            )}

            {/* Markdown Content */}
            {activeFile && (
              <article className="mx-auto max-w-3xl px-6 py-10">
                <div
                  className={`flex items-center justify-between mb-8 pb-4 border-b ${
                    dark ? "border-gray-800" : "border-gray-100"
                  }`}
                >
                  <h1
                    className={`text-2xl font-bold tracking-tight ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {activeFile.name.replace(/\.(md|markdown)$/, "")}
                  </h1>
                  {files.length === 1 && (
                    <button
                      onClick={() => removeFile(0)}
                      className={`text-xs transition-colors px-3 py-1.5 rounded-lg ${
                        dark
                          ? "text-gray-500 hover:text-red-400 hover:bg-red-950/30"
                          : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      Kapat
                    </button>
                  )}
                </div>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {activeFile.content}
                  </ReactMarkdown>
                </div>
              </article>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t ${
          dark
            ? "border-gray-800 bg-[#0e0e0e]"
            : "border-gray-100 bg-gray-50/50"
        }`}
      >
        <div
          className={`mx-auto max-w-5xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${
            dark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          <span>
            Dosyalarınız tarayıcınızdan asla çıkmaz. Kaynak kodu açıktır.
          </span>
          <a
            href="https://github.com/fuloskop/mdreader"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
