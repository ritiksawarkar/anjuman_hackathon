import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/common/Layout";

const features = [
  { name: "Text-to-Speech (TTS) Reader", key: "tts", route: "/tts", available: true },
  { name: "Speech-to-Text (STT) Converter", key: "stt", route: "/stt", available: true },
  { name: "Screen Reader Integration", key: "screenreader", route: "/screenreader", available: false },
  { name: "Adjustable Font Size & Style", key: "font", route: "/font-adjuster", available: true },
  { name: "Color Contrast & Dark Mode", key: "contrast", route: "/color-contrast", available: true },
  { name: "Visual Learning Aids", key: "visual", route: "/visual-aids", available: true },
  { name: "Sign Language Support", key: "sign", route: "/sign-language", available: true },
  { name: "Multi-language Support", key: "lang", route: "/multi-language", available: true },
  { name: "Interactive Quizzes", key: "quiz", route: "/quiz", available: true },
  { name: "Closed Captions & Subtitles", key: "captions", route: "/captions", available: true },
  { name: "Customizable Dashboard", key: "dashboard", route: "/dashboard", available: true },
  { name: "Note-taking with Audio Recording", key: "notes", route: "/notes", available: true },
  { name: "OCR (Image to Text)", key: "ocr", route: "/ocr", available: true },
  { name: "Offline Mode", key: "offline", route: "/offline", available: false },
  { name: "Progress Tracking & Reports", key: "progress", route: "/progress", available: true },
  { name: "AI-based Personalized Assistance", key: "ai", route: "/ai", available: false },
  { name: "Gesture-based Navigation", key: "gesture", route: "/gesture", available: false },
  { name: "Braille Display Compatibility", key: "braille", route: "/braille", available: false },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeatureClick = (feature) => {
    if (feature.available && feature.route) {
      navigate(feature.route);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from our accessibility tools below to enhance your learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.key}
              onClick={() => handleFeatureClick(feature)}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col items-center transition-all duration-200 border border-gray-200 dark:border-gray-700 ${
                feature.available
                  ? 'hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300 dark:hover:border-blue-500'
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 block">
                  {feature.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  feature.available 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {feature.available ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats/Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {features.filter(f => f.available).length}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Available Tools</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              100%
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Accessibility Focused</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              24/7
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Available Access</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
