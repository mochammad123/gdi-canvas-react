import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Typography } from '@knittotextile/react-ui';
import { LabelElement, LabelTemplate } from '../types';
import { AlignmentGuide, MarqueeRectMm, MousePositionMm, ResizeHandle, RULER_SIZE_PX } from '../utils';
import { CanvasElement } from './canvas-element';

interface CanvasAreaProps {
  template: LabelTemplate;
  selectedIds: string[];
  editingTextId: string | null;
  scale: number;
  zoom: number;
  canvasWidthPx: number;
  canvasHeightPx: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  alignmentGuides: AlignmentGuide[];
  marquee: MarqueeRectMm | null;
  mouseMm: MousePositionMm | null;
  onSelect: (id: string | null, additive?: boolean) => void;
  onPointerDown: (e: React.PointerEvent, element: LabelElement) => void;
  onResizePointerDown: (e: React.PointerEvent, element: LabelElement, handle: ResizeHandle) => void;
  onMarqueeStart: (e: React.PointerEvent) => void;
  onCanvasMouseMove: (e: React.MouseEvent) => void;
  onCanvasMouseLeave: () => void;
  onCanvasDragOver: (e: React.DragEvent) => void;
  onCanvasDrop: (e: React.DragEvent) => void;
  onContextMenu: (e: React.MouseEvent, elementId?: string) => void;
  onWheel: (deltaY: number) => void;
  onStartTextEdit: (id: string) => void;
  onChangeTextEdit: (id: string, text: string) => void;
  onCommitTextEdit: () => void;
  onCancelTextEdit: () => void;
}

