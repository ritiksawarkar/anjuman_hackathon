import React from "react";

const Footer = () => (
  <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              Accessibility Tools
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Making education accessible for everyone through innovative technology and inclusive design.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <div className="space-y-2">
            <a href="/dashboard" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </a>
            <a href="/tts" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Text-to-Speech
            </a>
            <a href="/quiz" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Interactive Quiz
            </a>
            <a href="/progress" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Progress Tracking
            </a>
          </div>
        </div>

        {/* Contact & Info */}
        <div className="text-center md:text-right">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Support
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              24/7 Accessibility Support
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with ❤️ for inclusive learning
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              React • Vite • Tailwind CSS • Node.js
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Accessibility Learning Tools. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
