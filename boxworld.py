#!/usr/bin/env python3
"""
Boxworld - A Sokoban puzzle game implementation
Push all boxes onto the goal positions to win!
"""

import os
import sys
from typing import List, Tuple, Optional


class BoxWorld:
    """Main game class for Boxworld/Sokoban puzzle game."""
    
    # Game symbols
    WALL = '#'
    PLAYER = '@'
    PLAYER_ON_GOAL = '+'
    BOX = '$'
    BOX_ON_GOAL = '*'
    GOAL = '.'
    FLOOR = ' '
    
    def __init__(self, level_data: List[str]):
        """Initialize game with level data.
        
        Args:
            level_data: List of strings representing the level layout
        """
        self.original_level = [list(row) for row in level_data]
        self.level = [list(row) for row in level_data]
        self.moves_history = []
        self.player_pos = self._find_player()
        self.num_moves = 0
        
    def _find_player(self) -> Tuple[int, int]:
        """Find the player's starting position."""
        for y, row in enumerate(self.level):
            for x, cell in enumerate(row):
                if cell in (self.PLAYER, self.PLAYER_ON_GOAL):
                    return (x, y)
        raise ValueError("No player found in level")
    
    def get_cell(self, x: int, y: int) -> str:
        """Get the cell at position (x, y)."""
        if 0 <= y < len(self.level) and 0 <= x < len(self.level[y]):
            return self.level[y][x]
        return self.WALL
    
    def set_cell(self, x: int, y: int, value: str):
        """Set the cell at position (x, y)."""
        if 0 <= y < len(self.level) and 0 <= x < len(self.level[y]):
            self.level[y][x] = value
    
    def move_player(self, dx: int, dy: int) -> bool:
        """Attempt to move the player in direction (dx, dy).
        
        Args:
            dx: Horizontal movement (-1 for left, 1 for right)
            dy: Vertical movement (-1 for up, 1 for down)
            
        Returns:
            True if move was successful, False otherwise
        """
        x, y = self.player_pos
        new_x, new_y = x + dx, y + dy
        next_cell = self.get_cell(new_x, new_y)
        
        # Can't move into walls
        if next_cell == self.WALL:
            return False
        
        # Moving into empty space or goal
        if next_cell in (self.FLOOR, self.GOAL):
            self._execute_move(x, y, new_x, new_y, dx, dy)
            return True
        
        # Moving into a box - check if we can push it
        if next_cell in (self.BOX, self.BOX_ON_GOAL):
            box_new_x, box_new_y = new_x + dx, new_y + dy
            beyond_box = self.get_cell(box_new_x, box_new_y)
            
            # Can push box if space beyond is empty or a goal
            if beyond_box in (self.FLOOR, self.GOAL):
                self._execute_push(x, y, new_x, new_y, box_new_x, box_new_y, dx, dy)
                return True
        
        return False
    
    def _execute_move(self, x: int, y: int, new_x: int, new_y: int, dx: int, dy: int):
        """Execute a simple move (no box pushing)."""
        # Save state for undo
        self.moves_history.append((x, y, dx, dy, False))
        
        # Update old position
        current_cell = self.get_cell(x, y)
        if current_cell == self.PLAYER:
            self.set_cell(x, y, self.FLOOR)
        else:  # PLAYER_ON_GOAL
            self.set_cell(x, y, self.GOAL)
        
        # Update new position
        next_cell = self.get_cell(new_x, new_y)
        if next_cell == self.GOAL:
            self.set_cell(new_x, new_y, self.PLAYER_ON_GOAL)
        else:
            self.set_cell(new_x, new_y, self.PLAYER)
        
        self.player_pos = (new_x, new_y)
        self.num_moves += 1
    
    def _execute_push(self, x: int, y: int, new_x: int, new_y: int, 
                     box_new_x: int, box_new_y: int, dx: int, dy: int):
        """Execute a move that pushes a box."""
        # Save state for undo
        self.moves_history.append((x, y, dx, dy, True))
        
        # Update old player position
        current_cell = self.get_cell(x, y)
        if current_cell == self.PLAYER:
            self.set_cell(x, y, self.FLOOR)
        else:  # PLAYER_ON_GOAL
            self.set_cell(x, y, self.GOAL)
        
        # Update box's old position (where player is moving to)
        box_cell = self.get_cell(new_x, new_y)
        if box_cell == self.BOX:
            self.set_cell(new_x, new_y, self.PLAYER)
        else:  # BOX_ON_GOAL
            self.set_cell(new_x, new_y, self.PLAYER_ON_GOAL)
        
        # Update box's new position
        beyond_box = self.get_cell(box_new_x, box_new_y)
        if beyond_box == self.GOAL:
            self.set_cell(box_new_x, box_new_y, self.BOX_ON_GOAL)
        else:
            self.set_cell(box_new_x, box_new_y, self.BOX)
        
        self.player_pos = (new_x, new_y)
        self.num_moves += 1
    
    def undo_move(self) -> bool:
        """Undo the last move.
        
        Returns:
            True if undo was successful, False if no moves to undo
        """
        if not self.moves_history:
            return False
        
        x, y, dx, dy, was_push = self.moves_history.pop()
        new_x, new_y = x + dx, y + dy
        
        if was_push:
            # Undo a push move
            box_x, box_y = new_x + dx, new_y + dy
            
            # Move box back
            box_cell = self.get_cell(box_x, box_y)
            box_on_goal = (box_cell == self.BOX_ON_GOAL)
            if box_on_goal:
                self.set_cell(box_x, box_y, self.GOAL)
            else:
                self.set_cell(box_x, box_y, self.FLOOR)
            
            # Restore box at player's current position
            player_cell = self.get_cell(new_x, new_y)
            player_on_goal = (player_cell == self.PLAYER_ON_GOAL)
            if player_on_goal:
                self.set_cell(new_x, new_y, self.BOX_ON_GOAL)
            else:
                self.set_cell(new_x, new_y, self.BOX)
        else:
            # Undo a simple move
            player_cell = self.get_cell(new_x, new_y)
            player_on_goal = (player_cell == self.PLAYER_ON_GOAL)
            if player_on_goal:
                self.set_cell(new_x, new_y, self.GOAL)
            else:
                self.set_cell(new_x, new_y, self.FLOOR)
        
        # Restore player at original position
        original_cell = self.original_level[y][x]
        if original_cell in (self.GOAL, self.PLAYER_ON_GOAL, self.BOX_ON_GOAL):
            self.set_cell(x, y, self.PLAYER_ON_GOAL)
        else:
            self.set_cell(x, y, self.PLAYER)
        
        self.player_pos = (x, y)
        self.num_moves -= 1
        return True
    
    def is_solved(self) -> bool:
        """Check if the level is solved (all boxes on goals)."""
        for row in self.level:
            for cell in row:
                if cell == self.BOX:  # Box not on goal
                    return False
        return True
    
    def reset_level(self):
        """Reset the level to its initial state."""
        self.level = [list(row) for row in self.original_level]
        self.player_pos = self._find_player()
        self.moves_history = []
        self.num_moves = 0
    
    def render(self) -> str:
        """Render the current game state as a string."""
        return '\n'.join(''.join(row) for row in self.level)


