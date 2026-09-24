import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import { LabelElement } from '../types';

interface PropertySidebarProps {
  selectedElement: LabelElement | null;
  onUpdateSelectedElement: (updates: Partial<LabelElement>) => void;
  onDeleteSelected: () => void;
}

export const PropertySidebar: React.FC<PropertySidebarProps> = ({ selectedElement, onUpdateSelectedElement, onDeleteSelected }) => {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <Typography as="h2" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          ⚙️ Properti Elemen
        </Typography>
        {selectedElement && (
          <Typography as="global-strong" className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-100 text-blue-700">
            {selectedElement.type}
          </Typography>
        )}
      </div>

      {selectedElement ? (
        <div className="space-y-4">
          {/* Text / Field Content */}
          {(selectedElement.type === 'text' || selectedElement.type === 'barcode') && (
            <div>
              <InputwithLabel
                label={selectedElement.type === 'barcode' ? 'Nilai / Tag Barcode:' : 'Isi Teks / Tag:'}
                type="text"
                value={selectedElement.text || ''}
                onChange={(e) => onUpdateSelectedElement({ text: e.target.value })}
                classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                placeholder="Ketik teks atau pilih tag di bawah..."
              />
            </div>
          )}

          {/* Image Properties */}
          {selectedElement.type === 'image' && (
            <div className="space-y-3">
              <div>
                <InputwithLabel
                  label="Sumber Gambar (File / Base64 / Tag):"
                  type="text"
                  value={selectedElement.src || ''}
                  onChange={(e) => onUpdateSelectedElement({ src: e.target.value })}
                  classNameInput="!h-9 !py-1 text-xs bg-white font-medium font-mono"
                  placeholder="assets/logo.png atau {{logo}}..."
                />
              </div>

              {/* Upload file lokal langsung */}
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
                        if (typeof reader.result === 'string') {
                          onUpdateSelectedElement({ src: reader.result });
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <Typography as="global-hint" className="text-[10px] text-slate-400 mt-1 block">
                  Mendukung PNG transparan, JPG, & GIF. Gambar otomatis di-embed sebagai Base64.
                </Typography>
              </div>

              {/* Tag cepat untuk gambar */}
              <div>
                <Typography as="global-report-title" className="text-[10px] text-slate-400 font-semibold block mb-1">
                  TAG DINAMIS GAMBAR:
                </Typography>
                <div className="flex flex-wrap gap-1">
                  {['{{logo}}', '{{logo_perusahaan}}', '{{qr_code}}'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onUpdateSelectedElement({ src: t })}
                      className="text-[10px] px-1.5 py-0.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 rounded border border-slate-200 cursor-pointer transition font-mono"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography options (Only for text) */}
          {selectedElement.type === 'text' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 items-start">
                <InputwithLabel
                  label="Ukuran Font (px):"
                  type="number"
                  step="1"
                  min="1"
                  max="72"
                  value={selectedElement.fontSize ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSelectedElement({ fontSize: val === '' ? undefined : Number(val) });
                  }}
                  onBlur={() => {
                    if (selectedElement.fontSize === undefined || Number(selectedElement.fontSize) < 1) {
                      onUpdateSelectedElement({ fontSize: 10 });
                    }
                  }}
                  classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                />

                <div className="flex flex-col gap-y-0.5">
                  <Typography as="global-report-title" className="inline-block text-black-100">
                    Format:
                  </Typography>
                  <Button
                    type="button"
                    size="sm"
                    variant={selectedElement.bold ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => onUpdateSelectedElement({ bold: !selectedElement.bold })}
                    className="w-full !h-9 flex items-center justify-center text-xs font-bold"
                  >
                    B (Tebal)
                  </Button>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="flex flex-col gap-y-1">
                <Typography as="global-report-title" className="inline-block text-black-100">
                  Perataan Teks (Align):
                </Typography>
                <div className="grid grid-cols-3 gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant={!selectedElement.align || selectedElement.align === 'left' ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => onUpdateSelectedElement({ align: 'left' })}
                    className="w-full !h-9 flex items-center justify-center text-xs font-medium gap-1"
                    title="Rata Kiri"
                  >
                    <span>⇤</span>
                    <span>Kiri</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={selectedElement.align === 'center' ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => {
                      const w = selectedElement.width || Math.max(20, Math.round(80 - (selectedElement.x || 0) - 2));
                      onUpdateSelectedElement({ align: 'center', width: w });
                    }}
                    className="w-full !h-9 flex items-center justify-center text-xs font-medium gap-1"
                    title="Rata Tengah"
                  >
                    <span>↔</span>
                    <span>Tengah</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={selectedElement.align === 'right' ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => {
                      const w = selectedElement.width || Math.max(20, Math.round(80 - (selectedElement.x || 0) - 2));
                      onUpdateSelectedElement({ align: 'right', width: w });
                    }}
                    className="w-full !h-9 flex items-center justify-center text-xs font-medium gap-1"
                    title="Rata Kanan"
                  >
                    <span>⇥</span>
                    <span>Kanan</span>
                  </Button>
                </div>
              </div>

              {/* Lebar Kolom / Area Teks */}
              {(selectedElement.align === 'center' || selectedElement.align === 'right' || selectedElement.width) && (
                <div>
                  <InputwithLabel
                    label="Lebar Kolom / Area (mm):"
                    type="number"
                    step="1"
                    min="10"
                    max="80"
                    value={selectedElement.width ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateSelectedElement({ width: val === '' ? undefined : Number(val) });
                    }}
                    classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                    placeholder="Contoh: 36 mm"
                  />
                  <Typography as="global-hint" className="text-[10px] text-slate-400 mt-0.5 block">
                    Teks akan rata {selectedElement.align === 'right' ? 'kanan' : selectedElement.align === 'center' ? 'tengah' : 'kiri'} di dalam
                    area {selectedElement.width || 36} mm ini.
                  </Typography>
                </div>
              )}
            </div>
          )}

          {/* Dimensions (For Barcode & Line) */}
          {selectedElement.type === 'barcode' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 items-start">
                <div>
                  <InputwithLabel
                    label="Lebar (mm):"
                    type="number"
                    step="0.5"
                    value={selectedElement.width ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateSelectedElement({ width: val === '' ? undefined : Number(val) });
                    }}
                    onBlur={() => {
                      if (selectedElement.width === undefined || Number(selectedElement.width) < 1) {
                        onUpdateSelectedElement({ width: 34 });
                      }
                    }}
                    classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                  />
                </div>

                <div>
                  <InputwithLabel
                    label="Tinggi (mm):"
                    type="number"
                    step="0.5"
                    value={selectedElement.height ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateSelectedElement({ height: val === '' ? undefined : Number(val) });
                    }}
                    onBlur={() => {
                      if (selectedElement.height === undefined || Number(selectedElement.height) < 1) {
                        onUpdateSelectedElement({ height: 7.5 });
                      }
                    }}
                    classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                  />
                </div>
              </div>

              {/* Jarak / Kerapatan Garis (dot_width) */}
              <div className="flex flex-col gap-y-1">
                <Typography as="global-report-title" className="inline-block text-black-100">
                  Jarak & Kerapatan Garis Barcode:
                </Typography>
                {(() => {
                  const activeDotWidth =
                    selectedElement.dot_width ??
                    (selectedElement.width && selectedElement.width >= 50 ? 3 : selectedElement.width && selectedElement.width < 30 ? 1 : 2);

                  return (
                    <div className="grid grid-cols-3 gap-1.5">
                      <Button
                        type="button"
                        size="sm"
                        variant={activeDotWidth === 2 ? 'contain' : 'outline'}
                        color="navy"
                        rounded
                        onClick={() => onUpdateSelectedElement({ dot_width: 2, width: 36 })}
                        className="w-full !h-9 flex items-center justify-center text-xs font-medium"
                        title="Standar (2 Dot) - Celah optimal untuk ukuran kecil"
                      >
                        <span>Standar</span>
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant={activeDotWidth === 3 ? 'contain' : 'outline'}
                        color="navy"
                        rounded
                        onClick={() => onUpdateSelectedElement({ dot_width: 3, width: 54 })}
                        className="w-full !h-9 flex items-center justify-center text-xs font-medium"
                        title="Renggang (3 Dot) - Garis tebal & sangat mudah discan"
                      >
                        <span>Renggang</span>
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant={activeDotWidth === 1 ? 'contain' : 'outline'}
                        color="navy"
                        rounded
                        onClick={() => onUpdateSelectedElement({ dot_width: 1, width: 22 })}
                        className="w-full !h-9 flex items-center justify-center text-xs font-medium"
                        title="Padat (1 Dot) - Untuk barcode teks sangat panjang"
                      >
                        <span>Padat</span>
                      </Button>
                    </div>
                  );
                })()}
                <Typography as="global-hint" className="text-[10px] text-slate-400 mt-0.5 block">
                  Pilih <b>Renggang (3 Dot)</b> untuk garis tebal dan jarak celah putih yang paling lebar.
                </Typography>
              </div>
            </div>
          )}

          {/* Dimensions (For Image) */}
          {selectedElement.type === 'image' && (
            <div className="grid grid-cols-2 gap-3 items-start">
              <div>
                <InputwithLabel
                  label="Lebar (mm):"
                  type="number"
                  step="0.5"
                  value={selectedElement.width ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSelectedElement({ width: val === '' ? undefined : Number(val) });
                  }}
                  onBlur={() => {
                    if (selectedElement.width === undefined || Number(selectedElement.width) < 1) {
                      onUpdateSelectedElement({ width: 15 });
                    }
                  }}
                  classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                />
              </div>

              <div>
                <InputwithLabel
                  label="Tinggi (mm):"
                  type="number"
                  step="0.5"
                  value={selectedElement.height ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSelectedElement({ height: val === '' ? undefined : Number(val) });
                  }}
                  onBlur={() => {
                    if (selectedElement.height === undefined || Number(selectedElement.height) < 1) {
                      onUpdateSelectedElement({ height: 15 });
                    }
                  }}
                  classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
                />
              </div>
            </div>
          )}

          {selectedElement.type === 'line' && (
            <div>
              <InputwithLabel
                label="Panjang Garis (mm):"
                type="number"
                step="1"
                value={selectedElement.width ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateSelectedElement({ width: val === '' ? undefined : Number(val) });
                }}
                onBlur={() => {
                  if (selectedElement.width === undefined || Number(selectedElement.width) < 1) {
                    onUpdateSelectedElement({ width: 76 });
                  }
                }}
                classNameInput="!h-9 !py-1 text-xs bg-white font-medium"
              />
              <div className="mt-3">
                <Typography as="global-report-title" className="inline-block text-black-100 mb-1.5">
                  Bentuk Garis:
                </Typography>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={!selectedElement.dashed ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => onUpdateSelectedElement({ dashed: false })}
                    className="w-full !h-9 flex items-center justify-center text-xs font-medium"
                  >
                    <span>Lurus (Solid)</span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={selectedElement.dashed ? 'contain' : 'outline'}
                    color="navy"
                    rounded
                    onClick={() => onUpdateSelectedElement({ dashed: true })}
                    className="w-full !h-9 flex items-center justify-center text-xs font-medium"
                  >
                    <span>Putus-Putus</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Exact Coordinate Inputs */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <Typography as="global-strong" className="text-xs font-bold text-slate-700 mb-2 block">
              Koordinat Posisi (mm):
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <InputwithLabel
                  label="Posisi X (mm):"
                  type="number"
                  step="0.1"
                  value={selectedElement.x ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSelectedElement({ x: val === '' ? (undefined as unknown as number) : Number(val) });
                  }}
                  onBlur={() => {
                    if (isNaN(Number(selectedElement.x))) {
                      onUpdateSelectedElement({ x: 0 });
                    }
                  }}
                  classNameInput="h-7 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <InputwithLabel
                  label="Posisi Y (mm):"
                  type="number"
                  step="0.1"
                  value={selectedElement.y ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSelectedElement({ y: val === '' ? (undefined as unknown as number) : Number(val) });
                  }}
                  onBlur={() => {
                    if (isNaN(Number(selectedElement.y))) {
                      onUpdateSelectedElement({ y: 0 });
                    }
                  }}
                  classNameInput="h-7 text-xs bg-white font-mono"
                />
              </div>
            </div>
            <Typography as="global-hint" className="text-[10px] text-slate-400 mt-2 block">
              Posisi ini otomatis terupdate saat kamu menggeser elemen di kanvas.
            </Typography>
          </div>

          {/* Delete Button */}
          <div className="pt-2">
            <Button type="button" size="sm" variant="outline" color="burnt-orange" rounded onClick={onDeleteSelected} className="w-full">
              <span>🗑️</span>
              <span>Hapus Elemen Ini</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
          <span className="text-3xl mb-2">👆</span>
          <Typography as="global-hint" className="text-xs font-medium">
            Klik salah satu elemen di kanvas untuk memilih dan mengedit propertinya.
          </Typography>
        </div>
      )}
    </aside>
  );
};
