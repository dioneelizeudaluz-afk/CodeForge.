import React, { useState, useEffect, useCallback } from 'react';
import TopBar from './components/Layout/TopBar';
import Sidebar from './components/Layout/Sidebar';
import CodeEditor from './components/Editor/CodeEditor';
import PreviewPanel from './components/Preview/PreviewPanel';
import WelcomeScreen from './components/Project/WelcomeScreen';
import ProjectManager from './components/Project/ProjectManager';
import SettingsPanel from './components/Settings/SettingsPanel';
import CommandPalette from './components/Layout/CommandPalette';
import useProject from './hooks/useProject';
import useStorage from './hooks/useStorage';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  
  const { projects, currentProject, setCurrentProject, createProject, saveProject, deleteProject, loadProject } = useProject();
  const { loadProjects, saveProjects } = useStorage();

  // Load projects on mount
  useEffect(() => {
    const savedProjects = loadProjects();
    if (savedProjects && savedProjects.length > 0) {
      // Load first project automatically
      setCurrentProject(savedProjects[0]);
    }
  }, []);

  // Save projects when they change
  useEffect(() => {
    if (projects.length > 0) {
      saveProjects(projects);
    }
  }, [projects]);

  // Handle file selection
  const handleFileSelect = useCallback((filePath) => {
    if (!currentProject) return;
    
    const file = findFile(currentProject.files, filePath);
    if (file) {
      setSelectedFile(filePath);
      setEditorContent(file.content || '');
      
      // Add to tabs if not already open
      if (!openTabs.includes(filePath)) {
        setOpenTabs([...openTabs, filePath]);
      }
      setActiveTab(filePath);
    }
  }, [currentProject, openTabs]);

  // Find file in project
  const findFile = (files, path) => {
    const parts = path.split('/');
    let current = files;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        return current.find(f => f.name === part && f.type === 'file');
      } else {
        const folder = current.find(f => f.name === part && f.type === 'folder');
        if (!folder) return null;
        current = folder.children || [];
      }
    }
    return null;
  };

  // Handle file save
  const handleSaveFile = useCallback(() => {
    if (!currentProject || !selectedFile) return;
    
    const updatedProject = { ...currentProject };
    const file = findFile(updatedProject.files, selectedFile);
    if (file) {
      file.content = editorContent;
      setCurrentProject(updatedProject);
    }
  }, [currentProject, selectedFile, editorContent]);

  // Handle tab close
  const handleTabClose = useCallback((tabPath) => {
    const newTabs = openTabs.filter(t => t !== tabPath);
    setOpenTabs(newTabs);
    
    if (activeTab === tabPath) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1]);
        const file = findFile(currentProject?.files, newTabs[newTabs.length - 1]);
        if (file) {
          setSelectedFile(newTabs[newTabs.length - 1]);
          setEditorContent(file.content || '');
        }
      } else {
        setActiveTab(null);
        setSelectedFile(null);
        setEditorContent('');
      }
    }
  }, [openTabs, activeTab, currentProject]);

  // Handle project creation
  const handleCreateProject = useCallback((projectName, template) => {
    const newProject = createProject(projectName, template);
    setCurrentProject(newProject);
    setIsProjectManagerOpen(false);
    
    // Open initial files
    const initialFiles = ['index.html', 'style.css', 'script.js'];
    const newTabs = [];
    initialFiles.forEach(fileName => {
      const file = findFile(newProject.files, fileName);
      if (file) {
        newTabs.push(fileName);
      }
    });
    setOpenTabs(newTabs);
    if (newTabs.length > 0) {
      setActiveTab(newTabs[0]);
      setSelectedFile(newTabs[0]);
      const file = findFile(newProject.files, newTabs[0]);
      if (file) {
        setEditorContent(file.content || '');
      }
    }
  }, [createProject]);

  // Handle preview
  const handlePreview = useCallback(() => {
    if (!currentProject) return;
    
    const htmlFile = findFile(currentProject.files, 'index.html');
    const cssFile = findFile(currentProject.files, 'style.css');
    const jsFile = findFile(currentProject.files, 'script.js');
    
    let htmlContent = htmlFile?.content || '';
    const cssContent = cssFile?.content || '';
    const jsContent = jsFile?.content || '';
    
    // Inject CSS and JS into HTML
    if (cssContent) {
      const styleTag = `<style>${cssContent}</style>`;
      htmlContent = htmlContent.replace('</head>', `${styleTag}</head>`);
    }
    if (jsContent) {
      const scriptTag = `<script>${jsContent}</script>`;
      htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
    }
    
    setPreviewContent(htmlContent);
    setIsPreviewOpen(true);
  }, [currentProject]);

  // Handle download
  const handleDownload = useCallback(async () => {
    if (!currentProject) return;
    // Will be implemented with zipUtils
    console.log('Download project:', currentProject.name);
  }, [currentProject]);

  // Handle import
  const handleImport = useCallback((file) => {
    console.log('Import project:', file);
  }, []);

  // Handle command palette
  const handleCommand = useCallback((command) => {
    switch (command) {
      case 'new-project':
        setIsProjectManagerOpen(true);
        break;
      case 'new-file':
        // Will be implemented
        break;
      case 'new-folder':
        // Will be implemented
        break;
      case 'save':
        handleSaveFile();
        break;
      case 'preview':
        handlePreview();
        break;
      case 'download':
        handleDownload();
        break;
      case 'settings':
        setIsSettingsOpen(!isSettingsOpen);
        break;
      case 'search':
        // Will be implemented
        break;
      default:
        break;
    }
    setIsCommandPaletteOpen(false);
  }, [handleSaveFile, handlePreview, handleDownload]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveFile();
      }
      // Ctrl+P
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      // Ctrl+Shift+P
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      // Escape
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsSettingsOpen(false);
        setIsProjectManagerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveFile]);

  // Render welcome screen if no project
  if (!currentProject) {
    return (
      <div className="app">
        <WelcomeScreen 
          onCreateProject={() => setIsProjectManagerOpen(true)}
          onImportProject={() => {}}
        />
        {isProjectManagerOpen && (
          <ProjectManager
            onClose={() => setIsProjectManagerOpen(false)}
            onProjectCreate={handleCreateProject}
            onProjectImport={handleImport}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <TopBar
        projectName={currentProject.name}
        onNewProject={() => setIsProjectManagerOpen(true)}
        onSave={handleSaveFile}
        onPreview={handlePreview}
        onDownload={handleDownload}
        onSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onCommandPalette={() => setIsCommandPaletteOpen(true)}
      />
      
      <div className="app-main">
        <Sidebar
          isOpen={isSidebarOpen}
          files={currentProject.files}
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
        />
        
        <div className="app-content">
          <div className="editor-container">
            <Tabs
              tabs={openTabs}
              activeTab={activeTab}
              onTabSelect={(tab) => {
                setActiveTab(tab);
                setSelectedFile(tab);
                const file = findFile(currentProject.files, tab);
                if (file) {
                  setEditorContent(file.content || '');
                }
              }}
              onTabClose={handleTabClose}
            />
            <CodeEditor
              content={editorContent}
              onChange={setEditorContent}
              onSave={handleSaveFile}
              filePath={selectedFile}
            />
          </div>
          
          {isPreviewOpen && (
            <PreviewPanel
              content={previewContent}
              consoleOutput={consoleOutput}
              onClose={() => setIsPreviewOpen(false)}
              onConsoleClear={() => setConsoleOutput([])}
            />
          )}
        </div>
      </div>
      
      {isCommandPaletteOpen && (
        <CommandPalette
          onClose={() => setIsCommandPaletteOpen(false)}
          onCommand={handleCommand}
        />
      )}
      
      {isSettingsOpen && (
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
      )}
      
      {isProjectManagerOpen && (
        <ProjectManager
          onClose={() => setIsProjectManagerOpen(false)}
          onProjectCreate={handleCreateProject}
          onProjectImport={handleImport}
          projects={projects}
          onProjectDelete={deleteProject}
          onProjectLoad={loadProject}
        />
      )}
    </div>
  );
}

export default App;