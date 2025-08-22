const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // TTS Settings
  ttsSettings: {
    voice: { type: String, default: '' },
    rate: { type: Number, default: 1, min: 0.1, max: 10 },
    pitch: { type: Number, default: 1, min: 0, max: 2 },
    volume: { type: Number, default: 1, min: 0, max: 1 },
    language: { type: String, default: 'en-US' }
  },
  // Font Settings
  fontSettings: {
    size: { type: String, default: 'text-base' },
    family: { type: String, default: 'font-sans' }
  },
  // Theme Settings
  themeSettings: {
    theme: { type: String, default: 'Default' },
    darkMode: { type: Boolean, default: false }
  },
  // Language Preference
  languageSettings: {
    preferredLanguage: { type: String, default: 'en' }
  },
  // Usage Statistics
  usageStats: {
    ttsUsage: { type: Number, default: 0 },
    sttUsage: { type: Number, default: 0 },
    ocrUsage: { type: Number, default: 0 },
    quizzesTaken: { type: Number, default: 0 },
    notesCreated: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
