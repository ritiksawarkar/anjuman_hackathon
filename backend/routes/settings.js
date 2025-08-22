const express = require('express');
const UserSettings = require('../models/UserSettings');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user.id });
    
    if (!settings) {
      // Create default settings if none exist
      settings = new UserSettings({ userId: req.user.id });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { ttsSettings, fontSettings, themeSettings, languageSettings } = req.body;
    
    let settings = await UserSettings.findOne({ userId: req.user.id });
    
    if (!settings) {
      settings = new UserSettings({ userId: req.user.id });
    }
    
    // Update settings
    if (ttsSettings) settings.ttsSettings = { ...settings.ttsSettings, ...ttsSettings };
    if (fontSettings) settings.fontSettings = { ...settings.fontSettings, ...fontSettings };
    if (themeSettings) settings.themeSettings = { ...settings.themeSettings, ...themeSettings };
    if (languageSettings) settings.languageSettings = { ...settings.languageSettings, ...languageSettings };
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/settings/usage/:feature
// @desc    Update usage statistics
// @access  Private
router.post('/usage/:feature', authenticateToken, async (req, res) => {
  try {
    const { feature } = req.params;
    
    let settings = await UserSettings.findOne({ userId: req.user.id });
    
    if (!settings) {
      settings = new UserSettings({ userId: req.user.id });
    }
    
    // Update usage stats
    switch (feature) {
      case 'tts':
        settings.usageStats.ttsUsage += 1;
        break;
      case 'stt':
        settings.usageStats.sttUsage += 1;
        break;
      case 'ocr':
        settings.usageStats.ocrUsage += 1;
        break;
      case 'quiz':
        settings.usageStats.quizzesTaken += 1;
        break;
      case 'notes':
        settings.usageStats.notesCreated += 1;
        break;
    }
    
    await settings.save();
    res.json({ message: 'Usage updated', stats: settings.usageStats });
  } catch (error) {
    console.error('Error updating usage stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
