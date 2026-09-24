import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import Input from '@/components/ui/inputs/input';
import { ElementType, TagItem } from '../types';

interface ToolboxSidebarProps {
  onAddElement: (type: ElementType, customText?: string) => void;
  tags?: TagItem[];
  newTagInput?: string;
  onChangeNewTagInput?: (val: string) => void;
  onAddCustomTag?: (e: React.FormEvent) => void;
  onDeleteCustomTag?: (tag: string, e: React.MouseEvent) => void;
}

export const ToolboxSidebar: React.FC<ToolboxSidebarProps> = ({
  onAddElement,
  tags = [],
  newTagInput = '',
  onChangeNewTagInput,
  onAddCustomTag,
  onDeleteCustomTag,
}) => {
  const customTags = tags.filter((t) => t.isCustom);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 overflow-y-auto">
      <Typography as="h2" className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
        + Tambah Elemen
      </Typography>

      <div className="grid grid-cols-1 gap-2 mb-4">
        <button
          type="button"
          onClick={() => onAddElement('text')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-pointer"
        >
          <Typography as="h3" className="text-base text-navy-100 font-bold w-5 text-center">
            T
          </Typography>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Teks / Variabel
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Label, nama kain, warna, dll
            </Typography>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onAddElement('barcode')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-pointer"
        >
          <Typography as="global-strong" className="text-sm text-slate-800 font-mono tracking-tighter w-5 text-center">
            ||||
          </Typography>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Barcode Code128
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Barcode roll kain otomatis
            </Typography>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onAddElement('line')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-pointer"
        >
          <Typography as="global-strong" className="text-base text-slate-500 font-bold w-5 text-center">
            —
          </Typography>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Garis Pemisah
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Garis lurus / putus-putus
            </Typography>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onAddElement('image')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-pointer"
        >
          <span className="text-base text-emerald-600 w-5 text-center">🖼️</span>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Gambar / Logo
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Logo brand, ikon halal, SNI, dll
            </Typography>
          </div>
        </button>
      </div>

      {/* Buat Tag Variabel */}
      {onAddCustomTag && onChangeNewTagInput && (
        <div className="mb-4 p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg">
          <Typography as="global-strong" className="text-xs font-bold text-navy-100 mb-1.5 flex items-center gap-1.5">
            <span>➕</span>
            <span>Buat Tag Variabel</span>
          </Typography>
          <form onSubmit={onAddCustomTag} className="flex gap-1.5">
            <Input
              type="text"
              value={newTagInput}
              onChange={(e) => onChangeNewTagInput(e.target.value)}
              placeholder="Misal: NoPO, Lot..."
              className="flex-1 !h-7 !py-0.5 !px-2 !text-xs bg-white border-blue-300 font-medium text-slate-800"
            />
            <Button type="submit" size="sm" variant="contain" color="navy" rounded className="!h-7 !text-xs">
              + Buat
            </Button>
          </form>

          {/* Daftar Tag Kustom yang Telah Dibuat */}
          {customTags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-blue-200/60 flex flex-wrap gap-1 max-h-28 overflow-y-auto">
              {customTags.map((t) => (
                <div
                  key={t.tag}
                  onClick={() => onAddElement('text', t.tag)}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white border border-blue-300 hover:border-blue-400 rounded text-[10px] font-mono text-navy-100 hover:bg-blue-50 cursor-pointer transition select-none shadow-2xs"
                  title="Klik untuk menambahkan tag ini ke kanvas"
                >
                  <span>{t.tag}</span>
                  {onDeleteCustomTag && (
                    <button
                      type="button"
                      onClick={(e) => onDeleteCustomTag(t.tag, e)}
                      className="text-slate-400 hover:text-red-600 px-0.5 cursor-pointer"
                      title="Hapus tag ini"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
        <Typography as="global-strong" className="font-medium text-slate-600 mb-1 block text-xs">
          ⌨️ Shortcut Keyboard:
        </Typography>
        <Typography as="global-hint" className="block text-[11px] text-slate-500">
          <kbd className="bg-slate-200 px-1 rounded text-slate-700 font-mono">Ctrl + Z</kbd> : Undo (Kembalikan)
        </Typography>
        <Typography as="global-hint" className="block text-[11px] text-slate-500">
          <kbd className="bg-slate-200 px-1 rounded text-slate-700 font-mono">Ctrl + Y</kbd> : Redo
        </Typography>
        <Typography as="global-hint" className="block text-[11px] text-slate-500">
          <kbd className="bg-slate-200 px-1 rounded text-slate-700 font-mono">Del</kbd> : Hapus elemen terpilih
        </Typography>
      </div>
    </aside>
  );
};
