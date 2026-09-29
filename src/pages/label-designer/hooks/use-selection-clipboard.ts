import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LabelElement, LabelTemplate } from '../types';
import { AlignAction, applyAlignToElements, cloneElementsWithOffset, reorderElements } from '../utils';

export interface ContextMenuState {
  x: number;
  y: number;
}

interface UseSelectionClipboardParams {
  template: LabelTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<LabelTemplate>>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  editingTextId: string | null;
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recordCurrentState: () => void;
  snapValue: (value: number) => number;
  handleUndo: () => void;
  handleRedo: () => void;
}

export const useSelectionClipboard = ({
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
}: UseSelectionClipboardParams) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const clipboardRef = useRef<LabelElement[]>([]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, [setSelectedIds]);

  const selectElement = useCallback(
    (id: string | null, additive = false) => {
      if (id === null) {
        setSelectedIds([]);
        return;
      }
      if (additive) {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
        return;
      }
      setSelectedIds([id]);
    },
    [setSelectedIds]
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.length === 0 || editingTextId) return;
    const unlockedIds = selectedIds.filter((id) => {
      const el = template.elements.find((e) => e.id === id);
      return el && !el.locked;
    });
    if (unlockedIds.length === 0) return;
    recordCurrentState();
    const ids = new Set(unlockedIds);
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => !ids.has(el.id)),
    }));
    setSelectedIds((prev) => prev.filter((id) => !ids.has(id)));
    setContextMenu(null);
  }, [selectedIds, recordCurrentState, editingTextId, template.elements, setTemplate, setSelectedIds]);

  const handleCopySelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    const copied = template.elements.filter((el) => selectedIds.includes(el.id));
    if (copied.length === 0) return;
    clipboardRef.current = copied.map((el) => ({ ...el }));
  }, [selectedIds, template.elements]);

  const handlePasteClipboard = useCallback(() => {
    if (clipboardRef.current.length === 0) return;
    recordCurrentState();
    const clones = cloneElementsWithOffset(clipboardRef.current, 2);
    setTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, ...clones],
    }));
    setSelectedIds(clones.map((el) => el.id));
    setContextMenu(null);
  }, [recordCurrentState, setTemplate, setSelectedIds]);

  const handleDuplicateSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    const source = template.elements.filter((el) => selectedIds.includes(el.id));
    if (source.length === 0) return;
    recordCurrentState();
    const clones = cloneElementsWithOffset(source, 2);
    setTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, ...clones],
    }));
    setSelectedIds(clones.map((el) => el.id));
    setContextMenu(null);
  }, [selectedIds, template.elements, recordCurrentState, setTemplate, setSelectedIds]);

  const handleAlignSelected = useCallback(
    (action: AlignAction) => {
      if (selectedIds.length < 2) return;
      recordCurrentState();
      setTemplate((prev) => ({
        ...prev,
        elements: applyAlignToElements(prev.elements, selectedIds, action),
      }));
      setContextMenu(null);
    },
    [selectedIds, recordCurrentState, setTemplate]
  );

  const handleReorderSelected = useCallback(
    (direction: 'front' | 'back' | 'forward' | 'backward') => {
      if (selectedIds.length === 0) return;
      recordCurrentState();
      setTemplate((prev) => ({
        ...prev,
        elements: reorderElements(prev.elements, selectedIds, direction),
      }));
      setContextMenu(null);
    },
    [selectedIds, recordCurrentState, setTemplate]
  );

  const handleToggleLockSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    recordCurrentState();
    const ids = new Set(selectedIds);
    const shouldLock = template.elements.some((el) => ids.has(el.id) && !el.locked);
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (ids.has(el.id) ? { ...el, locked: shouldLock } : el)),
    }));
    setContextMenu(null);
  }, [selectedIds, template.elements, recordCurrentState, setTemplate]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, elementId?: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (elementId) {
        setSelectedIds((prev) => (prev.includes(elementId) ? prev : [elementId]));
      }
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [setSelectedIds]
  );

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const nudgeSelected = useCallback(
    (dxMm: number, dyMm: number) => {
      if (selectedIds.length === 0 || editingTextId) return;
      const movableIds = selectedIds.filter((id) => {
        const el = template.elements.find((e) => e.id === id);
        return el && !el.locked;
      });
      if (movableIds.length === 0) return;
      recordCurrentState();
      const ids = new Set(movableIds);
      setTemplate((prev) => ({
        ...prev,
        elements: prev.elements.map((el) => {
          if (!ids.has(el.id) || el.locked) return el;
          return {
            ...el,
            x: Math.max(0, Math.min(prev.width_mm - 2, snapValue(el.x + dxMm))),
            y: Math.max(0, Math.min(prev.height_mm - 2, snapValue(el.y + dyMm))),
          };
        }),
      }));
    },
    [selectedIds, editingTextId, recordCurrentState, snapValue, template.elements, setTemplate]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const isEditingInput = tag === 'input' || tag === 'textarea' || target.isContentEditable || editingTextId !== null;

      if (e.key === 'Escape') {
        setContextMenu(null);
        if (previewOpen) setPreviewOpen(false);
      }

      if (isCtrlOrMeta && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else if (!isEditingInput) {
          e.preventDefault();
          handleUndo();
        }
        return;
      }

      if (isCtrlOrMeta && e.key.toLowerCase() === 'y') {
        if (!isEditingInput) {
          e.preventDefault();
          handleRedo();
        }
        return;
      }

      if (isCtrlOrMeta && e.key.toLowerCase() === 'c' && !isEditingInput) {
        e.preventDefault();
        handleCopySelected();
        return;
      }

      if (isCtrlOrMeta && e.key.toLowerCase() === 'v' && !isEditingInput) {
        e.preventDefault();
        handlePasteClipboard();
        return;
      }

      if (isCtrlOrMeta && e.key.toLowerCase() === 'd' && !isEditingInput) {
        e.preventDefault();
        handleDuplicateSelected();
        return;
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0 && !isEditingInput) {
        e.preventDefault();
        handleDeleteSelected();
        return;
      }

      if (isEditingInput || selectedIds.length === 0) return;

      const step = e.shiftKey ? 0.1 : 0.5;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nudgeSelected(-step, 0);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nudgeSelected(step, 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nudgeSelected(0, -step);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nudgeSelected(0, step);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleUndo,
    handleRedo,
    selectedIds,
    handleDeleteSelected,
    editingTextId,
    nudgeSelected,
    handleCopySelected,
    handlePasteClipboard,
    handleDuplicateSelected,
    previewOpen,
    setPreviewOpen,
  ]);

  return {
    contextMenu,
    clearSelection,
    selectElement,
    handleDeleteSelected,
    handleCopySelected,
    handlePasteClipboard,
    handleDuplicateSelected,
    handleAlignSelected,
    handleReorderSelected,
    handleToggleLockSelected,
    handleContextMenu,
    closeContextMenu,
    setContextMenu,
  };
};
