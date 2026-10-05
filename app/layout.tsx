import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import TermTooltip from "@/components/TermTooltip";
import UserMenu from "@/components/UserMenu";
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
        <Providers>
        <header className="border-b border-blue-100 bg-white/85 backdrop-blur sticky top-0 z-10 shadow-[0_2px_20px_-12px_rgba(37,99,235,0.35)]">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap group">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-[0_6px_16px_-6px_rgba(37,99,235,0.7)] group-hover:scale-105 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />
                </svg>
              </span>
              <span className="font-serif text-xl font-bold">
                AI <span className="text-gradient">Y tế</span> Việt Nam
              </span>
            </Link>
            <nav className="text-sm flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/" className="text-slate-600 hover:text-accent font-medium transition-colors">Trang chủ</Link>
              <Link href="/lo-trinh" className="text-slate-600 hover:text-accent font-medium transition-colors">Lộ trình</Link>
              <Link href="/muc-luc" className="text-slate-600 hover:text-accent font-medium transition-colors">Cẩm nang</Link>
              <Link href="/hoc-tap" className="text-slate-600 hover:text-accent font-medium transition-colors">Học tập</Link>
              <Link href="/thuat-ngu" className="text-slate-600 hover:text-accent font-medium transition-colors">Thuật ngữ</Link>
              <a href="/admin/" className="text-accent font-semibold hover:underline">✏️ Soạn</a>
              <UserMenu />
              <Link
                href="/lo-trinh"
                className="px-4 py-2 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)] hover:brightness-110 hover:-translate-y-px transition-all"
              >
                Bắt đầu học
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>
        <TermTooltip
          glossary={Object.fromEntries(
            getGlossary().map((e) => [e.slug, { vi: e.vi, en: e.en, short: e.short, long: e.long }])
          )}
        />
        <footer className="mt-20 bg-navy text-slate-300 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{backgroundImage: "radial-gradient(rgba(147,197,253,0.15) 1px, transparent 1.4px)", backgroundSize: "26px 26px"}} />
          <div className="relative max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="max-w-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />
                    </svg>
                  </span>
                  <span className="font-serif text-lg font-bold text-white">AI Y tế Việt Nam</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hệ học tập hybrid về AI trong y tế Việt Nam — cẩm nang tra cứu
                  18 chương kết hợp lộ trình e-learning theo vai trò, Lab thực
                  hành và ma trận năng lực Grade 1–5.
                </p>
              </div>
              <div className="flex gap-12 text-sm">
                <div>
                  <div className="text-white font-semibold mb-3">Học tập</div>
                  <div className="flex flex-col gap-2">
                    <Link href="/lo-trinh" className="hover:text-glow transition-colors">Lộ trình vai trò</Link>
                    <Link href="/hoc-tap" className="hover:text-glow transition-colors">Tiến độ của tôi</Link>
                    <Link href="/muc-luc" className="hover:text-glow transition-colors">Mục lục cẩm nang</Link>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-3">Tài nguyên</div>
                  <div className="flex flex-col gap-2">
                    <Link href="/thuat-ngu" className="hover:text-glow transition-colors">Thuật ngữ</Link>
                    <Link href="/ma-tran" className="hover:text-glow transition-colors">Ma trận năng lực</Link>
                    <Link href="/dashboard" className="hover:text-glow transition-colors">Tiến độ biên soạn</Link>
                    <a href="https://github.com/darkbaronuk/ai-yte-handbook" className="hover:text-glow transition-colors">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider-glow my-8" />
            <div className="text-xs text-slate-500 flex flex-wrap justify-between gap-2">
              <span>Bản v0.2 — 2026. Cẩm nang cộng tác cộng đồng.</span>
              <span>Chuyển đổi số y tế Việt Nam</span>
            </div>
          </div>
        </footer>
        </Providers>
      </body>
    </html>
  );
}
