import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from './components/common/Layout';
import { settingsService } from './services/apiService';

const TextToSpeech = () => {
  // State variables
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [ttsLang, setTtsLang] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [text, setText] = useState('Welcome to Text-to-Speech converter. This application helps with text to speech conversion.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Auto-save settings when they change
  useEffect(() => {
    if (selectedVoice || rate !== 1 || pitch !== 1 || volume !== 1 || ttsLang) {
      const timer = setTimeout(saveSettings, 1000); // Debounce save
      return () => clearTimeout(timer);
    }
  }, [selectedVoice, rate, pitch, volume, ttsLang, saveSettings]);

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const userSettings = await settingsService.getSettings();
        const { ttsSettings } = userSettings;
        
        if (ttsSettings) {
          setSelectedVoice(ttsSettings.voice || '');
          setRate(ttsSettings.rate || 1);
          setPitch(ttsSettings.pitch || 1);
          setVolume(ttsSettings.volume || 1);
          setTtsLang(ttsSettings.language || '');
        }
      } catch (error) {
        console.error('Failed to load user settings:', error);
      }
    };

    loadUserSettings();
  }, []);

  // Check browser support on component mount
  useEffect(() => {
    // Check TTS support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);
        
        // Set default voice if available
        if (availableVoices.length > 0) {
          const defaultVoice = availableVoices.find(voice => voice.default) || availableVoices[0];
          setSelectedVoice(defaultVoice.name);
        }
      };
      
      loadVoices();
      
      if (typeof synthRef.current.onvoiceschanged !== 'undefined') {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);
  
  // Save settings to backend
  const saveSettings = useCallback(async () => {
    try {
      await settingsService.updateSettings({
        ttsSettings: {
          voice: selectedVoice,
          rate,
          pitch,
          volume,
          language: ttsLang
        }
      });
    } catch (error) {
      console.error('Failed to save TTS settings:', error);
    }
  }, [selectedVoice, rate, pitch, volume, ttsLang]);

  // Update usage statistics
  const updateUsageStats = useCallback(async () => {
    try {
      await settingsService.updateUsage('tts');
    } catch (error) {
      console.error('Failed to update usage stats:', error);
    }
  }, []);

  // TTS functions
  const speak = () => {
    if (!synthRef.current || !text.trim()) return;
    
    // Stop any current speech
    synthRef.current.cancel();
    
    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text.trim());
    
    // Set voice if selected
    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utteranceRef.current.voice = voice;
      }
    }
    
    // Set properties
    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;
    utteranceRef.current.volume = volume;
    
    // Set language if selected
    if (ttsLang) {
      utteranceRef.current.lang = ttsLang;
    }
    
    // Event handlers
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      updateUsageStats(); // Track usage when speech starts
    };
    
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utteranceRef.current.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    // Speak
    synthRef.current.speak(utteranceRef.current);
  };
  
  const pauseResume = () => {
    if (!synthRef.current) return;
    
    if (synthRef.current.speaking && !synthRef.current.paused) {
      synthRef.current.pause();
      setIsPaused(true);
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };
  
  const stopSpeech = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 gap-4">
            
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <div className="bg-white border border-blue-100 rounded-lg shadow-md overflow-hidden">
                <div className="p-3 bg-[#1976d2] text-white">
                  <div className="flex justify-between items-center">
                  <h5 className="font-bold text-lg">Text → Speech</h5>
                  <span className="bg-[#e3f2fd] text-[#1976d2] rounded-full px-2 py-1 text-xs">
                    Speak your text aloud
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="text" className="block mb-2 text-gray-700">
                    Enter text
                  </label>
                  <textarea 
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 rounded border border-gray-300"
                    rows={5}
                    placeholder="Type something to read aloud…"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="voiceSelect" className="block mb-2 text-gray-700">
                      Voice
                    </label>
                    <select 
                      id="voiceSelect"
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full p-2 rounded border border-gray-300"
                    >
                      {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>
                          {voice.name} ({voice.lang}){voice.default ? ' — default' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="langSelectTTS" className="block mb-2 text-gray-700">
                      Language
                    </label>
                    <select 
                      id="langSelectTTS"
                      value={ttsLang}
                      onChange={(e) => setTtsLang(e.target.value)}
                      className="w-full p-2 rounded border border-gray-300"
                    >
                      <option value="">Auto (match voice)</option>
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Español (España)</option>
                      <option value="fr-FR">Français</option>
                      <option value="de-DE">Deutsch</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Rate <span className="ml-1 rounded px-2 py-1 text-xs bg-gray-200">
                        {rate.toFixed(1)}
                      </span>
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2" 
                      step="0.1" 
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Pitch <span className="ml-1 rounded px-2 py-1 text-xs bg-gray-200">
                        {pitch.toFixed(1)}
                      </span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="2" 
                      step="0.1" 
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Volume <span className="ml-1 rounded px-2 py-1 text-xs bg-gray-200">
                        {volume.toFixed(1)}
                      </span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={speak}
                    disabled={isSpeaking}
                    className="px-4 py-2 rounded flex items-center bg-[#1976d2] hover:bg-[#1565c0] text-white transition disabled:opacity-50"
                  >
                    <span className="mr-1">▶</span> Read Aloud
                  </button>
                  <button 
                    onClick={pauseResume}
                    disabled={!isSpeaking}
                    className="px-4 py-2 rounded flex items-center border border-[#1976d2] text-[#1976d2] hover:bg-[#1976d2] hover:text-white transition disabled:opacity-50"
                  >
                    <span className="mr-1">{isPaused ? '▶' : '⏸'}</span> {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button 
                    onClick={stopSpeech}
                    disabled={!isSpeaking}
                    className="px-4 py-2 rounded flex items-center border border-[#1976d2] text-[#1976d2] hover:bg-[#1976d2] hover:text-white transition disabled:opacity-50"
                  >
                    <span className="mr-1">⏹</span> Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToSpeech;