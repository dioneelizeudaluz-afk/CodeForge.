import React, { useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import './ConsolePanel.css';

function ConsolePanel({ consoleOutput, onClear, onClose }) {
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const getLogLevel = (entry) => {
    if (entry.type === 'error' || entry.type === 'warn') {
      return entry.type;
    }
    return 'log';
  };

  return (
    <div className="console-panel">
      <div className="console-header">
        <span>Console</span>
        <div className="console-actions">
          <button onClick={onClear} title="Clear Console">
            <Trash2 size={14} />
          </button>
          <button onClick={onClose} title="Close Console">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="console-content" ref={consoleRef}>
        {consoleOutput.length === 0 ? (
          <div className="console-empty">No console output</div>
        ) : (
          consoleOutput.map((entry, index) => (
            <div key={index} className={`console-entry ${getLogLevel(entry)}`}>
              <span className="console-timestamp">
                [{new Date(entry.timestamp).toLocaleTimeString()}]
              </span>
              <span className="console-message">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConsolePanel;