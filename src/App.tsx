import { useGame } from './game/useGame';
import { useLeaderboard } from './leaderboard/useLeaderboard';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';

export function App() {
  const game = useGame();
  const leaderboard = useLeaderboard();

  if (game.phase === 'idle') {
    return <StartScreen onStart={game.startGame} entries={leaderboard.entries} />;
  }
  if (game.phase === 'playing') {
    return <GameScreen game={game} />;
  }
  return <EndScreen game={game} leaderboard={leaderboard} />;
}
