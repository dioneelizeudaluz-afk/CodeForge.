import React from 'react';
import { X } from 'lucide-react';
import './Tabs.css';

function Tabs({ tabs, activeTab, onTabSelect, onTabClose }) {
  if (!tabs || tabs.length === 0) {
    return (
      <div className="tabs-container">
        <div className="tabs-empty">No files open</div>
      </div>
    );
  }

  return (
    <div className="tabs-container">
      <div className="tabs-scroll">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabSelect(tab)}
          >
            <span className="tab-name">{tab.split('/').pop()}</span>
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab);
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;