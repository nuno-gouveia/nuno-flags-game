import { TOTAL_LIVES } from '../game/types';

interface LivesDisplayProps {
  lives: number;
}

export function LivesDisplay({ lives }: LivesDisplayProps) {
  return (
    <div className="lives" aria-label={`${lives} lives remaining`}>
      {Array.from({ length: TOTAL_LIVES }, (_, i) => (
        <span key={i} className="life">
          {i < lives ? '❤️' : '🤍'}
        </span>
      ))}
    </div>
  );
}
