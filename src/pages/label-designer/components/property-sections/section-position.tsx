import React from 'react';
import { Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionPosition: React.FC<ElementSectionProps> = ({ element, onUpdate }) => (
  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
    <Typography as="global-strong" className="text-xs font-bold text-slate-700 mb-2 block">
      Koordinat Posisi (mm):
    </Typography>
    <div className="grid grid-cols-2 gap-2">
      <InputwithLabel
        label="Posisi X (mm):"
        type="number"
        step="0.1"
        value={element.x ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          if (val === '') return;
          onUpdate({ x: Number(val) });
        }}
        onBlur={() => {
          if (Number.isNaN(Number(element.x))) onUpdate({ x: 0 });
        }}
        classNameInput="h-7 text-xs bg-white font-mono"
      />
      <InputwithLabel
        label="Posisi Y (mm):"
        type="number"
        step="0.1"
        value={element.y ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          if (val === '') return;
          onUpdate({ y: Number(val) });
        }}
        onBlur={() => {
          if (Number.isNaN(Number(element.y))) onUpdate({ y: 0 });
        }}
        classNameInput="h-7 text-xs bg-white font-mono"
      />
    </div>
    <Typography as="global-hint" className="text-[10px] text-slate-400 mt-2 block">
      Posisi ini otomatis terupdate saat kamu menggeser elemen di kanvas.
    </Typography>
  </div>
);
