import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { path: '/tts', label: 'Text-to-Speech', key: 'tts' },
    { path: '/stt', label: 'Speech-to-Text', key: 'stt' },
    { path: '/font-adjuster', label: 'Font Adjuster', key: 'font' },
    { path: '/color-contrast', label: 'Color Contrast', key: 'contrast' },
    { path: '/visual-aids', label: 'Visual Aids', key: 'visual' },
    { path: '/sign-language', label: 'Sign Language', key: 'sign' },
    { path: '/multi-language', label: 'Multi-language', key: 'lang' },
    { path: '/quiz', label: 'Quiz', key: 'quiz' },
    { path: '/notes', label: 'Notes', key: 'notes' },
    { path: '/ocr', label: 'OCR', key: 'ocr' },
    { path: '/captions', label: 'Captions', key: 'captions' },
    { path: '/progress', label: 'Progress', key: 'progress' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
              Accessibility Tools
            </span>
          </div>

          {/* Navigation Items - Hidden on mobile */}
          <div className="hidden lg:flex space-x-1">
            {navItems.slice(0, 8).map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {user?.name || 'User'}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Collapsible */}
        <div className="lg:hidden pb-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
