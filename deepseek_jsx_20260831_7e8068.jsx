import React, { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2, RefreshCw, Terminal } from 'lucide-react';
import ConsolePanel from './ConsolePanel';
import './PreviewPanel.css';

function PreviewPanel({ content, consoleOutput, onClose, onConsoleClear }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
    }
  }, [content]);

  const handleRefresh = () => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`preview-panel ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="preview-header">
        <div className="preview-title">
          <span>Preview</span>
        </div>
        <div className="preview-actions">
          <button onClick={() => setShowConsole(!showConsole)} title="Toggle Console">
            <Terminal size={16} />
          </button>
          <button onClick={handleRefresh} title="Refresh Preview">
            <RefreshCw size={16} />
          </button>
          <button onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={onClose} title="Close Preview">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="preview-content">
        <div className="preview-iframe-container">
          <iframe
            ref={iframeRef}
            className="preview-iframe"
            sandbox="allow-scripts allow-modals allow-same-origin"
            title="Preview"
          />
        </div>

        {showConsole && (
          <ConsolePanel
            consoleOutput={consoleOutput}
            onClear={onConsoleClear}
            onClose={() => setShowConsole(false)}
          />
        )}
      </div>
    </div>
  );
}

export default PreviewPanel;