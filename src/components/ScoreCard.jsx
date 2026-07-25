
/**
 * ScoreCard Modal Overlay displaying structural evaluation feedback
 * 
 * @param {Object} props - React props
 * @param {Object} props.scorecard - Scorecard data payload
 * @param {Function} props.onClose - Callback to close scorecard overlay
 */
const ScoreCard = ({ scorecard, onClose }) => {
  if (!scorecard) return null;

  const {
    overallScore = 0,
    objectionHandling = 0,
    valueProposition = 0,
    rapportAndTone = 0,
    closingSkills = 0,
    strengths = [],
    weaknesses = [],
    coachingFeedback = ""
  } = scorecard;

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="scorecard-overlay">
      <div className="scorecard-modal">
        <button className="close-modal-btn" onClick={onClose} aria-label="Close Evaluation Dashboard">
          ✕
        </button>
        
        <div className="scorecard-header-bar">
          <h2>📊 Pitch Evaluation Dashboard</h2>
          <p>Detailed performance analytics compiled by the AI coach</p>
        </div>

        <div className="modal-scroll-area">
          <div className="scorecard-summary-section">
            <div className="overall-score-gauge">
              <div className={`gauge-circle ${getScoreColorClass(overallScore)}`}>
                <span className="gauge-number">{overallScore}</span>
                <span className="gauge-label">Overall Performance Grade</span>
              </div>
            </div>
            
            <div className="subscores-column">
              <div className="subscore-item">
                <div className="subscore-lbl-row">
                  <span>Objection Handling</span>
                  <span className="subscore-val">{objectionHandling}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${getScoreColorClass(objectionHandling)}`} style={{ width: `${objectionHandling}%` }}></div>
                </div>
              </div>

              <div className="subscore-item">
                <div className="subscore-lbl-row">
                  <span>Value Communication</span>
                  <span className="subscore-val">{valueProposition}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${getScoreColorClass(valueProposition)}`} style={{ width: `${valueProposition}%` }}></div>
                </div>
              </div>

              <div className="subscore-item">
                <div className="subscore-lbl-row">
                  <span>Rapport & Active Listening</span>
                  <span className="subscore-val">{rapportAndTone}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${getScoreColorClass(rapportAndTone)}`} style={{ width: `${rapportAndTone}%` }}></div>
                </div>
              </div>

              <div className="subscore-item">
                <div className="subscore-lbl-row">
                  <span>Closing Capability</span>
                  <span className="subscore-val">{closingSkills}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${getScoreColorClass(closingSkills)}`} style={{ width: `${closingSkills}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="scorecard-details-section">
            <div className="feedback-column positive">
              <h3>👍 Key Strengths</h3>
              {strengths.length === 0 ? (
                <p className="no-bullets-msg">No structural strengths flagged.</p>
              ) : (
                <ul className="feedback-bullets">
                  {strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                </ul>
              )}
            </div>

            <div className="feedback-column constructive">
              <h3>⚠️ Areas of Opportunity</h3>
              {weaknesses.length === 0 ? (
                <p className="no-bullets-msg">No structural weaknesses flagged.</p>
              ) : (
                <ul className="feedback-bullets">
                  {weaknesses.map((weak, idx) => <li key={idx}>{weak}</li>)}
                </ul>
              )}
            </div>
          </div>

          <div className="coaching-feedback-card">
            <h3>💡 Sales Coach Actionable Recommendations</h3>
            <p>{coachingFeedback}</p>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button type="button" className="close-dashboard-btn" onClick={onClose}>
            Back to Sales Pitch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
