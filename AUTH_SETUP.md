# Accessibility Learning Tools - Authentication System

A complete authentication system with login, signup, OTP verification, Google OAuth, and logout functionality for the Accessibility Learning Tools platform.

## Features

### Backend Features
- **User Registration**: Complete signup with email/password validation
- **OTP Verification**: Email-based OTP verification using Nodemailer
- **Login System**: Email/password and Google OAuth login
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **Email Services**: Welcome emails and OTP emails with professional templates
- **Session Management**: Express sessions for OAuth flows
- **API Validation**: Express-validator for input validation
- **MongoDB Integration**: User data persistence with Mongoose

### Frontend Features
- **Modern UI**: Clean, accessible design with Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Login Page**: Email/password login with "Remember Me" option
- **Signup Page**: Registration with form validation and password strength
- **OTP Verification**: 6-digit OTP input with auto-submit and resend
- **Google OAuth**: One-click Google login integration
- **Protected Routes**: Route protection with authentication checks
- **Dashboard**: User dashboard with tool access and account info
- **Error Handling**: User-friendly error messages and validation
- **Loading States**: Loading indicators for all async operations

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory with:
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/anjuman-hackathon
   JWT_SECRET=your-jwt-secret-key-here-make-it-long-and-random
   SESSION_SECRET=your-session-secret-key-here
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   OTP_EXPIRY_MINUTES=15
   ```

4. **Gmail App Password Setup:**
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for the application
   - Use the App Password in `EMAIL_PASS`

5. **Google OAuth Setup:**
   - Go to Google Cloud Console
   - Create a new project or use existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
   - Copy Client ID and Secret to `.env`

6. **Start MongoDB:**
   Make sure MongoDB is running on your system

7. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /signup` - User registration
- `POST /verify-otp` - Email verification
- `POST /resend-otp` - Resend verification OTP
- `POST /login` - User login
- `GET /google` - Google OAuth initiation
- `GET /google/callback` - Google OAuth callback
- `POST /logout` - User logout
- `GET /me` - Get current user info
- `PUT /update-profile` - Update user profile

## Frontend Routes

### Public Routes
- `/login` - Login page
- `/signup` - Registration page
- `/verify-otp` - OTP verification page
- `/auth/success` - OAuth success redirect

### Protected Routes
- `/dashboard` - User dashboard
- `/tts` - Text-to-Speech tool
- `/stt` - Speech-to-Text tool
- `/font-adjuster` - Font adjustment tool
- `/color-contrast` - Color contrast tool
- `/visual-aids` - Visual aids tool
- `/sign-language` - Sign language tool
- `/multi-language` - Multi-language tool
- `/quiz` - Interactive quiz
- `/notes` - Note-taking tool
- `/ocr` - OCR text recognition
- `/captions` - Closed captions
- `/progress` - Progress tracking

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  googleId: String,
  profilePicture: String,
  isVerified: Boolean,
  otp: {
    code: String,
    expires: Date
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  timestamps: true
}
```

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: 7-day expiration with secure secret
- **OTP Security**: 6-digit random OTP with 15-minute expiration
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for frontend domain
- **Session Security**: Secure session configuration
- **Environment Variables**: Sensitive data in environment variables

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 3000)
2. **Visit** `http://localhost:3000`
3. **Register** a new account or login with existing credentials
4. **Verify email** with the OTP sent to your email
5. **Access dashboard** and use the accessibility tools
6. **Logout** when finished

## Email Templates

The system includes professional email templates for:
- **OTP Verification**: Styled OTP code with branding
- **Welcome Email**: Feature overview and quick start guide

## Error Handling

- **Frontend**: User-friendly error messages with proper validation
- **Backend**: Comprehensive error responses with status codes
- **Email**: Fallback handling for email delivery failures
- **Authentication**: Clear messaging for auth failures

## Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT & bcryptjs
- Nodemailer
- Passport.js (Google OAuth)
- Express Validator

### Frontend
- React 18+ with Vite
- React Router DOM
- Tailwind CSS
- Heroicons
- Axios
- Context API for state management

This authentication system provides a complete, production-ready solution for user management with modern security practices and excellent user experience.
