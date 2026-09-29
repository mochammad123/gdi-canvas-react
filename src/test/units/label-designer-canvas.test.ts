import { describe, expect, it } from 'vitest';
import {
  applyAlignToElements,
  applyResize,
  cloneElementsWithOffset,
  getElementBoundsMm,
  getElementsInMarquee,
  normalizeMarquee,
  parseToolboxDrag,
  serializeToolboxDrag,
} from '@/pages/label-designer/utils';
import { LabelElement } from '@/pages/label-designer/types';

const textEl = (overrides: Partial<LabelElement> = {}): LabelElement => ({
  id: 't1',
  type: 'text',
  x: 2,
  y: 2,
  text: 'Hello',
  fontSize: 10,
  bold: true,
  ...overrides,
});

const barcodeEl = (overrides: Partial<LabelElement> = {}): LabelElement => ({
  id: 'b1',
  type: 'barcode',
  x: 10,
  y: 10,
  width: 20,
  height: 8,
  text: '{{NoRoll}}',
  ...overrides,
});

describe('label-designer canvas utils', () => {
  it('normalizeMarquee selalu left/top <= right/bottom', () => {
    expect(normalizeMarquee(10, 8, 2, 1)).toEqual({ left: 2, top: 1, right: 10, bottom: 8 });
  });

  it('getElementsInMarquee memilih elemen yang berpotongan', () => {
    const elements = [textEl({ id: 'a', x: 1, y: 1 }), barcodeEl({ id: 'b', x: 40, y: 20 })];
    const hits = getElementsInMarquee(elements, { left: 0, top: 0, right: 15, bottom: 15 });
    expect(hits).toEqual(['a']);
  });

  it('getElementsInMarquee kosong jika kotak tidak menyentuh elemen', () => {
    const elements = [barcodeEl({ id: 'b', x: 40, y: 20 })];
    const hits = getElementsInMarquee(elements, { left: 0, top: 0, right: 5, bottom: 5 });
    expect(hits).toEqual([]);
  });

  it('applyResize se memperbesar barcode', () => {
    const el = barcodeEl();
    const next = applyResize(el, 'se', 5, 2, 80, 30);
    expect(next.width).toBe(25);
    expect(next.height).toBe(10);
    expect(next.x).toBe(10);
    expect(next.y).toBe(10);
  });

  it('applyResize e pada text tanpa width tetap menghasilkan width', () => {
    const el = textEl();
    const before = getElementBoundsMm(el);
    const next = applyResize(el, 'e', 4, 0, 80, 30);
    expect(next.width).toBeGreaterThan(before.width);
    expect(typeof next.width).toBe('number');
  });

  it('applyResize s pada text menghasilkan height', () => {
    const el = textEl({ width: 20, height: 4 });
    const next = applyResize(el, 's', 0, 3, 80, 30);
    expect(next.height).toBe(7);
    expect(next.width).toBe(20);
  });

  it('applyResize w pada line menggeser x dan mengurangi width', () => {
    const el: LabelElement = { id: 'l1', type: 'line', x: 10, y: 20, width: 30, dashed: false };
    const next = applyResize(el, 'w', 5, 0, 80, 30);
    expect(next.width).toBe(25);
    expect(next.x).toBe(15);
  });

  it('parseToolboxDrag menerima payload valid', () => {
    const raw = serializeToolboxDrag({ type: 'text', text: '{{Warna}}' });
    expect(parseToolboxDrag(raw)).toEqual({ type: 'text', text: '{{Warna}}' });
    expect(parseToolboxDrag('bukan-json')).toBeNull();
  });

  it('cloneElementsWithOffset membuat id baru dan offset posisi', () => {
    const clones = cloneElementsWithOffset([textEl({ id: 'old', x: 1, y: 2, locked: true })], 2);
    expect(clones[0].id).not.toBe('old');
    expect(clones[0].x).toBe(3);
    expect(clones[0].y).toBe(4);
    expect(clones[0].locked).toBe(false);
  });

  it('applyAlignToElements rata kiri multi elemen', () => {
    const elements = [textEl({ id: 'a', x: 5, y: 1, width: 10 }), textEl({ id: 'b', x: 20, y: 2, width: 10 })];
    const next = applyAlignToElements(elements, ['a', 'b'], 'left');
    expect(next.find((e) => e.id === 'a')?.x).toBe(5);
    expect(next.find((e) => e.id === 'b')?.x).toBe(5);
  });
});
