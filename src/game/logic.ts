import type { Country } from '../data/countries';
import { GameState, TOTAL_LIVES } from './types';
import { shuffle } from './shuffle';

export const idleState: GameState = {
  phase: 'idle',
  queue: [],
  currentIndex: 0,
  lives: TOTAL_LIVES,
  score: 0,
  startTime: null,
  elapsedMs: 0,
};

export function startGame(countries: Country[], now: number): GameState {
  return {
    phase: 'playing',
    queue: shuffle(countries),
    currentIndex: 0,
    lives: TOTAL_LIVES,
    score: 0,
    startTime: now,
    elapsedMs: 0,
  };
}

/**
 * Applies a submitted guess to the current state and returns the next state.
 * Each flag gets exactly one attempt: right or wrong, the game advances.
 */
export function applyGuess(state: GameState, guessedCode: string, now: number): GameState {
  if (state.phase !== 'playing') return state;

  const current = state.queue[state.currentIndex];
  const isCorrect = guessedCode === current.code;
  const isLastFlag = state.currentIndex === state.queue.length - 1;
  const elapsedMs = state.startTime !== null ? now - state.startTime : state.elapsedMs;

  if (isCorrect) {
    const score = state.score + 1;
    if (isLastFlag) {
      return { ...state, phase: 'won', score, elapsedMs };
    }
    return { ...state, currentIndex: state.currentIndex + 1, score };
  }

  const lives = state.lives - 1;
  if (lives <= 0) {
    return { ...state, phase: 'lost', lives: 0, elapsedMs };
  }
  return { ...state, currentIndex: state.currentIndex + 1, lives };
}
