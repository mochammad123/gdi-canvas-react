import { LabelElement } from '../types';
import { getElementBoundsMm } from './bounds';

export type AlignAction = 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV' | 'distributeH' | 'distributeV';

export const cloneElementsWithOffset = (elements: LabelElement[], offsetMm = 2): LabelElement[] => {
  const stamp = Date.now();
  return elements.map((el, index) => ({
    ...el,
    id: `el_${stamp}_${index}`,
    x: Math.round((el.x + offsetMm) * 10) / 10,
    y: Math.round((el.y + offsetMm) * 10) / 10,
    locked: false,
  }));
};

export const applyAlignToElements = (elements: LabelElement[], ids: string[], action: AlignAction): LabelElement[] => {
  const targets = elements.filter((el) => ids.includes(el.id) && !el.locked);
  if (targets.length < 2 && (action === 'distributeH' || action === 'distributeV')) return elements;
  if (targets.length === 0) return elements;

  const boundsList = targets.map((el) => ({ el, bounds: getElementBoundsMm(el) }));
  const minLeft = Math.min(...boundsList.map((b) => b.bounds.left));
  const maxRight = Math.max(...boundsList.map((b) => b.bounds.right));
  const minTop = Math.min(...boundsList.map((b) => b.bounds.top));
  const maxBottom = Math.max(...boundsList.map((b) => b.bounds.bottom));
  const groupCenterX = (minLeft + maxRight) / 2;
  const groupCenterY = (minTop + maxBottom) / 2;

  const updates = new Map<string, { x?: number; y?: number }>();

  if (action === 'left') {
    boundsList.forEach(({ el }) => updates.set(el.id, { x: minLeft }));
  } else if (action === 'right') {
    boundsList.forEach(({ el, bounds }) => updates.set(el.id, { x: maxRight - bounds.width }));
  } else if (action === 'top') {
    boundsList.forEach(({ el }) => updates.set(el.id, { y: minTop }));
  } else if (action === 'bottom') {
    boundsList.forEach(({ el, bounds }) => updates.set(el.id, { y: maxBottom - bounds.height }));
  } else if (action === 'centerH') {
    boundsList.forEach(({ el, bounds }) => updates.set(el.id, { x: groupCenterX - bounds.width / 2 }));
  } else if (action === 'centerV') {
    boundsList.forEach(({ el, bounds }) => updates.set(el.id, { y: groupCenterY - bounds.height / 2 }));
  } else if (action === 'distributeH' && boundsList.length >= 3) {
    const sorted = [...boundsList].sort((a, b) => a.bounds.left - b.bounds.left);
    const totalWidth = sorted.reduce((sum, b) => sum + b.bounds.width, 0);
    const span = maxRight - minLeft;
    const gap = (span - totalWidth) / (sorted.length - 1);
    let cursor = minLeft;
    sorted.forEach(({ el, bounds }) => {
      updates.set(el.id, { x: Math.round(cursor * 10) / 10 });
      cursor += bounds.width + gap;
    });
  } else if (action === 'distributeV' && boundsList.length >= 3) {
    const sorted = [...boundsList].sort((a, b) => a.bounds.top - b.bounds.top);
    const totalHeight = sorted.reduce((sum, b) => sum + b.bounds.height, 0);
    const span = maxBottom - minTop;
    const gap = (span - totalHeight) / (sorted.length - 1);
    let cursor = minTop;
    sorted.forEach(({ el, bounds }) => {
      updates.set(el.id, { y: Math.round(cursor * 10) / 10 });
      cursor += bounds.height + gap;
    });
  }

  return elements.map((el) => {
    const patch = updates.get(el.id);
    if (!patch) return el;
    return {
      ...el,
      x: patch.x !== undefined ? Math.round(patch.x * 10) / 10 : el.x,
      y: patch.y !== undefined ? Math.round(patch.y * 10) / 10 : el.y,
    };
  });
};

export const reorderElements = (elements: LabelElement[], ids: string[], direction: 'front' | 'back' | 'forward' | 'backward'): LabelElement[] => {
  const idSet = new Set(ids);
  const moving = elements.filter((el) => idSet.has(el.id));
  const staying = elements.filter((el) => !idSet.has(el.id));
  if (moving.length === 0) return elements;

  if (direction === 'front') return [...staying, ...moving];
  if (direction === 'back') return [...moving, ...staying];

  const next = [...elements];
  if (direction === 'forward') {
    for (let i = next.length - 2; i >= 0; i -= 1) {
      if (idSet.has(next[i].id) && !idSet.has(next[i + 1].id)) {
        [next[i], next[i + 1]] = [next[i + 1], next[i]];
      }
    }
  } else {
    for (let i = 1; i < next.length; i += 1) {
      if (idSet.has(next[i].id) && !idSet.has(next[i - 1].id)) {
        [next[i], next[i - 1]] = [next[i - 1], next[i]];
      }
    }
  }
  return next;
};
