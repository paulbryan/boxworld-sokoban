/**
 * Boxworld - A Sokoban puzzle game implementation
 * Push all boxes onto the goal positions to win!
 */

import { maps } from './maps.js';

/**
 * Convert numeric tile-based map to ASCII string format
 * @param {number[][]} numericMap - Map with numeric tiles
 * @returns {string[]} - Array of ASCII strings
 */
function convertNumericMapToASCII(numericMap) {
  const tileMap = {
    0: ' ',  // EMPTY -> FLOOR (display as floor)
    1: '#',  // WALL
    2: ' ',  // FLOOR
    3: '.',  // TARGET -> GOAL
    4: '$',  // CARGO -> BOX
    5: '*',  // CARGO_ON_TARGET -> BOX_ON_GOAL
    6: '@',  // KEEPER -> PLAYER
    7: '+',  // KEEPER_ON_TARGET -> PLAYER_ON_GOAL
  };

  return numericMap.map(row => 
    row.map(tile => tileMap[tile] || ' ').join('')
  );
}

export class BoxWorld {
  // Game symbols
  static WALL = '#';
  static PLAYER = '@';
  static PLAYER_ON_GOAL = '+';
  static BOX = '$';
  static BOX_ON_GOAL = '*';
  static GOAL = '.';
  static FLOOR = ' ';

  constructor(levelData) {
    this.originalLevel = levelData.map(row => row.split(''));
    this.level = levelData.map(row => row.split(''));
    this.movesHistory = [];
    this.playerPos = this._findPlayer();
    this.numMoves = 0;
  }

  _findPlayer() {
    for (let y = 0; y < this.level.length; y++) {
      for (let x = 0; x < this.level[y].length; x++) {
        const cell = this.level[y][x];
        if (cell === BoxWorld.PLAYER || cell === BoxWorld.PLAYER_ON_GOAL) {
          return { x, y };
        }
      }
    }
    throw new Error('No player found in level');
  }

  getCell(x, y) {
    if (y >= 0 && y < this.level.length && x >= 0 && x < this.level[y].length) {
      return this.level[y][x];
    }
    return BoxWorld.WALL;
  }

  setCell(x, y, value) {
    if (y >= 0 && y < this.level.length && x >= 0 && x < this.level[y].length) {
      this.level[y][x] = value;
    }
  }

  movePlayer(dx, dy) {
    const { x, y } = this.playerPos;
    const newX = x + dx;
    const newY = y + dy;
    const nextCell = this.getCell(newX, newY);

    // Can't move into walls
    if (nextCell === BoxWorld.WALL) {
      return false;
    }

    // Moving into empty space or goal
    if (nextCell === BoxWorld.FLOOR || nextCell === BoxWorld.GOAL) {
      this._executeMove(x, y, newX, newY, dx, dy);
      return true;
    }

    // Moving into a box - check if we can push it
    if (nextCell === BoxWorld.BOX || nextCell === BoxWorld.BOX_ON_GOAL) {
      const boxNewX = newX + dx;
      const boxNewY = newY + dy;
      const beyondBox = this.getCell(boxNewX, boxNewY);

      // Can push box if space beyond is empty or a goal
      if (beyondBox === BoxWorld.FLOOR || beyondBox === BoxWorld.GOAL) {
        this._executePush(x, y, newX, newY, boxNewX, boxNewY, dx, dy);
        return true;
      }
    }

    return false;
  }

  _executeMove(x, y, newX, newY, dx, dy) {
    // Save state for undo
    this.movesHistory.push({ x, y, dx, dy, wasPush: false });

    // Update old position
    const currentCell = this.getCell(x, y);
    if (currentCell === BoxWorld.PLAYER) {
      this.setCell(x, y, BoxWorld.FLOOR);
    } else {
      this.setCell(x, y, BoxWorld.GOAL);
    }

    // Update new position
    const nextCell = this.getCell(newX, newY);
    if (nextCell === BoxWorld.GOAL) {
      this.setCell(newX, newY, BoxWorld.PLAYER_ON_GOAL);
    } else {
      this.setCell(newX, newY, BoxWorld.PLAYER);
    }

    this.playerPos = { x: newX, y: newY };
    this.numMoves++;
  }

