import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const generateZipFromProject = async (project) => {
  if (!project) throw new Error('No project provided');
  
  const zip = new JSZip();
  
  const addFilesToZip = (files, basePath = '') => {
    files.forEach(item => {
      const path = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.type === 'folder') {
        addFilesToZip(item.children || [], path);
      } else {
        zip.file(path, item.content || '');
      }
    });
  };
  
  addFilesToZip(project.files);
  
  return await zip.generateAsync({ type: 'blob' });
};

export const downloadProjectAsZip = async (project) => {
  try {
    const blob = await generateZipFromProject(project);
    const filename = `${project.name || 'project'}.zip`;
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('Error downloading project:', error);
    return false;
  }
};

export const importProjectFromZip = async (file) => {
  try {
    const zip = await JSZip.loadAsync(file);
    const files = [];
    
    const processEntry = async (entry, path = '') => {
      const item = {
        name: entry.name,
        type: entry.dir ? 'folder' : 'file'
      };
      
      if (entry.dir) {
        item.children = [];
        const folderPath = path ? `${path}/${entry.name}` : entry.name;
        const entries = Object.values(zip.folder(entry.name)?.files || {});
        // Process folder contents
        // This is simplified - full implementation would need recursive processing
      } else {
        const content = await entry.async('string');
        item.content = content;
      }
      
      return item;
    };
    
    // For simplicity, we'll just get all file paths
    const filePaths = Object.keys(zip.files)
      .filter(path => !zip.files[path].dir);
    
    for (const path of filePaths) {
      const entry = zip.files[path];
      const content = await entry.async('string');
      const pathParts = path.split('/');
      const filename = pathParts.pop();
      
      // Build file structure
      let current = files;
      for (const part of pathParts) {
        let folder = current.find(f => f.name === part && f.type === 'folder');
        if (!folder) {
          folder = { name: part, type: 'folder', children: [] };
          current.push(folder);
        }
        current = folder.children;
      }
      
      current.push({
        name: filename,
        type: 'file',
        content: content
      });
    }
    
    return files;
  } catch (error) {
    console.error('Error importing project:', error);
    throw new Error('Failed to import project from ZIP');
  }
};