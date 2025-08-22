import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const firebaseAuthService = {
  // Sign in with Google using Firebase
  signInWithGoogle: async () => {
    try {
      // Configure provider with custom parameters to handle CORP issues
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get the Firebase ID token
      const idToken = await user.getIdToken();
      
      // Send the token to your backend for verification
      const response = await axios.post(`${API_BASE_URL}/auth/firebase-login`, {
        idToken
      });
      
      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/popup-blocked') {
        return {
          success: false,
          error: 'Popup was blocked by browser. Please allow popups and try again.'
        };
      } else if (error.code === 'auth/popup-closed-by-user') {
        return {
          success: false,
          error: 'Login was cancelled.'
        };
      } else if (error.code === 'auth/network-request-failed') {
        return {
          success: false,
          error: 'Network error. Please check your connection and try again.'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Google sign-in failed'
      };
    }
  },

  // Sign out from Firebase
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

export default firebaseAuthService;
