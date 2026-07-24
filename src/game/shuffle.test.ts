import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns a new array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect(result.slice().sort()).toEqual(input.slice().sort());
  });

  it('does not mutate the input array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = input.slice();
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it('preserves length for larger arrays', () => {
    const input = Array.from({ length: 193 }, (_, i) => i);
    const result = shuffle(input);
    expect(result).toHaveLength(193);
    expect(new Set(result).size).toBe(193);
  });
});
