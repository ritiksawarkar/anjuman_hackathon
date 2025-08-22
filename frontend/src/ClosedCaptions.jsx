import React, { useRef, useState } from "react";
import Layout from './components/common/Layout';

const captionsDemo = [
  {
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    captions: [
      { start: 0, end: 2, text: "This is a sample video with closed captions." },
      { start: 2, end: 5, text: "Captions help hearing-impaired users." },
      { start: 5, end: 8, text: "They also aid understanding in noisy environments." },
    ],
  },
];

const ClosedCaptions = () => {
  const [currentCaption, setCurrentCaption] = useState("");
  const videoRef = useRef();
  const captions = captionsDemo[0].captions;

  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;
    const cap = captions.find(c => time >= c.start && time < c.end);
    setCurrentCaption(cap ? cap.text : "");
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Closed Captions & Subtitles</h2>
        <video
          ref={videoRef}
          src={captionsDemo[0].video}
        controls
        className="w-full rounded mb-2"
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="min-h-[40px] text-center text-lg font-semibold bg-gray-200 dark:bg-gray-700 rounded p-2 mb-2">
        {currentCaption}
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Example of custom closed captions. For real use, add .vtt or .srt files or use AI for auto-captioning.
      </p>
    </div>
    </Layout>
  );
};

export default ClosedCaptions;
