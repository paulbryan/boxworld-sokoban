import { useState } from 'react'
import './LevelSelector.css'

function LevelSelector({
  isOpen,
  onClose,
  onSelectLevel,
  currentLevel,
  totalLevels,
}) {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel + 1)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const levelIndex = selectedLevel - 1
    if (levelIndex >= 0 && levelIndex < totalLevels) {
      onSelectLevel(levelIndex)
      onClose()
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setSelectedLevel(Math.max(1, Math.min(totalLevels, value)))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const generateLevelGrid = () => {
    const levels = []
    for (let i = 1; i <= totalLevels; i++) {
      levels.push(
        <button
          key={i}
          className={`level-btn ${i === currentLevel + 1 ? 'current' : ''} ${
            i === selectedLevel ? 'selected' : ''
          }`}
          onClick={() => setSelectedLevel(i)}
          type='button'
        >
          {i}
        </button>
      )
    }
    return levels
  }

  return (
    <div className='level-selector-overlay' onClick={onClose}>
      <div
        className='level-selector-modal'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className='level-selector-header'>
          <h2>🎯 Go to Level</h2>
          <button className='close-btn' onClick={onClose} type='button'>
            ✕
          </button>
        </div>

        <div className='level-selector-content'>
          <div className='current-level-info'>
            <p>
              Currently on Level <strong>{currentLevel + 1}</strong> of{' '}
              {totalLevels}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='level-input-form'>
            <div className='input-group'>
              <label htmlFor='level-input'>Jump to level:</label>
              <input
                id='level-input'
                type='number'
                min='1'
                max={totalLevels}
                value={selectedLevel}
                onChange={handleInputChange}
                autoFocus
              />
              <button type='submit' className='btn btn-primary'>
                Go
              </button>
            </div>
          </form>

          <div className='level-grid-container'>
            <h3>Or select from grid:</h3>
            <div className='level-grid'>{generateLevelGrid()}</div>
          </div>

          <div className='level-selector-actions'>
            <button
              className='btn'
              onClick={() => setSelectedLevel(1)}
              type='button'
            >
              First Level
            </button>
            <button
              className='btn'
              onClick={() => setSelectedLevel(totalLevels)}
              type='button'
            >
              Last Level
            </button>
            <button
              className='btn btn-primary'
              onClick={handleSubmit}
              type='button'
            >
              Go to Level {selectedLevel}
            </button>
          </div>
        </div>

        <div className='level-selector-footer'>
          <p>
            Press <kbd>ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}

export default LevelSelector
