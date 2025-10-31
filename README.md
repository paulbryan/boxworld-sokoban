# Boxworld - Sokoban Puzzle Game

A Python implementation of the classic Boxworld/Sokoban puzzle game. Push all boxes onto goal positions to complete each level!

## About

Boxworld is based on Sokoban, a classic Japanese puzzle game created in 1981. The name "Sokoban" means "warehouse keeper" in Japanese. The game challenges players to push boxes (not pull!) onto designated goal positions within a warehouse maze.

## Features

- 🎮 Classic Sokoban gameplay mechanics
- 📦 5 challenging levels with increasing difficulty
- ↩️ Undo functionality to reverse mistakes
- 🔄 Level reset capability
- 🎯 Win condition detection
- 💻 Terminal-based ASCII graphics interface

## Installation

No installation required! Just make sure you have Python 3.6+ installed.

```bash
# Clone the repository
git clone https://github.com/paulbryan/boxworld-sokoban.git
cd boxworld-sokoban

# Make the game executable (optional)
chmod +x boxworld.py
```

## How to Play

Run the game:

```bash
python3 boxworld.py
```

Or if you made it executable:

```bash
./boxworld.py
```

### Game Controls

- `w` or `↑` - Move Up
- `s` or `↓` - Move Down
- `a` or `←` - Move Left
- `d` or `→` - Move Right
- `u` - Undo last move
- `r` - Reset current level
- `q` - Quit game

### Game Symbols

- `@` - Player (warehouse keeper)
- `#` - Wall
- `$` - Box (crate)
- `.` - Goal position (target spot)
- `*` - Box on goal (box placed correctly)
- `+` - Player on goal

### Rules

1. **Objective**: Push all boxes ($) onto goal positions (.) to complete the level
2. **Movement**: The player can move in four directions (up, down, left, right)
3. **Pushing**: Boxes can only be **pushed**, not pulled
4. **Limitations**: 
   - Only one box can be moved at a time
   - You cannot push a box if there's a wall or another box behind it
   - Be careful not to push boxes into corners - they might become unmovable!
5. **Winning**: A level is complete when all boxes are on goal positions (shown as `*`)

## Game Strategy Tips

- 🧠 **Plan ahead**: Think several moves in advance
- 🚫 **Avoid corners**: Don't push boxes into corners unless it's a goal position
- 📐 **Use walls**: Use walls to your advantage for maneuvering boxes
- ↩️ **Use undo**: Don't hesitate to undo moves if you make a mistake
- 🔄 **Reset when stuck**: If you create an unsolvable position, reset the level

## Level Progression

The game includes 5 levels:

1. **Level 1**: Simple introduction - One box, one goal
2. **Level 2**: Two boxes - Learn basic pushing mechanics
3. **Level 3**: Corner challenge - Avoid dead ends
4. **Level 4**: Classic Sokoban - A traditional puzzle layout
5. **Level 5**: Tight squeeze - All boxes in a row

## Development

### Adding New Levels

To add new levels, edit the `LEVELS` list in `boxworld.py`. Each level is a list of strings representing the game board:

```python
LEVELS = [
    [
        "########",
        "#  .   #",
        "#  $   #",
        "#  @   #",
        "########",
    ],
    # Add more levels here...
]
```

### Running Tests

The game includes basic functionality that can be tested:

```bash
python3 -m doctest boxworld.py -v
```

## Technical Details

- **Language**: Python 3.6+
- **Dependencies**: None (uses only standard library)
- **Platform**: Cross-platform (Windows, macOS, Linux)
- **Interface**: Terminal/Console-based

## History

Sokoban was created by Hiroyuki Imabayashi in 1981 and published by Thinking Rabbit. It became one of the most popular puzzle games of all time, spawning thousands of levels and numerous implementations. Boxworld is one of the many popular variants that brought Sokoban to different platforms.

## License

This is a recreational implementation of the classic Sokoban game mechanics. The game concept is in the public domain.

## Contributing

Contributions are welcome! Feel free to:

- Add new levels
- Improve the UI
- Add new features (level editor, save/load, etc.)
- Fix bugs
- Improve documentation

## Acknowledgments

- Original Sokoban game by Hiroyuki Imabayashi
- Classic Boxworld implementation inspiration
- The Sokoban community for level designs

## Contact

Created as a learning project. Enjoy the game! 🎮📦