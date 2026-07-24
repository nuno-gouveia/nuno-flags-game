import type { LeaderboardEntry } from '../leaderboard/types';
import { LeaderboardTable } from './LeaderboardTable';

interface StartScreenProps {
  onStart: () => void;
  entries: LeaderboardEntry[];
}

export function StartScreen({ onStart, entries }: StartScreenProps) {
  return (
    <div className="screen start-screen">
      <h1>🏳️ Guess the Flag</h1>
      <p>
        Test how well you know the flags of all 193 UN member states. You have 3 lives — each
        wrong guess costs one. Guess every flag correctly before you run out of lives to win!
      </p>
      <button type="button" className="primary" onClick={onStart}>
        Start Game
      </button>
      <div className="leaderboard-preview">
        <h2>Top 10</h2>
        <LeaderboardTable entries={entries} />
      </div>
    </div>
  );
}
