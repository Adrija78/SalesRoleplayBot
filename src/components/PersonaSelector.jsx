import { useState } from 'react';
import { PERSONA_PRESETS, INDUSTRIES, TEMPERAMENTS, OBJECTION_STYLES } from '../data/personas.js';

/**
 * Persona Config Selector displaying built-in targets and custom parameter tuning panel.
 * 
 * @param {Object} props - React props
 * @param {Object} props.activePersona - Currently loaded customer settings
 * @param {Function} props.onSelectPersona - Callback when changing customer targets
 * @param {boolean} props.disabled - Lock interaction while chat is processing
 */
const PersonaSelector = ({ activePersona, onSelectPersona, disabled }) => {
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'custom'

  // Local state for custom config editor templates
  const [customConfig, setCustomConfig] = useState({
    name: "Alex Johnson",
    title: "VP of Operations",
    company: "Swift Logistics",
    industry: "Logistics",
    difficulty: "Medium",
    temperament: "Direct, impatient, and tech-savvy",
    objectionStyle: "High cost sensitivity / ROI demand",
    companySize: "Mid-market",
    buyUrgency: "Medium",
    interestLevel: "Medium",
    additionalContext: "Alex wants to automate dispatch routing but fears vendor reliability and software onboarding delays.",
    avatarBg: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
    avatarIcon: "⚙️"
  });

  const handleCustomFieldChange = (field, val) => {
    setCustomConfig(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleApplyCustom = () => {
    const customPersona = {
      ...customConfig,
      id: "custom-" + Date.now(),
      isCustom: true
    };
    onSelectPersona(customPersona);
  };

  return (
    <div className="persona-selector-container">
      <div className="selector-tabs">
        <button 
          className={`tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
          onClick={() => setActiveTab('presets')}
          disabled={disabled}
        >
          👥 Buyer Presets
        </button>
        <button 
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
          disabled={disabled}
        >
          ⚙️ Custom Buyer Configurator
        </button>
      </div>

      {activeTab === 'presets' && (
        <div className="presets-grid">
          {PERSONA_PRESETS.map((p) => {
            const isSelected = activePersona.id === p.id && !activePersona.isCustom;
            return (
              <div 
                key={p.id} 
                className={`preset-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && onSelectPersona(p)}
              >
                <div className="avatar-circle" style={{ background: p.avatarBg }}>
                  {p.avatarIcon}
                </div>
                <div className="preset-info">
                  <div className="preset-card-title-row">
                    <h3>{p.name}</h3>
                    <span className={`difficulty-badge ${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <span className="preset-title">{p.title} @ <strong>{p.company}</strong></span>
                  <p className="preset-desc">{p.additionalContext}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="custom-editor-panel">
          <p className="editor-intro-note">
            Modify any parameter below to compile a custom prospect. The AI customer will dynamically adapt its dialogue flow, objection triggers, and skepticism to match your inputs.
          </p>
          <div className="editor-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={customConfig.name} 
                onChange={(e) => handleCustomFieldChange('name', e.target.value)}
                disabled={disabled}
              />
            </div>
            
            <div className="input-group">
              <label>Job Title</label>
              <input 
                type="text" 
                value={customConfig.title} 
                onChange={(e) => handleCustomFieldChange('title', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="input-group">
              <label>Company Name</label>
              <input 
                type="text" 
                value={customConfig.company} 
                onChange={(e) => handleCustomFieldChange('company', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="input-group">
              <label>Industry Archetype</label>
              <select 
                value={customConfig.industry} 
                onChange={(e) => handleCustomFieldChange('industry', e.target.value)}
                disabled={disabled}
              >
                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Buyer Temperament</label>
              <select 
                value={customConfig.temperament} 
                onChange={(e) => handleCustomFieldChange('temperament', e.target.value)}
                disabled={disabled}
              >
                {TEMPERAMENTS.map(temp => <option key={temp} value={temp}>{temp}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Objection Style Profile</label>
              <select 
                value={customConfig.objectionStyle} 
                onChange={(e) => handleCustomFieldChange('objectionStyle', e.target.value)}
                disabled={disabled}
              >
                {OBJECTION_STYLES.map(obj => <option key={obj} value={obj}>{obj}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Difficulty Obstacle</label>
              <div className="radio-group">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                  <button 
                    key={diff}
                    type="button"
                    className={`radio-btn ${customConfig.difficulty === diff ? 'active' : ''}`}
                    onClick={() => handleCustomFieldChange('difficulty', diff)}
                    disabled={disabled}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Initial Urgency</label>
              <div className="radio-group">
                {['Low', 'Medium', 'High'].map(urg => (
                  <button 
                    key={urg}
                    type="button"
                    className={`radio-btn ${customConfig.buyUrgency === urg ? 'active' : ''}`}
                    onClick={() => handleCustomFieldChange('buyUrgency', urg)}
                    disabled={disabled}
                  >
                    {urg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="input-group full-width">
            <label>Specific Pain Points / Persona Context</label>
            <textarea 
              rows="2"
              value={customConfig.additionalContext} 
              onChange={(e) => handleCustomFieldChange('additionalContext', e.target.value)}
              disabled={disabled}
              placeholder="e.g. Worries about API compatibility issues with existing CRM databases..."
            />
          </div>

          <button 
            type="button" 
            className={`apply-custom-btn ${disabled ? 'disabled' : ''}`}
            onClick={handleApplyCustom}
            disabled={disabled}
          >
            Apply & Launch Custom Customer Roleplay
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
