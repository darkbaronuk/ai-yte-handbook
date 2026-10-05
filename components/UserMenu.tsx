"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") return <span className="text-sm text-slate-400">…</span>;

  if (!session?.user) {
    return (
      <Link
        href="/dang-nhap"
        className="text-sm font-semibold text-accent hover:underline"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <span className="flex items-center gap-3 text-sm">
      <Link href="/hoc-tap" className="font-medium text-slate-700 hover:text-accent max-w-[140px] truncate">
        👋 {session.user.name || session.user.email}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-slate-500 hover:text-red-600 transition-colors"
        title="Đăng xuất"
      >
        Đăng xuất
      </button>
    </span>
  );
}
