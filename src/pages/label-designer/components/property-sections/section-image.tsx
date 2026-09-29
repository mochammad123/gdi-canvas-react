import React from 'react';
import { Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionImage: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'image') return null;

  return (
    <div className="space-y-3">
      <InputwithLabel
        label="Sumber Gambar (File / Base64 / Tag):"
        type="text"
        value={element.src || ''}
        onChange={(e) => onUpdate({ src: e.target.value })}
        classNameInput="h-9! py-1! text-xs bg-white font-medium font-mono"
        placeholder="assets/logo.png atau {{logo}}..."
      />

      <div>
        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-md text-xs font-semibold cursor-pointer transition">
          <span>📁</span>
          <span>Unggah Gambar dari Komputer</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') onUpdate({ src: reader.result });
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
        <Typography as="global-hint" className="text-[10px] text-slate-400 mt-1 block">
          Mendukung PNG transparan, JPG, & GIF. Gambar otomatis di-embed sebagai Base64.
        </Typography>
      </div>

      <div>
        <Typography as="global-report-title" className="text-[10px] text-slate-400 font-semibold block mb-1">
          TAG DINAMIS GAMBAR:
        </Typography>
        <div className="flex flex-wrap gap-1">
          {['{{logo}}', '{{logo_perusahaan}}', '{{qr_code}}'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onUpdate({ src: t })}
              className="text-[10px] px-1.5 py-0.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 rounded border border-slate-200 cursor-pointer transition font-mono"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

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
            if (element.width === undefined || Number(element.width) < 1) onUpdate({ width: 15 });
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
            if (element.height === undefined || Number(element.height) < 1) onUpdate({ height: 15 });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />
      </div>
    </div>
  );
};
