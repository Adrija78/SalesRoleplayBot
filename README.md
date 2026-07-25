# 🎯 Sales Crucible – AI Sales Roleplay Voice Bot

Sales Crucible is a full-stack AI-powered sales training application that helps users practice real-world sales conversations through text and voice interactions. The application simulates realistic customer personas that ask questions, challenge vague claims, raise objections, and provide a lifelike sales experience. After each roleplay session, the AI analyzes the conversation and generates a coaching scorecard with actionable feedback.

---

## 🚀 Features

- 🤖 AI-powered customer roleplay
- 🎤 Voice-enabled conversations
- 💬 Text chat support
- 🔊 AI voice responses
- 👥 Multiple buyer personas
- ⚙️ Custom buyer configuration
- 📊 AI-generated coaching scorecard
- 📝 Complete conversation transcript
- 🎯 Objection handling practice
- 📱 Responsive React interface

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js

### AI

- Groq API
- OpenAI-Compatible Chat Completion API
- GPT OSS 120B

### Browser APIs

- SpeechRecognition
- SpeechSynthesis
- Web Speech API

### Development Tools

- Visual Studio Code
- Git
- GitHub
- OpenAI Codex

---

## 🏗️ Architecture

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
     Groq API
        │
        ▼
 AI Customer Response
        │
        ▼
Browser Speech Synthesis
```

---

## 🧠 Development Journey

This project was originally planned to be developed using **Claude Code** because of its agent-based coding workflow. However, Claude Code requires a paid subscription, which was unavailable during development.

Instead, the project was built with assistance from **OpenAI Codex**, which was used for implementation, debugging, refactoring, and backend integration.

The backend initially used **Google Gemini**, but after reaching the free-tier API quota, it was migrated to **Groq**. Since Groq provides an OpenAI-compatible Chat Completion API, the migration only required backend configuration changes while keeping the frontend unchanged.

---

## ⚡ How It Works

1. Select a buyer persona.
2. Start speaking or type your sales pitch.
3. Your message is sent to the backend.
4. The backend sends the conversation history and persona to the AI model.
5. The AI responds as a realistic customer.
6. The response is displayed and spoken aloud.
7. End the session and analyze your performance.

---

## 👥 Buyer Personas

### Arthur Pendelton
**Role:** CFO  
**Difficulty:** Hard

Focuses on:
- ROI
- Budget
- Cost Reduction
- Financial Risk

---

### David Chen
**Role:** CTO  
**Difficulty:** Hard

Focuses on:
- Security
- APIs
- Integrations
- Scalability

---

### Sarah Jenkins
**Role:** VP Marketing  
**Difficulty:** Easy

Focuses on:
- Marketing Campaigns
- Team Productivity
- Growth

---

### Linda Mercer
**Role:** Procurement Director  
**Difficulty:** Medium

Focuses on:
- Vendor Evaluation
- Contracts
- Procurement
- Risk Management

---

## 📊 AI Coaching

After every conversation the AI evaluates:

- Discovery Questions
- Value Proposition
- Rapport
- Objection Handling
- Communication
- Closing Technique

---

## 📂 Project Structure

```
Sales-Crucible
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── prompts
│   ├── services
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Sales-Crucible.git
```

### Backend

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file

```env
GROQ_API_KEY=your_api_key

PORT=5000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Visit

```
http://localhost:5173
```

---

## 🔄 Switching AI Providers

The backend supports any OpenAI-compatible provider.

```env
LLM_API_KEY=your_provider_key

LLM_BASE_URL=https://provider.example/v1

LLM_MODEL=provider_model_name
```

Examples:

- Groq
- OpenAI
- OpenRouter

---

## 📈 Learning Outcomes

This project helped strengthen my understanding of:

- React
- Node.js
- Express
- REST APIs
- AI Integration
- Prompt Engineering
- Browser Voice APIs
- State Management
- Full-Stack Development

---

## 🔮 Future Improvements

- Authentication
- CRM Integration
- Conversation History
- Team Dashboard
- PDF Reports
- Multi-language Support
- Additional Buyer Personas
- Performance Analytics

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 🙏 Acknowledgements

This project was developed with assistance from **OpenAI Codex** for implementation, debugging, and code refinement.

The project was originally planned for **Claude Code**, but due to its paid subscription requirement, development was completed using OpenAI Codex.

The backend initially integrated **Google Gemini** before being migrated to **Groq** after the free-tier quota was exhausted.

---

## 👨‍💻 Author

**Adrija Karmakar**

Final Year B.Tech Computer Science Engineering Student

**Skills**

- React
- Node.js
- Express.js
- JavaScript
- MongoDB
- REST APIs

**GitHub**

https://github.com/Adrija78

**Portfolio**

https://addyy-portfolio.vercel.app/

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a **Star**.