import { formatTime } from '../lib/formatTime';

interface TimerProps {
  elapsedMs: number;
}

export function Timer({ elapsedMs }: TimerProps) {
  return <div className="timer">⏱ {formatTime(elapsedMs)}</div>;
}
