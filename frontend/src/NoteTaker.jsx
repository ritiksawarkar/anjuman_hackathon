import React, { useRef, useState, useEffect } from "react";
import Layout from './components/common/Layout';
import { notesService, settingsService } from './services/apiService';

const NoteTaker = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Load notes from backend
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const backendNotes = await notesService.getNotes();
        setNotes(backendNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleAddNote = async () => {
    if (text.trim() === "") return;
    
    try {
      const newNote = await notesService.createNote({
        title: noteTitle.trim() || 'Text Note',
        content: text.trim(),
        type: 'text'
      });
      
      setNotes(prev => [newNote, ...prev]);
      setText("");
      setNoteTitle("");
      
      // Update usage stats
      await settingsService.updateUsage('notes');
    } catch (error) {
      console.error('Failed to create note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices) {
      alert("Audio recording not supported in this browser.");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      try {
        // For now, store audio locally. In a real app, you'd upload to a server
        const newNote = await notesService.createNote({
          title: 'Audio Note',
          content: 'Audio recording',
          type: 'audio',
          audioUrl: audioUrl
        });
        
        setNotes(prev => [newNote, ...prev]);
        await settingsService.updateUsage('notes');
      } catch (error) {
        console.error('Failed to save audio note:', error);
        // Fallback to local storage
        setNotes((prev) => [...prev, { type: "audio", content: audioUrl, title: "Audio Note" }]);
      }
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesService.deleteNote(noteId);
      setNotes(prev => prev.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Note-taking with Audio Recording</h2>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white mb-2"
            placeholder="Note title (optional)"
            value={noteTitle}
            onChange={e => setNoteTitle(e.target.value)}
          />
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Write your note here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            onClick={handleAddNote}
            disabled={!text.trim()}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition"
          >
            Add Note
          </button>
        </div>
      <div className="mb-4">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`px-4 py-2 rounded ${isRecording ? 'bg-red-600' : 'bg-green-600'} text-white`}
        >
          {isRecording ? 'Stop Recording' : 'Record Audio Note'}
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Your Notes ({notes.length})</h3>
        {isLoading && <div className="text-gray-500">Loading notes...</div>}
        {!isLoading && notes.length === 0 && <div className="text-gray-500">No notes yet.</div>}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notes.map((note, i) => (
            <div key={note._id || i} className="border p-3 rounded bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  {note.title || `Note ${i + 1}`}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Today'}
                  </span>
                  {note._id && (
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Delete note"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              {note.type === "text" ? (
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {note.content}
                </div>
              ) : (
                <audio controls src={note.audioUrl || note.content} className="w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default NoteTaker;
