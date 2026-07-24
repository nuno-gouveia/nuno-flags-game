import { describe, expect, it } from 'vitest';
import { compareEntries, insertEntry, wouldPlaceInTop10 } from './logic';
import type { LeaderboardEntry } from './types';

function entry(score: number, elapsedMs: number, name = 'x'): LeaderboardEntry {
  return { name, score, elapsedMs, date: '2024-01-01T00:00:00.000Z' };
}

describe('compareEntries', () => {
  it('ranks higher score first', () => {
    expect(compareEntries(entry(10, 5000), entry(5, 1000))).toBeLessThan(0);
  });

  it('breaks ties by lower elapsed time', () => {
    expect(compareEntries(entry(10, 1000), entry(10, 2000))).toBeLessThan(0);
    expect(compareEntries(entry(10, 2000), entry(10, 1000))).toBeGreaterThan(0);
  });
});

describe('insertEntry', () => {
  it('inserts and keeps entries sorted by score desc, time asc', () => {
    const entries = [entry(50, 10000, 'a'), entry(30, 5000, 'b')];
    const result = insertEntry(entries, entry(40, 8000, 'c'));
    expect(result.map((e) => e.name)).toEqual(['a', 'c', 'b']);
  });

  it('caps the list at 10 entries, dropping the lowest', () => {
    const entries = Array.from({ length: 10 }, (_, i) => entry(100 - i, 1000, `p${i}`));
    const result = insertEntry(entries, entry(50, 1000, 'new'));
    expect(result).toHaveLength(10);
    expect(result.find((e) => e.name === 'new')).toBeUndefined();
  });

  it('includes a new entry that beats the current last place', () => {
    const entries = Array.from({ length: 10 }, (_, i) => entry(100 - i, 1000, `p${i}`));
    const result = insertEntry(entries, entry(200, 1000, 'new'));
    expect(result).toHaveLength(10);
    expect(result[0].name).toBe('new');
  });
});

describe('wouldPlaceInTop10', () => {
  it('is true when there are fewer than 10 entries', () => {
    expect(wouldPlaceInTop10([], 1, 100000)).toBe(true);
  });

  it('is true when the candidate beats the current last place', () => {
    const entries = Array.from({ length: 10 }, (_, i) => entry(100 - i, 1000, `p${i}`));
    expect(wouldPlaceInTop10(entries, 200, 1000)).toBe(true);
  });

  it('is false when the candidate does not beat the current last place', () => {
    const entries = Array.from({ length: 10 }, (_, i) => entry(100 - i, 1000, `p${i}`));
    expect(wouldPlaceInTop10(entries, 1, 999999)).toBe(false);
  });
});
