import { LabelTemplate } from '../types';

/** Membersihkan format template agar angka numerik valid. */
export const sanitizeTemplate = (template: LabelTemplate): LabelTemplate => ({
  ...template,
  width_mm: Number(template.width_mm) || 80,
  height_mm: Number(template.height_mm) || 30,
  elements: template.elements.map((el) => ({
    ...el,
    x: Number(el.x) || 0,
    y: Number(el.y) || 0,
    fontSize: el.fontSize !== undefined ? Number(el.fontSize) || 10 : undefined,
    width: el.width !== undefined ? Number(el.width) || (el.type === 'line' ? 76 : 34) : undefined,
    height: el.height !== undefined ? Number(el.height) || 7.5 : undefined,
  })),
});

/** Mengunduh template sebagai file JSON. */
export const downloadTemplateJson = (template: LabelTemplate, filename?: string) => {
  const safeName = (template.name || 'label_template')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '_');
  const targetFilename = filename || `${safeName}.json`;

  const cleanTemplate = sanitizeTemplate(template);
  const jsonStr = JSON.stringify(cleanTemplate, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = targetFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/** Membaca dan memvalidasi file JSON template yang diunggah. */
export const parseTemplateJson = (file: File, onSuccess: (template: LabelTemplate) => void, onError: (errorMsg: string) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target?.result as string);
      if (parsed.width_mm && parsed.height_mm && Array.isArray(parsed.elements)) {
        onSuccess(parsed);
      } else {
        onError('Format JSON template tidak valid.');
      }
    } catch (err) {
      onError('Gagal membaca file JSON: ' + err);
    }
  };
  reader.readAsText(file);
};
