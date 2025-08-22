const express = require('express');
const QuizResult = require('../models/QuizResult');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/quiz/results
// @desc    Get user quiz results
// @access  Private
router.get('/results', authenticateToken, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quiz/results
// @desc    Save quiz result
// @access  Private
router.post('/results', authenticateToken, async (req, res) => {
  try {
    const { quizId, score, totalQuestions, correctAnswers, timeSpent, answers } = req.body;
    
    const quizResult = new QuizResult({
      userId: req.user.id,
      quizId,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      answers
    });
    
    await quizResult.save();
    res.status(201).json(quizResult);
  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz/stats
// @desc    Get user quiz statistics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.id });
    
    const stats = {
      totalQuizzes: results.length,
      averageScore: results.length > 0 ? results.reduce((sum, r) => sum + r.score, 0) / results.length : 0,
      bestScore: results.length > 0 ? Math.max(...results.map(r => r.score)) : 0,
      totalTimeSpent: results.reduce((sum, r) => sum + r.timeSpent, 0),
      recentResults: results.slice(0, 5)
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
