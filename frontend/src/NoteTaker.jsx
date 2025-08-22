import React, { useRef, useState } from "react";

const NoteTaker = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleAddNote = () => {
    if (text.trim() !== "") {
      setNotes([...notes, { type: "text", content: text }]);
      setText("");
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
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setNotes((prev) => [...prev, { type: "audio", content: URL.createObjectURL(audioBlob) }]);
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Note-taking with Audio Recording</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Write your note here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
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
        <h3 className="font-semibold mb-2">Your Notes</h3>
        {notes.length === 0 && <div className="text-gray-500">No notes yet.</div>}
        <ul className="space-y-2">
          {notes.map((note, i) => (
            <li key={i} className="border p-2 rounded bg-gray-50 dark:bg-gray-700">
              {note.type === "text" ? (
                <span>{note.content}</span>
              ) : (
                <audio controls src={note.content} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteTaker;
