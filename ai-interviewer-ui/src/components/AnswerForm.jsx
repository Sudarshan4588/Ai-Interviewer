import React from 'react';
import './AnswerForm.css';

const AnswerForm = ({
  selectedQuestion,
  answer,
  setAnswer,
  handleEvaluate,
  feedback,
  improved,
  tips
}) => {
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) => prev + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="answer-form">
      <h3>🧠 Answer this Question:</h3>
      <p className="question-text"><strong>{selectedQuestion}</strong></p>

      {tips.length > 0 && (
        <div className="tips-box">
          <h4>💡 Tips Before Answering</h4>
          <ul>
            {tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <textarea
        rows="5"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here or use the mic..."
      ></textarea>

      <div className="button-row">
        <button className="eval-btn" onClick={handleEvaluate}>✅ Evaluate Answer</button>
        <button className="voice-btn" onClick={handleVoiceInput}>🎤 Speak Answer</button>
      </div>

      {feedback && (
        <div className="result-section">
          <h4>🔍 Feedback</h4>
          <p>{feedback}</p>

          <h4>✨ Improved Answer</h4>
          <p>{improved}</p>
        </div>
      )}
    </div>
  );
};

export default AnswerForm;
