import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with auth token
const createAuthAxios = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  });
};

// Settings Service
export const settingsService = {
  // Get user settings
  getSettings: async () => {
    const api = createAuthAxios();
    const response = await api.get('/settings');
    return response.data;
  },

  // Update user settings
  updateSettings: async (settings) => {
    const api = createAuthAxios();
    const response = await api.put('/settings', settings);
    return response.data;
  },

  // Update usage statistics
  updateUsage: async (feature) => {
    const api = createAuthAxios();
    const response = await api.post(`/settings/usage/${feature}`);
    return response.data;
  }
};

// Notes Service
export const notesService = {
  // Get all user notes
  getNotes: async () => {
    const api = createAuthAxios();
    const response = await api.get('/notes');
    return response.data;
  },

  // Create a new note
  createNote: async (noteData) => {
    const api = createAuthAxios();
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  // Update a note
  updateNote: async (noteId, noteData) => {
    const api = createAuthAxios();
    const response = await api.put(`/notes/${noteId}`, noteData);
    return response.data;
  },

  // Delete a note
  deleteNote: async (noteId) => {
    const api = createAuthAxios();
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  }
};

// Quiz Service
export const quizService = {
  // Get quiz results
  getResults: async () => {
    const api = createAuthAxios();
    const response = await api.get('/quiz/results');
    return response.data;
  },

  // Save quiz result
  saveResult: async (resultData) => {
    const api = createAuthAxios();
    const response = await api.post('/quiz/results', resultData);
    return response.data;
  },

  // Get quiz statistics
  getStats: async () => {
    const api = createAuthAxios();
    const response = await api.get('/quiz/stats');
    return response.data;
  }
};

export default {
  settingsService,
  notesService,
  quizService
};
