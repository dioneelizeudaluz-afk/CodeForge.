import React, { useState, useEffect, useRef } from 'react';
import { Search, FilePlus, FolderPlus, Save, Play, Download, Settings, FolderOpen } from 'lucide-react';
import './CommandPalette.css';

function CommandPalette({ onClose, onCommand }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = [
    { id: 'new-project', label: 'New Project', icon: FolderOpen, shortcut: '' },
    { id: 'new-file', label: 'New File', icon: FilePlus, shortcut: '' },
    { id: 'new-folder', label: 'New Folder', icon: FolderPlus, shortcut: '' },
    { id: 'save', label: 'Save', icon: Save, shortcut: 'Ctrl+S' },
    { id: 'preview', label: 'Run Preview', icon: Play, shortcut: '' },
    { id: 'download', label: 'Download Project', icon: Download, shortcut: '' },
    { id: 'settings', label: 'Settings', icon: Settings, shortcut: '' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        onCommand(filteredCommands[selectedIndex].