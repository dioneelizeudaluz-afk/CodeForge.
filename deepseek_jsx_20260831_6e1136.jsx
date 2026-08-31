import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

function CodeEditor({ content, onChange, onSave, filePath }) {
  const editorRef = useRef(null);

  const getLanguage = (path) => {
    if (!path) return 'plaintext';
    const ext = path.split('.').pop().toLowerCase();
    const map = {
      'html': 'html',
      'css': 'css',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'json': 'json',
      'md': 'markdown',
      'txt': 'plaintext'
    };
    return map[ext] || 'plaintext';
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave) onSave();
    });
    
    // Theme settings
    monaco.editor.defineTheme('codeforge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      }
    });
    monaco.editor.setTheme('codeforge-dark');
  };

  const handleChange = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div className="code-editor">
      <Editor
        height="100%"
        language={getLanguage(filePath)}
        value={content}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          suggest: { showKeywords: true },
          folding: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
          },
          renderWhitespace: 'selection',
          renderControlCharacters: false,
          contextmenu: true,
          quickSuggestions: true,
          parameterHints: { enabled: true },
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          multiCursorModifier: 'alt',
          accessibilitySupport: 'off',
        }}
      />
    </div>
  );
}

export default CodeEditor;