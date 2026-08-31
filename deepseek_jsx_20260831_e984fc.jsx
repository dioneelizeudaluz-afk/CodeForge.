import React, { useState } from 'react';
import { 
  Menu, Save, Play, Download, Settings, 
  Command, FolderPlus, X 
} from 'lucide-react';
import './TopBar.css';

function TopBar({ 
  projectName, 
  onNewProject, 
  onSave, 
  onPreview, 
  onDownload, 
  onSettings,
  onToggleSidebar,
  onCommandPalette 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-btn" onClick={onToggleSidebar} title="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <div className="topbar-logo">
          <span className="logo-text">CODEFORGE</span>
          <span className="logo-bracket">&lt;/&gt;</span>
        </div>
        <span className="topbar-project">{projectName || 'No Project'}</span>
      </div>

      <div className="topbar-center desktop-only">
        <button className="topbar-btn" onClick={onNewProject} title="New Project">
          <FolderPlus size={18} />
          <span>New</span>
        </button>
        <button className="topbar-btn" onClick={onSave} title="Save (Ctrl+S)">
          <Save size={18} />
          <span>Save</span>
        </button>
        <button className="topbar-btn primary" onClick={onPreview} title="Run Preview">
          <Play size={18} />
          <span>Preview</span>
        </button>
        <button className="topbar-btn" onClick={onDownload} title="Download Project">
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>

      <div className="topbar-right">
        <button className="topbar-btn mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Command size={20} />
        </button>
        <button className="topbar-btn" onClick={onCommandPalette} title="Command Palette (Ctrl+P)">
          <Command size={20} />
        </button>
        <button className="topbar-btn" onClick={onSettings} title="Settings">
          <Settings size={20} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-item" onClick={() => { onNewProject(); setIsMobileMenuOpen(false); }}>
            <FolderPlus size={18} /> New Project
          </button>
          <button className="mobile-menu-item" onClick={() => { onSave(); setIsMobileMenuOpen(false); }}>
            <Save size={18} /> Save
          </button>
          <button className="mobile-menu-item" onClick={() => { onPreview(); setIsMobileMenuOpen(false); }}>
            <Play size={18} /> Preview
          </button>
          <button className="mobile-menu-item" onClick={() => { onDownload(); setIsMobileMenuOpen(false); }}>
            <Download size={18} /> Download
          </button>
          <button className="mobile-menu-item" onClick={() => { setIsMobileMenuOpen(false); }}>
            <X size={18} /> Close
          </button>
        </div>
      )}
    </header>
  );
}

export default TopBar;