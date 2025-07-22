const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = "anthropic/claude-3-haiku";

// 1. Generate Interview Questions
app.post('/generate-questions', async (req, res) => {
  const { domain } = req.body;

  const prompt = `Give me 3 Medium level technical interview questions (only the questions) for the ${domain} domain. 
Respond in this format:
1. <question>
2. <question>
3. <question>`;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000'
        }
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from LLM. Check model ID or prompt.' });
    }

    const text = response.data.choices[0].message.content;

    // Extract only numbered lines like "1. question"
    const questions = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => /^\d+\./.test(line)); // only lines like "1. xxx", "2. xxx"

    res.json({ questions });

  } catch (error) {
    console.error('Error generating questions:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


// 2. Evaluate and Improve Answer
app.post('/evaluate-answer', async (req, res) => {
  const { question, answer } = req.body;
  


 const prompt = `
You are an AI interviewer. Given the question and answer, do the following:
Question: ${question}
Answer: ${answer}

1. Give feedback.
2. Improve the answer.


Format your response as:
Feedback:
<feedback here>

Improved Answer:
<improved answer here>
`;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000'
        }
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      console.error('OpenRouter response:', response.data);
      return res.status(500).json({ error: 'No response from LLM. Check model ID or prompt.' });
    }

    const feedbackText = response.data.choices[0].message.content;
    res.json({ feedback: feedbackText });

  } catch (error) {
    console.error('Error evaluating answer:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.post('/get-tips', async (req, res) => {
  const { question } = req.body;

  const prompt = `Provide only 2 bullet points that are helpful tips for answering the following interview question well:
"${question}"
Be concise. Return as bullet points.`;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000'
        }
      }
    );

    const text = response.data.choices[0].message.content;
    const tips = text.split('\n').filter(line => line.trim() !== '');

    res.json({ tips });
  } catch (error) {
    console.error('Error getting tips:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const multer = require('multer');
const pdfParse = require('pdf-parse');

// Setup file upload middleware
const upload = multer({ storage: multer.memoryStorage() });

// Route: Resume Feedback
app.post('/resume-feedback', upload.single('resume'), async (req, res) => {
  try {
    let resumeText = '';

    // PDF or TXT handling
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      resumeText = data.text;
    } else {
      resumeText = req.file.buffer.toString(); // .txt fallback
    }

    const prompt = `
You are an expert career coach. Analyze the following resume and give feedback on:

1. Strengths
2. Weaknesses
3. Missing Sections
4. Formatting Suggestions
5. How the resume can be improved for technical job roles

Resume:
${resumeText}
`;

    const response = await axios.post(
      BASE_URL,
      {
        model: MODEL_NAME,
        messages: [
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000'
        }
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from LLM. Check model ID or prompt.' });
    }

    const feedback = response.data.choices[0].message.content;
    res.json({ feedback });

  } catch (err) {
    console.error('Resume feedback error:', err.message);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});



// Server listening
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
