const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../utils/emailService');
const { generateToken } = require('../utils/jwt');
const { authenticateToken } = require('../middleware/auth');
const { admin, initializeFirebaseAdmin } = require('../config/firebase');

// Initialize Firebase Admin
const firebaseAdmin = initializeFirebaseAdmin();

const router = express.Router();

// Validation middleware
const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// ...existing code...

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', validateSignup, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();
    await sendWelcomeEmail(email, name);
    res.status(201).json({
      message: 'User created successfully.',
      email: email
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// ...existing code...

// ...existing code...

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

  // ...existing code...

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Generate token
      const token = generateToken(req.user._id);
      
      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authenticateToken, (req, res) => {
  try {
    // For JWT tokens, logout is handled on the client side
    // Here we can add token to a blacklist if needed
    
    // If using session with Google OAuth
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
    });
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isVerified: req.user.isVerified,
      profilePicture: req.user.profilePicture
    }
  });
});

// @route   PUT /api/auth/update-profile
// @desc    Update user profile
// @access  Private
router.put('/update-profile', authenticateToken, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
], handleValidationErrors, async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    await user.save();
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture
      }
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// @route   POST /api/auth/firebase-login
// @desc    Login with Firebase ID token
// @access  Public
router.post('/firebase-login', [
  body('idToken')
    .notEmpty()
    .withMessage('Firebase ID token is required')
], handleValidationErrors, async (req, res) => {
  try {
    // Check if Firebase Admin is initialized
    if (!firebaseAdmin) {
      console.log('Firebase Admin not initialized, skipping Firebase login');
      return res.status(503).json({ 
        message: 'Firebase authentication is not configured on the server. Please contact administrator.' 
      });
    }

    const { idToken } = req.body;
    
    // Verify Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    
    if (!email) {
      return res.status(400).json({ message: 'Email not found in Firebase token' });
    }
    
    // Check if user exists in database
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user from Firebase data
      user = new User({
        name: name || email.split('@')[0],
        email,
        firebaseUid: uid,
        isVerified: true, // Firebase users are pre-verified
        profilePicture: picture || null,
        authProvider: 'firebase'
      });
      
      await user.save();
      
      // Send welcome email
      await sendWelcomeEmail(user.name, user.email);
    } else {
      // Update existing user with Firebase UID if not set
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        user.authProvider = 'firebase';
        await user.save();
      }
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    res.json({
      message: 'Firebase login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture
      }
    });
    
  } catch (error) {
    console.error('Firebase login error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Firebase token expired' });
    }
    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ message: 'Invalid Firebase token' });
    }
    
    res.status(500).json({ message: 'Server error during Firebase login' });
  }
});

// ...existing code...

module.exports = router;
