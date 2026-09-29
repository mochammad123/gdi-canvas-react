export type ElementType = 'text' | 'barcode' | 'line' | 'image' | 'table' | 'band';
export type TextAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string; // e.g. "kain", "qty", "harga"
  title: string; // e.g. "Nama Kain", "Qty"
  width: number; // in mm
  align?: TextAlign; // 'left' | 'center' | 'right'
}

export interface LabelElement {
  id: string;
  type: ElementType;
  x: number; // in mm
  y: number; // in mm
  text?: string;
  fontSize?: number; // in px (e.g. 9, 10, 12, 14, 16)
  fontFamily?: string; // 'Arial' | 'Tahoma' | 'Verdana' | 'Courier New'
  bold?: boolean;
  align?: TextAlign; // 'left' | 'center' | 'right'
  width?: number; // in mm (barcode, line, image, area teks, atau lebar tabel/band)
  height?: number; // in mm (barcode, image, area teks, atau tinggi tabel/band)
  dashed?: boolean; // for line
  dot_width?: number; // 1: Padat, 2: Standar, 3: Renggang
  locked?: boolean; // kunci posisi/ukuran
  src?: string; // Path file, URL, Base64 (data:image/...) atau tag variabel {{logo}}
  // Properti Band / Area Data Berulang:
  bandId?: string; // ID band jika elemen ini berada di dalam Area Data Berulang
  dataKey?: string; // Nama field array JSON (default: "data")
  // Properti Tabel Dinamis (legacy):
  columns?: TableColumn[]; // Daftar kolom tabel
  rowHeight?: number; // Tinggi tiap baris dalam mm (default: 5.5)
  showHeader?: boolean; // Tampilkan header judul kolom
}

export interface LabelTemplate {
  name: string;
  width_mm: number;
  height_mm: number;
  auto_height?: boolean; // true = panjang kertas dinamis mengikuti isi data
  auto_cut?: boolean; // true = otomatis potong kertas di akhir dokumen
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

/** Data baris untuk token preview ({{key}} → value). */
export type TokenData = Record<string, string | number | boolean | null | undefined>;
