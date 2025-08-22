
import React, { useState, useEffect } from "react";


const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('src/quizData.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load quiz data');
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleOption = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === quizData[current].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleContinue = () => {
    setShowResult(false);
    setSelected(null);
    setCurrent(current + 1);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
  };

  if (loading) {
    return <div className="text-center mt-8 text-blue-600">Loading quiz...</div>;
  }
  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }
  if (quizData.length === 0) {
    return <div className="text-center mt-8 text-gray-600">No quiz data found.</div>;
  }
  if (current >= quizData.length) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8 text-center">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Quiz Complete!</h2>
        <p className="mb-4 text-lg">Your Score: <span className="font-bold">{score} / {quizData.length}</span></p>
        <button onClick={handleRestart} className="px-4 py-2 bg-blue-600 text-white rounded">Restart Quiz</button>
      </div>
    );
  }

  const q = quizData[current];

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Interactive Quiz</h2>
      <div className="mb-4 font-semibold">Q{current + 1}: {q.question}</div>
      <div className="flex flex-col gap-3 mb-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOption(i)}
            className={`px-4 py-2 rounded border text-left ${selected === i ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-white'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            disabled={showResult}
          >
            {opt}
          </button>
        ))}
      </div>
      {!showResult && (
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Submit
        </button>
      )}
      {showResult && (
        <div className="mt-4">
          <div className={`mb-2 font-bold ${selected === q.answer ? 'text-green-600' : 'text-red-600'}`}>{selected === q.answer ? 'Correct!' : 'Incorrect.'}</div>
          <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">{q.explanation}</div>
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
