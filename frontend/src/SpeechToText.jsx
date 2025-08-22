import React, { useState, useRef, useCallback } from "react";
import Layout from './components/common/Layout';
import { settingsService } from './services/apiService';

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState([]);
  const recognitionRef = useRef(null);

  // Update usage statistics
  const updateUsageStats = useCallback(async () => {
    try {
      await settingsService.updateUsage('stt');
    } catch (error) {
      console.error('Failed to update usage stats:', error);
    }
  }, []);

  const handleStart = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(newTranscript);
      setHistory(prev => [...prev, { timestamp: new Date(), text: newTranscript }]);
      updateUsageStats(); // Track usage when speech is converted
    };
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClear = () => {
    setTranscript("");
    setHistory([]);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-[#1976d2] dark:text-[#64b5f6]">Speech-to-Text Converter</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleStart}
            disabled={isRecording}
            className="px-4 py-2 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded transition disabled:opacity-50"
          >
            Start Listening
          </button>
          <button
            onClick={handleStop}
            disabled={!isRecording}
            className="px-4 py-2 bg-[#90caf9] hover:bg-[#64b5f6] text-[#0d47a1] rounded transition disabled:opacity-50"
          >
            Stop
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
          >
            Clear
          </button>
        </div>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Your speech will appear here..."
          value={transcript}
          readOnly
        />
        
        {history.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Conversion History</h3>
            <div className="max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded p-2">
              {history.slice(-5).map((item, index) => (
                <div key={index} className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span className="font-mono text-xs">{item.timestamp.toLocaleTimeString()}</span>: {item.text}
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </Layout>
  );
};

export default SpeechToText;
