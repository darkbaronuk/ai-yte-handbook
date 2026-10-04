"use client";

import { ProgressProvider } from "@/lib/progress";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
