import type { Country } from '../data/countries';

export type GamePhase = 'idle' | 'playing' | 'won' | 'lost';

export interface GameState {
  phase: GamePhase;
  queue: Country[];
  currentIndex: number;
  lives: number;
  score: number;
  startTime: number | null;
  elapsedMs: number;
}

export const TOTAL_LIVES = 3;
