import React, { useState, useEffect, useCallback } from "react";
import Layout from './components/common/Layout';
import { settingsService } from './services/apiService';

const colorThemes = [
  {
    name: "Default",
    bg: "bg-white",
    text: "text-gray-900",
    border: "border-gray-300",
  },
  {
    name: "Dark Mode",
    bg: "bg-gray-900",
    text: "text-white",
    border: "border-gray-700",
  },
  {
    name: "High Contrast",
    bg: "bg-black",
    text: "text-yellow-300",
    border: "border-yellow-500",
  },
  {
    name: "Protanopia (Red-Weak)",
    bg: "bg-[#f5f5dc]",
    text: "text-[#000080]",
    border: "border-[#000080]",
  },
  {
    name: "Deuteranopia (Green-Weak)",
    bg: "bg-[#f5f5dc]",
    text: "text-[#800000]",
    border: "border-[#800000]",
  },
  {
    name: "Tritanopia (Blue-Weak)",
    bg: "bg-[#f5f5dc]",
    text: "text-[#008000]",
    border: "border-[#008000]",
  },
];

const sampleText =
  "Try different color contrast and dark mode options for better accessibility!";

const ColorContrast = () => {
  const [themeIdx, setThemeIdx] = useState(0);

  // Save settings to backend
  const saveSettings = useCallback(async () => {
    try {
      await settingsService.updateSettings({
        themeSettings: {
          theme: colorThemes[themeIdx].name,
          darkMode: colorThemes[themeIdx].name.includes('Dark')
        }
      });
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  }, [themeIdx]);

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const userSettings = await settingsService.getSettings();
        const { themeSettings } = userSettings;
        
        if (themeSettings && themeSettings.theme) {
          const themeIndex = colorThemes.findIndex(theme => theme.name === themeSettings.theme);
          if (themeIndex !== -1) setThemeIdx(themeIndex);
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
  }, [themeIdx, saveSettings]);

  const theme = colorThemes[themeIdx];

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Color Contrast & Dark Mode</h2>
        <div className="flex gap-4 mb-4 flex-wrap">
          <label className="block font-semibold">Theme</label>
          <select
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={themeIdx}
            onChange={e => setThemeIdx(Number(e.target.value))}
          >
            {colorThemes.map((t, i) => (
              <option value={i} key={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <div
          className={`border p-4 rounded ${theme.bg} ${theme.text} ${theme.border}`}
          style={{ minHeight: 60 }}
        >
          {sampleText}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Includes color blindness-friendly and high contrast options.
        </p>
      </div>
    </Layout>
  );
};

export default ColorContrast;
