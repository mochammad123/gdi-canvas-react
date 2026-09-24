import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LabelElement, LabelTemplate, ElementType, TagItem } from '../types';
import { BASE_SCALE, DEFAULT_TEMPLATE, AVAILABLE_TAGS, STORAGE_KEY_TEMPLATE, STORAGE_KEY_TAGS } from '../constants';
import { useLabelHistory } from './use-label-history';
import { downloadTemplateJson, parseTemplateJson } from '../utils';

export const useLabelDesigner = () => {
  const [template, setTemplate] = useState<LabelTemplate>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TEMPLATE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_TEMPLATE;
      }
    }
    return DEFAULT_TEMPLATE;
  });

  const { canUndo, canRedo, recordHistory: recordToHistory, undo: undoHistory, redo: redoHistory, setHistory, setFuture } = useLabelHistory();

  const [tags, setTags] = useState<TagItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TAGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return AVAILABLE_TAGS;
      }
    }
    return AVAILABLE_TAGS;
  });

  const [newTagInput, setNewTagInput] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('el_3');
  const [zoom, setZoom] = useState<number>(1.5); // Default 150% zoom
  const [snapGrid, setSnapGrid] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartTemplateRef = useRef<LabelTemplate>(template);

  // Auto-save template & custom tags to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, JSON.stringify(template));
  }, [template]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(tags));
  }, [tags]);

  const recordCurrentState = useCallback(() => {
    recordToHistory(template);
  }, [recordToHistory, template]);

  // Undo & Redo Handlers
  const handleUndo = useCallback(() => {
    const previous = undoHistory(template);
    if (previous) {
      setTemplate(previous);
    }
  }, [undoHistory, template]);

  const handleRedo = useCallback(() => {
    const next = redoHistory(template);
    if (next) {
      setTemplate(next);
    }
  }, [redoHistory, template]);

  const scale = BASE_SCALE * zoom;
  const canvasWidthPx = template.width_mm * scale;
  const canvasHeightPx = template.height_mm * scale;

  const selectedElement = template.elements.find((el) => el.id === selectedId) || null;

  // Update specific property of selected element
  const updateSelectedElement = useCallback(
    (updates: Partial<LabelElement>) => {
      if (!selectedId) return;
      recordCurrentState();
      setTemplate((prev) => ({
        ...prev,
        elements: prev.elements.map((el) => (el.id === selectedId ? { ...el, ...updates } : el)),
      }));
    },
    [selectedId, recordCurrentState]
  );

  // Update template dimensions (width / height in mm)
  const updateTemplateDimensions = useCallback((updates: Partial<{ width_mm: number; height_mm: number }>) => {
    setTemplate((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Add new element
  const handleAddElement = useCallback(
    (type: ElementType, customText?: string) => {
      recordCurrentState();
      const newId = `el_${Date.now()}`;
      let newElement: LabelElement;

      if (type === 'barcode') {
        newElement = {
          id: newId,
          type: 'barcode',
          x: 5.0,
          y: 10.0,
          width: 35.0,
          height: 8.0,
          text: customText || '{{NoRoll}}',
        };
      } else if (type === 'line') {
        newElement = {
          id: newId,
          type: 'line',
          x: 0,
          y: 25.0,
          width: template.width_mm - 4,
          dashed: false,
        };
      } else if (type === 'image') {
        newElement = {
          id: newId,
          type: 'image',
          x: 5.0,
          y: 5.0,
          width: 15.0,
          height: 15.0,
          src: customText || '',
        };
      } else {
        newElement = {
          id: newId,
          type: 'text',
          x: 5.0,
          y: 5.0,
          text: customText || 'Teks Baru',
          fontSize: 10,
          bold: true,
        };
      }

      setTemplate((prev) => ({
        ...prev,
        elements: [...prev.elements, newElement],
      }));
      setSelectedId(newId);
    },
    [recordCurrentState, template.width_mm]
  );

  // Add custom variable tag
  const handleAddCustomTag = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cleanName = newTagInput.trim().replace(/[{}]/g, '');
      if (!cleanName) return;

      const formattedTag = `{{${cleanName}}}`;
      if (tags.some((t) => t.tag.toLowerCase() === formattedTag.toLowerCase())) {
        alert(`Tag ${formattedTag} sudah ada di daftar.`);
        return;
      }

      const newTag: TagItem = {
        label: cleanName,
        tag: formattedTag,
        isCustom: true,
      };

      setTags((prev) => [...prev, newTag]);
      setNewTagInput('');
      handleAddElement('text', formattedTag);
    },
    [newTagInput, tags, handleAddElement]
  );

  // Delete custom tag
  const handleDeleteCustomTag = useCallback((tagToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTags((prev) => prev.filter((t) => t.tag !== tagToDelete));
  }, []);

  // Delete selected element
  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    recordCurrentState();
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== selectedId),
    }));
    setSelectedId(null);
  }, [selectedId, recordCurrentState]);

  // Keyboard shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo), Delete / Backspace (Hapus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      const isEditingInput = tag === 'input' || tag === 'textarea';

      // Ctrl + Z -> Undo
      if (isCtrlOrMeta && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else if (!isEditingInput) {
          e.preventDefault();
          handleUndo();
        }
      }
      // Ctrl + Y -> Redo
      else if (isCtrlOrMeta && e.key.toLowerCase() === 'y') {
        if (!isEditingInput) {
          e.preventDefault();
          handleRedo();
        }
      }
      // Delete / Backspace -> Hapus Elemen
      else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        if (!isEditingInput) {
          e.preventDefault();
          handleDeleteSelected();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedId, handleDeleteSelected]);

  // Pointer / Drag logic on canvas
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, element: LabelElement) => {
      e.stopPropagation();
      setSelectedId(element.id);
      isDraggingRef.current = false;
      dragStartTemplateRef.current = template;

      const startX = e.clientX;
      const startY = e.clientY;
      const initialElX = element.x;
      const initialElY = element.y;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const deltaPxX = moveEvent.clientX - startX;
        const deltaPxY = moveEvent.clientY - startY;

        if (Math.abs(deltaPxX) > 2 || Math.abs(deltaPxY) > 2) {
          isDraggingRef.current = true;
        }

        let newMmX = initialElX + deltaPxX / scale;
        let newMmY = initialElY + deltaPxY / scale;

        if (snapGrid) {
          newMmX = Math.round(newMmX * 2) / 2;
          newMmY = Math.round(newMmY * 2) / 2;
        } else {
          newMmX = Math.round(newMmX * 10) / 10;
          newMmY = Math.round(newMmY * 10) / 10;
        }

        newMmX = Math.max(0, Math.min(template.width_mm - 2, newMmX));
        newMmY = Math.max(0, Math.min(template.height_mm - 2, newMmY));

        setTemplate((prev) => ({
          ...prev,
          elements: prev.elements.map((el) => (el.id === element.id ? { ...el, x: newMmX, y: newMmY } : el)),
        }));
      };

      const onPointerUp = () => {
        if (isDraggingRef.current) {
          setHistory((prev) => [...prev.slice(-30), dragStartTemplateRef.current]);
          setFuture([]);
        }
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    },
    [template, scale, snapGrid, setHistory, setFuture]
  );

  // Download template JSON
  const handleDownloadJSON = useCallback(() => {
    downloadTemplateJson(template);
  }, [template]);

  // Upload template JSON
  const handleUploadJSON = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      parseTemplateJson(
        file,
        (parsed) => {
          recordCurrentState();
          setTemplate(parsed);
          setSelectedId(parsed.elements[0]?.id || null);
        },
        (err) => {
          alert(err);
        }
      );
      e.target.value = '';
    },
    [recordCurrentState]
  );

  // Reset to default template
  const handleResetTemplate = useCallback(() => {
    if (confirm('Kembalikan ke template awal 80x30?')) {
      recordCurrentState();
      setTemplate(DEFAULT_TEMPLATE);
      setSelectedId('el_3');
    }
  }, [recordCurrentState]);

  return {
    state: {
      template,
      tags,
      newTagInput,
      selectedId,
      selectedElement,
      zoom,
      snapGrid,
      scale,
      canvasWidthPx,
      canvasHeightPx,
      canUndo,
      canRedo,
    },
    func: {
      setNewTagInput,
      setZoom,
      setSnapGrid,
      setSelectedId,
      updateTemplateDimensions,
      updateSelectedElement,
      handleAddElement,
      handleAddCustomTag,
      handleDeleteCustomTag,
      handleDeleteSelected,
      handlePointerDown,
      handleDownloadJSON,
      handleUploadJSON,
      handleResetTemplate,
      handleUndo,
      handleRedo,
    },
    refs: {
      fileInputRef,
      canvasRef,
    },
  };
};
