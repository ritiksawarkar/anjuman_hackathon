import React, { useRef, useState } from "react";
import Layout from './components/common/Layout';
import { settingsService } from './services/apiService';

const OCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText("");
    }
  };

  const handleOCR = async () => {
    if (!image) return;
    setLoading(true);
    setText("");
    
    try {
      // Dynamically import Tesseract.js for OCR
      const Tesseract = await import("tesseract.js");
      const { data: { text } } = await Tesseract.recognize(
        fileInputRef.current.files[0],
        "eng",
        { logger: () => {} }
      );
      
      setText(text);
      setHistory(prev => [...prev, { timestamp: new Date(), text, image }]);
      
      // Update usage statistics
      await settingsService.updateUsage('ocr');
    } catch (error) {
      console.error('OCR failed:', error);
      setText("Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">OCR (Image to Text)</h2>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="mb-4"
        />
        {image && (
          <div className="mb-4">
            <img src={image} alt="Uploaded" className="max-h-48 rounded" />
          </div>
      )}
      <button
        onClick={handleOCR}
        disabled={!image || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 mb-4"
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>
      <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700 dark:text-white min-h-[60px]">
        {text}
      </div>
      
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">OCR History</h3>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {history.slice(-3).map((item, index) => (
              <div key={index} className="text-sm bg-gray-100 dark:bg-gray-600 p-2 rounded">
                <span className="font-mono text-xs text-gray-500">{item.timestamp.toLocaleTimeString()}</span>
                <p className="mt-1 text-gray-700 dark:text-gray-300 truncate">{item.text.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Uses Tesseract.js for client-side OCR. No image is uploaded to a server.
      </p>
    </div>
    </Layout>
  );
};

export default OCR;
