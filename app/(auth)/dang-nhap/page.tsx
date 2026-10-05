"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function DangNhapForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Email hoặc mật khẩu chưa đúng.");
      return;
    }
    // Migrate tiến độ localStorage (nếu có) lên tài khoản
    try {
      const raw = localStorage.getItem("aiyte-progress-v1");
      if (raw) {
        await fetch("/api/migrate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        });
        localStorage.removeItem("aiyte-progress-v1");
      }
    } catch {}
    router.push(params.get("callbackUrl") || "/hoc-tap");
    router.refresh();
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-accent focus:ring-2 focus:ring-blue-100 outline-none transition";

  return (
    <div className="max-w-md mx-auto">
      <div className="page-band !mb-8">
        <h1 className="font-serif text-3xl font-bold relative z-10">Đăng nhập</h1>
        <p className="text-slate-600 text-sm mt-1 relative z-10">
          Vào học tiếp lộ trình của bạn — tiến độ lưu trên tài khoản.
        </p>
      </div>
      <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        <div>
          <label className="text-sm font-medium block mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="ban@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Mật khẩu</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full justify-center disabled:opacity-60">
          {loading ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
        <p className="text-sm text-slate-600 text-center">
          Chưa có tài khoản?{" "}
          <Link href="/dang-ky" className="text-accent font-semibold hover:underline">
            Đăng ký miễn phí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function DangNhap() {
  return (
    <Suspense>
      <DangNhapForm />
    </Suspense>
  );
}
