class StorageService {
  constructor() {
    this.storage = localStorage;
  }

  save(key, data) {
    try {
      this.storage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      return false;
    }
  }

  load(key, defaultValue = null) {
    try {
      const data = this.storage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
    }
    return defaultValue;
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  }

  saveProjects(projects) {
    return this.save('codeforge-projects', projects);
  }

  loadProjects() {
    return this.load('codeforge-projects', []);
  }

  saveSettings(settings) {
    return this.save('codeforge-settings', settings);
  }

  loadSettings() {
    return this.load('codeforge-settings', null);
  }

  saveTheme(theme) {
    return this.save('codeforge-theme', theme);
  }

  loadTheme() {
    return this.load('codeforge-theme', 'dark');
  }

  saveLastProject(projectId) {
    return this.save('codeforge-last-project', projectId);
  }

  loadLastProject() {
    return this.load('codeforge-last-project', null);
  }

  clearAll() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
}

export default new StorageService();