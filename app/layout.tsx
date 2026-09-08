import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

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
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-bold">
              AI Y tế Việt Nam
            </Link>
            <nav className="text-sm flex gap-6">
              <Link href="/muc-luc" className="hover:text-accent">Mục lục</Link>
              <Link href="/ma-tran" className="hover:text-accent">Ma trận</Link>
              <Link href="/dashboard" className="hover:text-accent">Tiến độ</Link>
              <Link href="/dong-gop" className="hover:text-accent">Đóng góp</Link>
              <a href="/admin/" className="text-accent font-semibold hover:underline">✏️ Soạn</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        <footer className="border-t border-slate-200 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500 flex justify-between">
            <span>Bản v0.1 — 2026. Cẩm nang cộng tác cộng đồng.</span>
            <a
              href="https://github.com/darkbaronuk/ai-yte-handbook"
              className="hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
