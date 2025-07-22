import React, { useState } from 'react';
import axios from 'axios';
import './ResumeFeedback.css';
const ResumeFeedback = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!file) return alert('Please upload a resume.');

    if (file.size > 2 * 1024 * 1024) {
      return alert('File too large. Max size is 2MB.');
    }


    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/resume-feedback', formData);
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      alert('Error uploading resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-feedback">
      <h3>📄 Resume Feedback</h3>
      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
      <button onClick={handleSubmit}>🔍 Get AI Feedback</button>
      {loading && <p>Analyzing resume...</p>}
      {feedback && (
        <div className="feedback">
          <h4>🧠 AI Feedback</h4>
          <div>{feedback}</div>
        </div>
      )}
    </div>
  );
};

export default ResumeFeedback;
