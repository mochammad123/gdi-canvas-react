import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LabelElement, LabelTemplate, ElementType, TagItem } from '../types';
import { BASE_SCALE, DEFAULT_TEMPLATE, AVAILABLE_TAGS, STORAGE_KEY_TEMPLATE, STORAGE_KEY_TAGS } from '../constants';
import { useLabelHistory } from './use-label-history';
import { useSelectionClipboard } from './use-selection-clipboard';
import { useCanvasInteraction } from './use-canvas-interaction';
import { clampZoom, createLabelElement, downloadTemplateJson, parseTemplateJson } from '../utils';

export type { ContextMenuState } from './use-selection-clipboard';

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
  const [selectedIds, setSelectedIds] = useState<string[]>(['el_3']);
  const [zoom, setZoomRaw] = useState(1.5);
  const [snapGrid, setSnapGrid] = useState(true);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedIdsRef = useRef(selectedIds);
  selectedIdsRef.current = selectedIds;

  const setZoom = useCallback((value: number | ((prev: number) => number)) => {
    setZoomRaw((prev) => clampZoom(typeof value === 'function' ? value(prev) : value));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, JSON.stringify(template));
  }, [template]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(tags));
  }, [tags]);

  const recordCurrentState = useCallback(() => {
    recordToHistory(template);
  }, [recordToHistory, template]);

  const handleUndo = useCallback(() => {
    const previous = undoHistory(template);
    if (previous) setTemplate(previous);
  }, [undoHistory, template]);

  const handleRedo = useCallback(() => {
    const next = redoHistory(template);
    if (next) setTemplate(next);
  }, [redoHistory, template]);

  const scale = BASE_SCALE * zoom;
  const canvasWidthPx = template.width_mm * scale;
  const canvasHeightPx = template.height_mm * scale;
  const selectedId = selectedIds.length > 0 ? selectedIds[selectedIds.length - 1] : null;
  const selectedElement = template.elements.find((el) => el.id === selectedId) || null;

  const snapValue = useCallback((value: number) => (snapGrid ? Math.round(value * 2) / 2 : Math.round(value * 10) / 10), [snapGrid]);

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

  const updateTemplateDimensions = useCallback((updates: Partial<{ width_mm: number; height_mm: number }>) => {
    setTemplate((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleAddElement = useCallback(
    (type: ElementType, customText?: string, position?: { x: number; y: number }) => {
      recordCurrentState();
      const snappedPosition = position
        ? {
            x: Math.max(0, Math.min(template.width_mm - 2, snapValue(position.x))),
            y: Math.max(0, Math.min(template.height_mm - 2, snapValue(position.y))),
          }
        : undefined;

      const newElement = createLabelElement(type, {
        widthMm: template.width_mm,
        customText,
        position: snappedPosition,
      });

      // Jika newElement dijatuhkan ke dalam area band, langsung pasang bandId!
      const band = template.elements.find((el) => el.type === 'band');
      if (band && newElement.type !== 'band') {
        const bH = band.height || 8.0;
        if (newElement.y >= band.y - 0.5 && newElement.y < band.y + bH) {
          newElement.bandId = band.id;
        }
      }

      setTemplate((prev) => ({
        ...prev,
        elements: newElement.type === 'band' ? [newElement, ...prev.elements] : [...prev.elements, newElement],
      }));
      setSelectedIds([newElement.id]);
    },
    [recordCurrentState, template.width_mm, template.height_mm, snapValue]
  );

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

      setTags((prev) => [...prev, { label: cleanName, tag: formattedTag, isCustom: true }]);
      setNewTagInput('');
      handleAddElement('text', formattedTag);
    },
    [newTagInput, tags, handleAddElement]
  );

  const handleDeleteCustomTag = useCallback((tagToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTags((prev) => prev.filter((t) => t.tag !== tagToDelete));
  }, []);

  const selection = useSelectionClipboard({
    template,
    setTemplate,
    selectedIds,
    setSelectedIds,
    editingTextId,
    previewOpen,
    setPreviewOpen,
    recordCurrentState,
    snapValue,
    handleUndo,
    handleRedo,
  });

  const canvas = useCanvasInteraction({
    template,
    setTemplate,
    scale,
    snapGrid,
    editingTextId,
    setEditingTextId,
    selectedIdsRef,
    setSelectedIds,
    setZoom,
    setHistory,
    setFuture,
    closeContextMenu: selection.closeContextMenu,
    onDropAddElement: handleAddElement,
  });

  const handleDownloadJSON = useCallback(() => {
    downloadTemplateJson(template);
  }, [template]);

  const handleUploadJSON = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      parseTemplateJson(
        file,
        (parsed) => {
          recordCurrentState();
          setTemplate(parsed);
          setSelectedIds(parsed.elements[0]?.id ? [parsed.elements[0].id] : []);
        },
        (err) => alert(err)
      );
      e.target.value = '';
    },
    [recordCurrentState]
  );

  const handleResetTemplate = useCallback(() => {
    if (confirm('Kembalikan ke template awal 80x30?')) {
      recordCurrentState();
      setTemplate(DEFAULT_TEMPLATE);
      setSelectedIds(['el_3']);
    }
  }, [recordCurrentState]);

  return {
    state: {
      template,
      tags,
      newTagInput,
      selectedId,
      selectedIds,
      selectedElement,
      zoom,
      snapGrid,
      scale,
      canvasWidthPx,
      canvasHeightPx,
      canUndo,
      canRedo,
      editingTextId,
      alignmentGuides: canvas.alignmentGuides,
      marquee: canvas.marquee,
      mouseMm: canvas.mouseMm,
      contextMenu: selection.contextMenu,
      previewOpen,
    },
    func: {
      setNewTagInput,
      setZoom,
      setSnapGrid,
      selectElement: selection.selectElement,
      clearSelection: selection.clearSelection,
      updateTemplateDimensions,
      updateSelectedElement,
      handleAddElement,
      handleAddCustomTag,
      handleDeleteCustomTag,
      handleDeleteSelected: selection.handleDeleteSelected,
      handleCopySelected: selection.handleCopySelected,
      handlePasteClipboard: selection.handlePasteClipboard,
      handleDuplicateSelected: selection.handleDuplicateSelected,
      handleAlignSelected: selection.handleAlignSelected,
      handleReorderSelected: selection.handleReorderSelected,
      handleToggleLockSelected: selection.handleToggleLockSelected,
      handleContextMenu: selection.handleContextMenu,
      closeContextMenu: selection.closeContextMenu,
      setPreviewOpen,
      handlePointerDown: canvas.handlePointerDown,
      handleResizePointerDown: canvas.handleResizePointerDown,
      handleMarqueeStart: canvas.handleMarqueeStart,
      handleCanvasMouseMove: canvas.handleCanvasMouseMove,
      handleCanvasMouseLeave: canvas.handleCanvasMouseLeave,
      handleCanvasDragOver: canvas.handleCanvasDragOver,
      handleCanvasDrop: canvas.handleCanvasDrop,
      handleCanvasWheel: canvas.handleCanvasWheel,
      handleStartTextEdit: canvas.handleStartTextEdit,
      handleChangeTextEdit: canvas.handleChangeTextEdit,
      handleCommitTextEdit: canvas.handleCommitTextEdit,
      handleCancelTextEdit: canvas.handleCancelTextEdit,
      handleDownloadJSON,
      handleUploadJSON,
      handleResetTemplate,
      handleUndo,
      handleRedo,
    },
    refs: {
      fileInputRef,
      canvasRef: canvas.canvasRef,
    },
  };
};
