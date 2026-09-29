import { ElementType, LabelElement } from '../types';

export const createLabelElement = (
  type: ElementType,
  options: {
    widthMm: number;
    customText?: string;
    position?: { x: number; y: number };
  }
): LabelElement => {
  const newId = `el_${Date.now()}`;
  const posX = options.position?.x;
  const posY = options.position?.y;

  if (type === 'barcode') {
    return {
      id: newId,
      type: 'barcode',
      x: posX ?? 5.0,
      y: posY ?? 10.0,
      width: 35.0,
      height: 8.0,
      text: options.customText || '{{NoRoll}}',
    };
  }

  if (type === 'line') {
    const lineX = posX ?? 0;
    return {
      id: newId,
      type: 'line',
      x: lineX,
      y: posY ?? 25.0,
      width: Math.max(2, options.widthMm - lineX - 2),
      dashed: false,
    };
  }

  if (type === 'image') {
    return {
      id: newId,
      type: 'image',
      x: posX ?? 5.0,
      y: posY ?? 5.0,
      width: 15.0,
      height: 15.0,
      src: options.customText || '',
    };
  }

  if (type === 'band') {
    const bandWidth = Math.max(30, options.widthMm - 4.0);
    return {
      id: newId,
      type: 'band',
      x: posX ?? 2.0,
      y: posY ?? 25.0,
      width: bandWidth,
      height: 8.0,
      dataKey: 'data',
    };
  }

  if (type === 'table') {
    const tableWidth = Math.max(30, options.widthMm - 6.0);
    return {
      id: newId,
      type: 'table',
      x: posX ?? 3.0,
      y: posY ?? 25.0,
      width: tableWidth,
      height: 16.5, // 3 baris * 5.5mm
      dataKey: 'data',
      rowHeight: 5.5,
      fontSize: 9,
      fontFamily: 'Tahoma',
      showHeader: true,
      columns: [
        { key: 'kain', title: 'Nama Kain', width: Math.round(tableWidth * 0.65), align: 'left' },
        { key: 'qty', title: 'Qty', width: Math.round(tableWidth * 0.35), align: 'right' },
      ],
    };
  }

  return {
    id: newId,
    type: 'text',
    x: posX ?? 5.0,
    y: posY ?? 5.0,
    text: options.customText || 'Teks Baru',
    fontSize: 10,
    bold: true,
  };
};
