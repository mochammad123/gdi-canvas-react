import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionText: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'text') return null;

  return (
    <div className="space-y-3">
      <InputwithLabel
        label="Isi Teks / Tag:"
        type="text"
        value={element.text || ''}
        onChange={(e) => onUpdate({ text: e.target.value })}
        classNameInput="h-9! py-1! text-xs bg-white font-medium"
        placeholder="Ketik teks atau pilih tag di bawah..."
      />

      <div className="flex flex-col gap-y-0.5">
        <Typography as="global-report-title" className="inline-block text-black-100">
          Jenis Font:
        </Typography>
        <select
          value={element.fontFamily || 'Arial'}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full h-9 px-2 text-xs bg-white font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="Arial">Arial (Standar Thermal)</option>
          <option value="Tahoma">Tahoma (Bagus untuk Dot Matrix / TM-U220)</option>
          <option value="Verdana">Verdana (Bagus untuk Dot Matrix / TM-U220)</option>
          <option value="Courier New">Courier New (Monospaced)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 items-start">
        <InputwithLabel
          label="Ukuran Font (px):"
          type="number"
          step="1"
          min="1"
          max="72"
          value={element.fontSize ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ fontSize: val === '' ? undefined : Number(val) });
          }}
          onBlur={() => {
            if (element.fontSize === undefined || Number(element.fontSize) < 1) {
              onUpdate({ fontSize: 10 });
            }
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />

        <div className="flex flex-col gap-y-0.5">
          <Typography as="global-report-title" className="inline-block text-black-100">
            Format:
          </Typography>
          <Button
            type="button"
            size="sm"
            variant={element.bold ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ bold: !element.bold })}
            className="w-full h-9! flex items-center justify-center text-xs font-bold"
          >
            B (Tebal)
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-1">
        <Typography as="global-report-title" className="inline-block text-black-100">
          Perataan Teks (Align):
        </Typography>
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            type="button"
            size="sm"
            variant={!element.align || element.align === 'left' ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => onUpdate({ align: 'left' })}
            className="w-full h-9! flex items-center justify-center text-xs font-medium gap-1"
            title="Rata Kiri"
          >
            <span>⇤</span>
            <span>Kiri</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={element.align === 'center' ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => {
              const w = element.width || Math.max(20, Math.round(80 - (element.x || 0) - 2));
              const h = element.height || Math.max(3, ((element.fontSize || 10) / 4) * 1.2);
              onUpdate({ align: 'center', width: w, height: h });
            }}
            className="w-full h-9! flex items-center justify-center text-xs font-medium gap-1"
            title="Rata Tengah"
          >
            <span>↔</span>
            <span>Tengah</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={element.align === 'right' ? 'contain' : 'outline'}
            color="navy"
            rounded
            onClick={() => {
              const w = element.width || Math.max(20, Math.round(80 - (element.x || 0) - 2));
              const h = element.height || Math.max(3, ((element.fontSize || 10) / 4) * 1.2);
              onUpdate({ align: 'right', width: w, height: h });
            }}
            className="w-full h-9! flex items-center justify-center text-xs font-medium gap-1"
            title="Rata Kanan"
          >
            <span>⇥</span>
            <span>Kanan</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-start">
        <InputwithLabel
          label="Lebar Area (mm):"
          type="number"
          step="0.5"
          min="5"
          value={element.width ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ width: val === '' ? undefined : Number(val) });
          }}
          onBlur={() => {
            if (element.width !== undefined && Number(element.width) < 5) onUpdate({ width: 5 });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
          placeholder="Auto"
        />
        <InputwithLabel
          label="Tinggi Area (mm):"
          type="number"
          step="0.5"
          min="2"
          value={element.height ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ height: val === '' ? undefined : Number(val) });
          }}
          onBlur={() => {
            if (element.height !== undefined && Number(element.height) < 2) onUpdate({ height: 2 });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
          placeholder="Auto"
        />
      </div>
      <Typography as="global-hint" className="text-[10px] text-slate-400 -mt-1 block">
        Atur lebar & tinggi kotak teks (mm). Kosongkan untuk ukuran otomatis dari isi teks.
        {(element.align === 'center' || element.align === 'right') && ' Align tengah/kanan memakai lebar area.'}
      </Typography>
    </div>
  );
};
