// Local development uses Express on port 5000. In production, set
// VITE_API_BASE_URL to the deployed backend URL ending in /api/chat.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/chat';

export async function getBackendStatus() {
  const backendOrigin = API_BASE.replace(/\/api\/chat\/?$/, '');
  const response = await fetch(`${backendOrigin}/`);
  return response.json();
}

/** Sends a salesperson message to the configured backend AI provider. */
export async function sendChatMessage(message, persona, history = []) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, persona, history })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Server returned status ${response.status}`);
  }
  return response.json();
}

/** Sends a conversation transcript to the backend AI coach. */
export async function getPitchEvaluation(history) {
  const response = await fetch(`${API_BASE}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Server returned status ${response.status}`);
  }
  return response.json();
}
