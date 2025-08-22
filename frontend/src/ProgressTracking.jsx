import React, { useEffect, useState } from "react";

const getProgress = () => {
  // Simulate progress data (replace with backend/API in real use)
  return {
    quizzes: { completed: 3, total: 5 },
    notes: { created: 7 },
    ocr: { used: 2 },
    tts: { used: 4 },
    stt: { used: 2 },
  };
};

const ProgressTracking = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return <div className="text-center mt-8 text-blue-600">Loading progress...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Progress Tracking & Reports</h2>
      <div className="mb-4">
        <div className="font-semibold">Quizzes Completed:</div>
        <div className="w-full bg-gray-200 rounded h-4 mb-2">
          <div
            className="bg-blue-600 h-4 rounded"
            style={{ width: `${(progress.quizzes.completed / progress.quizzes.total) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">
          {progress.quizzes.completed} of {progress.quizzes.total} quizzes completed
        </div>
      </div>
      <div className="mb-2">Notes Created: <span className="font-bold">{progress.notes.created}</span></div>
      <div className="mb-2">OCR Used: <span className="font-bold">{progress.ocr.used}</span> times</div>
      <div className="mb-2">Text-to-Speech Used: <span className="font-bold">{progress.tts.used}</span> times</div>
      <div className="mb-2">Speech-to-Text Used: <span className="font-bold">{progress.stt.used}</span> times</div>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        For accessibility, progress can also be read aloud or exported as a report.
      </div>
    </div>
  );
};

export default ProgressTracking;
