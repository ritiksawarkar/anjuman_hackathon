import React, { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
];

const sampleText = {
  en: "Welcome! This tool supports multiple languages for inclusivity.",
  hi: "स्वागत है! यह टूल समावेशिता के लिए कई भाषाओं का समर्थन करता है।",
  es: "¡Bienvenido! Esta herramienta admite varios idiomas para la inclusión.",
  fr: "Bienvenue! Cet outil prend en charge plusieurs langues pour l'inclusion.",
  bn: "স্বাগতম! এই টুলটি অন্তর্ভুক্তির জন্য একাধিক ভাষা সমর্থন করে।",
  gu: "સ્વાગત છે! આ સાધન સમાવેશ માટે અનેક ભાષાઓને સપોર્ટ કરે છે.",
  ta: "வரவேற்கிறோம்! இந்த கருவி உள்ளடக்கத்திற்காக பல மொழிகளை ஆதரிக்கிறது.",
  te: "స్వాగతం! ఈ సాధనం సమావేశానికి అనేక భాషలను మద్దతు ఇస్తుంది.",
  mr: "स्वागत आहे! हे साधन समावेशासाठी अनेक भाषा समर्थन करते.",
};

const MultiLanguage = () => {
  const [lang, setLang] = useState("en");

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Multi-language Support</h2>
      <div className="flex gap-4 mb-4 flex-wrap">
        <label className="block font-semibold">Select Language</label>
        <select
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={lang}
          onChange={e => setLang(e.target.value)}
        >
          {languages.map(l => (
            <option value={l.code} key={l.code}>{l.name}</option>
          ))}
        </select>
      </div>
      <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700 dark:text-white min-h-[60px]">
        {sampleText[lang]}
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Supports major Indian and global languages for accessibility.
      </p>
    </div>
  );
};

export default MultiLanguage;
