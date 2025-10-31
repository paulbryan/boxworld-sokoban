/**
 * Simple BFS solver for Sokoban puzzles
 * Finds a solution path for a given level
 */

import { BoxWorld } from './boxworld.js';

export function solveLevelBFS(levelData, maxMoves = 100) {
  const moves = ['U', 'D', 'L', 'R'];
  const moveMap = { 'U': [0, -1], 'D': [0, 1], 'L': [-1, 0], 'R': [1, 0] };
  
  const queue = [{ path: '', state: null }];
  const visited = new Set();
  let iterations = 0;
  const maxIterations = 100000;
  
  while (queue.length > 0 && iterations < maxIterations) {
    iterations++;
    const { path } = queue.shift();
    
    // Create game state for this path
    const game = new BoxWorld(levelData);
    let valid = true;
    
    // Replay the path
    for (const move of path) {
      const [dx, dy] = moveMap[move];
      if (!game.movePlayer(dx, dy)) {
        valid = false;
        break;
      }
    }
    
    if (!valid) continue;
    
    // Check if solved
    if (game.isSolved()) {
      return { solution: path, iterations };
    }
    
    if (path.length >= maxMoves) continue;
    
    // Create state hash for visited check
    const stateHash = game.render();
    if (visited.has(stateHash)) continue;
    visited.add(stateHash);
    
    // Try all possible moves
    for (const move of moves) {
      const [dx, dy] = moveMap[move];
      
      // Check if this move is valid
      const testGame = new BoxWorld(levelData);
      for (const m of path) {
        testGame.movePlayer(...moveMap[m]);
      }
      
      if (testGame.movePlayer(dx, dy)) {
        queue.push({ path: path + move });
      }
    }
  }
  
  return { solution: null, iterations };
}
