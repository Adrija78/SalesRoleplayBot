import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import PersonaSelector from './components/PersonaSelector.jsx';
import Transcript from './components/Transcript.jsx';
import Conversation from './components/Conversation.jsx';
import ScoreCard from './components/ScoreCard.jsx';
import { PERSONA_PRESETS } from './data/personas.js';
import { sendChatMessage, getPitchEvaluation, getBackendStatus } from './services/roleplayApi.js';
import './styles/app.css';

/**
 * Main App component. Handles state for active buyer configs, conversation histories,
 * voice responses, and system status checking.
 */
function App() {
  const [activePersona, setActivePersona] = useState(PERSONA_PRESETS[0]);
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastBotReply, setLastBotReply] = useState('');
  const [scorecard, setScorecard] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');

  // Verify backend Server connection state on interface load
  useEffect(() => {
    const checkServer = async () => {
      try {
        const data = await getBackendStatus();
        if (data.success) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch {
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  const makeGreeting = (persona) => {
    return `Hello, this is ${persona.name}, ${persona.title} at ${persona.company}. Who is calling and what is this about?`;
  };

  // Seed conversational start greeting when selected persona shifts
  useEffect(() => {
    const greeting = makeGreeting(activePersona);
    setMessages([
      { sender: 'bot', text: greeting }
    ]);
    setLastBotReply(greeting);
    setScorecard(null);
  }, [activePersona]);

  const handleSendMessage = async (text) => {
    if (isProcessing) return;

    const userMessage = { sender: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsProcessing(true);
    setLastBotReply('');

    try {
      const data = await sendChatMessage(text, activePersona, messages);
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        setLastBotReply(data.reply);
      } else {
        throw new Error(data.message || 'General server reply failure.');
      }
    } catch (error) {
      console.error('Failed to communicate with AI customer:', error);
      setMessages(prev => [
        ...prev, 
        { sender: 'system', text: `⚠️ Connection Error: Failed to reach the AI buyer. Make sure the backend server (on port 5000) is running. (${error.message})` }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    const greeting = makeGreeting(activePersona);
    setMessages([
      { sender: 'bot', text: greeting }
    ]);
    setLastBotReply(greeting);
    setScorecard(null);
  };

  const handleAnalyze = async () => {
    setIsProcessing(true);
    try {
      const data = await getPitchEvaluation(messages);
      if (data.success && data.scorecard) {
        setScorecard(data.scorecard);
      } else {
        throw new Error('Evaluation response did not return a scorecard.');
      }
    } catch (err) {
      console.error('Scoring error:', err);
      alert(`Could not compile evaluation scorecard: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-container">
      <Header serverStatus={serverStatus} />
      
      <main className="app-main-layout">
        <section className="left-settings-panel">
          <h2>🎯 Sales Practice Setup</h2>
          <p className="subtitle">Configure your customer scenario properties below:</p>
          <PersonaSelector 
            activePersona={activePersona} 
            onSelectPersona={setActivePersona}
            disabled={isProcessing}
          />
        </section>

        <section className="right-chat-panel">
          <Transcript messages={messages} isTyping={isProcessing} />
          
          <Conversation 
            onSendMessage={handleSendMessage}
            onReset={handleReset}
            onAnalyze={handleAnalyze}
            isProcessing={isProcessing}
            lastBotReply={lastBotReply}
            hasMessages={messages.length > 1}
          />
        </section>
      </main>

      {scorecard && (
        <ScoreCard 
          scorecard={scorecard} 
          onClose={() => setScorecard(null)} 
        />
      )}
    </div>
  );
}

export default App;
