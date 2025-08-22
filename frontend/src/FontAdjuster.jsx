import React, { useState, useEffect, useCallback } from "react";
import Layout from './components/common/Layout';
import { settingsService } from './services/apiService';

const fontSizes = ["text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];
const fontFamilies = [
  { name: "Default", class: "font-sans" },
  { name: "Serif", class: "font-serif" },
  { name: "Mono", class: "font-mono" },
  { name: "Dyslexia Friendly", class: "[font-family:'OpenDyslexic',Arial,sans-serif]" },
];

const sampleText =
  "Accessibility means everyone can learn. Adjust the font size and style for your comfort!";

const FontAdjuster = () => {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [fontIdx, setFontIdx] = useState(0);

  // Save settings to backend
  const saveSettings = useCallback(async () => {
    try {
      await settingsService.updateSettings({
        fontSettings: {
          size: fontSizes[sizeIdx],
          family: fontFamilies[fontIdx].class
        }
      });
    } catch (error) {
      console.error('Failed to save font settings:', error);
    }
  }, [sizeIdx, fontIdx]);

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const userSettings = await settingsService.getSettings();
        const { fontSettings } = userSettings;
        
        if (fontSettings) {
          const sizeIndex = fontSizes.findIndex(size => size === fontSettings.size);
          const fontIndex = fontFamilies.findIndex(font => font.class === fontSettings.family);
          
          if (sizeIndex !== -1) setSizeIdx(sizeIndex);
          if (fontIndex !== -1) setFontIdx(fontIndex);
        }
      } catch (error) {
        console.error('Failed to load user settings:', error);
      }
    };

    loadUserSettings();
  }, []);

  // Auto-save settings when they change
  useEffect(() => {
    const timer = setTimeout(saveSettings, 500); // Debounce save
    return () => clearTimeout(timer);
  }, [sizeIdx, fontIdx, saveSettings]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Adjustable Font Size & Style</h2>
        <div className="flex gap-4 mb-4 flex-wrap">
          <div>
            <label className="block mb-1 font-semibold">Font Size</label>
            <select
              className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={sizeIdx}
              onChange={e => setSizeIdx(Number(e.target.value))}
            >
              {fontSizes.map((fs, i) => (
                <option value={i} key={fs}>{fs.replace("text-", "")}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Font Style</label>
            <select
              className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={fontIdx}
              onChange={e => setFontIdx(Number(e.target.value))}
            >
              {fontFamilies.map((ff, i) => (
                <option value={i} key={ff.name}>{ff.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`border p-4 rounded bg-gray-50 dark:bg-gray-700 dark:text-white ${fontSizes[sizeIdx]} ${fontFamilies[fontIdx].class}`}
          style={{ minHeight: 60 }}
        >
          {sampleText}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Try different sizes and styles, including a dyslexia-friendly font.
        </p>
      </div>
    </Layout>
  );
};

export default FontAdjuster;
