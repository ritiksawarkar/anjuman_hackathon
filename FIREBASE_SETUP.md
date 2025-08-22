# Firebase Google Authentication Setup Guide

## Prerequisites
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication and Google as a sign-in provider
3. Get your Firebase configuration values
4. Generate a Firebase Admin SDK private key

## Firebase Console Setup

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Click "Create a project"
- Enter project name (e.g., "anjuman-hackathon")
- Follow the setup wizard

### 2. Enable Authentication
- In the Firebase Console, go to "Authentication"
- Click on "Get started"
- Go to "Sign-in method" tab
- Enable "Google" as a sign-in provider
- Add your domain (http://localhost:3000) to authorized domains

### 3. Get Firebase Config
- Go to Project Settings (gear icon)
- In "General" tab, scroll down to "Your apps"
- Click on "Web app" icon to create a web app
- Copy the Firebase configuration object

### 4. Generate Admin SDK Key
- In Firebase Console, go to Project Settings
- Go to "Service accounts" tab
- Click "Generate new private key"
- Download the JSON file

## Environment Configuration

### Frontend (.env)
Update `frontend/.env` with your Firebase config:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration (Replace with your actual values)
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Backend (.env)
Update `backend/.env` with Firebase Admin config:

```env
# ... existing environment variables ...

# Firebase Admin Configuration (From downloaded service account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

## How It Works

### Frontend Flow
1. User clicks "Continue with Google"
2. Firebase opens Google OAuth popup
3. User authenticates with Google
4. Firebase returns user data and ID token
5. Frontend sends ID token to backend
6. Backend verifies token and creates/updates user
7. Backend returns JWT token for app authentication

### Backend Flow
1. Receives Firebase ID token from frontend
2. Verifies token using Firebase Admin SDK
3. Extracts user information (email, name, profile picture)
4. Creates new user or updates existing user in MongoDB
5. Generates JWT token for app sessions
6. Returns user data and JWT token

## Testing
1. Start backend server: `cd backend && npm start`
2. Start frontend server: `cd frontend && npm run dev`
3. Navigate to http://localhost:5173
4. Click "Continue with Google" on login/signup pages
5. Complete Google authentication
6. Verify user is logged in and redirected to dashboard

## Features Included
- ✅ Firebase Google Authentication
- ✅ User profile with Google data (name, email, picture)
- ✅ Automatic user creation in MongoDB
- ✅ JWT token generation for app sessions
- ✅ Unified authentication state management
- ✅ Secure token verification
- ✅ Professional UI with Google branding
