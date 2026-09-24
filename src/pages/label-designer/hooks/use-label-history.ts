import { useState, useCallback } from 'react';
import { LabelTemplate } from '../types';

export const useLabelHistory = () => {
  const [history, setHistory] = useState<LabelTemplate[]>([]);
  const [future, setFuture] = useState<LabelTemplate[]>([]);

  const recordHistory = useCallback((currentTemplate: LabelTemplate) => {
    setHistory((prev) => [...prev.slice(-30), currentTemplate]);
    setFuture([]);
  }, []);

  const undo = useCallback(
    (currentTemplate: LabelTemplate): LabelTemplate | null => {
      if (history.length === 0) return null;
      const previous = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      setFuture((prev) => [currentTemplate, ...prev]);
      return previous;
    },
    [history]
  );

  const redo = useCallback(
    (currentTemplate: LabelTemplate): LabelTemplate | null => {
      if (future.length === 0) return null;
      const next = future[0];
      setFuture((prev) => prev.slice(1));
      setHistory((prev) => [...prev, currentTemplate]);
      return next;
    },
    [future]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    setFuture([]);
  }, []);

  return {
    history,
    future,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    recordHistory,
    undo,
    redo,
    clearHistory,
    setHistory,
    setFuture,
  };
};
