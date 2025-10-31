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
    // Test level with box on goal detection
    const testLevel = [
      "#####",
      "#@$ #",
      "# . #",
      "#####",
    ];
    
    const game = new BoxWorld(testLevel);
    
    // Not solved initially
    expect(game.isSolved()).toBe(false);
    
    // Move right to push the box
    game.movePlayer(1, 0); // This pushes the box from (2,1) to (3,1)
    expect(game.isSolved()).toBe(false); // Still not solved (box not on goal yet)
    
    // Now move down, then left to get into position to push box onto goal
    game.movePlayer(0, 1); // Move down to (2,2)
    game.movePlayer(1, 0); // Move right to (3,2)
    game.movePlayer(0, -1); // Push box up from (3,1) to (3,0) - wait, there's a wall
    
    // Let me use a simpler test case
    const simpleLevel = [
      "####",
      "#.$#",
      "#@ #",
      "####",
    ];
    
    const game2 = new BoxWorld(simpleLevel);
    expect(game2.isSolved()).toBe(false);
    
    // Push box up onto goal
    game2.movePlayer(0, -1); // Push box from (1,1) up to (1,0) - wait, there's a wall
    
    // Even simpler - box already next to goal
    const simplestLevel = [
      "#####",
      "#.@$#",
      "#####",
    ];
    
    const game3 = new BoxWorld(simplestLevel);
    expect(game3.isSolved()).toBe(false);
    
    // Push box left onto goal  
    game3.movePlayer(-1, 0); // Push box from (3,1) left to (2,1) - no, player is at (2,1)
    // Actually player pushes box at (3,1) by moving right
    game3.movePlayer(1, 0); // Can't push box right into wall
    // Need to move left instead
    game3.movePlayer(-1, 0); // Push box left from (3,1) to... wait player is at (2,1), box is at (3,1)
    // This won't work either
    
    // Final simplest case
    const finalLevel = [
      "######",
      "# @$ #",
      "# .  #",
      "######",
    ];
    
    const game4 = new BoxWorld(finalLevel);
    expect(game4.isSolved()).toBe(false);
    
    // Move down
    game4.movePlayer(0, 1); // Move player from (2,1) to (2,2)
    // Move right
    game4.movePlayer(1, 0); // Move player from (2,2) to (3,2)
    // Move up to push box down onto goal
    game4.movePlayer(0, -1); // Push box from (3,1) down to (3,2)... no, player at (3,2) pushes up
    // Push box at (3,1) down by being below it
    // Actually we need player to move up which pushes box up, not down
    
    // Let's be very explicit
    const explicitLevel = [
      "#####",
      "# . #",
      "# $ #", 
      "# @ #",
      "#####",
    ];
    
    const game5 = new BoxWorld(explicitLevel);
    expect(game5.isSolved()).toBe(false);
    
    // Player at (2,3), box at (2,2), goal at (2,1)
    // Move up to push box onto goal
    game5.movePlayer(0, -1); // Player moves to (2,2), pushing box to (2,1) which has goal
    expect(game5.isSolved()).toBe(true); // Now solved!
  });
});
