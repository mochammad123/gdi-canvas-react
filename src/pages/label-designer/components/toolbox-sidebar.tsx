import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import Input from '@/components/ui/inputs/input';
import { DND_ELEMENT_MIME } from '../constants';
import { ElementType, TagItem } from '../types';
import { serializeToolboxDrag } from '../utils';

interface ToolboxSidebarProps {
  onAddElement: (type: ElementType, customText?: string) => void;
  tags?: TagItem[];
  newTagInput?: string;
  onChangeNewTagInput?: (val: string) => void;
  onAddCustomTag?: (e: React.FormEvent) => void;
  onDeleteCustomTag?: (tag: string, e: React.MouseEvent) => void;
}

const startToolboxDrag = (e: React.DragEvent, type: ElementType, text?: string) => {
  const payload = serializeToolboxDrag({ type, text });
  e.dataTransfer.setData(DND_ELEMENT_MIME, payload);
  e.dataTransfer.setData('text/plain', payload);
  e.dataTransfer.effectAllowed = 'copy';
};

export const ToolboxSidebar: React.FC<ToolboxSidebarProps> = ({
  onAddElement,
  tags = [],
  newTagInput = '',
  onChangeNewTagInput,
  onAddCustomTag,
  onDeleteCustomTag,
}) => {
  const customTags = tags.filter((t) => t.isCustom);
  const presetTags = tags.filter((t) => !t.isCustom);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 overflow-y-auto">
      <Typography as="h2" className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
        + Tambah Elemen
      </Typography>
      <Typography as="global-hint" className="text-[10px] text-slate-400 mb-3 block">
        Klik atau drag ke kanvas
      </Typography>

      <div className="grid grid-cols-1 gap-2 mb-4">
        {/* Teks Statis */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'text', 'Teks Label')}
          onClick={() => onAddElement('text', 'Teks Label')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
        >
          <Typography as="h3" className="text-base text-navy-100 font-bold w-5 text-center">
            T
          </Typography>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Teks Statis
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Judul nota, label, teks tetap
            </Typography>
          </div>
        </button>

        {/* Variabel Dinamis */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'text', '{{nama_variabel}}')}
          onClick={() => onAddElement('text', '{{nama_variabel}}')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
        >
          <Typography as="h3" className="text-sm text-purple-600 font-mono font-bold w-5 text-center">
            {'{x}'}
          </Typography>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Variabel Dinamis
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Tag otomatis: nama, no nota, dll
            </Typography>
          </div>
        </button>

        {/* Area Data Berulang (Loop Band) */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'band')}
          onClick={() => onAddElement('band')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
        >
          <span className="text-base text-indigo-600 w-5 text-center">🔁</span>
          <div>
            <Typography as="global-strong" className="font-semibold text-slate-800 block text-xs">
              Area Data Berulang
            </Typography>
            <Typography as="global-hint" className="text-[10px] text-slate-500 block">
              Template baris struk belanja / item
            </Typography>
          </div>
        </button>

        {/* Barcode Code128 */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'barcode')}
          onClick={() => onAddElement('barcode')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
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

        {/* Garis Pemisah */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'line')}
          onClick={() => onAddElement('line')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
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

        {/* Gambar / Logo */}
        <button
          type="button"
          draggable
          onDragStart={(e) => startToolboxDrag(e, 'image')}
          onClick={() => onAddElement('image')}
          className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700 transition text-left cursor-grab active:cursor-grabbing"
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

      {presetTags.length > 0 && (
        <div className="mb-4">
          <Typography as="global-strong" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
            Tag siap pakai
          </Typography>
          <div className="flex flex-wrap gap-1">
            {presetTags.map((t) => (
              <div
                key={t.tag}
                draggable
                onDragStart={(e) => startToolboxDrag(e, t.tag.includes('NoRoll') ? 'barcode' : 'text', t.tag)}
                onClick={() => onAddElement(t.tag.includes('NoRoll') ? 'barcode' : 'text', t.tag)}
                className="inline-flex items-center px-1.5 py-0.5 bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded text-[10px] font-mono text-slate-600 cursor-grab active:cursor-grabbing transition select-none"
                title="Drag ke kanvas atau klik untuk menambah"
              >
                {t.tag}
              </div>
            ))}
          </div>
        </div>
      )}

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
              className="flex-1 h-7! py-0.5! px-2! text-xs! bg-white border-blue-300 font-medium text-slate-800"
            />
            <Button type="submit" size="sm" variant="contain" color="navy" rounded className="h-7! text-xs!">
              + Buat
            </Button>
          </form>

          {customTags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-blue-200/60 flex flex-wrap gap-1 max-h-28 overflow-y-auto">
              {customTags.map((t) => (
                <div
                  key={t.tag}
                  draggable
                  onDragStart={(e) => startToolboxDrag(e, 'text', t.tag)}
                  onClick={() => onAddElement('text', t.tag)}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white border border-blue-300 hover:border-blue-400 rounded text-[10px] font-mono text-navy-100 hover:bg-blue-50 cursor-grab active:cursor-grabbing transition select-none shadow-2xs"
                  title="Drag ke kanvas atau klik untuk menambah"
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
    </aside>
  );
};