# Collection of levels
LEVELS = [
    # Level 1 - Simple introduction
    [
        "########",
        "#  .   #",
        "#  $   #",
        "#  @   #",
        "########",
    ],
    
    # Level 2 - Two boxes
    [
        "#########",
        "#   .   #",
        "#   $   #",
        "#  @$. ##",
        "#########",
    ],
    
    # Level 3 - Corner challenge
    [
        "  #####",
        "###   #",
        "#.$ $ #",
        "#.  ###",
        "#.  #",
        "#@ ##",
        "####",
    ],
    
    # Level 4 - Classic Sokoban
    [
        "    #####",
        "    #   #",
        "    #$  #",
        "  ###  $##",
        "  #  $ $ #",
        "### # ## #   ######",
        "#   # ## #####  ..#",
        "# $  $          ..#",
        "##### ### #@##  ..#",
        "    #     #########",
        "    #######",
    ],
    
    # Level 5 - Tight squeeze
    [
        "########",
        "#......#",
        "#  @   #",
        "# $$$$$#",
        "########",
    ],
]


def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


def display_instructions():
    """Display game instructions."""
    print("=" * 50)
    print("         BOXWORLD - SOKOBAN PUZZLE GAME")
    print("=" * 50)
    print()
    print("OBJECTIVE:")
    print("  Push all boxes ($) onto the goal positions (.)")
    print()
    print("CONTROLS:")
    print("  w/↑ - Move Up")
    print("  s/↓ - Move Down")
    print("  a/← - Move Left")
    print("  d/→ - Move Right")
    print("  u   - Undo last move")
    print("  r   - Reset level")
    print("  q   - Quit game")
    print()
    print("SYMBOLS:")
    print("  @  - Player")
    print("  #  - Wall")
    print("  $  - Box")
    print("  .  - Goal position")
    print("  *  - Box on goal")
    print("  +  - Player on goal")
    print()
    print("RULES:")
    print("  - You can only push boxes, not pull them")
    print("  - Only one box can be pushed at a time")
    print("  - Be careful not to push boxes into corners!")
    print()


def main():
    """Main game loop."""
    if len(sys.argv) > 1 and sys.argv[1] in ('-h', '--help'):
        display_instructions()
        print("\nPress Enter to start the game...")
        input()
    
    current_level = 0
    
    while current_level < len(LEVELS):
        game = BoxWorld(LEVELS[current_level])
        
        while True:
            clear_screen()
            display_instructions()
            print(f"LEVEL {current_level + 1} of {len(LEVELS)}")
            print(f"Moves: {game.num_moves}")
            print()
            print(game.render())
            print()
            
            if game.is_solved():
                print("🎉 CONGRATULATIONS! Level completed! 🎉")
                print(f"Total moves: {game.num_moves}")
                print()
                
                if current_level + 1 < len(LEVELS):
                    response = input("Press Enter for next level, or 'q' to quit: ").strip().lower()
                    if response == 'q':
                        print("Thanks for playing Boxworld!")
                        return
                    current_level += 1
                    break
                else:
                    print("🏆 YOU COMPLETED ALL LEVELS! 🏆")
                    print("Thanks for playing Boxworld!")
                    return
            
            move = input("Move (w/a/s/d/u/r/q): ").strip().lower()
            
            if move == 'q':
                print("Thanks for playing Boxworld!")
                return
            elif move == 'r':
                game.reset_level()
            elif move == 'u':
                if not game.undo_move():
                    print("No moves to undo!")
                    input("Press Enter to continue...")
            elif move in ('w', '↑'):
                game.move_player(0, -1)
            elif move in ('s', '↓'):
                game.move_player(0, 1)
            elif move in ('a', '←'):
                game.move_player(-1, 0)
            elif move in ('d', '→'):
                game.move_player(1, 0)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nThanks for playing Boxworld!")
        sys.exit(0)
