import React from 'react';
import { Typography } from '@knittotextile/react-ui';
import { LabelElement, LabelTemplate } from '../types';
import { CanvasElement } from './canvas-element';

interface CanvasAreaProps {
  template: LabelTemplate;
  selectedId: string | null;
  scale: number;
  zoom: number;
  canvasWidthPx: number;
  canvasHeightPx: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  onSelect: (id: string | null) => void;
  onPointerDown: (e: React.PointerEvent, element: LabelElement) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  template,
  selectedId,
  scale,
  zoom,
  canvasWidthPx,
  canvasHeightPx,
  canvasRef,
  onSelect,
  onPointerDown,
}) => {
  return (
    <main
      className="flex-1 bg-slate-200 overflow-auto flex items-center justify-center p-8 relative cursor-default"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelect(null);
        }
      }}
    >
      {/* Label Container (Outer boundary) */}
      <div className="relative shadow-xl">
        {/* Dimension Indicator Label Top */}
        <Typography as="global-hint" className="absolute -top-6 left-0 right-0 text-center text-xs font-semibold text-slate-500 font-mono block">
          Lebar: {template.width_mm} mm ({canvasWidthPx.toFixed(0)} px)
        </Typography>

        {/* Dimension Indicator Label Left */}
        <Typography
          as="global-hint"
          className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-slate-500 font-mono block"
        >
          {template.height_mm} mm
        </Typography>

        {/* The Actual Printable Canvas */}
        <div
          ref={canvasRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onSelect(null);
            }
          }}
          style={{
            width: `${canvasWidthPx}px`,
            height: `${canvasHeightPx}px`,
          }}
          className="bg-white border-2 border-slate-400 relative overflow-hidden"
        >
          {/* Millimeter Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
              backgroundSize: `${scale}px ${scale}px`, // 1mm grid
            }}
          />

          {/* Elements Rendering */}
          {template.elements.map((el) => (
            <CanvasElement
              key={el.id}
              element={el}
              isSelected={el.id === selectedId}
              scale={scale}
              zoom={zoom}
              onPointerDown={onPointerDown}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
