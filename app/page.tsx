"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { t, locales, localeNames, type Locale } from "@/lib/i18n";
import { themes, getTheme, type Theme } from "@/lib/themes";

interface MdFile {
  name: string;
  content: string;
}

function applyTheme(theme: Theme) {
  const s = document.documentElement.style;
  s.setProperty("--theme-bg", theme.bg);
  s.setProperty("--theme-text", theme.text);
  s.setProperty("--theme-heading", theme.heading);
  s.setProperty("--theme-muted", theme.muted);
  s.setProperty("--theme-link", theme.link);
  s.setProperty("--theme-code-bg", theme.codeBg);
  s.setProperty("--theme-border", theme.border);
  s.setProperty("--theme-pre-border", theme.preBorder);
  s.setProperty("--theme-blockquote-bg", theme.blockquoteBg);
  s.setProperty("--theme-blockquote-border", theme.blockquoteBorder);
  s.setProperty("--theme-table-head-bg", theme.tableHeadBg);
}

function ThemePicker({
  current,
  onChange,
  theme,
}: {
  current: string;
  onChange: (id: string) => void;
  theme: Theme;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-sm"
        style={{
          background: theme.category === "dark" ? "#2a2a2a" : "#f0f0f0",
          color: theme.text,
        }}
        title="Theme"
      >
        {themes.find((t) => t.id === current)?.icon ?? "☀️"}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-2 z-30 rounded-xl shadow-lg border p-1.5 min-w-[180px]"
            style={{
              background: theme.bg,
              borderColor: theme.border,
            }}
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onChange(t.id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
                style={{
                  background:
                    t.id === current
                      ? theme.category === "dark"
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)"
                      : "transparent",
                  color: theme.text,
                }}
              >
                <span className="text-base">{t.icon}</span>
                <span className="flex-1 text-left">{t.name}</span>
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{
                    background: t.bg,
                    borderColor: t.border,
                  }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LangSelect({
  locale,
  onChange,
  theme,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
  theme: Theme;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="text-xs rounded-lg pl-2.5 pr-7 py-1.5 border transition-colors cursor-pointer appearance-none"
        style={{
          background: theme.category === "dark" ? "#2a2a2a" : "#ffffff",
          borderColor: theme.border,
          color: theme.muted,
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.muted}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-2 pointer-events-none"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [handleIntro, setHandleIntro] = useState(false);
  const [themeId, setThemeId] = useState("paper");
  const [locale, setLocale] = useState<Locale>("en");
  const [contentWidth, setContentWidth] = useState(768);
  const resizingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = getTheme(themeId);
  const dark = theme.category === "dark";
  const i = t(locale);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mdreader-theme-id");
    if (savedTheme) {
      const th = getTheme(savedTheme);
      setThemeId(th.id);
      applyTheme(th);
    } else {
      applyTheme(getTheme("paper"));
    }
    const savedLocale = localStorage.getItem("mdreader-locale");
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      setLocale(savedLocale as Locale);
    } else {
      // Auto-detect from browser language
      const browserLang = navigator.language.split("-")[0] as Locale;
      if (locales.includes(browserLang)) {
        setLocale(browserLang);
      }
    }
    const savedWidth = localStorage.getItem("mdreader-width");
    if (savedWidth) {
      setContentWidth(Math.max(400, Math.min(1400, parseInt(savedWidth))));
    }
  }, []);

  const changeTheme = (id: string) => {
    const th = getTheme(id);
    setThemeId(th.id);
    applyTheme(th);
    localStorage.setItem("mdreader-theme-id", th.id);
  };

  const changeLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("mdreader-locale", l);
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
        if (files.length === 0) {
          setActiveIndex(0);
          // Show handle animation for 10s on first file open
          setHandleIntro(true);
          setTimeout(() => setHandleIntro(false), 10000);
        }
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

  const startResize = useCallback(
    (e: React.MouseEvent, direction: "right" | "left") => {
      e.preventDefault();
      resizingRef.current = true;
      const startX = e.clientX;
      const startWidth = contentWidth;

      const onMouseMove = (ev: MouseEvent) => {
        if (!resizingRef.current) return;
        const delta =
          direction === "right"
            ? ev.clientX - startX
            : startX - ev.clientX;
        const newWidth = Math.max(400, Math.min(1400, startWidth + delta * 2));
        setContentWidth(newWidth);
      };

      const onMouseUp = () => {
        resizingRef.current = false;
        setContentWidth((w) => {
          localStorage.setItem("mdreader-width", String(w));
          return w;
        });
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [contentWidth]
  );

  const activeFile = files[activeIndex] ?? null;

  const gripDotColor = dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)";
  const glowColor = theme.link;

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* Header */}
      <header
        className="border-b backdrop-blur-sm sticky top-0 z-10 transition-colors"
        style={{
          borderColor: theme.border,
          background: `color-mix(in srgb, ${theme.bg} 90%, transparent)`,
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => {
              setFiles([]);
              setActiveIndex(0);
            }}
            className="text-lg font-semibold tracking-tight transition-colors"
            style={{ color: theme.heading }}
          >
            MD Reader
          </button>
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs items-center gap-1.5 hidden md:flex"
              style={{ color: theme.muted }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {i.privacy}
            </span>
            <LangSelect locale={locale} onChange={changeLocale} theme={theme} />
            <ThemePicker current={themeId} onChange={changeTheme} theme={theme} />
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1">
        {files.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 transition-all duration-200"
            style={{
              background: dragging
                ? `color-mix(in srgb, ${theme.link} 8%, ${theme.bg})`
                : theme.bg,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <div className="text-center max-w-md">
              <div
                className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200"
                style={{
                  background: dragging
                    ? `color-mix(in srgb, ${theme.link} 15%, ${theme.bg})`
                    : `color-mix(in srgb, ${theme.border} 50%, ${theme.bg})`,
                  transform: dragging ? "scale(1.1)" : "scale(1)",
                }}
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
                  style={{ color: dragging ? theme.link : theme.muted }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="12" />
                  <line x1="15" y1="15" x2="12" y2="12" />
                </svg>
              </div>

              <h1
                className="text-2xl font-bold tracking-tight mb-2"
                style={{ color: theme.heading }}
              >
                {i.dropTitle}
              </h1>
              <p className="mb-8 leading-relaxed" style={{ color: theme.muted }}>
                {i.dropDesc1}
                <br />
                {i.dropDesc2}
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all shadow-sm"
                style={{
                  background: theme.link,
                  boxShadow: `0 2px 8px color-mix(in srgb, ${theme.link} 25%, transparent)`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {i.chooseFile}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />

              <p className="text-xs mt-4" style={{ color: theme.muted }}>
                {i.supported}
              </p>
            </div>

            {/* Trust Badges */}
            <div
              className="mt-20 flex flex-wrap justify-center gap-8 text-xs"
              style={{ color: theme.muted }}
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {i.zeroData}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                {i.zeroCookie}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {i.zeroTracking}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                {i.openSource}
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
            {files.length > 1 && (
              <div
                className="border-b"
                style={{
                  borderColor: theme.border,
                  background: `color-mix(in srgb, ${theme.border} 20%, ${theme.bg})`,
                }}
              >
                <div
                  className="mx-auto px-6 flex gap-1 overflow-x-auto py-2"
                  style={{ maxWidth: contentWidth + 48 }}
                >
                  {files.map((file, idx) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveIndex(idx)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors"
                      style={{
                        background:
                          idx === activeIndex
                            ? theme.bg
                            : "transparent",
                        color:
                          idx === activeIndex
                            ? theme.heading
                            : theme.muted,
                        boxShadow:
                          idx === activeIndex
                            ? "0 1px 3px rgba(0,0,0,0.08)"
                            : "none",
                      }}
                    >
                      {file.name.replace(/\.(md|markdown)$/, "")}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        style={{ color: theme.muted, opacity: 0.5 }}
                        className="ml-1 hover:opacity-100 transition-opacity"
                      >
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dragging && (
              <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
                style={{ background: `color-mix(in srgb, ${theme.link} 8%, transparent)` }}
              >
                <div
                  className="px-6 py-4 rounded-xl shadow-lg text-sm font-medium border"
                  style={{
                    background: theme.bg,
                    color: theme.link,
                    borderColor: theme.border,
                  }}
                >
                  {i.dropToAdd}
                </div>
              </div>
            )}

            {activeFile && (
              <div className="relative flex justify-center">
                <article
                  className="px-6 py-10 w-full"
                  style={{ maxWidth: contentWidth }}
                >
                  <div
                    className="flex items-center justify-between mb-8 pb-4 border-b"
                    style={{ borderColor: theme.border }}
                  >
                    <h1
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: theme.heading }}
                    >
                      {activeFile.name.replace(/\.(md|markdown)$/, "")}
                    </h1>
                    {files.length === 1 && (
                      <button
                        onClick={() => removeFile(0)}
                        className="text-xs transition-colors px-3 py-1.5 rounded-lg hover:opacity-70"
                        style={{ color: theme.muted }}
                      >
                        {i.close}
                      </button>
                    )}
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activeFile.content}
                    </ReactMarkdown>
                  </div>
                </article>

                {/* Right resize handle */}
                <div
                  onMouseDown={(e) => startResize(e, "right")}
                  className={`resize-handle absolute top-0 h-full w-14 cursor-col-resize hidden md:flex items-start justify-center${handleIntro ? " intro-active" : ""}`}
                  style={{ right: `calc(50% - ${contentWidth / 2 + 28}px)` }}
                >
                  <div className="sticky top-1/2 flex items-center gap-2">
                    {/* Grip dots column */}
                    <div className="grip-dots flex flex-col gap-[6px] items-center">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
                        <div key={j} className="flex gap-[4px]">
                          <div className="w-[4px] h-[4px] rounded-full" style={{ background: gripDotColor }} />
                          <div className="w-[4px] h-[4px] rounded-full" style={{ background: gripDotColor }} />
                        </div>
                      ))}
                    </div>
                    {/* Glow line */}
                    <div
                      className="glow-line w-[3px] h-20 rounded-full"
                      style={{ background: glowColor, boxShadow: `0 0 8px ${glowColor}` }}
                    />
                    {/* Pull arrow */}
                    <div className="pull-arrow pull-right">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Left resize handle */}
                <div
                  onMouseDown={(e) => startResize(e, "left")}
                  className={`resize-handle absolute top-0 h-full w-14 cursor-col-resize hidden md:flex items-start justify-center${handleIntro ? " intro-active" : ""}`}
                  style={{ left: `calc(50% - ${contentWidth / 2 + 28}px)` }}
                >
                  <div className="sticky top-1/2 flex items-center gap-2">
                    {/* Pull arrow */}
                    <div className="pull-arrow pull-left">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </div>
                    {/* Glow line */}
                    <div
                      className="glow-line w-[3px] h-20 rounded-full"
                      style={{ background: glowColor, boxShadow: `0 0 8px ${glowColor}` }}
                    />
                    {/* Grip dots column */}
                    <div className="grip-dots flex flex-col gap-[6px] items-center">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
                        <div key={j} className="flex gap-[4px]">
                          <div className="w-[4px] h-[4px] rounded-full" style={{ background: gripDotColor }} />
                          <div className="w-[4px] h-[4px] rounded-full" style={{ background: gripDotColor }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{
          borderColor: theme.border,
          background: `color-mix(in srgb, ${theme.border} 15%, ${theme.bg})`,
        }}
      >
        <div
          className="mx-auto max-w-5xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: theme.muted }}
        >
          <span>{i.footerPrivacy}</span>
          <a
            href="https://github.com/fuloskop/mdreader"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: theme.muted }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = theme.link)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = theme.muted)
            }
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
