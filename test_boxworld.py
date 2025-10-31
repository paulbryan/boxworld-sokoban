#!/usr/bin/env python3
"""
Unit tests for Boxworld game mechanics.
"""

import unittest
from boxworld import BoxWorld


class TestBoxWorld(unittest.TestCase):
    """Test cases for BoxWorld game."""
    
    def setUp(self):
        """Set up test fixtures."""
        # Simple test level
        self.simple_level = [
            "########",
            "#  .   #",
            "#  $   #",
            "#  @   #",
            "########",
        ]
        
    def test_initialization(self):
        """Test game initialization."""
        game = BoxWorld(self.simple_level)
        self.assertEqual(game.player_pos, (3, 3))
        self.assertEqual(game.num_moves, 0)
        
    def test_player_movement_simple(self):
        """Test simple player movement."""
        game = BoxWorld(self.simple_level)
        
        # Move up (should succeed)
        result = game.move_player(0, -1)
        self.assertTrue(result)
        self.assertEqual(game.player_pos, (3, 2))
        self.assertEqual(game.num_moves, 1)
        
    def test_player_cannot_move_into_wall(self):
        """Test that player cannot move into walls."""
        level = [
            "#####",
            "#@  #",
            "#####",
        ]
        game = BoxWorld(level)
        
        # Try to move left into wall (should fail)
        initial_pos = game.player_pos
        result = game.move_player(-1, 0)
        self.assertFalse(result)
        self.assertEqual(game.player_pos, initial_pos)
        self.assertEqual(game.num_moves, 0)
        
    def test_push_box(self):
        """Test pushing a box."""
        game = BoxWorld(self.simple_level)
        
        # Move up to push the box
        result = game.move_player(0, -1)
        self.assertTrue(result)
        
        # Check box was pushed
        box_cell = game.get_cell(3, 1)
        self.assertIn(box_cell, [BoxWorld.BOX_ON_GOAL, BoxWorld.BOX])
        
    def test_cannot_push_box_into_wall(self):
        """Test that box cannot be pushed into a wall."""
        level = [
            "#####",
            "#@$##",
            "#####",
        ]
        game = BoxWorld(level)
        
        # Try to push box right (should fail - wall behind box)
        initial_pos = game.player_pos
        result = game.move_player(1, 0)
        self.assertFalse(result)
        self.assertEqual(game.player_pos, initial_pos)
        
    def test_cannot_push_two_boxes(self):
        """Test that two boxes cannot be pushed at once."""
        level = [
            "#######",
            "#@$$..#",
            "#######",
        ]
        game = BoxWorld(level)
        
        # Try to push two boxes (should fail)
        initial_pos = game.player_pos
        result = game.move_player(1, 0)
        self.assertFalse(result)
        self.assertEqual(game.player_pos, initial_pos)
        
    def test_win_condition(self):
        """Test win condition detection."""
        game = BoxWorld(self.simple_level)
        
        # Initially not solved
        self.assertFalse(game.is_solved())
        
        # Move up and push box onto goal
        game.move_player(0, -1)
        
        # Should be solved now
        self.assertTrue(game.is_solved())
        
    def test_undo_move(self):
        """Test undo functionality."""
        game = BoxWorld(self.simple_level)
        
        initial_pos = game.player_pos
        
        # Make a move
        game.move_player(0, -1)
        self.assertNotEqual(game.player_pos, initial_pos)
        
        # Undo the move
        result = game.undo_move()
        self.assertTrue(result)
        self.assertEqual(game.player_pos, initial_pos)
        self.assertEqual(game.num_moves, 0)
        
    def test_undo_empty_history(self):
        """Test undo with no moves made."""
        game = BoxWorld(self.simple_level)
        
        # Try to undo with no moves
        result = game.undo_move()
        self.assertFalse(result)
        
    def test_reset_level(self):
        """Test level reset functionality."""
        game = BoxWorld(self.simple_level)
        
        # Make some moves
        game.move_player(0, -1)
        game.move_player(1, 0)
        
        self.assertNotEqual(game.num_moves, 0)
        
        # Reset
        game.reset_level()
        
        self.assertEqual(game.num_moves, 0)
        self.assertEqual(game.player_pos, (3, 3))
        self.assertEqual(len(game.moves_history), 0)
        
    def test_box_on_goal_symbol(self):
        """Test that box on goal shows correct symbol."""
        game = BoxWorld(self.simple_level)
        
        # Push box onto goal
        game.move_player(0, -1)
        
        # Check the symbol at goal position
        cell = game.get_cell(3, 1)
        self.assertEqual(cell, BoxWorld.BOX_ON_GOAL)
        
    def test_player_on_goal_symbol(self):
        """Test that player on goal shows correct symbol."""
        level = [
            "#####",
            "#.@ #",
            "#####",
        ]
        game = BoxWorld(level)
        
        # Move player onto the goal
        game.move_player(-1, 0)
        
        # Check player is on goal
        cell = game.get_cell(1, 1)
        self.assertEqual(cell, BoxWorld.PLAYER_ON_GOAL)


class TestGameLevels(unittest.TestCase):
    """Test that all included levels are valid."""
    
    def test_all_levels_have_player(self):
        """Test that all levels have a player."""
        from boxworld import LEVELS
        
        for i, level in enumerate(LEVELS):
            with self.subTest(level=i+1):
                # Should not raise ValueError
                game = BoxWorld(level)
                self.assertIsNotNone(game.player_pos)
                
    def test_all_levels_have_boxes_and_goals(self):
        """Test that all levels have boxes and goals."""
        from boxworld import LEVELS
        
        for i, level in enumerate(LEVELS):
            with self.subTest(level=i+1):
                game = BoxWorld(level)
                
                # Count boxes and goals
                num_boxes = 0
                num_goals = 0
                
                for row in game.level:
                    for cell in row:
                        if cell in (BoxWorld.BOX, BoxWorld.BOX_ON_GOAL):
                            num_boxes += 1
                        if cell in (BoxWorld.GOAL, BoxWorld.PLAYER_ON_GOAL, BoxWorld.BOX_ON_GOAL):
                            num_goals += 1
                
                # Each level should have at least one box and goal
                self.assertGreater(num_boxes, 0, f"Level {i+1} has no boxes")
                self.assertGreater(num_goals, 0, f"Level {i+1} has no goals")


if __name__ == '__main__':
    unittest.main()
