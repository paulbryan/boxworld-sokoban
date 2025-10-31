import { describe, it, expect } from 'vitest';
import { BoxWorld, LEVELS } from './boxworld.js';

/**
 * Test suite to prove each level is solvable.
 * Each test plays through a known solution sequence and verifies the level is solved.
 */

describe('Level Solvability Tests', () => {
  /**
   * Helper function to play a sequence of moves
   * @param {BoxWorld} game - The game instance
   * @param {string} moves - String of moves: U=up, D=down, L=left, R=right
   * @returns {boolean} - True if all moves succeeded
   */
  function playMoves(game, moves) {
    const moveMap = {
      'U': [0, -1],
      'D': [0, 1],
      'L': [-1, 0],
      'R': [1, 0],
    };

    for (const move of moves) {
      const [dx, dy] = moveMap[move];
      if (!game.movePlayer(dx, dy)) {
        return false;
      }
    }
    return true;
  }

  it('Level 1 should be solvable', () => {
    // Level 1: Simple introduction - One box, one goal
    // Layout:
    // ########
    // #  .   #
    // #  $   #
    // #  @   #
    // ########
    // Solution: Move up once to push box onto goal
    
    const game = new BoxWorld(LEVELS[0]);
    const solution = 'U';
    
    const movesSucceeded = playMoves(game, solution);
    expect(movesSucceeded).toBe(true);
    expect(game.isSolved()).toBe(true);
  });

  it('Level 2 should be solvable', () => {
    // Level 2: Two boxes
    // Layout:
    // #########
    // #   .   #
    // #   $   #
    // #  @$. ##
    // #########
    // Solution: Move up, down, right, up to push both boxes to goals
    
    const game = new BoxWorld(LEVELS[1]);
    const solution = 'UDRU';
    
    const movesSucceeded = playMoves(game, solution);
    expect(movesSucceeded).toBe(true);
    expect(game.isSolved()).toBe(true);
  });

  it('Level 3 should be solvable', () => {
    // Level 3: Corner challenge (redesigned)
    // Layout:
    // ######
    // #.   #  <- goal at (1,1)
    // #.$$ #  <- 2 boxes at (2,2) and (3,2), goal at (1,2)
    // #. @ #  <- player at (3,3), goal at (1,3)
    // ######
    // Solution: Push boxes to the left goals
    
    const game = new BoxWorld(LEVELS[2]);
    const solution = 'ULRRULL';
    
    const movesSucceeded = playMoves(game, solution);
    expect(movesSucceeded).toBe(true);
    expect(game.isSolved()).toBe(true);
  });

  it('Level 4 should be solvable', () => {
    // Level 4: Three boxes (redesigned)
    // Layout:
    // #######
    // #. . .#  <- 3 goals in top row
    // #  $  #  <- box at center
    // # $ $ #  <- 2 boxes
    // #  @  #  <- player at center
    // #######
    // Solution: Push boxes up to goals
    
    const game = new BoxWorld(LEVELS[3]);
    const solution = 'UUDLDLUUDRRRDRUU';
    
    const movesSucceeded = playMoves(game, solution);
    expect(movesSucceeded).toBe(true);
    expect(game.isSolved()).toBe(true);
  });

  it('Level 5 should be solvable', () => {
    // Level 5: Four boxes corridor (redesigned)
    // Layout:
    // ########
    // #.  . .#  <- 3 goals in top row
    // # $$ $ #  <- 3 boxes
    // #   .@ #  <- player on right, 1 goal
    // ########
    // Solution: Navigate and push boxes to goals
    
    const game = new BoxWorld(LEVELS[4]);
    const solution = 'ULURLLDLDRLLU';
    
    const movesSucceeded = playMoves(game, solution);
    expect(movesSucceeded).toBe(true);
    expect(game.isSolved()).toBe(true);
  });

  it('All levels should have valid initial state', () => {
    // Sanity check: all levels should be constructible
    LEVELS.forEach((levelData) => {
      expect(() => {
        const game = new BoxWorld(levelData);
        expect(game).toBeDefined();
        expect(game.playerPos).toBeDefined();
      }).not.toThrow();
    });
  });

  it('BoxWorld game logic should work correctly', () => {
    // Test basic game mechanics
    const testLevel = [
      "#######",
      "#.  @$#",
      "#######",
    ];
    
    const game = new BoxWorld(testLevel);
    
    // Player starts at (4,1), box at (5,1), goal at (1,1)
    
    // Player should be able to move into empty space
    expect(game.movePlayer(-1, 0)).toBe(true);  // Move left to (3,1)
    expect(game.movePlayer(-1, 0)).toBe(true);  // Move left to (2,1)
    expect(game.movePlayer(-1, 0)).toBe(true);  // Move left to goal at (1,1)
    expect(game.movePlayer(-1, 0)).toBe(false);  // Can't move into wall at (0,1)
    
    // Undo should work
    expect(game.undoMove()).toBe(true);  // Back to (2,1)
    expect(game.undoMove()).toBe(true);  // Back to (3,1)
    
    // Now at (3,1), move right and test box pushing
    expect(game.movePlayer(1, 0)).toBe(true);  // Move right to (4,1)
    expect(game.movePlayer(1, 0)).toBe(false); // Can't push box at (5,1) into wall at (6,1)
    
    // Move back left and verify position
    expect(game.movePlayer(-1, 0)).toBe(true);  // Move left to (3,1)
    expect(game.playerPos.x).toBe(3);
    expect(game.playerPos.y).toBe(1);
  });
});
