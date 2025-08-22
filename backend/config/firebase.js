const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = () => {
  // Skip initialization if Firebase environment variables are not properly configured
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
    console.log('Firebase Admin SDK not initialized - missing environment variables');
    console.log('Please configure FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in your .env file');
    return null;
  }

  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
      console.log('Firebase Admin SDK initialized successfully');
    }
    return admin;
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
    console.log('Please check your Firebase environment variables and ensure they are properly formatted');
    return null;
  }
};

module.exports = { admin, initializeFirebaseAdmin };
