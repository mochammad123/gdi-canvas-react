export type ElementType = 'text' | 'barcode' | 'line' | 'image';
export type TextAlign = 'left' | 'center' | 'right';

export interface LabelElement {
  id: string;
  type: ElementType;
  x: number; // in mm
  y: number; // in mm
  text?: string;
  fontSize?: number; // in px (e.g. 9, 10, 12, 14, 16)
  bold?: boolean;
  align?: TextAlign; // 'left' | 'center' | 'right'
  width?: number; // in mm (for barcode, line length, or image)
  height?: number; // in mm (for barcode or image)
  dashed?: boolean; // for line
  dot_width?: number; // 1: Padat, 2: Standar, 3: Renggang
  src?: string; // Path file, URL, Base64 (data:image/...) atau tag variabel {{logo}}
}

export interface LabelTemplate {
  name: string;
  width_mm: number;
  height_mm: number;
  elements: LabelElement[];
}

export interface TagItem {
  label: string;
  tag: string;
  isCustom?: boolean;
}

export interface ZoomOption {
  label: string;
  value: number;
}
