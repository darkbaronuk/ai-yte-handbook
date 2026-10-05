import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { certificates, users } from "@/lib/db/schema";
import { getRole } from "@/lib/paths";

export async function generateMetadata({ params }: { params: { code: string } }) {
  return { title: `Chứng chỉ ${params.code} — Cẩm nang AI Y tế VN` };
}

export default async function ChungChi({ params }: { params: { code: string } }) {
  const db = getDb();
  const rows = await db
    .select({
      code: certificates.code,
      roleId: certificates.roleId,
      issuedAt: certificates.issuedAt,
      userName: users.name,
    })
    .from(certificates)
    .innerJoin(users, eq(certificates.userId, users.id))
    .where(eq(certificates.code, params.code.toUpperCase()))
    .limit(1);
  const cert = rows[0];
  if (!cert) notFound();
  const role = getRole(cert.roleId);

  const dateStr = new Date(cert.issuedAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Trang chủ
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-gradient !py-2.5"
        >
          🖨️ In chứng chỉ
        </button>
      </div>

      {/* Khung chứng chỉ */}
      <div className="relative bg-white rounded-3xl border-2 border-blue-100 p-10 md:p-14 text-center overflow-hidden shadow-[0_30px_60px_-30px_rgba(37,99,235,0.4)]">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px 200px at 50% -60px, rgba(56,189,248,0.18), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 mb-5 shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">
            Cẩm nang AI trong Y tế Việt Nam
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Chứng chỉ hoàn thành
          </h1>
          <p className="text-slate-500 text-sm mb-6">chứng nhận rằng</p>
          <p className="font-serif text-3xl font-bold text-navy mb-6">
            {cert.userName}
          </p>
          <p className="text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
            đã hoàn thành lộ trình{" "}
            <strong className="text-slate-800">
              {role ? `${role.icon} ${role.name}` : cert.roleId}
            </strong>{" "}
            — đọc toàn bộ chương và đạt tất cả bài quiz kiểm tra.
          </p>
          <div className="divider-glow mb-8" />
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Ngày cấp</div>
              <div className="font-semibold">{dateStr}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Mã xác minh</div>
              <div className="font-mono font-bold text-accent">{cert.code}</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-8 print:hidden">
            Xác minh tại ai-yte.vn/chung-chi/{cert.code}
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 mt-6 print:hidden">
        Chứng chỉ này ghi nhận quá trình học tập trên nền tảng — không thay thế
        chứng chỉ hành nghề hay văn bằng chính thức.
      </p>
    </div>
  );
}
