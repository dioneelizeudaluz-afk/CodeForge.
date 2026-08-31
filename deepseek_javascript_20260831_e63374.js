export const APP_NAME = 'CodeForge';
export const APP_VERSION = '1.0.0';

export const FILE_ICONS = {
  html: '📄',
  css: '🎨',
  js: '⚡',
  json: '📊',
  md: '📝',
  txt: '📃',
  default: '📄'
};

export const LANGUAGE_EXTENSIONS = {
  html: ['html', 'htm'],
  css: ['css', 'scss', 'sass', 'less'],
  javascript: ['js', 'jsx', 'mjs'],
  typescript: ['ts', 'tsx'],
  json: ['json'],
  markdown: ['md', 'markdown'],
  python: ['py'],
  java: ['java'],
  c: ['c', 'h'],
  cpp: ['cpp', 'cxx', 'hpp'],
  go: ['go'],
  ruby: ['rb'],
  php: ['php'],
  sql: ['sql'],
  xml: ['xml'],
  yaml: ['yaml', 'yml']
};

export const STORAGE_KEYS = {
  PROJECTS: 'codeforge-projects',
  SETTINGS: 'codeforge-settings',
  THEME: 'codeforge-theme',
  LAST_PROJECT: 'codeforge-last-project'
};

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  autoSave: false,
  minimap: false,
  lineNumbers: true
};

export const KEYBOARD_SHORTCUTS = {
  SAVE: { key: 's', ctrl: true },
  COMMAND_PALETTE: { key: 'p', ctrl: true },
  SEARCH: { key: 'f', ctrl: true },
  UNDO: { key: 'z', ctrl: true },
  REDO: { key: 'z', ctrl: true, shift: true },
  NEW_FILE: { key: 'n', ctrl: true },
  NEW_PROJECT: { key: 'n', ctrl: true, shift: true }
};