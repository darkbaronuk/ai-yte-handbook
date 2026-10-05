"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DangKy() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại.");
        setLoading(false);
        return;
      }
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (login?.error) {
        router.push("/dang-nhap");
        return;
      }
      router.push("/hoc-tap");
      router.refresh();
    } catch {
      setError("Lỗi kết nối, thử lại sau.");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-accent focus:ring-2 focus:ring-blue-100 outline-none transition";

  return (
    <div className="max-w-md mx-auto">
      <div className="page-band !mb-8">
        <h1 className="font-serif text-3xl font-bold relative z-10">Đăng ký</h1>
        <p className="text-slate-600 text-sm mt-1 relative z-10">
          Miễn phí — theo dõi tiến độ, làm quiz và nhận chứng chỉ.
        </p>
      </div>
      <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        <div>
          <label className="text-sm font-medium block mb-1.5">Họ tên</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder="Nguyễn Văn A"
          />
        </div>
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
          <label className="text-sm font-medium block mb-1.5">Mật khẩu (tối thiểu 6 ký tự)</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full justify-center disabled:opacity-60">
          {loading ? "Đang tạo tài khoản…" : "Tạo tài khoản"}
        </button>
        <p className="text-sm text-slate-600 text-center">
          Đã có tài khoản?{" "}
          <Link href="/dang-nhap" className="text-accent font-semibold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
