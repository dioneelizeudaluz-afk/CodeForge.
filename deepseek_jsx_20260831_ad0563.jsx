import React, { useState } from 'react';
import { X, FolderPlus, Upload, Trash2, FolderOpen } from 'lucide-react';
import './ProjectManager.css';

function ProjectManager({ 
  onClose, 
  onProjectCreate, 
  onProjectImport,
  projects = [],
  onProjectDelete,
  onProjectLoad 
}) {
  const [projectName, setProjectName] = useState('');
  const [template, setTemplate] = useState('html');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!projectName.trim()) return;
    onProjectCreate(projectName, template);
    setProjectName('');
    setIsCreating(false);
  };

  return (
    <div className="project-manager-overlay" onClick={onClose}>
      <div className="project-manager" onClick={(e) => e.stopPropagation()}>
        <div className="project-manager-header">
          <h2>Project Manager</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="project-manager-content">
          {!isCreating ? (
            <>
              <div className="project-actions">
                <button className="action-btn primary" onClick={() => setIsCreating(true)}>
                  <FolderPlus size={18} />
                  New Project
                </button>
                <button className="action-btn" onClick={onProjectImport}>
                  <Upload size={18} />
                  Import Project
                </button>
              </div>

              {projects.length > 0 ? (
                <div className="project-list">
                  <h3>Your Projects</h3>
                  {projects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-info" onClick={() => onProjectLoad(project.id)}>
                        <FolderOpen size={18} />
                        <span>{project.name}</span>
                        <span className="project-date">
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        className="project-delete"
                        onClick={() => {
                          if (confirm(`Delete project "${project.name}"?`)) {
                            onProjectDelete(project.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="project-empty">
                  <p>No projects yet</p>
                  <p className="project-empty-sub">Create your first project to get started</p>
                </div>
              )}
            </>
          ) : (
            <div className="project-create">
              <h3>Create New Project</h3>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Template</label>
                <select value={template} onChange={(e) => setTemplate(e.target.value)}>
                  <option value="html">HTML/CSS/JS</option>
                  <option value="empty">Empty Project</option>
                </select>
              </div>
              <div className="project-create-actions">
                <button className="action-btn secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </button>
                <button className="action-btn primary" onClick={handleCreate}>
                  Create Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectManager;