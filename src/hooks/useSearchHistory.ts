import { useCallback, useEffect, useState } from "react";

export interface SearchEntry {
  q: string;
  at: number;
}

const KEY = "warper.search.history";
const MAX = 8;

const read = (): SearchEntry[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((e) => e && typeof e.q === "string")
      .map((e) => ({ q: e.q as string, at: Number(e.at) || Date.now() }))
      .slice(0, MAX);
  } catch {
    return [];
  }
};

/** Local, per-device search history for the OS Core console. */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchEntry[]>([]);

  useEffect(() => {
    setHistory(read());
  }, []);

  const persist = useCallback((next: SearchEntry[]) => {
    setHistory(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — history stays in memory */
    }
  }, []);

  const addSearch = useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q) return;
      const next = [{ q, at: Date.now() }, ...read().filter((e) => e.q !== q)].slice(0, MAX);
      persist(next);
    },
    [persist]
  );

  const removeSearch = useCallback(
    (query: string) => persist(read().filter((e) => e.q !== query)),
    [persist]
  );

  const clearHistory = useCallback(() => persist([]), [persist]);

  return { history, addSearch, removeSearch, clearHistory };
};

export default useSearchHistory;
