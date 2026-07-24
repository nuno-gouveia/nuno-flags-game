import { useCallback, useState } from 'react';
import { LeaderboardEntry, LEADERBOARD_KEY } from './types';
import { insertEntry, wouldPlaceInTop10 } from './logic';

function readEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: LeaderboardEntry[]): void {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => readEntries());

  const addEntry = useCallback((entry: LeaderboardEntry) => {
    setEntries((current) => {
      const next = insertEntry(current, entry);
      writeEntries(next);
      return next;
    });
  }, []);

  const checkTop10 = useCallback(
    (score: number, elapsedMs: number) => wouldPlaceInTop10(entries, score, elapsedMs),
    [entries],
  );

  return { entries, addEntry, wouldPlaceInTop10: checkTop10 };
}
