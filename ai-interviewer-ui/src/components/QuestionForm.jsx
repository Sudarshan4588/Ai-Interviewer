import React from 'react';
import './QuestionForm.css';

const QuestionForm = ({ domain, setDomain, handleGenerate, questions, setSelectedQuestion }) => {
  return (
    <div className="question-form">
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain (e.g., Java)"
      />
      <button onClick={handleGenerate}>Generate Questions</button>

      <ul>
        {questions.map((q, idx) => (
          <li
            key={idx}
            onClick={async () => {
              setSelectedQuestion(q);
              setAnswer('');
              setFeedback('');
              setImproved('');
              const tipsRes = await getTips(q);
              setTips(tipsRes.data.tips);
            }}
          >
            {q}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default QuestionForm;
