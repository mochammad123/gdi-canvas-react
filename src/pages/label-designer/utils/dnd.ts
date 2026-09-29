import { ElementType } from '../types';

export interface ToolboxDragPayload {
  type: ElementType;
  text?: string;
}

export const serializeToolboxDrag = (payload: ToolboxDragPayload): string => JSON.stringify(payload);

export const parseToolboxDrag = (raw: string): ToolboxDragPayload | null => {
  try {
    const parsed = JSON.parse(raw) as ToolboxDragPayload;
    if (!parsed || !parsed.type) return null;
    if (!['text', 'barcode', 'line', 'image'].includes(parsed.type)) return null;
    return parsed;
  } catch {
    return null;
  }
};
