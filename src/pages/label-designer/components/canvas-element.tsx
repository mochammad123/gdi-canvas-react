import React, { useEffect, useRef } from 'react';
import { LabelElement } from '../types';
import { getElementBoundsMm, getResizeHandlesForType, ResizeHandle } from '../utils';
import { BarcodeVisual } from './barcode-visual';

interface CanvasElementProps {
  element: LabelElement;
  isSelected: boolean;
  isEditing: boolean;
  showResizeHandles: boolean;
  scale: number;
  zoom: number;
  onPointerDown: (e: React.PointerEvent, element: LabelElement) => void;
  onResizePointerDown: (e: React.PointerEvent, element: LabelElement, handle: ResizeHandle) => void;
  onContextMenu: (e: React.MouseEvent, elementId: string) => void;
  onStartTextEdit: (id: string) => void;
  onChangeTextEdit: (id: string, text: string) => void;
  onCommitTextEdit: () => void;
  onCancelTextEdit: () => void;
}

const HANDLE_CURSOR: Record<ResizeHandle, string> = {
  nw: 'nwse-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  se: 'nwse-resize',
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
};

const HANDLE_STYLE: Record<ResizeHandle, React.CSSProperties> = {
  nw: { left: -4, top: -4 },
  ne: { right: -4, top: -4 },
  sw: { left: -4, bottom: -4 },
  se: { right: -4, bottom: -4 },
  n: { left: '50%', top: -4, transform: 'translateX(-50%)' },
  s: { left: '50%', bottom: -4, transform: 'translateX(-50%)' },
  e: { right: -4, top: '50%', transform: 'translateY(-50%)' },
  w: { left: -4, top: '50%', transform: 'translateY(-50%)' },
};

/**
 * Menghitung ukuran font efektif jika kotak area (width & height) sudah penuh (auto-shrink).
 */
const getAutoFitFontSize = (
  text: string,
  widthPx: number,
  heightPx: number,
  initialFontSizePx: number,
  bold: boolean,
  zoom: number,
  fontFamily?: string
): number => {
  if (typeof document === 'undefined' || !text || widthPx <= 0 || heightPx <= 0) {
    return initialFontSizePx;
  }

  let measureDiv = document.getElementById('knitto-text-measurer') as HTMLDivElement | null;
  if (!measureDiv) {
    measureDiv = document.createElement('div');
    measureDiv.id = 'knitto-text-measurer';
    measureDiv.style.position = 'fixed';
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.pointerEvents = 'none';
    measureDiv.style.left = '-9999px';
    measureDiv.style.top = '-9999px';
    measureDiv.style.zIndex = '-9999';
    document.body.appendChild(measureDiv);
  }

  measureDiv.style.width = `${widthPx}px`;
  measureDiv.style.lineHeight = '1.1';
  measureDiv.style.whiteSpace = 'normal';
  measureDiv.style.wordBreak = 'break-word';
  measureDiv.style.fontFamily = fontFamily ? `${fontFamily}, sans-serif` : 'Arial, Helvetica, sans-serif';
  measureDiv.style.fontWeight = bold ? '700' : '400';
  measureDiv.style.boxSizing = 'border-box';
  measureDiv.style.padding = '1px 2px';
  measureDiv.textContent = text;

  // Cek dulu di ukuran awal: jika sudah muat, langsung pakai ukuran awal
  measureDiv.style.fontSize = `${initialFontSizePx}px`;
  if (measureDiv.scrollHeight <= heightPx) {
    return initialFontSizePx;
  }

  // Jika kepenuhan (overflow), kecilkan font secara bertahap menggunakan binary search
  const minFontPx = Math.max(4 * zoom, 4);
  let low = minFontPx;
  let high = initialFontSizePx - 0.5;
  let bestFit = minFontPx;

  for (let i = 0; i < 8; i++) {
    const mid = Math.round(((low + high) / 2) * 10) / 10;
    measureDiv.style.fontSize = `${mid}px`;
    if (measureDiv.scrollHeight <= heightPx) {
      bestFit = mid;
      low = mid + 0.5;
    } else {
      high = mid - 0.5;
    }
    if (low > high) break;
  }

  return bestFit;
};

