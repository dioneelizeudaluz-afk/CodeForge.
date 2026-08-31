import React, { useState, useEffect } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import './SettingsPanel.css';

function SettingsPanel({ onClose }) {
  const [settings, setSettings] = useState({
    theme: 'dark',
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    autoSave: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('codeforge-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('codeforge-settings', JSON.stringify(newSettings));
    
    // Apply theme change
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value);
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <h3>Appearance</h3>
            
            <div className="setting-item">
              <label>Theme</label>
              <div className="setting-control">
                <button
                  className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'dark')}
                >
                  <Moon size={16} />
                  Dark
                </button>
                <button
                  className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'light')}
                >
                  <Sun size={16} />
                  Light
                </button>
              </div>
            </div>

            <div className="setting-item">
              <label>Font Size</label>
              <div className="setting-control">
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                />
                <span className="setting-value">{settings.fontSize}px</span>
              </div>
            </div>
          </div>

          <div className="setting-group">
            <h3>Editor</h3>
            
            <div className="setting-item">
              <label>Tab Size</label>
              <div className="setting-control">
                <select
                  value={settings.tabSize}
                  onChange={(e) => handleSettingChange('tabSize', parseInt(e.target.value))}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <label>Word Wrap</label>
              <div className="setting-control">
                <button
                  className={`toggle-btn ${settings.wordWrap ? 'active' : ''}`}
                  onClick={() => handleSettingChange('wordWrap', !settings.wordWrap)}
                >
                  {settings.wordWrap ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            <div className="setting-item">
              <label>Auto Save</label>
              <div className="setting-control">
                <button
                  className={`toggle-btn ${settings.autoSave ? 'active' : ''}`}
                  onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                >
                  {settings.autoSave ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;