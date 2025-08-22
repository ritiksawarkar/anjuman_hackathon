import React, { useEffect, useState } from "react";
import Layout from './components/common/Layout';
import { settingsService, quizService } from './services/apiService';

const ProgressTracking = () => {
  const [progress, setProgress] = useState(null);
  const [quizStats, setQuizStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        const [userSettings, quizStatistics] = await Promise.all([
          settingsService.getSettings(),
          quizService.getStats()
        ]);
        
        setProgress(userSettings.usageStats);
        setQuizStats(quizStatistics);
      } catch (error) {
        console.error('Failed to load progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, []);

  if (loading) return (
    <Layout>
      <div className="text-center mt-8 text-blue-600">Loading progress...</div>
    </Layout>
  );

  if (!progress) return (
    <Layout>
      <div className="text-center mt-8 text-gray-600">No progress data found.</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Progress Tracking & Reports</h2>
        
        {/* Quiz Statistics */}
        {quizStats && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quiz Performance</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Quizzes</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{quizStats.totalQuizzes}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-3 rounded">
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {quizStats.averageScore.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded h-3 mb-2">
              <div
                className="bg-green-600 h-3 rounded"
                style={{ width: `${quizStats.bestScore}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Best Score: {quizStats.bestScore}%
            </div>
          </div>
        )}

        {/* Usage Statistics */}
        <div className="mb-4">
          <h3 className="font-semibold mb-3">Feature Usage</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Notes Created:</span>
              <span className="font-bold text-blue-600">{progress.notesCreated || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>OCR Conversions:</span>
              <span className="font-bold text-green-600">{progress.ocrUsage || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Text-to-Speech:</span>
              <span className="font-bold text-purple-600">{progress.ttsUsage || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Speech-to-Text:</span>
              <span className="font-bold text-orange-600">{progress.sttUsage || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Quizzes Taken:</span>
              <span className="font-bold text-red-600">{progress.quizzesTaken || 0}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
          For accessibility, progress can also be read aloud or exported as a report.
        </div>
      </div>
    </Layout>
  );
};

export default ProgressTracking;
