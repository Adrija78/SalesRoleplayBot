# 🎯 Sales Crucible — AI Sales Roleplay Voice Bot

Sales Crucible is a full-stack AI-powered sales training application that simulates realistic customer conversations. Users practice their sales pitch through text or voice while an AI plays the role of a prospective customer, asking questions, raising objections, and evaluating the conversation.

The application helps improve sales communication, objection handling, discovery questioning, and closing techniques by providing an interactive roleplay experience followed by AI-generated coaching feedback.

---

## 📖 Overview

Sales Crucible provides an immersive environment for practicing sales conversations without requiring a real customer.

During each session:

- You play the role of the Sales Representative.
- The AI acts as the Customer or Prospect.
- The AI responds naturally based on the selected buyer persona.
- After the conversation, the application generates a coaching report highlighting strengths and areas for improvement.

The project demonstrates modern full-stack development combined with Large Language Models (LLMs), browser voice APIs, and configurable AI personas.

---

# ✨ Features

- 🤖 AI-powered customer simulation
- 🎤 Voice-enabled conversations
- 💬 Text chat support
- 🔊 AI speech responses
- 📋 Multiple buyer personas
- 🛠 Custom buyer configuration
- 📈 AI coaching scorecard
- 📝 Complete conversation transcript
- 🎯 Objection handling practice
- 📱 Responsive React interface
- ⚡ Real-time AI responses
- 🔄 Configurable AI provider

---

# 🚀 What It Demonstrates

- Live voice-based sales roleplay
- AI-generated customer objections
- Discovery question practice
- Configurable customer personalities
- Sales coaching using LLMs
- Browser Speech Recognition
- Browser Speech Synthesis
- Full-stack React + Express architecture

---

# 🛠 Technologies Used

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

## Backend

- Node.js
- Express.js

## AI

- Groq API
- OpenAI-Compatible Chat Completion API
- GPT OSS 120B (default model)

## Browser APIs

- Web Speech API
- SpeechRecognition
- webkitSpeechRecognition
- SpeechSynthesis

## Development Tools

- Visual Studio Code
- Git
- GitHub
- OpenAI Codex

---

# 🏗 Architecture

```
Microphone / Text Input
          │
          ▼
     React Frontend
          │
          ▼
     Express Backend
          │
          ▼
      Groq Chat API
          │
          ▼
    AI Customer Reply
          │
          ▼
 Browser Speech Synthesis
```

The frontend is built with **React** and **Vite**, while the backend uses **Node.js** and **Express**.

Each conversation includes:

- Conversation history
- Selected buyer persona
- Buyer settings
- System prompt

The backend dynamically generates prompts based on buyer configuration rather than using hardcoded customer bots.

---

# 🧠 Development Journey

The project was originally planned to be developed using **Claude Code** because of its agent-based coding workflow.

However, Claude Code requires a paid subscription, which was not available during development.

Instead, the project was successfully built using **OpenAI Codex**, which assisted throughout development by helping with:

- Code generation
- Component implementation
- Debugging
- Refactoring
- Backend API integration
- Error fixing
- Development workflow

For AI responses, the backend initially used **Google Gemini**.

During testing, the free-tier API quota was exhausted, so the backend was migrated to **Groq**. Since Groq provides an OpenAI-compatible Chat Completion API, the migration only required backend configuration changes while keeping the frontend unchanged.

This project demonstrates how AI providers can be swapped easily when applications are designed around a provider-independent API architecture.

---

# 🤖 AI Provider

Current AI Provider:

- Groq

Default Model:

- openai/gpt-oss-120b

Development History

- Planned development with Claude Code
- Built using OpenAI Codex
- Initial AI backend: Google Gemini
- Migrated to Groq after Gemini free-tier quota exhaustion

The backend supports any OpenAI-compatible provider through environment variables.

---

# 📂 Project Structure

```
Sales-Crucible/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── README.md
└── .gitignore
```

---

# 🎤 Voice Features

## Speech Recognition

The application uses the browser's built-in **Web Speech API**.

```
SpeechRecognition
webkitSpeechRecognition
```

Speech is automatically converted into text before being sent to the backend.

### Benefits

- No paid speech service
- No WebRTC
- Browser-native
- Fast speech recognition

---

## Speech Synthesis

The AI customer's responses are spoken aloud using

```
window.speechSynthesis
```

Benefits

- Browser-supported
- No external Text-to-Speech API
- Natural AI responses

