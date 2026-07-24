export interface LeaderboardEntry {
  name: string;
  score: number;
  elapsedMs: number;
  date: string;
}

export const LEADERBOARD_KEY = 'flags-game-leaderboard-v1';
export const LEADERBOARD_SIZE = 10;
