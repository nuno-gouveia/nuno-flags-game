import { useState } from 'react';
import type { useGame } from '../game/useGame';
import type { useLeaderboard } from '../leaderboard/useLeaderboard';
import type { LeaderboardEntry } from '../leaderboard/types';
import { formatTime } from '../lib/formatTime';
import { LeaderboardTable } from './LeaderboardTable';

interface EndScreenProps {
  game: ReturnType<typeof useGame>;
  leaderboard: ReturnType<typeof useLeaderboard>;
}

const MAX_NAME_LENGTH = 20;

export function EndScreen({ game, leaderboard }: EndScreenProps) {
  const { phase, score, elapsedMs, total, restart } = game;
  const { entries, addEntry, wouldPlaceInTop10 } = leaderboard;
  const [name, setName] = useState('');
  const [savedEntry, setSavedEntry] = useState<LeaderboardEntry | null>(null);

  const isEligible = !savedEntry && wouldPlaceInTop10(score, elapsedMs);

  function handleSave() {
    const trimmed = name.trim().slice(0, MAX_NAME_LENGTH);
    if (!trimmed) return;
    const entry: LeaderboardEntry = {
      name: trimmed,
      score,
      elapsedMs,
      date: new Date().toISOString(),
    };
    addEntry(entry);
    setSavedEntry(entry);
  }

  return (
    <div className="screen end-screen">
      <h1>{phase === 'won' ? 'You won! 🎉' : 'Game Over'}</h1>
      <p className="result-summary">
        Final score: <strong>{score}</strong> / {total} · Time: <strong>{formatTime(elapsedMs)}</strong>
      </p>

      {isEligible && (
        <div className="name-entry">
          <p>You made the top 10! Enter your name:</p>
          <div className="autocomplete-row">
            <input
              type="text"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button type="button" onClick={handleSave} disabled={!name.trim()}>
              Save
            </button>
          </div>
        </div>
      )}

      <div className="leaderboard-preview">
        <h2>Top 10</h2>
        <LeaderboardTable entries={entries} highlight={savedEntry} />
      </div>

      <button type="button" className="primary" onClick={restart}>
        Play Again
      </button>
    </div>
  );
}
