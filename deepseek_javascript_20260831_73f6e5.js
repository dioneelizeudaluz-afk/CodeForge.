import { getLanguageFromExtension } from '../utils/fileSystem';

class EditorService {
  constructor() {
    this.editor = null;
    this.monaco = null;
    this.currentFile = null;
    this.settings = {
      fontSize: 14,
      tabSize: 2,
      wordWrap: true,
      minimap: false,
      lineNumbers: true,
      theme: 'vs-dark'
    };
  }

  initialize(editor, monaco) {
    this.editor = editor;
    this.monaco = monaco;
    this.applySettings();
    this.setupTheme();
  }

  applySettings() {
    if (!this.editor) return;
    
    this.editor.updateOptions({
      fontSize: this.settings.fontSize,
      tabSize: this.settings.tabSize,
      wordWrap: this.settings.wordWrap ? 'on' : 'off',
      minimap: { enabled: this.settings.minimap },
      lineNumbers: this.settings.lineNumbers ? 'on' : 'off'
    });
  }

  setupTheme() {
    if (!this.monaco) return;
    
    this.monaco.editor.defineTheme('codeforge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41'
      }
    });
    
    this.monaco.editor.defineTheme('codeforge-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#f0f0f0',
        'editor.selectionBackground': '#add6ff',
        'editor.inactiveSelectionBackground': '#e5ebf1'
      }
    });
    
    this.monaco.editor.setTheme(this.settings.theme === 'light' ? 'codeforge-light' : 'codeforge-dark');
  }

  setFileContent(content, filePath) {
    if (!this.editor) return;
    
    this.currentFile = filePath;
    const language = getLanguageFromExtension(filePath?.split('.').pop() || '');
    this.editor.setValue(content || '');
    
    if (language) {
      this.monaco.editor.setModelLanguage(this.editor.getModel(), language);
    }
  }

  getFileContent() {
    return this.editor?.getValue() || '';
  }

  setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    this.applySettings();
    
    if (settings.theme) {
      this.setupTheme();
    }
  }

  getSettings() {
    return { ...this.settings };
  }

  setFontSize(size) {
    this.settings.fontSize = size;
    this.applySettings();
  }

  setTabSize(size) {
    this.settings.tabSize = size;
    this.applySettings();
  }

  setWordWrap(enabled) {
    this.settings.wordWrap = enabled;
    this.applySettings();
  }

  toggleMinimap() {
    this.settings.minimap = !this.settings.minimap;
    this.applySettings();
  }

  focus() {
    this.editor?.focus();
  }

  getSelection() {
    return this.editor?.getSelection() || null;
  }

  getSelectedText() {
    const selection = this.getSelection();
    if (selection && this.editor) {
      return this.editor.getModel()?.getValueInRange(selection) || '';
    }
    return '';
  }
}

export default new EditorService();