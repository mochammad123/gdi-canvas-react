import React from 'react';
import { Typography } from '@knittotextile/react-ui';
import { LabelElement } from '../types';
import { SectionText } from './property-sections/section-text';
import { SectionBarcode } from './property-sections/section-barcode';
import { SectionImage } from './property-sections/section-image';
import { SectionLine } from './property-sections/section-line';
import { SectionTable } from './property-sections/section-table';
import { SectionBand } from './property-sections/section-band';
import { SectionPosition } from './property-sections/section-position';
import { SectionActions } from './property-sections/section-actions';

interface PropertySidebarProps {
  selectedElement: LabelElement | null;
  selectedCount?: number;
  onUpdateSelectedElement: (updates: Partial<LabelElement>) => void;
  onDeleteSelected: () => void;
  onToggleLock?: () => void;
  onDuplicate?: () => void;
}

export const PropertySidebar: React.FC<PropertySidebarProps> = ({
  selectedElement,
  selectedCount = 0,
  onUpdateSelectedElement,
  onDeleteSelected,
  onToggleLock,
  onDuplicate,
}) => (
  <aside className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col overflow-y-auto">
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
      <Typography as="h2" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
        ⚙️ Properti Elemen
      </Typography>
      <div className="flex items-center gap-1.5">
        {selectedCount > 1 && (
          <Typography as="global-strong" className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-700">
            {selectedCount} dipilih
          </Typography>
        )}
        {selectedElement && (
          <Typography as="global-strong" className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-100 text-blue-700">
            {selectedElement.type}
          </Typography>
        )}
      </div>
    </div>

    {selectedElement ? (
      <div className="space-y-4">
        {selectedCount > 1 && (
          <Typography as="global-hint" className="text-[11px] text-slate-500 block bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5">
            Multi-select aktif. Properti di bawah mengedit elemen terakhir yang dipilih. Hapus akan menghapus semua yang terpilih.
          </Typography>
        )}

        <SectionText element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionBarcode element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionImage element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionLine element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionBand element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionTable element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionPosition element={selectedElement} onUpdate={onUpdateSelectedElement} />
        <SectionActions
          element={selectedElement}
          selectedCount={selectedCount}
          onDelete={onDeleteSelected}
          onToggleLock={onToggleLock}
          onDuplicate={onDuplicate}
        />
      </div>
    ) : (
      <div className="h-48 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
        <span className="text-3xl mb-2">👆</span>
        <Typography as="global-hint" className="text-xs font-medium">
          Klik elemen, atau drag kotak di kanvas kosong untuk pilih banyak sekaligus.
        </Typography>
      </div>
    )}
  </aside>
);
