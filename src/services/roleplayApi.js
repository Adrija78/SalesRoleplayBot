const API_BASE = 'http://localhost:5000/api/chat';

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
