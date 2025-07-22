import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const generateQuestions = (domain) =>
  API.post('/generate-questions', { domain });

export const evaluateAnswer = (question, answer) =>
  API.post('/evaluate-answer', { question, answer });

export const getTips = (question) => 
  API.post('/get-tips', { question });
