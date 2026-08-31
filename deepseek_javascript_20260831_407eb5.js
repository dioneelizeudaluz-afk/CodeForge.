import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultTemplates = {
  html: {
    files: [
      {
        name: 'index.html',
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bem-vindo ao CodeForge!</h1>
    <p>Comece a editar seu código aqui.</p>
    <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'style.css',
        type: 'file',
        content: `/* Estilos CSS */
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1e1e1e;
    color: #d4d4d4;
}

h1 {
    color: #0078d4;
}

p {
    color: #cccccc;
}`
      },
      {
        name: 'script.js',
        type: 'file',
        content: `// JavaScript
console.log('Projeto CodeForge carregado!');

// Exemplo de funcionalidade
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
});`
      }
    ]
  },
  empty: {
    files: []
  }
};

export default function useProject() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  const createProject = useCallback((name, template = 'html') => {
    const newProject = {
      id: uuidv4(),
      name: name || 'Untitled Project',
      template: template,
      files: JSON.parse(JSON.stringify(defaultTemplates[template]?.files || [])),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  const saveProject = useCallback((project) => {
    if (!project) return null;
    
    const updatedProject = {
      ...project,
      updatedAt: Date.now()
    };

    setProjects(prev => prev.map(p => 
      p.id === project.id ? updatedProject : p
    ));
    
    return updatedProject;
  }, []);

  const deleteProject = useCallback((projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  }, [currentProject]);

  const loadProject = useCallback((projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      return project;
    }
    return null;
  }, [projects]);

  const updateProjectFiles = useCallback((projectId, files) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updated = {
          ...p,
          files: files,
          updatedAt: Date.now()
        };
        if (currentProject?.id === projectId) {
          setCurrentProject(updated);
        }
        return updated;
      }
      return p;
    }));
  }, [currentProject]);

  return {
    projects,
    currentProject,
    setCurrentProject,
    createProject,
    saveProject,
    deleteProject,
    loadProject,
    updateProjectFiles
  };
}