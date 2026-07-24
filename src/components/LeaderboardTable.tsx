import type { LeaderboardEntry } from '../leaderboard/types';
import { formatTime } from '../lib/formatTime';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  highlight?: LeaderboardEntry | null;
}

export function LeaderboardTable({ entries, highlight }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return <p className="leaderboard-empty">No scores yet — be the first!</p>;
  }

  return (
    <table className="leaderboard">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i) => (
          <tr key={i} className={entry === highlight ? 'highlighted' : ''}>
            <td>{i + 1}</td>
            <td>{entry.name}</td>
            <td>{entry.score}</td>
            <td>{formatTime(entry.elapsedMs)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
