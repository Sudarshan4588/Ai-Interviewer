# AI Interviewer – Elevate Yourself with Every Answer 💼🤖

## 🚀 Objective

To help job seekers practice and improve their interview skills through an interactive AI-based mock interview platform tailored to specific job domains.

---

## 🧠 Overview

**AI Interviewer** simulates a real-world interview experience using generative AI. It allows users to input a domain, receive questions, and get detailed AI-powered feedback on their answers — both written and spoken. It also includes an AI-based **Resume Checker** for improving technical resumes.

---

## 🎯 Features

### 🗨️ Domain-Specific Interview Simulation
- Users enter a domain (e.g., “Web Development”, “Data Science”).
- App generates **3 AI-based interview questions** using Claude 3 Haiku model.
- User selects a question, and:
  - A **textbox** appears for typing the answer.
  - **AI-generated tips** are shown alongside.

### 🧏‍♂️ Voice & Text Input
- Answer questions by **typing** or using **speech-to-text**.

### ✅ AI-Based Evaluation
- After answering, users click **Evaluate**.
- AI provides:
  - **Constructive feedback**
  - **Improved answer suggestions**

### 📄 Resume Checker
- Upload or paste resume text.
- AI gives:
  1. **Strengths**
  2. **Weaknesses**
  3. **Missing Sections**
  4. **Formatting Suggestions**
  5. **Technical Resume Enhancement Tips**

---

## 🛠️ Tech Stack

| Technology      | Usage                               |
|-----------------|--------------------------------------|
| **React.js**    | Frontend framework                   |
| **OpenRouter.ai** | API for AI interaction              |
| **Claude 3 Haiku** | AI model used for generating responses |
| **Web Speech API** | Speech-to-text functionality        |

---

## 🔑 API Key Configuration

> 💡 **Important:** Add your OpenRouter AI API key in `.env` (depending on your setup).

```js
const OPENROUTER_API_KEY = 'your_openrouter_api_key_here';

🚀 How to Run the Project

1. Clone the repository

git clone https://github.com/Sudarshan4588/Ai-Interviewer.git

2. Start the Backend Server

cd ai_interviewer_backend
npm install
node index.js
This will start the backend server (usually on port 5000 or as configured).

3. Start the Frontend (React UI)
In a new terminal:

cd ai_interviewer_ui
npm install
npm start
