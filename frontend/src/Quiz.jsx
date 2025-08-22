
import React, { useState, useEffect } from "react";
import Layout from './components/common/Layout';
import { quizService, settingsService } from './services/apiService';
import quizDataImport from './quizData.json';


const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    try {
      setQuizData(quizDataImport);
      setLoading(false);
    } catch {
      setError('Failed to load quiz data');
      setLoading(false);
    }
  }, []);

  const handleOption = (idx) => {
    setSelected(idx);
  };

  const handleNext = async () => {
    const isCorrect = selected === quizData[current].answer;
    const questionTime = Date.now() - startTime;
    
    // Record answer
    setAnswers(prev => [...prev, {
      questionIndex: current,
      selectedAnswer: selected,
      isCorrect,
      timeSpent: questionTime
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleContinue = () => {
    setShowResult(false);
    setSelected(null);
    setCurrent(current + 1);
    setStartTime(Date.now()); // Reset timer for next question
  };

  const handleRestart = async () => {
    // Save final results to backend
    if (answers.length > 0) {
      try {
        await quizService.saveResult({
          quizId: 'accessibility-quiz-1',
          score: (score / quizData.length) * 100,
          totalQuestions: quizData.length,
          correctAnswers: score,
          timeSpent: Math.round((Date.now() - startTime) / 1000),
          answers: answers
        });
        
        await settingsService.updateUsage('quiz');
      } catch (error) {
        console.error('Failed to save quiz results:', error);
      }
    }
    
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setStartTime(Date.now());
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
    <Layout>
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
    </Layout>
  );
};

export default Quiz;
