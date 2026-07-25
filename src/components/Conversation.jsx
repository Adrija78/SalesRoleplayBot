import { useState, useEffect, useRef } from 'react';

/**
 * Control action center managing live dictation and synthesized speech replies.
 * 
 * @param {Object} props - React props
 * @param {Function} props.onSendMessage - Callback when user submits a message
 * @param {Function} props.onReset - Callback to clear the conversation
 * @param {Function} props.onAnalyze - Callback to request evaluation
 * @param {boolean} props.isProcessing - Loading state for API requests
 * @param {string} props.lastBotReply - Latest reply text to process with Text-to-Speech
 * @param {boolean} props.hasMessages - Flag showing if current chat history has elements
 */
const Conversation = ({ 
  onSendMessage, 
  onReset, 
  onAnalyze, 
  isProcessing = false,
  lastBotReply = '',
  hasMessages = false
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoListen, setAutoListen] = useState(false);
  const [recognitionSupported] = useState(() => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const onSendMessageRef = useRef(onSendMessage);

  useEffect(() => {
    onSendMessageRef.current = onSendMessage;
  }, [onSendMessage]);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setInputText(text);
        if (text.trim()) {
          onSendMessageRef.current(text);
          setInputText('');
        }
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      rec.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
      };

      recognitionRef.current = rec;
      return () => rec.abort();
    }
  }, []);

  function speakText(text, onEnd) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft')))
      || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  }

  // Handle reading the bot's reply aloud
  useEffect(() => {
    if (ttsEnabled && lastBotReply) {
      speakText(lastBotReply, () => {
        // If hands-free is enabled and recognition is idle, automatically start listening
        if (autoListen && recognitionRef.current && !isProcessing && !isListeningRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.warn('Speech recognition start neglected:', e);
          }
        }
      });
    }
  }, [lastBotReply, ttsEnabled, autoListen, isProcessing]);

  const handleToggleListen = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Clear current audio output if we are speaking over it
      window.speechSynthesis.cancel();
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start voice capture:", err);
      }
    }
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    
    onSendMessage(inputText);
    setInputText('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="conversation-control-bar">
      <form onSubmit={handleSubmitText} className="input-form">
        <input
          type="text"
          className="text-input"
          placeholder={isListening ? "🎙️ Listening... speak clearly..." : "Type your pitch message here..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isProcessing || isListening}
        />
        
        <button 
          type="submit" 
          className={`submit-btn ${isProcessing ? 'disabled' : ''}`}
          disabled={isProcessing || isListening || !inputText.trim()}
        >
          Send Pitch ✉️
        </button>

        {recognitionSupported && (
          <button
            type="button"
            className={`mic-btn ${isListening ? 'listening' : ''} ${isProcessing ? 'disabled' : ''}`}
            onClick={handleToggleListen}
            disabled={isProcessing}
            title={isListening ? "Stop Recording" : "Speak Response"}
          >
            <span className="mic-icon">{isListening ? '🛑' : '🎙️'}</span>
            {isListening && <span className="pulsing-wave"></span>}
          </button>
        )}
      </form>
      
      <div className="utility-controls">
        <div className="checkboxes-row">
          <label className="toggle-label noselect">
            <input
              type="checkbox"
              checked={ttsEnabled}
              onChange={(e) => {
                setTtsEnabled(e.target.checked);
                if (!e.target.checked) window.speechSynthesis.cancel();
              }}
            />
            Speak Buyer Replies 🔊
          </label>

          <label className="toggle-label noselect" title="Hands-free: Mic automatically starts listening when Customer finishes speaking">
            <input
              type="checkbox"
              checked={autoListen}
              onChange={(e) => setAutoListen(e.target.checked)}
              disabled={!recognitionSupported}
            />
            Hands-free Auto-Mic 🎙️⚡
          </label>
        </div>

        <div className="buttons-row">
          <button 
            type="button" 
            className="reset-btn" 
            onClick={() => {
              window.speechSynthesis.cancel();
              onReset();
            }}
            disabled={isProcessing || !hasMessages}
          >
            Reset Session ↻
          </button>

          <button
            type="button"
            className="analyze-btn"
            onClick={() => {
              window.speechSynthesis.cancel();
              onAnalyze();
            }}
            disabled={isProcessing || !hasMessages}
          >
            Analyze Pitch & Grade 📊
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
