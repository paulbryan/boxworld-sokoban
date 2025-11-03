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
- 📦 60+ challenging levels with increasing difficulty
- ↩️ Undo functionality to reverse mistakes
- 🔄 Level reset capability
- 🎯 Win condition detection
- 🎨 Beautiful graphical user interface with emojis
- ⌨️ **Arrow key controls** for intuitive gameplay
- 🌐 Web-based - play in any modern browser
- ⚛️ Built with React and Vite
- 📱 Progressive Web App (PWA) support
- 🧪 Comprehensive test suite with Vitest
- 🤖 Built-in BFS solver for auto-solving levels
- 🎨 Modern CSS with animations and glass morphism effects
- 📊 Move tracking and statistics
- 🚀 Optimized for Cloudflare Workers deployment

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

The game includes 60+ levels with increasing difficulty:

- **Early Levels (1-10)**: Simple introduction - Basic mechanics and single box puzzles
- **Intermediate Levels (11-30)**: Multiple boxes - Learn complex pushing strategies
- **Advanced Levels (31-50)**: Corner challenges - Avoid dead ends and tight spaces
- **Expert Levels (51+)**: Classic Sokoban layouts - Traditional puzzle designs with complex solutions

All levels are sourced from classic Sokoban level sets and converted from numeric tile format to ASCII representation.

## Development

### Project Structure

```
boxworld-sokoban/
├── src/
│   ├── boxworld.js          # Core game logic and engine
│   ├── maps.js              # Level data (60+ levels in numeric format)
│   ├── solver.js            # BFS algorithm for auto-solving levels
│   ├── boxworld.test.js     # Comprehensive test suite
│   ├── components/
│   │   ├── GameBoard.jsx    # Game board component
│   │   └── GameBoard.css    # Board styling
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styling
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO robots file
│   └── sitemap.xml          # SEO sitemap
├── index.html               # HTML template with comprehensive SEO
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── wrangler.jsonc           # Cloudflare Workers deployment config
├── GAMEPLAY_EXAMPLE.md      # Gameplay documentation
└── package.json
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run test suite with Vitest
```

### Adding New Levels

Levels are stored in `src/maps.js` as numeric 2D arrays and automatically converted to ASCII format. To add new levels, add them to the `maps` array:

```javascript
export const maps = [
  // Existing levels...
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 3, 2, 2, 2, 1],
    [1, 2, 2, 4, 2, 2, 2, 1],
    [1, 2, 2, 6, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // Add more levels here...
]
```

**Tile Mapping:**

- `0` - EMPTY (outside playable area)
- `1` - WALL
- `2` - FLOOR
- `3` - TARGET (goal position)
- `4` - CARGO (box)
- `5` - CARGO_ON_TARGET (box on goal)
- `6` - KEEPER (player)
- `7` - KEEPER_ON_TARGET (player on goal)

### Running Tests

Run the comprehensive test suite:

```bash
npm run test
```

The test suite includes:

- Level loading validation (ensures all 60+ levels work)
- Game mechanics testing (movement, box pushing, collision detection)
- Undo/redo functionality verification
- Win condition detection
- Edge case handling

## Technical Details

### Architecture

- **Framework**: React 19 with functional components and hooks
- **Build Tool**: Vite 7 for fast development and optimized builds
- **Language**: JavaScript (ES6+) with modern features
- **Testing**: Vitest for unit testing
- **Styling**: Pure CSS with modern features (Grid, Flexbox, animations)
- **Deployment**: Cloudflare Workers ready
- **PWA**: Progressive Web App with manifest and service worker support

### Performance Features

- **Level Conversion**: Efficient numeric-to-ASCII level conversion system
- **State Management**: Optimized React state with useCallback for performance
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Modern CSS**: Glass morphism effects, smooth animations, and gradient backgrounds

## Advanced Features

### BFS Solver (`solver.js`)

The game includes an optional breadth-first search algorithm that can automatically solve levels:

```javascript
import { solveLevelBFS } from './solver.js'

// Solve a level with max 100 moves
const result = solveLevelBFS(levelData, 100)
if (result.solution) {
  console.log(`Solution found: ${result.solution}`)
  console.log(`Iterations: ${result.iterations}`)
}
```

Features:

- Finds optimal solutions for any solvable level
- Configurable search depth limits
- State deduplication to avoid cycles
- Returns solution as a string of moves (U/D/L/R)

### PWA Support

- **Installable**: Can be installed as a native app on mobile devices
- **Offline Ready**: Service worker support for offline gameplay
- **App-like Experience**: Standalone display mode and native app shortcuts

### Comprehensive Testing

The test suite covers:

- All 60+ levels load correctly and have valid player positions
- Movement mechanics including wall collisions and box pushing
- Undo/redo functionality maintains correct game state
- Win condition detection for various level configurations
- Edge cases like pushing boxes into walls or other boxes

## History

Sokoban was created by Hiroyuki Imabayashi in 1981 and published by Thinking Rabbit. It became one of the most popular puzzle games of all time, spawning thousands of levels and numerous implementations. Boxworld is one of the many popular variants that brought Sokoban to different platforms.

## License

This is a recreational implementation of the classic Sokoban game mechanics. The game concept is in the public domain.

## Deployment

### Cloudflare Workers

The project is configured for deployment to Cloudflare Workers:

```bash
# Deploy to Cloudflare Workers
npx wrangler deploy
```

Configuration is handled via `wrangler.jsonc` with:

- Static asset serving from `./dist`
- Single-page application routing
- Auto-trailing slash handling

### Build Process

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Contributing

Contributions are welcome! Feel free to:

- Add new levels (add to `src/maps.js`)
- Improve the UI and animations
- Add new features (level editor, save/load, hints system, etc.)
- Enhance the BFS solver with A\* or other algorithms
- Improve mobile responsiveness
- Add accessibility features
- Fix bugs and optimize performance
- Improve documentation and add tutorials

## Acknowledgments

- Original Sokoban game by Hiroyuki Imabayashi
- Classic Boxworld implementation inspiration
- The Sokoban community for level designs

## Contact

Created as a learning project. Enjoy the game! 🎮📦
