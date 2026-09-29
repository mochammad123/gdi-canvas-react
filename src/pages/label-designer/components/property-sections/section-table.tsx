import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { ElementSectionProps } from './types';
import { TableColumn } from '../../types';

export const SectionTable: React.FC<ElementSectionProps> = ({ element, onUpdate }) => {
  if (element.type !== 'table') return null;

  const columns: TableColumn[] = element.columns || [];
  const showHeader = element.showHeader !== false;

  const handleAddColumn = () => {
    const newCol: TableColumn = {
      title: `Kolom ${columns.length + 1}`,
      key: `col_${columns.length + 1}`,
      width: 20,
      align: 'left',
    };
    onUpdate({ columns: [...columns, newCol] });
  };

  const handleUpdateColumn = (index: number, updates: Partial<TableColumn>) => {
    const next = [...columns];
    next[index] = { ...next[index], ...updates };
    onUpdate({ columns: next });
  };

  const handleDeleteColumn = (index: number) => {
    if (columns.length <= 1) return;
    const next = columns.filter((_, i) => i !== index);
    onUpdate({ columns: next });
  };

  return (
    <div className="space-y-4">
      <InputwithLabel
        label="Key Data (Array di JSON):"
        type="text"
        value={element.dataKey || 'data'}
        onChange={(e) => onUpdate({ dataKey: e.target.value })}
        classNameInput="h-9! py-1! text-xs bg-white font-mono font-medium"
        placeholder="data / items / list"
      />
      <Typography as="global-hint" className="text-[10px] text-slate-400 -mt-2 block">
        Contoh: jika JSON adalah <code>{`{ data: [...] }`}</code>, isi dengan <b>data</b>.
      </Typography>

      <div className="flex flex-col gap-y-0.5">
        <Typography as="global-report-title" className="inline-block text-black-100">
          Jenis Font:
        </Typography>
        <select
          value={element.fontFamily || 'Tahoma'}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full h-9 px-2 text-xs bg-white font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="Tahoma">Tahoma (Disarankan untuk Dot Matrix & Thermal)</option>
          <option value="Verdana">Verdana (Jelas pada Dot Matrix)</option>
          <option value="Arial">Arial (Standar Thermal)</option>
          <option value="Courier New">Courier New (Monospaced)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 items-start">
        <InputwithLabel
          label="Ukuran Font (px):"
          type="number"
          step="1"
          min="6"
          max="24"
          value={element.fontSize ?? 9}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ fontSize: val === '' ? undefined : Number(val) });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />

        <InputwithLabel
          label="Tinggi Baris (mm):"
          type="number"
          step="0.5"
          min="3"
          max="20"
          value={element.rowHeight ?? 5.5}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ rowHeight: val === '' ? undefined : Number(val) });
          }}
          classNameInput="h-9! py-1! text-xs bg-white font-medium"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <Typography as="global-report-title" className="inline-block text-black-100 text-xs font-semibold">
          Header Kolom:
        </Typography>
        <Button
          type="button"
          size="sm"
          variant={showHeader ? 'contain' : 'outline'}
          color="navy"
          rounded
          onClick={() => onUpdate({ showHeader: !showHeader })}
          className="h-8! px-3 text-xs font-medium"
        >
          {showHeader ? '✓ Tampilkan Header' : 'Sembunyikan Header'}
        </Button>
      </div>

      {/* Kolom Table */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <Typography as="h3" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Daftar Kolom ({columns.length})
          </Typography>
          <Button
            type="button"
            size="sm"
            variant="outline"
            color="navy"
            rounded
            onClick={handleAddColumn}
            className="h-7! px-2 text-[11px] font-medium"
          >
            + Tambah Kolom
          </Button>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {columns.map((col, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <Typography as="global-strong" className="font-bold text-slate-700 text-[11px]">
                  Kolom #{idx + 1}
                </Typography>
                {columns.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteColumn(idx)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm px-1 cursor-pointer"
                    title="Hapus kolom ini"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <InputwithLabel
                  label="Judul Header:"
                  type="text"
                  value={col.title}
                  onChange={(e) => handleUpdateColumn(idx, { title: e.target.value })}
                  classNameInput="h-8! py-0.5! text-xs bg-white"
                  placeholder="Nama Kolom"
                />
                <InputwithLabel
                  label="Key Field:"
                  type="text"
                  value={col.key}
                  onChange={(e) => handleUpdateColumn(idx, { key: e.target.value })}
                  classNameInput="h-8! py-0.5! text-xs bg-white font-mono"
                  placeholder="nama_field"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <InputwithLabel
                  label="Lebar (mm):"
                  type="number"
                  step="1"
                  min="5"
                  value={col.width ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdateColumn(idx, { width: val === '' ? undefined : Number(val) });
                  }}
                  classNameInput="h-8! py-0.5! text-xs bg-white"
                  placeholder="Auto"
                />

                <div className="flex flex-col gap-y-0.5">
                  <Typography as="global-hint" className="text-[10px] text-slate-600 font-medium">
                    Perataan (Align):
                  </Typography>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateColumn(idx, { align: 'left' })}
                      className={`h-7 px-1 text-[10px] font-bold rounded border ${
                        !col.align || col.align === 'left'
                          ? 'bg-navy-600 text-white border-navy-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                      title="Rata Kiri"
                    >
                      Kiri
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateColumn(idx, { align: 'center' })}
                      className={`h-7 px-1 text-[10px] font-bold rounded border ${
                        col.align === 'center'
                          ? 'bg-navy-600 text-white border-navy-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                      title="Rata Tengah"
                    >
                      Tgh
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateColumn(idx, { align: 'right' })}
                      className={`h-7 px-1 text-[10px] font-bold rounded border ${
                        col.align === 'right'
                          ? 'bg-navy-600 text-white border-navy-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                      title="Rata Kanan"
                    >
                      Kanan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Typography as="global-hint" className="text-[10px] text-slate-500 bg-sky-50 border border-sky-200 rounded p-2 block leading-relaxed">
        ℹ️ <b>Auto-Push Elemen Bawah:</b> Saat struk dicetak dengan data dinamis, seluruh elemen di bawah tabel akan otomatis bergeser ke bawah
        mengikuti jumlah baris data, dan kertas otomatis dipotong (cut) di akhir dokumen.
      </Typography>
    </div>
  );
};