---

# 💬 How the Roleplay Works

1. Select a buyer persona.
2. Start speaking or type your pitch.
3. The backend sends your message and buyer settings to the AI.
4. The AI generates realistic customer responses.
5. Continue the conversation naturally.
6. Finish the session.
7. Click **Analyze Pitch & Grade**.
8. Receive an AI-generated coaching report.

---

# 👥 Buyer Personas

The application includes multiple configurable buyer personas.

## Arthur Pendelton

**Role:** CFO

Difficulty: Hard

Focus Areas

- Budget
- ROI
- Financial Risk
- Software Costs

---

## David Chen

**Role:** CTO

Difficulty: Hard

Focus Areas

- Security
- APIs
- Infrastructure
- Integrations

---

## Sarah Jenkins

**Role:** VP Marketing

Difficulty: Easy

Focus Areas

- Marketing Campaigns
- Team Productivity
- Growth
- ROI

---

## Linda Mercer

**Role:** Procurement Director

Difficulty: Medium

Focus Areas

- Vendor Selection
- Contracts
- Procurement Process
- Risk Reduction

---

# 📊 Coaching Report

After every conversation the AI evaluates:

- Discovery Questions
- Rapport Building
- Value Proposition
- Objection Handling
- Product Knowledge
- Closing Strategy
- Overall Communication

The report includes actionable suggestions for improvement.

---

# ⚙ Installation

## Prerequisites

Node.js 18+

---

## Clone Repository

```bash
git clone https://github.com/yourusername/Sales-Crucible.git
```

---

## Install Backend

```bash
cd backend

npm install
```

Create `.env`

```env
GROQ_API_KEY=your_groq_api_key

PORT=5000
```

Run backend

```bash
npm run dev
```

---

## Install Frontend

```bash
cd ../frontend

npm install

npm run dev
```

Open

```
http://localhost:5173
```

---

# 🌐 Environment Variables

```
GROQ_API_KEY=your_api_key

PORT=5000

LLM_API_KEY=

LLM_BASE_URL=

LLM_MODEL=openai/gpt-oss-120b
```

---

# 🔄 Switching AI Providers

The backend supports any OpenAI-compatible provider.

Example

```
LLM_API_KEY=your_provider_key

LLM_BASE_URL=https://provider.example/v1

LLM_MODEL=provider_model
```

Supported providers include

- Groq
- OpenAI
- OpenRouter
- Local OpenAI-compatible servers

---

# 📈 Learning Outcomes

This project helped strengthen skills in

- React
- Node.js
- Express.js
- REST APIs
- Prompt Engineering
- AI Integration
- Browser Voice APIs
- Speech Recognition
- Speech Synthesis
- Full-stack Application Development
- API Provider Migration
- State Management
- Environment Configuration

---

# ⚡ Challenges Faced

Some of the key challenges during development included:

- Managing conversation history
- Designing configurable AI personas
- Handling asynchronous API requests
- Integrating browser speech APIs
- Migrating from Gemini to Groq
- Maintaining provider-independent backend architecture
- Managing AI prompts effectively

---

# 🧪 Verification

Run lint

```bash
npm run lint
```

Build project

```bash
npm run build
```

---

# 📷 Screenshots

```
screenshots/

home.png

chat.png

voice-mode.png

analysis.png
```

(Add screenshots after uploading them.)

---

# 🔮 Future Improvements

- Authentication
- Conversation history
- Dashboard
- CRM integration
- Analytics
- Multiple languages
- Voice customization
- Additional buyer personas
- Team leaderboard
- Export coaching reports
- PDF report generation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 🙏 Acknowledgements

This project was developed with assistance from **OpenAI Codex** for implementation, debugging, and code refinement.

The project was originally planned to be built using **Claude Code**, but due to its paid subscription requirement, development was completed using OpenAI Codex.

The AI backend initially used **Google Gemini** before being migrated to **Groq** after the free-tier quota limit was reached.

---

# 👨‍💻 Author

**Adrija Karmakar**

Final Year B.Tech Computer Science Engineering Student

Full Stack Developer

### Skills

- React
- Node.js
- Express.js
- JavaScript
- MongoDB
- REST APIs
- Git
- GitHub

**GitHub:** https://github.com/Adrija78

**Portfolio:** https://addyy-portfolio.vercel.app/

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ If you found this project useful, consider giving it a Star!
