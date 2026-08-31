import React, { useState } from 'react';
import { Folder, File, ChevronDown, ChevronRight, Plus, FolderPlus } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen, files, onFileSelect, selectedFile }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items, path = '') => {
    return items.map((item, index) => {
      const currentPath = path ? `${path}/${item.name}` : item.name;
      
      if (item.type === 'folder') {
        const isExpanded = expandedFolders.has(currentPath);
        const hasChildren = item.children && item.children.length > 0;
        
        return (
          <div key={currentPath} className="tree-item">
            <div 
              className="tree-folder" 
              onClick={() => toggleFolder(currentPath)}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} />
              <span>{item.name}</span>
              <span className="tree-item-count">{item.children?.length || 0}</span>
            </div>
            {isExpanded && hasChildren && (
              <div className="tree-children">
                {renderFileTree(item.children, currentPath)}
              </div>
            )}
          </div>
        );
      } else {
        const isSelected = selectedFile === currentPath;
        return (
          <div 
            key={currentPath} 
            className={`tree-file ${isSelected ? 'selected' : ''}`}
            onClick={() => onFileSelect(currentPath)}
          >
            <File size={16} />
            <span>{item.name}</span>
          </div>
        );
      }
    });
  };

  const filteredFiles = files ? filterFiles(files, searchTerm) : [];

  function filterFiles(items, term) {
    if (!term) return items;
    const lowerTerm = term.toLowerCase();
    const result = [];
    
    items.forEach(item => {
      if (item.type === 'folder') {
        const filteredChildren = filterFiles(item.children || [], term);
        if (filteredChildren.length > 0 || item.name.toLowerCase().includes(lowerTerm)) {
          result.push({ ...item, children: filteredChildren });
        }
      } else if (item.name.toLowerCase().includes(lowerTerm)) {
        result.push(item);
      }
    });
    
    return result;
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h3>Explorer</h3>
        <div className="sidebar-actions">
          <button className="sidebar-action-btn" title="New File">
            <Plus size={16} />
          </button>
          <button className="sidebar-action-btn" title="New Folder">
            <FolderPlus size={16} />
          </button>
        </div>
      </div>
      
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="sidebar-content">
        {files && files.length > 0 ? (
          renderFileTree(filteredFiles)
        ) : (
          <div className="sidebar-empty">
            <p>No files yet</p>
            <button className="sidebar-empty-btn">Create a file</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;