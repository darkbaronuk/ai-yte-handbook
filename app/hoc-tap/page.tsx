import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import {
  certificates,
  chapterProgress,
  labProgress,
  quizAttempts,
} from "@/lib/db/schema";
import { ROLES } from "@/lib/paths";
import { getQuiz } from "@/lib/quiz";
import CertificateButton from "@/components/CertificateButton";
import ProgressRing from "@/components/ProgressRing";

export const metadata = {
  title: "Học tập của tôi — Cẩm nang AI Y tế VN",
  description:
    "Theo dõi tiến độ học tập: chương đã đọc, quiz đã đạt, lab đã làm, chứng chỉ.",
};

export default async function HocTap() {
  const session = await auth();
  if (!session?.user?.id) redirect("/dang-nhap?callbackUrl=/hoc-tap");
  const userId = session.user.id;
  const db = getDb();

  const doneCh = await db
    .select({ slug: chapterProgress.chapterSlug })
    .from(chapterProgress)
    .where(eq(chapterProgress.userId, userId));
  const doneChSet = new Set(doneCh.map((c) => c.slug));

  const doneLab = await db
    .select({ id: labProgress.labId })
    .from(labProgress)
    .where(eq(labProgress.userId, userId));
  const doneLabSet = new Set(doneLab.map((l) => l.id));

  const attempts = await db
    .select({
      slug: quizAttempts.chapterSlug,
      score: quizAttempts.score,
      total: quizAttempts.total,
      passed: quizAttempts.passed,
      at: quizAttempts.createdAt,
    })
    .from(quizAttempts)
    .where(eq(quizAttempts.userId, userId));

  // Điểm cao nhất + trạng thái đạt cho mỗi chương
  const best = new Map<string, { score: number; total: number; passed: boolean; tries: number }>();
  for (const a of attempts) {
    const cur = best.get(a.slug);
    if (!cur || a.score > cur.score)
      best.set(a.slug, { score: a.score, total: a.total, passed: a.passed, tries: (cur?.tries ?? 0) + 1 });
    else cur.tries += 1;
  }

  const certs = await db
    .select({ roleId: certificates.roleId, code: certificates.code })
    .from(certificates)
    .where(eq(certificates.userId, userId));
  const certByRole = new Map(certs.map((c) => [c.roleId, c.code]));

  const totalChapters = 18;
  const doneCount = doneChSet.size;
  const passedCount = [...best.values()].filter((b) => b.passed).length;
  const pct = Math.round((doneCount / totalChapters) * 100);

  return (
    <div>
      <div className="page-band">
        <h1 className="font-serif text-4xl font-bold mb-2 relative z-10">
          Học tập của tôi
        </h1>
        <p className="text-slate-600 max-w-3xl relative z-10">
          Chào {session!.user!.name || session!.user!.email} 👋 — tiến độ được
          lưu trên tài khoản, đồng bộ mọi thiết bị.
        </p>
      </div>

      {/* Tổng quan */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
          <ProgressRing value={pct} size={64} />
          <div>
            <div className="font-serif text-2xl font-bold">{doneCount}/{totalChapters}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Chương đã đọc</div>
          </div>
        </div>
        <StatCard value={`${passedCount}`} label="Quiz đã đạt" icon="✍️" />
        <StatCard value={`${doneLabSet.size}`} label="Lab đã làm" icon="🧪" />
        <StatCard value={`${certs.length}`} label="Chứng chỉ" icon="🎓" />
      </div>

      {/* Lộ trình + chứng chỉ */}
      <h2 className="font-serif text-2xl font-bold mb-4">Lộ trình & chứng chỉ</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {ROLES.map((r) => {
          const chTotal = r.chapters.length;
          const chDone = r.chapters.filter((s) => doneChSet.has(s)).length;
          const withQuiz = r.chapters.filter((s) => getQuiz(s));
          const qPassed = withQuiz.filter((s) => best.get(s)?.passed).length;
          const chPct = chTotal ? Math.round((chDone / chTotal) * 100) : 0;
          const certCode = certByRole.get(r.id);
          return (
            <div key={r.id} className="card-lift bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-2xl mb-1">{r.icon}</div>
                  <div className="font-serif text-lg font-semibold">{r.name}</div>
                </div>
                {certCode ? (
                  <Link
                    href={`/chung-chi/${certCode}`}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    🎓 {certCode}
                  </Link>
                ) : (
                  <CertificateButton roleId={r.id} />
                )}
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all"
                  style={{ width: `${chPct}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">
                {chDone}/{chTotal} chương · {qPassed}/{withQuiz.length} quiz đạt
              </div>
              <Link href={`/lo-trinh/${r.id}`} className="text-xs text-accent font-medium hover:underline mt-2 inline-block">
                Xem lộ trình →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Lịch sử quiz */}
      <h2 className="font-serif text-2xl font-bold mb-4">Kết quả quiz</h2>
      {best.size === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-500">
          Bạn chưa làm quiz nào. Mở một chương và bấm <strong>✍️ Làm quiz</strong> để kiểm tra kiến thức.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {[...best.entries()].map(([slug, b]) => (
            <div key={slug} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 last:border-0">
              <Link href={`/quiz/${slug}`} className="text-sm font-medium hover:text-accent">
                Quiz chương {slug}
              </Link>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-500">{b.tries} lượt</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${b.passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {b.score}/{b.total} {b.passed ? "✓" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-serif text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
