import 'dotenv/config';
import { buildSystemPrompt } from '../prompts/customerPrompts.js';

// Groq uses OpenAI's chat-completions format. These three variables also let the
// app use another OpenAI-compatible provider (such as OpenAI or OpenRouter)
// without changing application code.
// GEMINI_API_KEY is accepted temporarily so existing .env files keep working
// after the value has been replaced with a Groq key. Prefer GROQ_API_KEY.
const API_KEY = process.env.LLM_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
const BASE_URL = (process.env.LLM_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '');
const MODEL = process.env.LLM_MODEL || 'openai/gpt-oss-120b';

function requireApiKey() {
  if (!API_KEY) {
    throw new Error('No LLM API key is configured. Add GROQ_API_KEY (or LLM_API_KEY) to backend/.env and restart the backend.');
  }
}

function toMessages(history, systemPrompt, latestMessage) {
  const messages = [{ role: 'system', content: systemPrompt }];

  if (Array.isArray(history)) {
    for (const item of history) {
      if (!item?.text?.trim()) continue;
      if (item.sender === 'user') messages.push({ role: 'user', content: item.text.trim() });
      if (item.sender === 'bot') messages.push({ role: 'assistant', content: item.text.trim() });
    }
  }

  if (latestMessage?.trim()) messages.push({ role: 'user', content: latestMessage.trim() });
  return messages;
}

async function createCompletion(payload) {
  requireApiKey();
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: MODEL, ...payload })
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.error?.message || `LLM provider returned status ${response.status}.`);
  }

  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('The LLM provider returned an empty response.');
  }
  return content.trim();
}

/** Service for the configured OpenAI-compatible LLM provider. */
const aiService = {
  async generateResponse(message, personaConfig = {}, history = []) {
    return createCompletion({
      messages: toMessages(history, buildSystemPrompt(personaConfig), message),
      temperature: 0.8,
      max_tokens: 180
    });
  },

  async generateEvaluation(history = []) {
    if (!Array.isArray(history) || history.length === 0) {
      throw new Error('Cannot evaluate an empty conversation transcript.');
    }

    const transcript = history
      .filter(item => item?.text?.trim())
      .map(item => `${item.sender === 'user' ? 'Salesperson' : 'Customer'}: ${item.text.trim()}`)
      .join('\n');

    const content = await createCompletion({
      messages: [
        {
          role: 'system',
          content: `You are an expert sales coach. Return ONLY a valid JSON object with these exact fields: overallScore, objectionHandling, valueProposition, rapportAndTone, closingSkills (integers 0-100); strengths and weaknesses (arrays of short strings); coachingFeedback (a concise actionable string).`
        },
        { role: 'user', content: `Evaluate this sales roleplay transcript:\n\n${transcript}` }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    try {
      return JSON.parse(content);
    } catch {
      throw new Error('The LLM returned an invalid evaluation format. Please try scoring again.');
    }
  }
};

export default aiService;
