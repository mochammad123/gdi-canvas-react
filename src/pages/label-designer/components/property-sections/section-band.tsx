import React from 'react';
import { Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';

export const SectionBand: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'band') return null;

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 space-y-1">
        <Typography as="global-strong" className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
          <span>🔁</span> Area Data Berulang (Band)
        </Typography>
        <Typography as="global-hint" className="text-[11px] text-indigo-800 leading-relaxed block">
          Area ini berfungsi sebagai <b>Template Baris</b>. Letakkan elemen teks / variabel di dalam area ini agar otomatis berulang per item saat
          dicetak.
        </Typography>
      </div>

      <InputwithLabel
        label="Key Data (Array di JSON):"
        type="text"
        value={element.dataKey || 'data'}
        onChange={(e) => onUpdate({ dataKey: e.target.value })}
        classNameInput="h-9! py-1! text-xs bg-white font-mono font-medium"
        placeholder="data / items / list"
      />
      <Typography as="global-hint" className="text-[10px] text-slate-400 -mt-2 block">
        Contoh: jika format JSON adalah <code>{`{ "data": [ ... ] }`}</code>, isi dengan <b>data</b>.
      </Typography>

      <div className="grid grid-cols-2 gap-3 items-start">
        <InputwithLabel
          label="Tinggi Baris (mm):"
          type="number"
          step="0.5"
          min="3"
          max="50"
          value={element.height ?? 8}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ height: val === '' ? undefined : Number(val) });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />

        <InputwithLabel
          label="Lebar Area (mm):"
          type="number"
          step="1"
          min="10"
          value={element.width ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ width: val === '' ? undefined : Number(val) });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
          placeholder="Auto"
        />
      </div>
      <Typography as="global-hint" className="text-[10px] text-slate-400 -mt-2 block">
        Tinggi baris menentukan jarak vertikal antar item saat data di-looping ke bawah.
      </Typography>

      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md space-y-1.5 text-[11px] text-slate-600 leading-normal">
        <Typography as="global-strong" className="font-semibold text-slate-700 block">
          📌 Petunjuk:
        </Typography>
        <p>
          • <b>Variabel Dinamis:</b> Drag <code>{`{{kain}}`}</code> atau <code>{`{{qty}}`}</code> ke dalam kotak ini.
        </p>
        <p>
          • <b>Teks Statis:</b> Teks statis di dalam area ini (seperti <i>Roll</i> atau <i>Rp</i>) ikut berulang.
        </p>
        <p>
          • <b>Header / Footer:</b> Elemen di luar kotak (di atas / bawah) hanya dicetak 1x. Footer otomatis terdorong turun ke bawah.
        </p>
      </div>
    </div>
  );
};
