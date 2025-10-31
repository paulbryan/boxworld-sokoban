import { useState, useEffect, useCallback } from 'react';
import { BoxWorld, LEVELS } from './boxworld';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [game, setGame] = useState(() => new BoxWorld(LEVELS[0]));
  const [, forceUpdate] = useState(0);

  // Handle keyboard input
  const handleKeyDown = useCallback((event) => {
    let moved = false;

    switch (event.key) {
      case 'ArrowUp':
        moved = game.movePlayer(0, -1);
        event.preventDefault();
        break;
      case 'ArrowDown':
        moved = game.movePlayer(0, 1);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        moved = game.movePlayer(-1, 0);
        event.preventDefault();
        break;
      case 'ArrowRight':
        moved = game.movePlayer(1, 0);
        event.preventDefault();
        break;
      case 'u':
      case 'U':
        game.undoMove();
        forceUpdate(n => n + 1);
        event.preventDefault();
        return;
      case 'r':
      case 'R':
        game.resetLevel();
        forceUpdate(n => n + 1);
        event.preventDefault();
        return;
      default:
        return;
    }

    if (moved) {
      forceUpdate(n => n + 1);
    }
  }, [game]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel < LEVELS.length) {
      setCurrentLevel(nextLevel);
      setGame(new BoxWorld(LEVELS[nextLevel]));
    }
  };

  const handleReset = () => {
    game.resetLevel();
    forceUpdate(n => n + 1);
  };

  const handleUndo = () => {
    game.undoMove();
    forceUpdate(n => n + 1);
  };

  return (
    <div className="app">
      <div className="game-container">
        <header>
          <h1>🎮 Boxworld - Sokoban Puzzle</h1>
          <p className="subtitle">Push all boxes onto the goal positions!</p>
        </header>

        <div className="game-info">
          <div className="info-item">
            <span className="label">Level:</span>
            <span className="value">{currentLevel + 1} / {LEVELS.length}</span>
          </div>
          <div className="info-item">
            <span className="label">Moves:</span>
            <span className="value">{game.numMoves}</span>
          </div>
        </div>

        <GameBoard game={game} />

        {game.isSolved() && (
          <div className="win-message">
            <h2>🎉 Level Complete! 🎉</h2>
            <p>Total moves: {game.numMoves}</p>
            {currentLevel + 1 < LEVELS.length ? (
              <button className="btn btn-primary" onClick={handleNextLevel}>
                Next Level →
              </button>
            ) : (
              <div>
                <h3>🏆 You completed all levels! 🏆</h3>
              </div>
            )}
          </div>
        )}

        <div className="controls">
          <button className="btn" onClick={handleUndo}>
            ↩️ Undo (U)
          </button>
          <button className="btn" onClick={handleReset}>
            🔄 Reset (R)
          </button>
        </div>

        <div className="instructions">
          <h3>Controls</h3>
          <div className="controls-grid">
            <div className="control-item">
              <span className="key">↑ ↓ ← →</span>
              <span>Move player</span>
            </div>
            <div className="control-item">
              <span className="key">U</span>
              <span>Undo move</span>
            </div>
            <div className="control-item">
              <span className="key">R</span>
              <span>Reset level</span>
            </div>
          </div>
          
          <h3>How to Play</h3>
          <div className="legend">
            <div className="legend-item">
              <span className="symbol">🧑</span>
              <span>Player</span>
            </div>
            <div className="legend-item">
              <span className="symbol">📦</span>
              <span>Box</span>
            </div>
            <div className="legend-item">
              <span className="symbol">⭕</span>
              <span>Goal</span>
            </div>
            <div className="legend-item">
              <span className="symbol">✅</span>
              <span>Box on goal</span>
            </div>
          </div>
          <p className="rules">
            Push all boxes onto goal positions to complete the level.
            You can only push boxes, not pull them!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
