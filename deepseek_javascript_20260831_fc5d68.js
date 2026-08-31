export const findFile = (files, path) => {
  if (!files || !path) return null;
  
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

export const findFolder = (files, path) => {
  if (!files || !path) return null;
  
  const parts = path.split('/');
  let current = files;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      return current.find(f => f.name === part && f.type === 'folder');
    } else {
      const folder = current.find(f => f.name === part && f.type === 'folder');
      if (!folder) return null;
      current = folder.children || [];
    }
  }
  return null;
};

export const createFile = (name, content = '') => {
  return {
    name,
    type: 'file',
    content
  };
};

export const createFolder = (name) => {
  return {
    name,
    type: 'folder',
    children: []
  };
};

export const deleteFileOrFolder = (files, path) => {
  if (!files || !path) return null;
  
  const parts = path.split('/');
  let current = files;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      const index = current.findIndex(f => f.name === part);
      if (index !== -1) {
        current.splice(index, 1);
        return true;
      }
    } else {
      const folder = current.find(f => f.name === part && f.type === 'folder');
      if (!folder) return false;
      current = folder.children || [];
    }
  }
  return false;
};

export const renameFileOrFolder = (files, path, newName) => {
  if (!files || !path || !newName) return null;
  
  const parts = path.split('/');
  let current = files;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      const item = current.find(f => f.name === part);
      if (item) {
        item.name = newName;
        return true;
      }
    } else {
      const folder = current.find(f => f.name === part && f.type === 'folder');
      if (!folder) return false;
      current = folder.children || [];
    }
  }
  return false;
};

export const getFileExtension = (filename) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

export const getLanguageFromExtension = (extension) => {
  const map = {
    'html': 'html',
    'css': 'css',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'json': 'json',
    'md': 'markdown',
    'txt': 'plaintext',
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'go': 'go',
    'rb': 'ruby',
    'php': 'php',
    'sql': 'sql',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml'
  };
  return map[extension] || 'plaintext';
};