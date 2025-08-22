import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#1976d2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Accessibility Learning Tools
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {user?.profilePicture ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Here's what you can access with your account:
                  </p>
                </div>
                <div className="mt-5 sm:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Text-to-Speech */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🔊</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Text-to-Speech</h3>
                    <p className="text-sm text-gray-500">Convert text to audio</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>

            {/* Speech-to-Text */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🎤</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Speech-to-Text</h3>
                    <p className="text-sm text-gray-500">Convert speech to text</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>

            {/* Font Adjuster */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🔤</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Font Adjuster</h3>
                    <p className="text-sm text-gray-500">Adjust text size and style</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>

            {/* Color Contrast */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🎨</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Color Contrast</h3>
                    <p className="text-sm text-gray-500">Improve visual accessibility</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Aids */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-indigo-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">👁️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Visual Aids</h3>
                    <p className="text-sm text-gray-500">Visual learning support</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz System */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">❓</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Interactive Quiz</h3>
                    <p className="text-sm text-gray-500">Test your knowledge</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Open Tool
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Account status</dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user?.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Login method</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user?.profilePicture ? 'Google OAuth' : 'Email & Password'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
