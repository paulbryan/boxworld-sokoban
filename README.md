# Boxworld - Sokoban Puzzle Game

A modern web-based implementation of the classic Boxworld/Sokoban puzzle game built with React and Vite. Push all boxes onto goal positions to complete each level!

## Screenshots

### Game Interface
![Game Interface](https://github.com/user-attachments/assets/53f9953d-662a-4e3f-8380-cca5ea468f01)

### Level Complete
![Level Complete](https://github.com/user-attachments/assets/b7afa26e-f4c5-439e-a7b1-ca67f594ee40)

## About

Boxworld is based on Sokoban, a classic Japanese puzzle game created in 1981. The name "Sokoban" means "warehouse keeper" in Japanese. The game challenges players to push boxes (not pull!) onto designated goal positions within a warehouse maze.

## Features

- 🎮 Classic Sokoban gameplay mechanics
- 📦 5 challenging levels with increasing difficulty
- ↩️ Undo functionality to reverse mistakes
- 🔄 Level reset capability
- 🎯 Win condition detection
- 🎨 Beautiful graphical user interface with emojis
- ⌨️ **Arrow key controls** for intuitive gameplay
- 🌐 Web-based - play in any modern browser
- ⚛️ Built with React and Vite

## Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone https://github.com/paulbryan/boxworld-sokoban.git
cd boxworld-sokoban

# Install dependencies
npm install
```

## How to Play

### Run the Game

Start the development server:

```bash
npm run dev
```

Then open your browser to the URL shown (typically http://localhost:5173)

Or build for production:

```bash
npm run build
npm run preview
```

### Game Controls

- **↑ Arrow Up** - Move Up
- **↓ Arrow Down** - Move Down
- **← Arrow Left** - Move Left
- **→ Arrow Right** - Move Right
- **U** - Undo last move
- **R** - Reset current level

### Game Symbols

- 🧑 - Player (warehouse keeper)
- 📦 - Box (crate)
- ⭕ - Goal position (target spot)
- ✅ - Box on goal (box placed correctly)
- Dark gray - Walls
- Tan - Floor

### Rules

1. **Objective**: Push all boxes (📦) onto goal positions (⭕) to complete the level
2. **Movement**: Use arrow keys to move in four directions (up, down, left, right)
3. **Pushing**: Boxes can only be **pushed**, not pulled
4. **Limitations**: 
   - Only one box can be moved at a time
   - You cannot push a box if there's a wall or another box behind it
   - Be careful not to push boxes into corners - they might become unmovable!
5. **Winning**: A level is complete when all boxes are on goal positions (shown as ✅)

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

### Project Structure

```
boxworld-sokoban/
├── src/
│   ├── boxworld.js          # Core game logic
│   ├── components/
│   │   ├── GameBoard.jsx    # Game board component
│   │   └── GameBoard.css    # Board styling
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styling
│   └── main.jsx             # Entry point
├── boxworld.py              # Original Python implementation
├── test_boxworld.py         # Python tests
└── package.json
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding New Levels

To add new levels, edit the `LEVELS` array in `src/boxworld.js`:

```javascript
export const LEVELS = [
  [
    "########",
    "#  .   #",
    "#  $   #",
    "#  @   #",
    "########",
  ],
  // Add more levels here...
];
```

### Running Python Tests

The original Python implementation is still available with its tests:

```bash
python3 test_boxworld.py
```

Or run with verbose output:

```bash
python3 test_boxworld.py -v
```

## Technical Details

### Web Version
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: JavaScript (ES6+)
- **Platform**: Any modern web browser

### Python Version (Legacy)
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
