import { countries } from '../data/countries';
import type { useGame } from '../game/useGame';
import { AutocompleteInput } from './AutocompleteInput';
import { Flag } from './Flag';
import { LivesDisplay } from './LivesDisplay';
import { Timer } from './Timer';

interface GameScreenProps {
  game: ReturnType<typeof useGame>;
}

export function GameScreen({ game }: GameScreenProps) {
  const { currentCountry, lives, score, elapsedMs, currentIndex, total, submitGuess } = game;

  if (!currentCountry) return null;

  return (
    <div className="screen game-screen">
      <div className="hud">
        <LivesDisplay lives={lives} />
        <Timer elapsedMs={elapsedMs} />
        <div className="score">
          Score: {score} · {currentIndex + 1}/{total}
        </div>
      </div>
      <Flag code={currentCountry.code} />
      {/* No `key` here on purpose: remounting would destroy the focused <input>,
          closing the mobile keyboard after every guess. The component resets its
          own state on submit instead. */}
      <AutocompleteInput countries={countries} onSubmit={submitGuess} />
    </div>
  );
}