  _executePush(x, y, newX, newY, boxNewX, boxNewY, dx, dy) {
    // Save state for undo
    this.movesHistory.push({ x, y, dx, dy, wasPush: true });

    // Update old player position
    const currentCell = this.getCell(x, y);
    if (currentCell === BoxWorld.PLAYER) {
      this.setCell(x, y, BoxWorld.FLOOR);
    } else {
      this.setCell(x, y, BoxWorld.GOAL);
    }

    // Update box's old position (where player is moving to)
    const boxCell = this.getCell(newX, newY);
    if (boxCell === BoxWorld.BOX) {
      this.setCell(newX, newY, BoxWorld.PLAYER);
    } else {
      this.setCell(newX, newY, BoxWorld.PLAYER_ON_GOAL);
    }

    // Update box's new position
    const beyondBox = this.getCell(boxNewX, boxNewY);
    if (beyondBox === BoxWorld.GOAL) {
      this.setCell(boxNewX, boxNewY, BoxWorld.BOX_ON_GOAL);
    } else {
      this.setCell(boxNewX, boxNewY, BoxWorld.BOX);
    }

    this.playerPos = { x: newX, y: newY };
    this.numMoves++;
  }

  undoMove() {
    if (this.movesHistory.length === 0) {
      return false;
    }

    const { x, y, dx, dy, wasPush } = this.movesHistory.pop();
    const newX = x + dx;
    const newY = y + dy;

    if (wasPush) {
      // Undo a push move
      const boxX = newX + dx;
      const boxY = newY + dy;

      // Move box back
      const boxCell = this.getCell(boxX, boxY);
      const boxOnGoal = boxCell === BoxWorld.BOX_ON_GOAL;
      if (boxOnGoal) {
        this.setCell(boxX, boxY, BoxWorld.GOAL);
      } else {
        this.setCell(boxX, boxY, BoxWorld.FLOOR);
      }

      // Restore box at player's current position
      const playerCell = this.getCell(newX, newY);
      const playerOnGoal = playerCell === BoxWorld.PLAYER_ON_GOAL;
      if (playerOnGoal) {
        this.setCell(newX, newY, BoxWorld.BOX_ON_GOAL);
      } else {
        this.setCell(newX, newY, BoxWorld.BOX);
      }
    } else {
      // Undo a simple move
      const playerCell = this.getCell(newX, newY);
      const playerOnGoal = playerCell === BoxWorld.PLAYER_ON_GOAL;
      if (playerOnGoal) {
        this.setCell(newX, newY, BoxWorld.GOAL);
      } else {
        this.setCell(newX, newY, BoxWorld.FLOOR);
      }
    }

    // Restore player at original position
    const originalCell = this.originalLevel[y][x];
    if (
      originalCell === BoxWorld.GOAL ||
      originalCell === BoxWorld.PLAYER_ON_GOAL ||
      originalCell === BoxWorld.BOX_ON_GOAL
    ) {
      this.setCell(x, y, BoxWorld.PLAYER_ON_GOAL);
    } else {
      this.setCell(x, y, BoxWorld.PLAYER);
    }

    this.playerPos = { x, y };
    this.numMoves--;
    return true;
  }

  isSolved() {
    for (const row of this.level) {
      for (const cell of row) {
        if (cell === BoxWorld.BOX) {
          return false;
        }
      }
    }
    return true;
  }

  resetLevel() {
    this.level = this.originalLevel.map(row => [...row]);
    this.playerPos = this._findPlayer();
    this.movesHistory = [];
    this.numMoves = 0;
  }

  render() {
    return this.level.map(row => row.join('')).join('\n');
  }
}

// Collection of levels - converted from maps.js numeric format to ASCII strings
export const LEVELS = maps.map(convertNumericMapToASCII);
