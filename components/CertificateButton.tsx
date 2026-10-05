"use client";

import { useState } from "react";
import Link from "next/link";

/** Nút kiểm tra điều kiện và cấp chứng chỉ cho một lộ trình. */
export default function CertificateButton({ roleId }: { roleId: string }) {
  const [state, setState] = useState<"idle" | "checking" | "issuing" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  async function handle() {
    setState("checking");
    setMessage("");
    try {
      const chk = await fetch(`/api/certificates?roleId=${roleId}`);
      const elig = await chk.json();
      if (!chk.ok) throw new Error(elig.error || "Lỗi kiểm tra.");
      if (!elig.eligible) {
        const missing: string[] = [];
        if (elig.missingChapters?.length)
          missing.push(`còn ${elig.missingChapters.length} chương chưa đọc xong`);
        if (elig.missingQuizzes?.length)
          missing.push(`còn ${elig.missingQuizzes.length} quiz chưa đạt`);
        setMessage(`Chưa đủ điều kiện: ${missing.join(", ")}.`);
        setState("error");
        return;
      }
      setState("issuing");
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Cấp chứng chỉ thất bại.");
      setCode(data.code);
      setState("done");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Lỗi hệ thống.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <Link
        href={`/chung-chi/${code}`}
        className="btn-gradient !py-2.5 text-sm"
      >
        🎓 Xem chứng chỉ {code}
      </Link>
    );
  }

  return (
    <span className="flex flex-col gap-1.5">
      <button
        onClick={handle}
        disabled={state === "checking" || state === "issuing"}
        className="btn-gradient !py-2.5 text-sm disabled:opacity-60"
      >
        {state === "checking"
          ? "Đang kiểm tra…"
          : state === "issuing"
            ? "Đang cấp…"
            : "🎓 Nhận chứng chỉ"}
      </button>
      {message && <span className="text-xs text-amber-700">{message}</span>}
    </span>
  );
}
