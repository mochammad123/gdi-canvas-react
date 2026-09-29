import React, { useCallback, useRef, useState } from 'react';
import { LabelElement, LabelTemplate } from '../types';
import { DND_ELEMENT_MIME } from '../constants';
import {
  AlignmentGuide,
  applyResize,
  computeAlignmentGuides,
  getElementsInMarquee,
  MarqueeRectMm,
  MousePositionMm,
  normalizeMarquee,
  parseToolboxDrag,
  ResizeHandle,
  ZOOM_STEP,
} from '../utils';

interface UseCanvasInteractionParams {
  template: LabelTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<LabelTemplate>>;
  scale: number;
  snapGrid: boolean;
  editingTextId: string | null;
  setEditingTextId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedIdsRef: React.MutableRefObject<string[]>;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setZoom: (value: number | ((prev: number) => number)) => void;
  setHistory: React.Dispatch<React.SetStateAction<LabelTemplate[]>>;
  setFuture: React.Dispatch<React.SetStateAction<LabelTemplate[]>>;
  closeContextMenu: () => void;
  onDropAddElement: (type: LabelElement['type'], text?: string, position?: { x: number; y: number }) => void;
}

export const useCanvasInteraction = ({
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
  closeContextMenu,
  onDropAddElement,
}: UseCanvasInteractionParams) => {
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuide[]>([]);
  const [marquee, setMarquee] = useState<MarqueeRectMm | null>(null);
  const [mouseMm, setMouseMm] = useState<MousePositionMm | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartTemplateRef = useRef<LabelTemplate>(template);
  const textEditStartRef = useRef('');

  const handleCanvasWheel = useCallback(
    (deltaY: number) => {
      const direction = deltaY < 0 ? 1 : -1;
      setZoom((prev) => prev + direction * ZOOM_STEP);
    },
    [setZoom]
  );

  const handleStartTextEdit = useCallback(
    (elementId: string) => {
      const target = template.elements.find((el) => el.id === elementId);
      if (!target || target.type !== 'text') return;

      if (editingTextId && editingTextId !== elementId) {
        const current = template.elements.find((el) => el.id === editingTextId);
        if (current && (current.text || '') !== textEditStartRef.current) {
          setHistory((prev) => [
            ...prev.slice(-30),
            {
              ...template,
              elements: template.elements.map((el) => (el.id === editingTextId ? { ...el, text: textEditStartRef.current } : el)),
            },
          ]);
          setFuture([]);
        }
      }

      textEditStartRef.current = target.text || '';
      setSelectedIds([elementId]);
      setEditingTextId(elementId);
    },
    [template, editingTextId, setHistory, setFuture, setSelectedIds, setEditingTextId]
  );

  const handleChangeTextEdit = useCallback(
    (elementId: string, text: string) => {
      setTemplate((prev) => ({
        ...prev,
        elements: prev.elements.map((el) => (el.id === elementId ? { ...el, text } : el)),
      }));
    },
    [setTemplate]
  );

  const handleCommitTextEdit = useCallback(() => {
    if (!editingTextId) return;

    const current = template.elements.find((el) => el.id === editingTextId);
    const nextText = current?.text || '';
    if (nextText !== textEditStartRef.current) {
      setHistory((prev) => [
        ...prev.slice(-30),
        {
          ...template,
          elements: template.elements.map((el) => (el.id === editingTextId ? { ...el, text: textEditStartRef.current } : el)),
        },
      ]);
      setFuture([]);
    }

    setEditingTextId(null);
  }, [editingTextId, template, setHistory, setFuture, setEditingTextId]);

  const handleCancelTextEdit = useCallback(() => {
    if (!editingTextId) return;
    const startText = textEditStartRef.current;
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === editingTextId ? { ...el, text: startText } : el)),
    }));
    setEditingTextId(null);
  }, [editingTextId, setTemplate, setEditingTextId]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, element: LabelElement) => {
      e.stopPropagation();
      if (editingTextId) return;
      closeContextMenu();

      const additive = e.ctrlKey || e.metaKey;
      let nextSelected = selectedIdsRef.current;

      if (additive) {
        nextSelected = nextSelected.includes(element.id) ? nextSelected.filter((id) => id !== element.id) : [...nextSelected, element.id];
        setSelectedIds(nextSelected);
        return;
      }

      if (!nextSelected.includes(element.id)) {
        nextSelected = [element.id];
        setSelectedIds(nextSelected);
      }

      if (element.locked) return;

      const movingIds = (nextSelected.includes(element.id) ? nextSelected : [element.id]).filter((id) => {
        const el = template.elements.find((item) => item.id === id);
        return el && !el.locked;
      });

      // Jika yang di-drag adalah band, otomatis ajak semua elemen di dalam band ikut bergeser
      if (element.type === 'band') {
        const bandHeight = element.height || 8.0;
        template.elements.forEach((item) => {
          if (item.id !== element.id && !item.locked) {
            if (item.bandId === element.id || (item.y >= element.y && item.y < element.y + bandHeight)) {
              if (!movingIds.includes(item.id)) movingIds.push(item.id);
            }
          }
        });
      }

      if (movingIds.length === 0) return;

      isDraggingRef.current = false;
      dragStartTemplateRef.current = template;
      setAlignmentGuides([]);

      const startX = e.clientX;
      const startY = e.clientY;
      const initialPositions = new Map(template.elements.filter((el) => movingIds.includes(el.id)).map((el) => [el.id, { x: el.x, y: el.y }]));

      const onPointerMove = (moveEvent: PointerEvent) => {
        const deltaPxX = moveEvent.clientX - startX;
        const deltaPxY = moveEvent.clientY - startY;

        if (Math.abs(deltaPxX) > 2 || Math.abs(deltaPxY) > 2) {
          isDraggingRef.current = true;
        }

        let deltaMmX = deltaPxX / scale;
        let deltaMmY = deltaPxY / scale;

        if (snapGrid) {
          deltaMmX = Math.round(deltaMmX * 2) / 2;
          deltaMmY = Math.round(deltaMmY * 2) / 2;
        } else {
          deltaMmX = Math.round(deltaMmX * 10) / 10;
          deltaMmY = Math.round(deltaMmY * 10) / 10;
        }

        setTemplate((prev) => {
          const updated = prev.elements.map((el) => {
            const start = initialPositions.get(el.id);
            if (!start) return el;
            return {
              ...el,
              x: Math.max(0, Math.min(prev.width_mm - 2, start.x + deltaMmX)),
              y: Math.max(0, Math.min(prev.height_mm - 2, start.y + deltaMmY)),
            };
          });

          const primary = updated.find((el) => el.id === element.id);
          if (primary) {
            setAlignmentGuides(
              computeAlignmentGuides(
                primary,
                updated.filter((el) => el.id !== element.id)
              )
            );
          }

          return { ...prev, elements: updated };
        });
      };

      const onPointerUp = () => {
        if (isDraggingRef.current) {
          setHistory((prev) => [...prev.slice(-30), dragStartTemplateRef.current]);
          setFuture([]);

          // Otomatis sinkronisasi bandId elemen berdasarkan posisi relatif terhadap band
          setTemplate((curr) => {
            const band = curr.elements.find((el) => el.type === 'band');
            if (!band) return curr;
            const bH = band.height || 8.0;
            const updated = curr.elements.map((el) => {
              if (el.type === 'band') return el;
              const isInside = el.y >= band.y - 0.5 && el.y < band.y + bH;
              if (isInside && el.bandId !== band.id) {
                return { ...el, bandId: band.id };
              } else if (!isInside && el.bandId === band.id) {
                return { ...el, bandId: undefined };
              }
              return el;
            });
            return { ...curr, elements: updated };
          });
        }
        setAlignmentGuides([]);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    },
    [template, scale, snapGrid, setHistory, setFuture, editingTextId, closeContextMenu, selectedIdsRef, setSelectedIds, setTemplate]
  );

  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent, element: LabelElement, handle: ResizeHandle) => {
      e.stopPropagation();
      e.preventDefault();
      if (editingTextId || element.locked) return;

      setSelectedIds([element.id]);
      isDraggingRef.current = false;
      dragStartTemplateRef.current = template;

      const startX = e.clientX;
      const startY = e.clientY;
      const startElement = { ...element };

      const onPointerMove = (moveEvent: PointerEvent) => {
        const deltaMmX = (moveEvent.clientX - startX) / scale;
        const deltaMmY = (moveEvent.clientY - startY) / scale;
        if (Math.abs(deltaMmX) > 0.05 || Math.abs(deltaMmY) > 0.05) {
          isDraggingRef.current = true;
        }

        const updates = applyResize(startElement, handle, deltaMmX, deltaMmY, template.width_mm, template.height_mm);
        setTemplate((prev) => ({
          ...prev,
          elements: prev.elements.map((el) => (el.id === element.id ? { ...el, ...updates } : el)),
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
    [template, scale, setHistory, setFuture, editingTextId, setSelectedIds, setTemplate]
  );

  const handleMarqueeStart = useCallback(
    (e: React.PointerEvent) => {
      if (e.target !== e.currentTarget) return;
      if (editingTextId) handleCommitTextEdit();

      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const startXmm = (e.clientX - rect.left) / scale;
      const startYmm = (e.clientY - rect.top) / scale;

      if (!(e.ctrlKey || e.metaKey)) setSelectedIds([]);

      const startSelected = e.ctrlKey || e.metaKey ? [...selectedIdsRef.current] : [];
      let latestBox = normalizeMarquee(startXmm, startYmm, startXmm, startYmm);
      setMarquee(latestBox);

      const applyMarqueeSelection = (box: MarqueeRectMm) => {
        const hitIds = getElementsInMarquee(template.elements, box);
        setSelectedIds(Array.from(new Set([...startSelected, ...hitIds])));
      };

      const onPointerMove = (moveEvent: PointerEvent) => {
        const endXmm = (moveEvent.clientX - rect.left) / scale;
        const endYmm = (moveEvent.clientY - rect.top) / scale;
        latestBox = normalizeMarquee(startXmm, startYmm, endXmm, endYmm);
        setMarquee(latestBox);
        applyMarqueeSelection(latestBox);
      };

      const onPointerUp = () => {
        applyMarqueeSelection(latestBox);
        setMarquee(null);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    },
    [editingTextId, handleCommitTextEdit, scale, template.elements, selectedIdsRef, setSelectedIds]
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const node = canvasRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setMouseMm({
        x: Math.max(0, Math.min(template.width_mm, (e.clientX - rect.left) / scale)),
        y: Math.max(0, Math.min(template.height_mm, (e.clientY - rect.top) / scale)),
      });
    },
    [scale, template.width_mm, template.height_mm]
  );

  const handleCanvasMouseLeave = useCallback(() => setMouseMm(null), []);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    if (![...e.dataTransfer.types].includes(DND_ELEMENT_MIME) && ![...e.dataTransfer.types].includes('text/plain')) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleCanvasDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const raw = e.dataTransfer.getData(DND_ELEMENT_MIME) || e.dataTransfer.getData('text/plain');
      const payload = parseToolboxDrag(raw);
      if (!payload || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      onDropAddElement(payload.type, payload.text, {
        x: (e.clientX - rect.left) / scale,
        y: (e.clientY - rect.top) / scale,
      });
    },
    [scale, onDropAddElement]
  );

  return {
    alignmentGuides,
    marquee,
    mouseMm,
    canvasRef,
    handleCanvasWheel,
    handleStartTextEdit,
    handleChangeTextEdit,
    handleCommitTextEdit,
    handleCancelTextEdit,
    handlePointerDown,
    handleResizePointerDown,
    handleMarqueeStart,
    handleCanvasMouseMove,
    handleCanvasMouseLeave,
    handleCanvasDragOver,
    handleCanvasDrop,
  };
};
