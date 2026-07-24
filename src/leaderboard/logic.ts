import { LeaderboardEntry, LEADERBOARD_SIZE } from './types';

export function compareEntries(a: LeaderboardEntry, b: LeaderboardEntry): number {
  return b.score - a.score || a.elapsedMs - b.elapsedMs;
}

export function insertEntry(
  entries: LeaderboardEntry[],
  entry: LeaderboardEntry,
): LeaderboardEntry[] {
  return [...entries, entry].sort(compareEntries).slice(0, LEADERBOARD_SIZE);
}

export function wouldPlaceInTop10(
  entries: LeaderboardEntry[],
  score: number,
  elapsedMs: number,
): boolean {
  if (entries.length < LEADERBOARD_SIZE) return true;
  const last = entries[entries.length - 1];
  const candidate: LeaderboardEntry = { name: '', score, elapsedMs, date: '' };
  return compareEntries(candidate, last) < 0;
}
