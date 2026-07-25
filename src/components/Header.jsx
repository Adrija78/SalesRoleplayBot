
/**
 * Top branding header displaying platform state and agent model details
 * 
 * @param {Object} props - React props
 * @param {string} props.serverStatus - "online" | "offline" | "checking"
 */
const Header = ({ serverStatus = 'checking' }) => {
  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo-icon-container">
          <span className="logo-icon">🎯</span>
          <span className="logo-pulse"></span>
        </div>
        <div className="logo-text">
          <h1>Sales Crucible</h1>
          <p>AI-Powered Buyer Objection Training Arena</p>
        </div>
      </div>
      
      <div className="status-indicators">
        <span className="engine-tag">Configurable AI Engine</span>
        <div className={`status-badge ${serverStatus}`}>
          <span className="status-dot"></span>
          <span className="status-label">
            {serverStatus === 'online' ? 'System Online' : serverStatus === 'checking' ? 'Connecting...' : 'Offline Mode'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
