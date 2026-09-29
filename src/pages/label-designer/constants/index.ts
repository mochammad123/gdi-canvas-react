import { LabelTemplate, TagItem, ZoomOption } from '../types';

export const BASE_SCALE = 4.0; // 1 mm = 4 px at 100% zoom

export const STORAGE_KEY_TEMPLATE = 'knitto_label_template';
export const STORAGE_KEY_TAGS = 'knitto_custom_tags';

export const DEFAULT_TEMPLATE: LabelTemplate = {
  name: 'Label Kain 80x30',
  width_mm: 80,
  height_mm: 30,
  elements: [
    { id: 'el_1', type: 'text', x: 2.0, y: 1.5, text: 'Roll Induk', fontSize: 9, bold: true },
    { id: 'el_2', type: 'text', x: 40.0, y: 1.5, text: 'Roll Pecahan', fontSize: 9, bold: true },
    { id: 'el_3', type: 'text', x: 2.0, y: 4.5, text: '{{RollInduk}}', fontSize: 10, bold: true },
    { id: 'el_4', type: 'text', x: 40.0, y: 4.5, text: '{{RollPecah}}', fontSize: 10, bold: true },
    { id: 'el_5', type: 'text', x: 2.0, y: 8.5, text: '{{JenisKain}}', fontSize: 10, bold: true },
    { id: 'el_6', type: 'text', x: 2.0, y: 12.5, text: '{{Warna}}', fontSize: 9, bold: true },
    { id: 'el_7', type: 'barcode', x: 2.0, y: 17.0, width: 34.0, height: 7.5, text: '{{NoRoll}}' },
    { id: 'el_8', type: 'text', x: 42.0, y: 19.0, text: '{{NoData}}', fontSize: 10, bold: true },
    { id: 'el_9', type: 'text', x: 62.0, y: 18.5, text: '{{KodeUnik}}', fontSize: 12, bold: true },
    { id: 'el_10', type: 'line', x: 0, y: 26.0, width: 76.0, dashed: false },
  ],
};

export const AVAILABLE_TAGS: TagItem[] = [
  { label: 'Roll Induk', tag: '{{RollInduk}}' },
  { label: 'Roll Pecahan', tag: '{{RollPecah}}' },
  { label: 'Jenis Kain', tag: '{{JenisKain}}' },
  { label: 'Warna', tag: '{{Warna}}' },
  { label: 'No. Roll (Barcode)', tag: '{{NoRoll}}' },
  { label: 'No. Data', tag: '{{NoData}}' },
  { label: 'Kode Unik', tag: '{{KodeUnik}}' },
];

export const ZOOM_OPTIONS: ZoomOption[] = [
  { label: '100%', value: 1.0 },
  { label: '125%', value: 1.25 },
  { label: '150% (Nyaman)', value: 1.5 },
  { label: '200% (Besar)', value: 2.0 },
  { label: '250% (Detail)', value: 2.5 },
];

/** MIME type untuk drag & drop elemen dari toolbox ke canvas */
export const DND_ELEMENT_MIME = 'application/x-knitto-label-element';
