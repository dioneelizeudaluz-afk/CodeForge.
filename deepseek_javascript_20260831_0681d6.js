import { useState, useCallback } from 'react';

export default function useEditor() {
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    minimap: false,
    lineNumbers: true,
    theme: 'vs-dark'
  });

  const updateSetting = useCallback((key, value) => {
    setEditorSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const getEditorOptions = useCallback(() => {
    return {
      fontSize: editorSettings.fontSize,
      tabSize: editorSettings.tabSize,
      wordWrap: editorSettings.wordWrap ? 'on' : 'off',
      minimap: { enabled: editorSettings.minimap },
      lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
      theme: editorSettings.theme
    };
  }, [editorSettings]);

  return {
    editorSettings,
    updateSetting,
    getEditorOptions
  };
}