"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ProgressState = {
  completedChapters: string[];
  completedLabs: string[];
  role: string | null;
  updatedAt: string;
};

type ProgressContextValue = ProgressState & {
  ready: boolean;
  toggleChapter: (slug: string) => void;
  toggleLab: (id: string) => void;
  setRole: (id: string | null) => void;
  isChapterDone: (slug: string) => boolean;
  isLabDone: (id: string) => boolean;
  resetProgress: () => void;
};

const KEY = "aiyte-progress-v1";

const EMPTY: ProgressState = {
  completedChapters: [],
  completedLabs: [],
  role: null,
  updatedAt: "",
};

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedChapters: Array.isArray(parsed.completedChapters)
        ? parsed.completedChapters.filter((x) => typeof x === "string")
        : [],
      completedLabs: Array.isArray(parsed.completedLabs)
        ? parsed.completedLabs.filter((x) => typeof x === "string")
        : [],
      role: typeof parsed.role === "string" ? parsed.role : null,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return EMPTY;
  }
}

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // localStorage đầy hoặc bị chặn — bỏ qua, tiến độ chỉ mất khi reload
    }
  }, [state, ready]);

  const stamp = () => new Date().toISOString();

  const toggleChapter = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      completedChapters: toggle(s.completedChapters, slug),
      updatedAt: stamp(),
    }));
  }, []);

  const toggleLab = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      completedLabs: toggle(s.completedLabs, id),
      updatedAt: stamp(),
    }));
  }, []);

  const setRole = useCallback((id: string | null) => {
    setState((s) => ({ ...s, role: id, updatedAt: stamp() }));
  }, []);

  const isChapterDone = useCallback(
    (slug: string) => state.completedChapters.includes(slug),
    [state.completedChapters]
  );

  const isLabDone = useCallback(
    (id: string) => state.completedLabs.includes(id),
    [state.completedLabs]
  );

  const resetProgress = useCallback(() => {
    setState({ ...EMPTY, updatedAt: stamp() });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        ready,
        toggleChapter,
        toggleLab,
        setRole,
        isChapterDone,
        isLabDone,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress phải dùng trong <ProgressProvider>");
  return ctx;
}
