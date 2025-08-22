import React from "react";

const Navbar = ({ page, setPage }) => (
  <nav className="flex flex-wrap gap-2 sm:gap-4 p-4 bg-blue-100 dark:bg-gray-900 shadow-md sticky top-0 z-10">
    <button className={`px-3 py-1 rounded ${page === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('dashboard')}>Dashboard</button>
    <button className={`px-3 py-1 rounded ${page === 'tts' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('tts')}>Text-to-Speech</button>
    <button className={`px-3 py-1 rounded ${page === 'stt' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('stt')}>Speech-to-Text</button>
    <button className={`px-3 py-1 rounded ${page === 'font' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('font')}>Font Size & Style</button>
    <button className={`px-3 py-1 rounded ${page === 'contrast' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('contrast')}>Color Contrast</button>
    <button className={`px-3 py-1 rounded ${page === 'visual' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('visual')}>Visual Aids</button>
    <button className={`px-3 py-1 rounded ${page === 'sign' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('sign')}>Sign Language</button>
    <button className={`px-3 py-1 rounded ${page === 'lang' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('lang')}>Multi-language</button>
    <button className={`px-3 py-1 rounded ${page === 'quiz' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('quiz')}>Quiz</button>
    <button className={`px-3 py-1 rounded ${page === 'notes' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('notes')}>Notes</button>
    <button className={`px-3 py-1 rounded ${page === 'ocr' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('ocr')}>OCR</button>
    <button className={`px-3 py-1 rounded ${page === 'captions' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('captions')}>Captions</button>
    <button className={`px-3 py-1 rounded ${page === 'progress' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`} onClick={() => setPage('progress')}>Progress</button>
  </nav>
);

export default Navbar;
