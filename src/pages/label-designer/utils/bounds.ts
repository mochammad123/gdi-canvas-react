import { LabelElement } from '../types';
import { BASE_SCALE } from '../constants';

export interface ElementBoundsMm {
  left: number;
  top: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export interface AlignmentGuide {
  orientation: 'horizontal' | 'vertical';
  positionMm: number;
}

export interface MarqueeRectMm {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';

export interface MousePositionMm {
  x: number;
  y: number;
}

const ALIGN_THRESHOLD_MM = 0.3;

/** Estimasi bounding box elemen dalam mm (alignment guide & marquee). */
export const getElementBoundsMm = (el: LabelElement): ElementBoundsMm => {
  const left = Number(el.x) || 0;
  const top = Number(el.y) || 0;
  let width = Number(el.width) || 0;
  let height = Number(el.height) || 0;

  if (el.type === 'text') {
    const fontSize = Number(el.fontSize) || 10;
    height = Number(el.height) || (fontSize / BASE_SCALE) * 1.1;
    if (!width) {
      const textLen = Math.max((el.text || '').length, 1);
      width = (textLen * fontSize * 0.55) / BASE_SCALE;
    }
  } else if (el.type === 'line') {
    width = Number(el.width) || 76;
    height = 0.5;
  } else if (el.type === 'barcode') {
    width = Number(el.width) || 34;
    height = Number(el.height) || 7.5;
  } else if (el.type === 'image') {
    width = Number(el.width) || 15;
    height = Number(el.height) || 15;
  } else if (el.type === 'table') {
    width = Number(el.width) || 74;
    height = Number(el.height) || 16.5;
  } else if (el.type === 'band') {
    width = Number(el.width) || 72;
    height = Number(el.height) || 8.0;
  }

  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    centerX: left + width / 2,
    centerY: top + height / 2,
    width,
    height,
  };
};

export const rectsIntersect = (a: MarqueeRectMm, b: MarqueeRectMm): boolean =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

export const normalizeMarquee = (x1: number, y1: number, x2: number, y2: number): MarqueeRectMm => ({
  left: Math.min(x1, x2),
  top: Math.min(y1, y2),
  right: Math.max(x1, x2),
  bottom: Math.max(y1, y2),
});

export const getElementsInMarquee = (elements: LabelElement[], marquee: MarqueeRectMm): string[] =>
  elements.filter((el) => rectsIntersect(getElementBoundsMm(el), marquee)).map((el) => el.id);

/** Garis panduan alignment saat elemen digeser terhadap elemen lain. */
export const computeAlignmentGuides = (moving: LabelElement, others: LabelElement[]): AlignmentGuide[] => {
  const movingBounds = getElementBoundsMm(moving);
  const guides: AlignmentGuide[] = [];
  const seen = new Set<string>();

  const pushGuide = (orientation: AlignmentGuide['orientation'], positionMm: number) => {
    const key = `${orientation}:${positionMm.toFixed(2)}`;
    if (seen.has(key)) return;
    seen.add(key);
    guides.push({ orientation, positionMm });
  };

  const isClose = (a: number, b: number) => Math.abs(a - b) <= ALIGN_THRESHOLD_MM;

  for (const other of others) {
    const target = getElementBoundsMm(other);

    if (isClose(movingBounds.left, target.left)) pushGuide('vertical', target.left);
    if (isClose(movingBounds.left, target.right)) pushGuide('vertical', target.right);
    if (isClose(movingBounds.right, target.left)) pushGuide('vertical', target.left);
    if (isClose(movingBounds.right, target.right)) pushGuide('vertical', target.right);
    if (isClose(movingBounds.centerX, target.centerX)) pushGuide('vertical', target.centerX);
    if (isClose(movingBounds.left, target.centerX)) pushGuide('vertical', target.centerX);
    if (isClose(movingBounds.right, target.centerX)) pushGuide('vertical', target.centerX);

    if (isClose(movingBounds.top, target.top)) pushGuide('horizontal', target.top);
    if (isClose(movingBounds.top, target.bottom)) pushGuide('horizontal', target.bottom);
    if (isClose(movingBounds.bottom, target.top)) pushGuide('horizontal', target.top);
    if (isClose(movingBounds.bottom, target.bottom)) pushGuide('horizontal', target.bottom);
    if (isClose(movingBounds.centerY, target.centerY)) pushGuide('horizontal', target.centerY);
    if (isClose(movingBounds.top, target.centerY)) pushGuide('horizontal', target.centerY);
    if (isClose(movingBounds.bottom, target.centerY)) pushGuide('horizontal', target.centerY);
  }

  return guides;
};

export const applyResize = (
  element: LabelElement,
  handle: ResizeHandle,
  deltaMmX: number,
  deltaMmY: number,
  canvasWidthMm: number,
  canvasHeightMm: number
): Partial<LabelElement> => {
  const bounds = getElementBoundsMm(element);
  let { left, top, width, height } = bounds;

  const minW = element.type === 'line' ? 2 : element.type === 'text' ? 5 : 3;
  const minH = element.type === 'line' ? 0.5 : element.type === 'barcode' ? 3 : 3;

  if (handle.includes('e')) width = Math.max(minW, width + deltaMmX);
  if (handle.includes('w')) {
    const nextW = Math.max(minW, width - deltaMmX);
    left = left + (width - nextW);
    width = nextW;
  }
  if (handle.includes('s')) height = Math.max(minH, height + deltaMmY);
  if (handle.includes('n')) {
    const nextH = Math.max(minH, height - deltaMmY);
    top = top + (height - nextH);
    height = nextH;
  }

  left = Math.max(0, Math.min(canvasWidthMm - minW, left));
  top = Math.max(0, Math.min(canvasHeightMm - minH, top));

  const rounded = {
    x: Math.round(left * 10) / 10,
    y: Math.round(top * 10) / 10,
    width: Math.round(width * 10) / 10,
    height: Math.round(height * 10) / 10,
  };

  if (element.type === 'line') {
    return { x: rounded.x, y: rounded.y, width: rounded.width };
  }

  return rounded;
};

export const getResizeHandlesForType = (type: LabelElement['type']): ResizeHandle[] => {
  if (type === 'line') return ['e', 'w'];
  return ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
};
