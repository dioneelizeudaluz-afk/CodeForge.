import { v4 as uuidv4 } from 'uuid';

class ProjectService {
  constructor() {
    this.projects = [];
    this.currentProject = null;
  }

  createProject(name, template = 'html') {
    const project = {
      id: uuidv4(),
      name: name || 'Untitled Project',
      template: template,
      files: this.getTemplateFiles(template),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.projects.push(project);
    return project;
  }

  getTemplateFiles(template) {
    const templates = {
      html: [
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
}`
        },
        {
          name: 'script.js',
          type: 'file',
          content: `// JavaScript
console.log('Projeto CodeForge carregado!');`
        }
      ],
      empty: []
    };
    
    return JSON.parse(JSON.stringify(templates[template] || templates.empty));
  }

  saveProject(project) {
    if (!project) return null;
    
    const updated = {
      ...project,
      updatedAt: Date.now()
    };
    
    const index = this.projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      this.projects[index] = updated;
    }
    
    if (this.currentProject?.id === project.id) {
      this.currentProject = updated;
    }
    
    return updated;
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    if (this.currentProject?.id === projectId) {
      this.currentProject = null;
    }
  }

  loadProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      this.currentProject = project;
      return project;
    }
    return null;
  }

  getProjects() {
    return this.projects;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  updateFileContent(projectId, filePath, content) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return false;
    
    const file = this.findFile(project.files, filePath);
    if (file) {
      file.content = content;
      project.updatedAt = Date.now();
      
      if (this.currentProject?.id === projectId) {
        this.currentProject = { ...project };
      }
      return true;
    }
    return false;
  }

  findFile(files, path) {
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
  }
}

export default new ProjectService();