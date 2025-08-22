import React, { useState, useRef } from "react";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

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
      setTranscript(event.results[0][0].transcript);
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

  return (
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
      </div>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Your speech will appear here..."
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default SpeechToText;
