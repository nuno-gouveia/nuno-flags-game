import { describe, expect, it } from 'vitest';
import { startGame, applyGuess } from './logic';
import type { Country } from '../data/countries';

const threeCountries: Country[] = [
  { code: 'aa', name: 'Alpha' },
  { code: 'bb', name: 'Beta' },
  { code: 'cc', name: 'Gamma' },
];

describe('startGame', () => {
  it('initializes phase, lives, score and a shuffled queue of the given countries', () => {
    const state = startGame(threeCountries, 1000);
    expect(state.phase).toBe('playing');
    expect(state.lives).toBe(3);
    expect(state.score).toBe(0);
    expect(state.currentIndex).toBe(0);
    expect(state.startTime).toBe(1000);
    expect(state.queue).toHaveLength(3);
    expect(state.queue.slice().sort((a, b) => a.code.localeCompare(b.code))).toEqual(
      threeCountries.slice().sort((a, b) => a.code.localeCompare(b.code)),
    );
  });
});

describe('applyGuess', () => {
  it('advances the queue and increments score on a correct guess', () => {
    let state = startGame(threeCountries, 0);
    const correctCode = state.queue[0].code;
    state = applyGuess(state, correctCode, 100);
    expect(state.phase).toBe('playing');
    expect(state.score).toBe(1);
    expect(state.currentIndex).toBe(1);
    expect(state.lives).toBe(3);
  });

  it('decrements a life and advances the queue on a wrong guess', () => {
    let state = startGame(threeCountries, 0);
    const wrongCode = state.queue[0].code === 'zz' ? 'yy' : 'zz';
    state = applyGuess(state, wrongCode, 100);
    expect(state.phase).toBe('playing');
    expect(state.score).toBe(0);
    expect(state.currentIndex).toBe(1);
    expect(state.lives).toBe(2);
  });

  it('ends the game as won on a correct guess for the last flag', () => {
    let state = startGame(threeCountries, 0);
    state = applyGuess(state, state.queue[0].code, 10);
    state = applyGuess(state, state.queue[1].code, 20);
    state = applyGuess(state, state.queue[2].code, 30);
    expect(state.phase).toBe('won');
    expect(state.score).toBe(3);
    expect(state.elapsedMs).toBe(30);
  });

  it('ends the game as lost when lives reach 0, even with flags remaining', () => {
    let state = startGame(threeCountries, 0);
    const wrong = (code: string) => (code === 'zz' ? 'yy' : 'zz');
    state = applyGuess(state, wrong(state.queue[0].code), 10);
    state = applyGuess(state, wrong(state.queue[1].code), 20);
    state = applyGuess(state, wrong(state.queue[2].code), 30);
    expect(state.phase).toBe('lost');
    expect(state.lives).toBe(0);
    expect(state.score).toBe(0);
    expect(state.elapsedMs).toBe(30);
  });

  it('is a no-op if the game is not in the playing phase', () => {
    const state = startGame(threeCountries, 0);
    const wonState = { ...state, phase: 'won' as const };
    const result = applyGuess(wonState, 'aa', 100);
    expect(result).toBe(wonState);
  });
});
