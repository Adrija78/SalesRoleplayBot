import { useEffect, useRef } from 'react';

/**
 * Transcript UI logging all chat exchanges and highlighting speakers
 * 
 * @param {Object} props - React props
 * @param {Array} props.messages - Messages log list
 * @param {boolean} props.isTyping - Active generation state
 */
const Transcript = ({ messages = [], isTyping = false }) => {
  const bottomRef = useRef(null);

  // Auto scroll to latest bubble on message insert
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="transcript-panel">
      <div className="transcript-header">
        <h3>💬 Pitch Transcript</h3>
      </div>
      
      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="empty-transcript">
            <div className="empty-icon-ring">🎤</div>
            <h4>No dialogue started yet</h4>
            <p>Select a buyer persona above, then choose to type or dictate your pitch using the controls below.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';
            
            return (
              <div 
                key={index} 
                className={`message-bubble-wrapper ${isUser ? 'user' : isSystem ? 'system' : 'bot'}`}
              >
                {!isSystem && (
                  <span className="msg-sender-tag">
                    {isUser ? '👤 You (Sales Rep)' : '💼 Customer'}
                  </span>
                )}
                
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        
        {isTyping && (
          <div className="message-bubble-wrapper bot typing">
            <span className="msg-sender-tag">💼 Customer (is thinking...)</span>
            <div className="message-bubble typing-indicator-container">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Transcript;
