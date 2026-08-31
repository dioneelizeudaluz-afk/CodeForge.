import React from 'react';
import { FolderPlus, Upload } from 'lucide-react';
import './WelcomeScreen.css';

function WelcomeScreen({ onCreateProject, onImportProject }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-logo">
          <span className="welcome-logo-text">CODEFORGE</span>
          <span className="welcome-logo-bracket">&lt;/&gt;</span>
        </div>
        <h1>Welcome to CodeForge</h1>
        <p>Your professional web-based development environment</p>
        
        <div className="welcome-actions">
          <button className="welcome-btn primary" onClick={onCreateProject}>
            <FolderPlus size={20} />
            Create New Project
          </button>
          <button className="welcome-btn" onClick={onImportProject}>
            <Upload size={20} />
            Import Project
          </button>
        </div>
        
        <div className="welcome-features">
          <div className="feature-item">
            <span>📝</span>
            <span>Write Code</span>
          </div>
          <div className="feature-item">
            <span>👁️</span>
            <span>Preview Live</span>
          </div>
          <div className="feature-item">
            <span>📦</span>
            <span>Download Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;