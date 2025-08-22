
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OTPVerification from './components/auth/OTPVerification';
import AuthSuccess from './components/auth/AuthSuccess';

// Main Components
import Dashboard from './components/Dashboard';

// Feature Components (your existing components)
import TTSReader from './TTSReader';
import SpeechToText from './SpeechToText';
import FontAdjuster from './FontAdjuster';
import ColorContrast from './ColorContrast';
import VisualAids from './VisualAids';
import SignLanguage from './SignLanguage';
import MultiLanguage from './MultiLanguage';
import Quiz from './Quiz';
import NoteTaker from './NoteTaker';
import OCR from './OCR';
import ClosedCaptions from './ClosedCaptions';
import ProgressTracking from './ProgressTracking';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Feature Routes - All Protected */}
            <Route path="/tts" element={
              <ProtectedRoute>
                <TTSReader />
              </ProtectedRoute>
            } />
            
            <Route path="/stt" element={
              <ProtectedRoute>
                <SpeechToText />
              </ProtectedRoute>
            } />
            
            <Route path="/font-adjuster" element={
              <ProtectedRoute>
                <FontAdjuster />
              </ProtectedRoute>
            } />
            
            <Route path="/color-contrast" element={
              <ProtectedRoute>
                <ColorContrast />
              </ProtectedRoute>
            } />
            
            <Route path="/visual-aids" element={
              <ProtectedRoute>
                <VisualAids />
              </ProtectedRoute>
            } />
            
            <Route path="/sign-language" element={
              <ProtectedRoute>
                <SignLanguage />
              </ProtectedRoute>
            } />
            
            <Route path="/multi-language" element={
              <ProtectedRoute>
                <MultiLanguage />
              </ProtectedRoute>
            } />
            
            <Route path="/quiz" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            
            <Route path="/notes" element={
              <ProtectedRoute>
                <NoteTaker />
              </ProtectedRoute>
            } />
            
            <Route path="/ocr" element={
              <ProtectedRoute>
                <OCR />
              </ProtectedRoute>
            } />
            
            <Route path="/captions" element={
              <ProtectedRoute>
                <ClosedCaptions />
              </ProtectedRoute>
            } />
            
            <Route path="/progress" element={
              <ProtectedRoute>
                <ProgressTracking />
              </ProtectedRoute>
            } />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
