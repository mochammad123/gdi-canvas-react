import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import { LabelElement, LabelTemplate, TokenData } from '../types';
import { BarcodeVisual } from './barcode-visual';

interface PreviewModalProps {
  open: boolean;
  template: LabelTemplate;
  onClose: () => void;
}

const formatTokens = (str: string, data?: TokenData): string => {
  if (!str) return '';
  if (!data) return str;
  let res = str;
  for (const [k, v] of Object.entries(data)) {
    if (v === null || v === undefined) continue;
    res = res.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
  }
  return res;
};

/** Preview 1:1 memakai unit CSS mm (mendekati ukuran cetak aktual di layar). */
export const PreviewModal: React.FC<PreviewModalProps> = ({ open, template, onClose }) => {
  if (!open) return null;

  const loopBand = template.elements.find((el) => el.type === 'band');
  const sampleItems: TokenData[] = [
    { kain: 'Cotton Combed 30s Cocomelon', qty: '5', harga: 'Rp 2.500.000' },
    { kain: 'Cotton Fleece CocoManggo', qty: '6', harga: 'Rp 3.100.000' },
    { kain: 'Baby Terry Jet Black', qty: '3', harga: 'Rp 1.550.000' },
  ];
  const bHeight = loopBand?.height || 8.0;
  const isChildOfBand = new Set<string>();
  const bandChildren: LabelElement[] = [];

  if (loopBand) {
    template.elements.forEach((el) => {
      if (el.id !== loopBand.id && el.type !== 'band') {
        if (el.bandId === loopBand.id || (el.y >= loopBand.y && el.y < loopBand.y + bHeight)) {
          isChildOfBand.add(el.id);
          bandChildren.push(el);
        }
      }
    });
  }

  const bandShiftY = loopBand ? (sampleItems.length - 1) * bHeight : 0;
  const effectiveHeightMm = template.height_mm + bandShiftY;

  const renderSingleItem = (el: LabelElement, yMm: number, data?: TokenData, keySuffix = '') => {
    if (el.type === 'text') {
      const displayText = formatTokens(el.text || '', data);
      return (
        <div
          key={`${el.id}${keySuffix}`}
          style={{
            position: 'absolute',
            left: `${el.x}mm`,
            top: `${yMm}mm`,
            width: el.width ? `${el.width}mm` : undefined,
            height: el.height ? `${el.height}mm` : undefined,
            fontSize: `${el.fontSize || 10}px`,
            fontWeight: el.bold ? 700 : 400,
            fontFamily: el.fontFamily ? `${el.fontFamily}, sans-serif` : 'Tahoma, sans-serif',
            textAlign: el.align || 'left',
            lineHeight: 1.1,
            whiteSpace: el.width ? 'normal' : 'nowrap',
            overflow: 'hidden',
          }}
        >
          {displayText}
        </div>
      );
    }

    if (el.type === 'barcode') {
      const wMm = el.width || 34;
      const hMm = el.height || 7.5;
      const codeText = formatTokens(el.text || '', data);
      return (
        <div key={`${el.id}${keySuffix}`} style={{ position: 'absolute', left: `${el.x}mm`, top: `${yMm}mm` }}>
          <BarcodeVisual widthPx={wMm * 3.78} heightPx={hMm * 3.78} text={codeText} />
        </div>
      );
    }

    if (el.type === 'line') {
      return (
        <div
          key={`${el.id}${keySuffix}`}
          style={{
            position: 'absolute',
            left: `${el.x}mm`,
            top: `${yMm}mm`,
            width: `${el.width || template.width_mm - 4}mm`,
            borderTop: el.dashed ? '1.5px dashed #000' : '1.5px solid #000',
          }}
        />
      );
    }

    if (el.type === 'image') {
      const src = formatTokens(el.src || el.text || '', data);
      return (
        <div
          key={`${el.id}${keySuffix}`}
          style={{
            position: 'absolute',
            left: `${el.x}mm`,
            top: `${yMm}mm`,
            width: `${el.width || 15}mm`,
            height: `${el.height || 15}mm`,
            overflow: 'hidden',
          }}
        >
          {src && !src.startsWith('{{') ? (
            <img src={src} alt="" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full border border-dashed border-slate-300 text-[8px] text-slate-400 flex items-center justify-center">
              {src || 'Image'}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-110 bg-slate-900/50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-lg border border-slate-200 max-w-[95vw] max-h-[95vh] overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <Typography as="h2" className="text-sm font-bold text-slate-800">
              Preview 1:1
            </Typography>
            <Typography as="global-hint" className="text-xs text-slate-500 block">
              Ukuran cetak: {template.width_mm} × {Math.round(effectiveHeightMm * 10) / 10} mm (CSS mm)
              {loopBand && ' (Simulasi 3 baris data berulang)'}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="outline" color="navy" rounded onClick={() => window.print()}>
              Cetak
            </Button>
            <Button type="button" size="sm" variant="contain" color="navy" rounded onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>

        <div
          className="relative bg-white border border-slate-400 mx-auto overflow-hidden print:border-0 shadow-sm"
          style={{
            width: `${template.width_mm}mm`,
            height: `${effectiveHeightMm}mm`,
          }}
        >
          {template.elements.map((el) => {
            if (isChildOfBand.has(el.id)) return null;

            if (el.type === 'band') {
              return (
                <React.Fragment key={el.id}>
                  {sampleItems.map((item, rowIdx) => {
                    const rowOffset = rowIdx * bHeight;
                    return bandChildren.map((child) => {
                      const childRelY = child.y - el.y;
                      const actualY = el.y + rowOffset + childRelY;
                      return renderSingleItem(child, actualY, item, `_row${rowIdx}`);
                    });
                  })}
                </React.Fragment>
              );
            }

            // Elemen normal (di atas atau di bawah band)
            const yMm = el.y + (loopBand && el.y >= loopBand.y + bHeight ? bandShiftY : 0);
            return renderSingleItem(el, yMm);
          })}
        </div>
      </div>
    </div>
  );
};