export const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  isEditing,
  showResizeHandles,
  scale,
  zoom,
  onPointerDown,
  onResizePointerDown,
  onContextMenu,
  onStartTextEdit,
  onChangeTextEdit,
  onCommitTextEdit,
  onCancelTextEdit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const posX = Number(element.x) || 0;
  const posY = Number(element.y) || 0;
  const leftPx = posX * scale;
  const topPx = posY * scale;
  const align = element.type === 'text' ? element.align || 'left' : 'left';
  const estimatedBounds =
    element.type === 'text' || element.type === 'line' || element.type === 'table' || element.type === 'band' ? getElementBoundsMm(element) : null;
  const widthPx = element.width ? element.width * scale : showResizeHandles && estimatedBounds ? estimatedBounds.width * scale : undefined;
  const heightPx = element.height
    ? element.height * scale
    : showResizeHandles && (element.type === 'text' || element.type === 'table' || element.type === 'band') && estimatedBounds
      ? estimatedBounds.height * scale
      : undefined;
  const fontSizePx = (Number(element.fontSize) || 10) * zoom;
  const effectiveFontSizePx =
    element.type === 'text' && element.width && element.height
      ? getAutoFitFontSize(element.text || '', widthPx || 0, heightPx || 0, fontSizePx, Boolean(element.bold), zoom, element.fontFamily)
      : fontSizePx;
  const handles = getResizeHandlesForType(element.type);
  const hasTextBox = element.type === 'text' && (Boolean(element.width) || Boolean(element.height));

  useEffect(() => {
    if (!isEditing || !inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.select();
  }, [isEditing]);

  return (
    <div
      onPointerDown={(e) => {
        if (isEditing) {
          e.stopPropagation();
          return;
        }
        onPointerDown(e, element);
      }}
      onClick={(e) => {
        // Seleksi sudah di-handle di onPointerDown (hindari double-toggle Ctrl+klik)
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (element.type === 'text' && !element.locked) {
          onStartTextEdit(element.id);
        }
      }}
      onContextMenu={(e) => onContextMenu(e, element.id)}
      style={{
        left: `${leftPx}px`,
        top: `${topPx}px`,
        width: widthPx ? `${widthPx}px` : undefined,
        height: heightPx ? `${heightPx}px` : undefined,
        position: 'absolute',
      }}
      className={`transition-shadow ${isEditing ? 'cursor-text z-50' : element.locked ? 'cursor-not-allowed' : 'cursor-move'} ${
        element.type === 'band'
          ? isSelected
            ? 'ring-2 ring-indigo-500 ring-offset-1 rounded-xs z-[5] bg-indigo-50/20'
            : 'hover:ring-1 hover:ring-indigo-400 z-[1]'
          : isSelected
            ? element.locked
              ? 'ring-2 ring-amber-500 ring-offset-1 rounded-xs z-30 bg-amber-50/40'
              : element.bandId
                ? 'ring-2 ring-indigo-500 ring-offset-1 rounded-xs z-30 bg-indigo-50/40'
                : 'ring-2 ring-blue-500 ring-offset-1 rounded-xs z-30 bg-blue-50/30'
            : 'hover:ring-1 hover:ring-slate-400 z-20'
      }`}
    >
      {element.locked && (
        <span className="absolute -top-2 -right-2 text-[9px] bg-amber-500 text-white rounded px-1 z-50 pointer-events-none">lock</span>
      )}
      {element.bandId && element.type !== 'band' && (
        <span className="absolute -top-3 left-0 text-[8px] bg-indigo-600 text-white rounded px-1 z-40 pointer-events-none font-mono">🔁 loop</span>
      )}
      {element.type === 'text' &&
        (isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={element.text || ''}
            onChange={(e) => onChangeTextEdit(element.id, e.target.value)}
            onBlur={onCommitTextEdit}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                e.preventDefault();
                onCommitTextEdit();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                onCancelTextEdit();
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: `${effectiveFontSizePx}px`,
              fontWeight: element.bold ? 700 : 400,
              lineHeight: 1.1,
              fontFamily: element.fontFamily ? `${element.fontFamily}, sans-serif` : 'Arial, Helvetica, sans-serif',
              textAlign: align,
              width: '100%',
              height: heightPx ? '100%' : undefined,
              minWidth: '4ch',
            }}
            className="px-0.5 py-0.2 bg-white text-black border border-blue-500 outline-none rounded-xs box-border"
          />
        ) : (
          <div
            title={
              effectiveFontSizePx < fontSizePx
                ? `Auto-shrink: ${Math.round((effectiveFontSizePx / zoom) * 10) / 10}px (asli: ${element.fontSize}px)`
                : undefined
            }
            style={{
              fontSize: `${effectiveFontSizePx}px`,
              fontWeight: element.bold ? 700 : 400,
              lineHeight: 1.1,
              whiteSpace: hasTextBox && element.width ? 'normal' : 'nowrap',
              overflow: hasTextBox ? 'hidden' : undefined,
              wordBreak: hasTextBox && element.width ? 'break-word' : undefined,
              fontFamily: element.fontFamily ? `${element.fontFamily}, sans-serif` : 'Arial, Helvetica, sans-serif',
              textAlign: align,
              width: '100%',
              height: heightPx ? '100%' : undefined,
            }}
            className="px-0.5 py-0.2 select-none text-black box-border"
          >
            {element.text}
          </div>
        ))}

      {element.type === 'barcode' && (
        <div className="flex flex-col items-start select-none">
          <BarcodeVisual widthPx={(Number(element.width) || 34) * scale} heightPx={(Number(element.height) || 7.5) * scale} text={element.text} />
        </div>
      )}

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

      {element.type === 'table' && (
        <div
          style={{
            width: widthPx ? `${widthPx}px` : '100%',
            fontFamily: element.fontFamily ? `${element.fontFamily}, sans-serif` : 'Tahoma, sans-serif',
            fontSize: `${(Number(element.fontSize) || 9) * zoom}px`,
          }}
          className="select-none flex flex-col bg-white border border-dashed border-sky-400 rounded-xs overflow-hidden shadow-xs"
        >
          <div className="bg-sky-50 px-1.5 py-0.5 text-[9px] text-sky-800 font-mono font-medium flex items-center justify-between border-b border-sky-200">
            <span>🔁 Looping: [ {element.dataKey || 'data'} ]</span>
            <span className="text-[8px] text-sky-600 font-sans">Auto-push Y saat cetak</span>
          </div>

          <table className="w-full border-collapse table-fixed">
            {element.showHeader !== false && (
              <thead>
                <tr className="border-b-2 border-black font-bold">
                  {(element.columns || []).map((col, idx) => (
                    <th
                      key={idx}
                      style={{
                        width: col.width ? `${col.width * scale}px` : undefined,
                        textAlign: col.align || 'left',
                        padding: '1px 3px',
                      }}
                      className="truncate text-black leading-tight"
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {/* Row sample 1 */}
              <tr style={{ height: `${(element.rowHeight || 5.5) * scale}px` }} className="border-b border-dashed border-slate-200">
                {(element.columns || []).map((col, idx) => (
                  <td
                    key={idx}
                    style={{
                      width: col.width ? `${col.width * scale}px` : undefined,
                      textAlign: col.align || 'left',
                      padding: '1px 3px',
                    }}
                    className="truncate text-slate-700 leading-tight"
                  >
                    {col.key === 'qty' ? '10 Roll' : col.key === 'kain' ? 'Cotton Combed 30s' : `{${col.key}}`}
                  </td>
                ))}
              </tr>
              {/* Row sample 2 */}
              <tr style={{ height: `${(element.rowHeight || 5.5) * scale}px` }}>
                {(element.columns || []).map((col, idx) => (
                  <td
                    key={idx}
                    style={{
                      width: col.width ? `${col.width * scale}px` : undefined,
                      textAlign: col.align || 'left',
                      padding: '1px 3px',
                    }}
                    className="truncate text-slate-700 leading-tight"
                  >
                    {col.key === 'qty' ? '5 Roll' : col.key === 'kain' ? 'Fleece Pe Soft' : `{${col.key}}`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {element.type === 'band' && (
        <div
          style={{
            width: widthPx ? `${widthPx}px` : '100%',
            height: heightPx ? `${heightPx}px` : `${8 * scale}px`,
          }}
          className="relative select-none border-2 border-dashed border-indigo-400 bg-indigo-50/20 rounded-xs flex flex-col justify-between overflow-hidden"
        >
          <div className="bg-indigo-600 text-white px-1.5 py-0.5 text-[9px] font-mono flex items-center justify-between tracking-tight shadow-xs">
            <span className="font-bold flex items-center gap-1">
              <span>🔁</span>
              <span>AREA DATA BERULANG: [ {element.dataKey || 'data'} ]</span>
            </span>
            <span className="text-[8px] text-indigo-100 font-sans">Tinggi 1 baris: {element.height || 8}mm</span>
          </div>

          <div className="flex-1 flex items-center justify-center pointer-events-none opacity-40">
            <span className="text-[10px] text-indigo-700 font-medium italic">
              ⬇️ Drag teks / variabel ke sini sebagai template 1 baris (otomatis diulang) ⬇️
            </span>
          </div>

          <div className="border-t border-dashed border-indigo-300 px-1 py-0.2 text-[8px] text-indigo-500 font-mono text-right pointer-events-none">
            Batas baris template (Auto-push Y saat cetak)
          </div>
        </div>
      )}

      {showResizeHandles &&
        !element.locked &&
        handles.map((handle) => (
          <div
            key={handle}
            onPointerDown={(e) => onResizePointerDown(e, element, handle)}
            className="absolute w-2 h-2 bg-white border border-blue-600 z-50"
            style={{
              ...HANDLE_STYLE[handle],
              cursor: HANDLE_CURSOR[handle],
            }}
          />
        ))}
    </div>
  );
};
