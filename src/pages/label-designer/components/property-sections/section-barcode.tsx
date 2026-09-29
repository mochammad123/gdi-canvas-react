import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionBarcode: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'barcode') return null;

  const activeDotWidth = element.dot_width ?? (element.width && element.width >= 50 ? 3 : element.width && element.width < 30 ? 1 : 2);

  return (
    <div className="space-y-3">
      <InputwithLabel
        label="Nilai / Tag Barcode:"
        type="text"
        value={element.text || ''}
        onChange={(e) => onUpdate({ text: e.target.value })}
        classNameInput="h-9! py-1! text-xs bg-white font-medium"
        placeholder="Ketik teks atau pilih tag di bawah..."
      />

      <div className="grid grid-cols-2 gap-3 items-start">
        <InputwithLabel
          label="Lebar (mm):"
          type="number"
          step="0.5"
          value={element.width ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ width: val === '' ? undefined : Number(val) });
          }}
          onBlur={() => {
            if (element.width === undefined || Number(element.width) < 1) onUpdate({ width: 34 });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />
        <InputwithLabel
          label="Tinggi (mm):"
          type="number"
          step="0.5"
          value={element.height ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ height: val === '' ? undefined : Number(val) });
          }}
          onBlur={() => {
            if (element.height === undefined || Number(element.height) < 1) onUpdate({ height: 7.5 });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <Typography as="global-report-title" className="inline-block text-black-100">
          Jarak & Kerapatan Garis Barcode:
        </Typography>
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            type="button"
            size="sm"
            variant={activeDotWidth === 2 ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ dot_width: 2, width: 36 })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium"
            title="Standar (2 Dot)"
          >
            Standar
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeDotWidth === 3 ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ dot_width: 3, width: 54 })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium"
            title="Renggang (3 Dot)"
          >
            Renggang
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeDotWidth === 1 ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ dot_width: 1, width: 22 })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium"
            title="Padat (1 Dot)"
          >
            Padat
          </Button>
        </div>
        <Typography as="global-hint" className="text-[10px] text-slate-400 mt-0.5 block">
          Pilih <b>Renggang (3 Dot)</b> untuk garis tebal dan jarak celah putih yang paling lebar.
        </Typography>
      </div>
    </div>
  );
};
