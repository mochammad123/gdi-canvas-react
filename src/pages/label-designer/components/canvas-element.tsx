import React from 'react';
import { LabelElement } from '../types';
import { BarcodeVisual } from './barcode-visual';

interface CanvasElementProps {
  element: LabelElement;
  isSelected: boolean;
  scale: number;
  zoom: number;
  onPointerDown: (e: React.PointerEvent, element: LabelElement) => void;
  onSelect: (id: string) => void;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ element, isSelected, scale, zoom, onPointerDown, onSelect }) => {
  const posX = Number(element.x) || 0;
  const posY = Number(element.y) || 0;
  const leftPx = posX * scale;
  const topPx = posY * scale;
  const align = element.type === 'text' ? element.align || 'left' : 'left';
  const widthPx = element.width ? element.width * scale : undefined;

  return (
    <div
      onPointerDown={(e) => onPointerDown(e, element)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      style={{
        left: `${leftPx}px`,
        top: `${topPx}px`,
        width: widthPx ? `${widthPx}px` : undefined,
        position: 'absolute',
      }}
      className={`cursor-move transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-1 rounded-xs z-30 bg-blue-50/30' : 'hover:ring-1 hover:ring-slate-400 z-10'
      }`}
    >
      {/* Render TEXT */}
      {element.type === 'text' && (
        <div
          style={{
            fontSize: `${(Number(element.fontSize) || 10) * zoom}px`,
            fontWeight: element.bold ? 700 : 400,
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: align,
            width: '100%',
          }}
          className="px-0.5 py-0.2 select-none text-black"
        >
          {element.text}
        </div>
      )}

      {/* Render BARCODE */}
      {element.type === 'barcode' && (
        <div className="flex flex-col items-start select-none">
          <BarcodeVisual widthPx={(Number(element.width) || 34) * scale} heightPx={(Number(element.height) || 7.5) * scale} text={element.text} />
        </div>
      )}

      {/* Render LINE */}
      {element.type === 'line' && (
        <div
          style={{
            width: `${(Number(element.width) || 76) * scale}px`,
            borderTop: element.dashed ? '1.5px dashed #000' : '1.5px solid #000',
            height: '2px',
          }}
          className="my-1 select-none"
        />
      )}

      {/* Render IMAGE */}
      {element.type === 'image' && (
        <div
          style={{
            width: `${(Number(element.width) || 15) * scale}px`,
            height: `${(Number(element.height) || 15) * scale}px`,
          }}
          className="flex items-center justify-center border border-dashed border-slate-300 bg-slate-50/80 overflow-hidden select-none"
        >
          {element.src ? (
            <img
              src={element.src}
              alt="Preview"
              className="w-full h-full object-contain pointer-events-none"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                const parent = (e.currentTarget as HTMLElement).parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.image-tag-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div
            className="image-tag-fallback flex flex-col items-center justify-center p-1 text-center text-slate-400"
            style={{ display: element.src && !element.src.startsWith('{{') ? 'none' : 'flex' }}
          >
            <span className="text-sm">🖼️</span>
            <span className="text-[9px] font-mono font-medium truncate max-w-full text-slate-500">{element.src || 'Pilih Gambar'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
