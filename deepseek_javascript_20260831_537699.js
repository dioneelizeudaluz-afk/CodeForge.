import { useCallback } from 'react';

const STORAGE_KEY = 'codeforge-projects';

export default function useStorage() {
  const loadProjects = useCallback(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Error loading projects from storage:', error);
    }
    return [];
  }, []);

  const saveProjects = useCallback((projects) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to storage:', error);
    }
  }, []);

  const loadSettings = useCallback(() => {
    try {
      const data = localStorage.getItem('codeforge-settings');
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    return null;
  }, []);

  const saveSettings = useCallback((settings) => {
    try {
      localStorage.setItem('codeforge-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, []);

  return {
    loadProjects,
    saveProjects,
    loadSettings,
    saveSettings
  };
}