import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionLine: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'line') return null;

  return (
    <div>
      <InputwithLabel
        label="Panjang Garis (mm):"
        type="number"
        step="1"
        value={element.width ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          onUpdate({ width: val === '' ? undefined : Number(val) });
        }}
        onBlur={() => {
          if (element.width === undefined || Number(element.width) < 1) onUpdate({ width: 76 });
        }}
        classNameInput="h-9! py-1! text-xs bg-white font-medium"
      />
      <div className="mt-3">
        <Typography as="global-report-title" className="inline-block text-black-100 mb-1.5">
          Bentuk Garis:
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            size="sm"
            variant={!element.dashed ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ dashed: false })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium"
          >
            Lurus (Solid)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={element.dashed ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ dashed: true })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium"
          >
            Putus-Putus
          </Button>
        </div>
      </div>
    </div>
  );
};
