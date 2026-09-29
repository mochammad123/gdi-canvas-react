export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 3;
export const ZOOM_STEP = 0.1;
export const RULER_SIZE_PX = 24;

export const clampZoom = (value: number): number => {
  const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
  return Math.round(clamped * 100) / 100;
};
