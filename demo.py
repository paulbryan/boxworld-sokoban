#!/usr/bin/env python3
"""
Quick demo script to showcase the Boxworld game mechanics.
This demonstrates the game without requiring interactive input.
"""

from boxworld import BoxWorld, LEVELS
import time


def print_separator():
    """Print a visual separator."""
    print("\n" + "=" * 60 + "\n")


def demo_game():
    """Run a quick automated demo of the game."""
    print_separator()
    print("🎮 BOXWORLD - SOKOBAN PUZZLE GAME DEMO 🎮")
    print_separator()
    
    print("Welcome to Boxworld! This is a Sokoban-style puzzle game where")
    print("you push boxes onto goal positions.")
    print("\nLet's see it in action!\n")
    
    # Demo Level 1
    print("=" * 60)
    print("LEVEL 1: Simple Introduction")
    print("=" * 60)
    
    game = BoxWorld(LEVELS[0])
    print("\nInitial State:")
    print(game.render())
    print(f"\nMoves: {game.num_moves}")
    print(f"Solved: {game.is_solved()}")
    print("\nLegend: @ = Player, $ = Box, . = Goal, * = Box on Goal")
    
    print("\n--- Action: Player moves UP and pushes the box ---")
    game.move_player(0, -1)
    print(game.render())
    print(f"\nMoves: {game.num_moves}")
    print(f"Solved: {game.is_solved()}")
    
    if game.is_solved():
        print("\n✅ LEVEL COMPLETE! The box is now on the goal position!")
    
    # Demo Level 2
    print("\n\n" + "=" * 60)
    print("LEVEL 2: Two Boxes Challenge")
    print("=" * 60)
    
    game2 = BoxWorld(LEVELS[1])
    print("\nInitial State:")
    print(game2.render())
    print(f"\nMoves: {game2.num_moves}")
    
    moves = [
        ("Move RIGHT", 1, 0),
        ("Move UP (pushes box onto goal)", 0, -1),
    ]
    
    for i, (description, dx, dy) in enumerate(moves, 1):
        print(f"\n--- Action {i}: {description} ---")
        game2.move_player(dx, dy)
        print(game2.render())
        print(f"Moves: {game2.num_moves}")
        if game2.is_solved():
            print("\n✅ LEVEL COMPLETE! Both boxes are on goals!")
            break
    
    # Show game features
    print("\n\n" + "=" * 60)
    print("GAME FEATURES")
    print("=" * 60)
    
    print("""
✨ FEATURES:
  • 5 progressively challenging levels
  • Undo functionality (press 'u')
  • Reset level (press 'r')
  • Move counter
  • Clear win condition
  • Classic Sokoban mechanics

🎯 RULES:
  • Push all boxes ($) onto goal positions (.)
  • Can only PUSH boxes, not pull them
  • Only one box can be moved at a time
  • Don't push boxes into corners!

🎮 CONTROLS:
  w/↑ - Move Up       u - Undo move
  s/↓ - Move Down     r - Reset level
  a/← - Move Left     q - Quit game
  d/→ - Move Right
    """)
    
    print_separator()
    print("Ready to play? Run:  python3 boxworld.py")
    print_separator()


if __name__ == "__main__":
    demo_game()
