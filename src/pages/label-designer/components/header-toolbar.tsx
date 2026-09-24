import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import Input from '@/components/ui/inputs/input';
import Checkbox from '@/components/ui/checkbox';
import { ZOOM_OPTIONS } from '../constants';

interface HeaderToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  widthMm: number;
  heightMm: number;
  onUpdateDimensions: (updates: { width_mm?: number; height_mm?: number }) => void;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  snapGrid: boolean;
  onChangeSnapGrid: (snap: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onUploadJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetTemplate: () => void;
  onDownloadJSON: () => void;
}

export const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  widthMm,
  heightMm,
  onUpdateDimensions,
  zoom,
  onChangeZoom,
  snapGrid,
  onChangeSnapGrid,
  fileInputRef,
  onUploadJSON,
  onResetTemplate,
  onDownloadJSON,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-xs z-10">
      <div className="flex items-center gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🏷️</span>
          <div>
            <Typography as="h1" className="font-bold text-base text-slate-800 leading-tight">
              Knitto Label Designer
            </Typography>
            <Typography as="global-hint" className="text-xs text-slate-400 block">
              Desain visual label untuk printer GDI / Zebra
            </Typography>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* Undo & Redo Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            size="sm"
            variant="outline"
            color="navy"
            rounded
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo perubahan / kembalikan yang terhapus (Ctrl + Z)"
          >
            <span>↩</span>
            <span>Undo</span>
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            color="navy"
            rounded
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo perubahan (Ctrl + Y)"
          >
            <span>↪</span>
            <span>Redo</span>
          </Button>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* Label Dimensions */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
          <Typography as="global-strong" className="font-semibold text-slate-600 text-xs">
            Ukuran:
          </Typography>
          <Input
            type="number"
            value={widthMm ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              onUpdateDimensions({ width_mm: val === '' ? undefined : Number(val) });
            }}
            onBlur={() => {
              if (!widthMm || Number(widthMm) < 1) {
                onUpdateDimensions({ width_mm: 80 });
              }
            }}
            className="!w-12 !h-6 !text-xs !py-0 !px-1 bg-white text-center font-medium"
          />
          <Typography as="global-hint" className="text-slate-400 text-xs">
            ×
          </Typography>
          <Input
            type="number"
            value={heightMm ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              onUpdateDimensions({ height_mm: val === '' ? undefined : Number(val) });
            }}
            onBlur={() => {
              if (!heightMm || Number(heightMm) < 1) {
                onUpdateDimensions({ height_mm: 30 });
              }
            }}
            className="!w-12 !h-6 !text-xs !py-0 !px-1 bg-white text-center font-medium"
          />
          <Typography as="global-hint" className="text-slate-500 font-medium text-xs">
            mm
          </Typography>
        </div>

        {/* Zoom Selector */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
          <Typography as="global-strong" className="font-semibold text-slate-600 text-xs">
            Zoom:
          </Typography>
          <select
            value={zoom}
            onChange={(e) => onChangeZoom(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded px-1.5 py-0 text-xs font-medium cursor-pointer h-6 outline-none text-slate-700"
          >
            {ZOOM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid Snap Toggle */}
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
          <Checkbox checked={snapGrid} onChecked={onChangeSnapGrid} />
          <Typography as="global-hint" className="text-xs text-slate-600">
            Snap (0.5mm)
          </Typography>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <input type="file" ref={fileInputRef} onChange={onUploadJSON} accept=".json" className="hidden" />
        <Button type="button" size="sm" variant="outline" color="navy" rounded onClick={() => fileInputRef.current?.click()}>
          <span>📂</span>
          <span>Buka Template</span>
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          color="burnt-orange"
          rounded
          onClick={onResetTemplate}
          title="Kembalikan ke template default 80x30"
        >
          ↺ Reset
        </Button>

        <Button type="button" size="sm" variant="contain" color="navy" rounded onClick={onDownloadJSON}>
          <span>💾</span>
          <span>Download Template (.json)</span>
        </Button>
      </div>
    </header>
  );
};
