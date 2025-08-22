import React from "react";

const Footer = () => (
  <footer className="w-full bg-blue-100 dark:bg-gray-900 text-center py-4 mt-8 border-t border-gray-200 dark:border-gray-700">
    <div className="text-gray-700 dark:text-gray-300 text-sm">
      Accessibility Learning Tools &copy; {new Date().getFullYear()} &mdash; Made for Inclusive Education
    </div>
    <div className="text-xs text-gray-500 mt-1">
      Built with React, Vite, and Tailwind CSS
    </div>
  </footer>
);

export default Footer;
