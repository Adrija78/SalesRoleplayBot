# Sales Crucible — AI Sales Roleplay Voice Bot

Sales Crucible is a voice-enabled sales-practice application. A sales representative speaks or types a pitch, while an AI roleplays as a realistic customer: it asks questions, challenges vague claims, and raises objections. When the session ends, the app can analyze the transcript and return a coaching scorecard.

## What it demonstrates

- Live spoken, turn-based roleplay using the browser microphone and text-to-speech.
- Configurable buyer simulations, including industry, company size, difficulty, temperament, urgency, objection style, and custom context.
- Four starter personas plus a custom-buyer editor. Personas are fictional, privacy-safe training profiles—not real customers.
- A transcript and AI sales-coaching scorecard for objection handling, value proposition, rapport, and closing.

## Architecture

`Microphone / text input → React UI → Express API → Groq chat completion → customer reply → browser speech synthesis`

The frontend uses React and Vite. The backend uses Node.js and Express. Persona settings are sent with each turn, transformed into a system prompt on the backend, and then supplied with conversation history to the model. This keeps customer behavior configuration-driven rather than creating separate hardcoded bots.

## AI provider decision

The first version used Google Gemini. During development its free-tier quota was exhausted, so the backend was switched to Groq without changing the frontend. Groq offers an OpenAI-compatible chat-completions endpoint; the project uses the `openai/gpt-oss-120b` model by default. The provider adapter also supports any OpenAI-compatible provider through environment variables.

## Setup

Prerequisite: Node.js 18 or newer.

1. Create `backend/.env` from `backend/.env.example`.
2. Add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

3. Run the backend in one terminal:

```powershell
cd backend
npm.cmd install
npm.cmd run dev
```

4. Run the frontend in a second terminal:

```powershell
cd ..
npm.cmd install
npm.cmd run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

## Using the roleplay

1. Select a buyer preset or configure a custom buyer.
2. State your name, company, and the value you offer. Use the microphone or type your message.
3. Ask discovery questions, respond to the buyer’s objections, and request a clear next step such as a demo.
4. Select **Analyze Pitch & Grade** for coaching feedback.

You are always the sales representative. The AI is always the customer/prospect.

## Buyer playbooks

Use these discovery questions when practising. Ask only one at a time, then follow the customer’s answer.

### Arthur Pendelton — CFO, hard difficulty

- How do you currently track software spend and unused licenses?
- Which renewals or cost areas are under the most scrutiny this quarter?
- What financial outcome would make a new solution worth evaluating?
- What evidence would you need to believe savings can be achieved within three months?
- If the ROI is proven, who else is involved in approving a pilot?

### David Chen — CTO, hard difficulty

- Which systems would a new tool need to integrate with on day one?
- What security, SSO, data-residency, or compliance requirements are non-negotiable?
- How does your team evaluate vendor reliability and API performance today?
- What would make implementation too disruptive for your engineering team?
- Who needs to validate the technical solution before a pilot can begin?

### Sarah Jenkins — VP Marketing, easy difficulty

- What campaign or growth goal is most urgent for your team right now?
- Where does your team lose the most time in the current workflow?
- How quickly would your team need to see value after onboarding?
- What would make adoption easy for your creative and marketing teams?
- Would a short demo with the campaign team be a useful next step?

### Linda Mercer — Procurement Director, medium difficulty

- What is your normal process for evaluating and onboarding a new vendor?
- What contract terms or risks usually slow down a purchase?
- Would a time-boxed pilot reduce the risk enough to evaluate us?
- Which proof points or customer references would procurement require?
- Who should be included in a first evaluation meeting?

## Switching providers

Set these values in `backend/.env` to use OpenAI, OpenRouter, or another compatible API:

```env
LLM_API_KEY=your_provider_key
LLM_BASE_URL=https://provider.example/v1
LLM_MODEL=provider_model_name
```

Never commit `backend/.env`. It is ignored by Git.

## Deployment

Deploy the backend first, then deploy the frontend.

### 1. Backend on Render

1. In Render, select **New → Blueprint** and connect this GitHub repository. Render will use `render.yaml` and create the Express service from the `backend` directory.
2. Add the secret environment variable `GROQ_API_KEY` in the Render service settings. Do not put it in GitHub.
3. Deploy and copy the service URL, for example `https://sales-roleplay-api.onrender.com`.

### 2. Frontend on Vercel

1. Import this GitHub repository in Vercel.
2. Keep the project root as the repository root; Vercel detects Vite automatically.
3. Add this environment variable before deploying:

```env
VITE_API_BASE_URL=https://your-render-service.onrender.com/api/chat
```

4. Deploy. Vite exposes only variables prefixed with `VITE_`, so the frontend receives the public backend URL but never the Groq key.

After deployment, open the Vercel URL and allow microphone permission. The frontend sends requests to Render, and only the Render backend can call Groq.

## Verification

```powershell
npm.cmd run lint
npm.cmd run build
```
