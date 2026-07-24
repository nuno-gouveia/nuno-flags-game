import { useCallback, useEffect, useRef, useState } from 'react';
import { countries } from '../data/countries';
import { idleState, startGame as startGameLogic, applyGuess } from './logic';
import type { GameState } from './types';

export function useGame() {
  const [state, setState] = useState<GameState>(idleState);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.phase === 'playing' && state.startTime !== null) {
      tickRef.current = setInterval(() => {
        setState((s) =>
          s.phase === 'playing' && s.startTime !== null
            ? { ...s, elapsedMs: Date.now() - s.startTime }
            : s,
        );
      }, 200);
      return () => {
        if (tickRef.current) clearInterval(tickRef.current);
      };
    }
  }, [state.phase, state.startTime]);

  const startGame = useCallback(() => {
    setState(startGameLogic(countries, Date.now()));
  }, []);

  const submitGuess = useCallback((guessedCode: string) => {
    setState((s) => applyGuess(s, guessedCode, Date.now()));
  }, []);

  const restart = useCallback(() => {
    setState(idleState);
  }, []);

  const currentCountry = state.queue[state.currentIndex] ?? null;
  const isLastFlag = state.currentIndex === state.queue.length - 1;

  return {
    phase: state.phase,
    lives: state.lives,
    score: state.score,
    elapsedMs: state.elapsedMs,
    currentCountry,
    currentIndex: state.currentIndex,
    total: state.queue.length,
    isLastFlag,
    startGame,
    submitGuess,
    restart,
  };
}
