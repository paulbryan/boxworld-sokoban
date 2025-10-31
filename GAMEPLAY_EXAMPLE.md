# Boxworld Gameplay Example

This document shows what the game looks like when running.

## Game Start Screen

```
==================================================
         BOXWORLD - SOKOBAN PUZZLE GAME
==================================================

OBJECTIVE:
  Push all boxes ($) onto the goal positions (.)

CONTROLS:
  w/↑ - Move Up
  s/↓ - Move Down
  a/← - Move Left
  d/→ - Move Right
  u   - Undo last move
  r   - Reset level
  q   - Quit game

SYMBOLS:
  @  - Player
  #  - Wall
  $  - Box
  .  - Goal position
  *  - Box on goal
  +  - Player on goal

RULES:
  - You can only push boxes, not pull them
  - Only one box can be pushed at a time
  - Be careful not to push boxes into corners!

LEVEL 1 of 5
Moves: 0

########
#  .   #
#  $   #
#  @   #
########

Move (w/a/s/d/u/r/q): 
```

## Level 1 - Step by Step Solution

### Initial State
```
########
#  .   #
#  $   #
#  @   #
########

@ = Player position
$ = Box that needs to be pushed
. = Goal position (target)
```

### After pressing 'w' (move up)
```
########
#  *   #
#  @   #
#      #
########

* = Box on goal (success!)
Moves: 1
```

### Level Complete!
```
🎉 CONGRATULATIONS! Level completed! 🎉
Total moves: 1

Press Enter for next level, or 'q' to quit:
```

## Level 2 - Two Boxes

### Initial State
```
#########
#   .   #
#   $   #
#  @$. ##
#########

Two boxes need to be pushed onto two goal positions
```

### Solution Sequence
```
Step 1: Press 'd' (move right)
#########
#   .   #
#   $   #
#   @* ##
#########

Step 2: Press 'w' (move up and push box)
#########
#   *   #
#   @   #
#    * ##
#########

✅ Level Complete! Both boxes are on goals!
```

## Level 4 - Classic Sokoban (More Complex)

### Initial State
```
    #####
    #   #
    #$  #
  ###  $##
  #  $ $ #
### # ## #   ######
#   # ## #####  ..#
# $  $          ..#
##### ### #@##  ..#
    #     #########
    #######

This level requires strategic thinking!
Player (@) needs to push 5 boxes ($) onto 6 goals (.)
```

### Game Features Demonstration

#### Using Undo Feature
```
Before undo:
########
#  *   #
#  @   #
#      #
########
Moves: 1

After pressing 'u' (undo):
########
#  .   #
#  $   #
#  @   #
########
Moves: 0
```

#### Using Reset Feature
After making several moves, press 'r' to reset the level to its initial state.

## Victory Screen (All Levels Complete)

```
🎉 CONGRATULATIONS! Level completed! 🎉
Total moves: 47

🏆 YOU COMPLETED ALL LEVELS! 🏆
Thanks for playing Boxworld!
```

## Tips for Success

1. **Think Before You Move**: Once a box is in a corner, you might not be able to move it!
   ```
   Bad: Box stuck in corner
   #####
   #*  #
   #@ $#
   #####
   
   Can't push the $ box anywhere!
   ```

2. **Use Walls to Your Advantage**: Boxes can be slid along walls
   ```
   #########
   #@$$$...#
   #########
   
   Push boxes along the wall to goals
   ```

3. **Don't Rush**: Take time to plan your moves. Use 'u' to undo mistakes!

## How to Play

Run the game:
```bash
python3 boxworld.py
```

Enjoy the classic puzzle-solving experience! 🎮📦
