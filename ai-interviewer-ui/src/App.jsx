import React, { useState } from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import AnswerForm from './components/AnswerForm';
import ResumeFeedback from './components/ResumeFeedback';
import { generateQuestions, evaluateAnswer, getTips } from './api';

function App() {
  const [domain, setDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [improved, setImproved] = useState('');
  const [tips, setTips] = useState([]);
 


  const handleGenerate = async () => {
    const res = await generateQuestions(domain);
    setQuestions(res.data.questions);
    // Clear previous state
    setSelectedQuestion('');
    setAnswer('');
    setFeedback('');
    setImproved('');
    setTips([]);
  };

  const handleSelectQuestion = async (q) => {
    setSelectedQuestion(q);
    setAnswer('');
    setFeedback('');
    setImproved('');
    const tipsRes = await getTips(q);
    setTips(tipsRes.data.tips);
  };

  const handleEvaluate = async () => {
    const res = await evaluateAnswer(selectedQuestion, answer);
    const text = res.data.feedback;

    const [, feedbackPart, improvedPartAndScores] = text.split(/Feedback:|Improved Answer:/);


    setFeedback(feedbackPart?.trim());
    setImproved(improvedPartAndScores?.trim());
  };


  return (
    <div className="app">
      <h1>💼 AI Interview Assistant</h1>
      

      <QuestionForm
        domain={domain}
        setDomain={setDomain}
        handleGenerate={handleGenerate}
        questions={questions}
        setSelectedQuestion={handleSelectQuestion}
      />

      {selectedQuestion && (
        <AnswerForm
          selectedQuestion={selectedQuestion}
          answer={answer}
          setAnswer={setAnswer}
          handleEvaluate={handleEvaluate}
          feedback={feedback}
          improved={improved}
          tips={tips}                 
          
        />

      )}
      <div>
        <ResumeFeedback/>
      </div>
      

    </div>
  );
}

export default App;
