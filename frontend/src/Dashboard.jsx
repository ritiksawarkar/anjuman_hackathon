import React from "react";

const features = [
  { name: "Text-to-Speech (TTS) Reader", key: "tts" },
  { name: "Speech-to-Text (STT) Converter", key: "stt" },
  { name: "Screen Reader Integration", key: "screenreader" },
  { name: "Adjustable Font Size & Style", key: "font" },
  { name: "Color Contrast & Dark Mode", key: "contrast" },
  { name: "Visual Learning Aids", key: "visual" },
  { name: "Sign Language Support", key: "sign" },
  { name: "Multi-language Support", key: "lang" },
  { name: "Interactive Quizzes", key: "quiz" },
  { name: "Closed Captions & Subtitles", key: "captions" },
  { name: "Customizable Dashboard", key: "dashboard" },
  { name: "Note-taking with Audio Recording", key: "notes" },
  { name: "OCR (Image to Text)", key: "ocr" },
  { name: "Offline Mode", key: "offline" },
  { name: "Progress Tracking & Reports", key: "progress" },
  { name: "AI-based Personalized Assistance", key: "ai" },
  { name: "Gesture-based Navigation", key: "gesture" },
  { name: "Braille Display Compatibility", key: "braille" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
        Accessibility Learning Tools
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.key}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {f.name}
            </span>
            <span className="text-xs text-gray-500">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
