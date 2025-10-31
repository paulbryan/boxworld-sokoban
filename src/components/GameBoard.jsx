import React from 'react';
import { BoxWorld } from '../boxworld';
import './GameBoard.css';

const GameBoard = ({ game }) => {
  if (!game) return null;

  const renderCell = (cell, rowIndex, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    
    switch (cell) {
      case BoxWorld.WALL:
        return <div key={key} className="cell wall"></div>;
      case BoxWorld.PLAYER:
        return <div key={key} className="cell player">🧑</div>;
      case BoxWorld.PLAYER_ON_GOAL:
        return <div key={key} className="cell player-on-goal">🧑</div>;
      case BoxWorld.BOX:
        return <div key={key} className="cell box">📦</div>;
      case BoxWorld.BOX_ON_GOAL:
        return <div key={key} className="cell box-on-goal">✅</div>;
      case BoxWorld.GOAL:
        return <div key={key} className="cell goal">⭕</div>;
      case BoxWorld.FLOOR:
      default:
        return <div key={key} className="cell floor"></div>;
    }
  };

  return (
    <div className="game-board">
      {game.level.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