const buildTicks = (lengthMm: number, step = 5) => {
  const ticks: number[] = [];
  for (let v = 0; v <= lengthMm; v += step) ticks.push(v);
  return ticks;
};

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  template,
  selectedIds,
  editingTextId,
  scale,
  zoom,
  canvasWidthPx,
  canvasHeightPx,
  canvasRef,
  alignmentGuides,
  marquee,
  mouseMm,
  onSelect,
  onPointerDown,
  onResizePointerDown,
  onMarqueeStart,
  onCanvasMouseMove,
  onCanvasMouseLeave,
  onCanvasDragOver,
  onCanvasDrop,
  onContextMenu,
  onWheel,
  onStartTextEdit,
  onChangeTextEdit,
  onCommitTextEdit,
  onCancelTextEdit,
}) => {
  const viewportRef = useRef<HTMLElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const topTicks = useMemo(() => buildTicks(template.width_mm), [template.width_mm]);
  const leftTicks = useMemo(() => buildTicks(template.height_mm), [template.height_mm]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      onWheel(e.deltaY);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, [onWheel]);

  return (
    <main
      ref={viewportRef}
      className="flex-1 bg-slate-200 overflow-auto p-6 relative cursor-default"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (editingTextId) onCommitTextEdit();
          onSelect(null);
        }
      }}
    >
      <div className="inline-flex flex-col min-w-min mx-auto">
        <Typography as="global-hint" className="text-xs font-semibold text-slate-500 font-mono mb-2 block">
          Lebar: {template.width_mm} mm · Tinggi: {template.height_mm} mm · Zoom {Math.round(zoom * 100)}%
          {selectedIds.length > 1 ? ` · ${selectedIds.length} elemen terpilih` : ''}
          {mouseMm ? ` · Cursor ${mouseMm.x.toFixed(1)}, ${mouseMm.y.toFixed(1)} mm` : ''}
        </Typography>

        <div className="relative shadow-xl" style={{ paddingLeft: RULER_SIZE_PX, paddingTop: RULER_SIZE_PX }}>
          {/* Corner */}
          <div
            className="absolute top-0 left-0 bg-slate-100 border-r border-b border-slate-300 z-20"
            style={{ width: RULER_SIZE_PX, height: RULER_SIZE_PX }}
          />

          {/* Top ruler */}
          <div
            className="absolute top-0 bg-slate-100 border-b border-slate-300 overflow-hidden z-20"
            style={{ left: RULER_SIZE_PX, height: RULER_SIZE_PX, width: canvasWidthPx }}
          >
            {topTicks.map((mm) => (
              <div key={`tx-${mm}`} className="absolute top-0 bottom-0" style={{ left: mm * scale }}>
                <div className={`w-px bg-slate-400 ${mm % 10 === 0 ? 'h-full' : 'h-2 mt-auto absolute bottom-0'}`} />
                {mm % 10 === 0 && <span className="absolute top-0.5 left-0.5 text-[9px] font-mono text-slate-500 leading-none">{mm}</span>}
              </div>
            ))}
            {mouseMm && <div className="absolute top-0 bottom-0 w-px bg-sky-500 pointer-events-none" style={{ left: mouseMm.x * scale }} />}
          </div>

          {/* Left ruler */}
          <div
            className="absolute left-0 bg-slate-100 border-r border-slate-300 overflow-hidden z-20"
            style={{ top: RULER_SIZE_PX, width: RULER_SIZE_PX, height: canvasHeightPx }}
          >
            {leftTicks.map((mm) => (
              <div key={`ty-${mm}`} className="absolute left-0 right-0" style={{ top: mm * scale }}>
                <div className={`h-px bg-slate-400 ${mm % 10 === 0 ? 'w-full' : 'w-2 absolute right-0'}`} />
                {mm % 10 === 0 && <span className="absolute left-0.5 top-0.5 text-[9px] font-mono text-slate-500 leading-none">{mm}</span>}
              </div>
            ))}
            {mouseMm && <div className="absolute left-0 right-0 h-px bg-sky-500 pointer-events-none" style={{ top: mouseMm.y * scale }} />}
          </div>

          {/* Printable canvas */}
          <div
            ref={canvasRef}
            onPointerDown={onMarqueeStart}
            onMouseMove={onCanvasMouseMove}
            onMouseLeave={() => {
              setIsDragOver(false);
              onCanvasMouseLeave();
            }}
            onDragOver={(e) => {
              onCanvasDragOver(e);
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              setIsDragOver(false);
              onCanvasDrop(e);
            }}
            onContextMenu={(e) => {
              if (e.target === e.currentTarget) onContextMenu(e);
            }}
            style={{
              width: `${canvasWidthPx}px`,
              height: `${canvasHeightPx}px`,
            }}
            className={`bg-white border-2 relative overflow-hidden ${
              isDragOver ? 'border-sky-500 ring-2 ring-sky-300 ring-offset-1' : 'border-slate-400'
            }`}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
                backgroundSize: `${scale}px ${scale}px`,
              }}
            />

            {alignmentGuides.map((guide) =>
              guide.orientation === 'vertical' ? (
                <div
                  key={`v-${guide.positionMm}`}
                  className="absolute top-0 bottom-0 pointer-events-none z-40 w-px bg-rose-500"
                  style={{ left: `${guide.positionMm * scale}px` }}
                />
              ) : (
                <div
                  key={`h-${guide.positionMm}`}
                  className="absolute left-0 right-0 pointer-events-none z-40 h-px bg-rose-500"
                  style={{ top: `${guide.positionMm * scale}px` }}
                />
              )
            )}

            {marquee && (
              <div
                className="absolute pointer-events-none z-50 border border-sky-500 bg-sky-400/15"
                style={{
                  left: `${marquee.left * scale}px`,
                  top: `${marquee.top * scale}px`,
                  width: `${(marquee.right - marquee.left) * scale}px`,
                  height: `${(marquee.bottom - marquee.top) * scale}px`,
                }}
              />
            )}

            {[...template.elements]
              .sort((a, b) => (a.type === 'band' ? -1 : b.type === 'band' ? 1 : 0))
              .map((el) => (
                <CanvasElement
                  key={el.id}
                  element={el}
                  isSelected={selectedSet.has(el.id)}
                  isEditing={el.id === editingTextId}
                  showResizeHandles={selectedSet.has(el.id) && selectedIds.length === 1 && editingTextId !== el.id}
                  scale={scale}
                  zoom={zoom}
                  onPointerDown={onPointerDown}
                  onResizePointerDown={onResizePointerDown}
                  onContextMenu={onContextMenu}
                  onStartTextEdit={onStartTextEdit}
                  onChangeTextEdit={onChangeTextEdit}
                  onCommitTextEdit={onCommitTextEdit}
                  onCancelTextEdit={onCancelTextEdit}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};
