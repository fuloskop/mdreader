"use client";

import { useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MdFile {
  name: string;
  content: string;
}

export default function Home() {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm sticky top-0 z-10">
        <nav className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setFiles([]);
              setActiveIndex(0);
            }}
            className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            MD Reader
          </button>
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
            Dosyalarınız tarayıcınızdan çıkmaz
          </span>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1">
        {files.length === 0 ? (
          /* Drop Zone */
          <div
            className={`flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 transition-colors ${
              dragging
                ? "bg-stone-100 dark:bg-stone-900"
                : "bg-stone-50 dark:bg-stone-950"
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
                className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  dragging
                    ? "bg-stone-200 dark:bg-stone-800"
                    : "bg-stone-100 dark:bg-stone-900"
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
                  className="text-stone-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="12" />
                  <line x1="15" y1="15" x2="12" y2="12" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold tracking-tight mb-2">
                Markdown dosyanızı bırakın
              </h1>
              <p className="text-stone-500 dark:text-stone-400 mb-6">
                Dosyalarınız sunucuya gönderilmez — her şey tarayıcınızda kalır.
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
              >
                Dosya Seç
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />

              <p className="text-xs text-stone-400 dark:text-stone-500 mt-4">
                .md ve .markdown dosyaları desteklenir
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-6 text-xs text-stone-400 dark:text-stone-500">
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
              <div className="border-b border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-950/50">
                <div className="mx-auto max-w-3xl px-6 flex gap-1 overflow-x-auto py-2">
                  {files.map((file, i) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                        i === activeIndex
                          ? "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                          : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                      }`}
                    >
                      {file.name.replace(/\.(md|markdown)$/, "")}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="ml-1 opacity-40 hover:opacity-100 transition-opacity"
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
              <div className="fixed inset-0 bg-stone-900/20 dark:bg-stone-100/10 z-20 flex items-center justify-center pointer-events-none">
                <div className="bg-white dark:bg-stone-900 px-6 py-4 rounded-xl shadow-lg text-sm font-medium">
                  Dosyayı bırakarak ekleyin
                </div>
              </div>
            )}

            {/* Markdown Content */}
            {activeFile && (
              <article className="mx-auto max-w-3xl px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {activeFile.name.replace(/\.(md|markdown)$/, "")}
                  </h1>
                  {files.length === 1 && (
                    <button
                      onClick={() => removeFile(0)}
                      className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                      Kapat
                    </button>
                  )}
                </div>
                <div className="prose dark:prose-invert prose-stone max-w-none">
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
      <footer className="border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400 dark:text-stone-500">
          <span>
            Dosyalarınız tarayıcınızdan asla çıkmaz. Kaynak kodu açıktır.
          </span>
          <a
            href="https://github.com/fuloskop/mdreader"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
