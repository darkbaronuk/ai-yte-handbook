import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import TermTooltip from "@/components/TermTooltip";
import Providers from "./providers";
import { getGlossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Cẩm nang AI trong Y tế Việt Nam",
  description:
    "Cẩm nang thực hành có chấm điểm về AI trong y tế Việt Nam — 18 chương, ma trận năng lực, chứng chỉ Grade 1–5.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen font-sans antialiased">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="font-serif text-xl font-bold whitespace-nowrap">
              AI Y tế Việt Nam
            </Link>
            <nav className="text-sm flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/" className="hover:text-accent">Trang chủ</Link>
              <Link href="/lo-trinh" className="hover:text-accent">Lộ trình</Link>
              <Link href="/muc-luc" className="hover:text-accent">Cẩm nang</Link>
              <Link href="/hoc-tap" className="hover:text-accent">Học tập</Link>
              <Link href="/thuat-ngu" className="hover:text-accent">Thuật ngữ</Link>
              <a href="/admin/" className="text-accent font-semibold hover:underline">✏️ Soạn</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-10">
          <Providers>{children}</Providers>
        </main>
        <TermTooltip
          glossary={Object.fromEntries(
            getGlossary().map((e) => [e.slug, { vi: e.vi, en: e.en, short: e.short, long: e.long }])
          )}
        />
        <footer className="border-t border-slate-200 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500 flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <span>Bản v0.1 — 2026. Cẩm nang cộng tác cộng đồng.</span>
            <span className="flex gap-x-5">
              <Link href="/dashboard" className="hover:text-accent">
                Tiến độ biên soạn
              </Link>
              <a
                href="https://github.com/darkbaronuk/ai-yte-handbook"
                className="hover:text-accent"
              >
                GitHub
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
