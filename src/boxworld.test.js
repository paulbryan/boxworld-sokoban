import { describe, it, expect } from 'vitest';
import { BoxWorld, LEVELS } from './boxworld.js';

/**
 * Test suite for BoxWorld game using levels from maps.js
 * Tests game mechanics and level loading from the numeric map format
 */

describe('BoxWorld Game Tests', () => {
  it('All levels from maps.js should have valid initial state', () => {
    // Sanity check: all levels should be constructible and have a player
    LEVELS.forEach((levelData) => {
      expect(() => {
        const game = new BoxWorld(levelData);
        expect(game).toBeDefined();
        expect(game.playerPos).toBeDefined();
        expect(game.playerPos.x).toBeGreaterThanOrEqual(0);
        expect(game.playerPos.y).toBeGreaterThanOrEqual(0);
      }).not.toThrow();
    });
  });

  it('Should load levels from maps.js numeric format', () => {
    // Verify we're loading from maps.js (which has 60 levels)
    // instead of the old 5 hardcoded levels
    expect(LEVELS.length).toBeGreaterThan(5);
  });

  it('BoxWorld game logic should work correctly', () => {
    // Test basic game mechanics with a simple test level
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

  it('BoxWorld undo functionality should work correctly', () => {
    // Create a simple level to test undo
    const testLevel = [
      "######",
      "#@$. #",
      "######",
    ];
    
    const game = new BoxWorld(testLevel);
    const initialX = game.playerPos.x;
    const initialY = game.playerPos.y;
    
    // Make a move
    game.movePlayer(1, 0);
    expect(game.playerPos.x).toBe(initialX + 1);
    
    // Undo the move
    game.undoMove();
    expect(game.playerPos.x).toBe(initialX);
    expect(game.playerPos.y).toBe(initialY);
  });

  it('BoxWorld reset functionality should work correctly', () => {
    // Create a simple level to test reset
    const testLevel = [
      "######",
      "#@$. #",
      "######",
    ];
    
    const game = new BoxWorld(testLevel);
    const initialX = game.playerPos.x;
    const initialY = game.playerPos.y;
    const initialMoves = game.numMoves;
    
    // Make several moves
    game.movePlayer(1, 0);
    game.movePlayer(1, 0);
    expect(game.numMoves).toBe(2);
    
    // Reset the level
    game.resetLevel();
    expect(game.playerPos.x).toBe(initialX);
    expect(game.playerPos.y).toBe(initialY);
    expect(game.numMoves).toBe(initialMoves);
  });

  it('Should correctly detect box on goal', () => {
    // Test level: player below box, box below goal - vertical alignment
    const testLevel = [
      "#####",
      "# . #",
      "# $ #", 
      "# @ #",
      "#####",
    ];
    
    const game = new BoxWorld(testLevel);
    
    // Not solved initially - box is not on the goal
    expect(game.isSolved()).toBe(false);
    
    // Player at (2,3), box at (2,2), goal at (2,1)
    // Move up to push box onto goal
    game.movePlayer(0, -1); // Player moves to (2,2), pushing box to (2,1) onto the goal
    
    // Now the box should be on the goal, making the level solved
    expect(game.isSolved()).toBe(true);
  });
});
