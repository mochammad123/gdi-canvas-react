import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import { useRowReorderDnd } from './use-row-reorder-dnd';
import { IAdjustedHeader, IFlattenedData } from '../lib';

type Product = { id: number; name: string };

const mockColumns: IAdjustedHeader[] = [
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
];

const mockColumnsWithReorder: IAdjustedHeader[] = [
  { key: 'row-reorder', caption: '', width: 40 },
  { key: 'id', caption: 'ID', width: 80 },
];

const mockFlattenedData: IFlattenedData<Product>[] = [
  { type: 'row', item: { id: 1, name: 'Product A' } },
  { type: 'row', item: { id: 2, name: 'Product B' } },
  { type: 'expanded', item: { id: 1, name: 'Product A' } },
  { type: 'row', item: { id: 3, name: 'Product C' } },
];

const createMockDataTransfer = (getDataReturn = '0'): DataTransfer =>
  ({
    setData: vi.fn(),
    getData: vi.fn().mockReturnValue(getDataReturn),
    setDragImage: vi.fn(),
    effectAllowed: 'move',
    dropEffect: 'move',
    files: {} as FileList,
    items: {} as DataTransferItemList,
    types: [],
    clearData: vi.fn(),
  }) as unknown as DataTransfer;

const createMockDragEvent = (overrides: { target?: HTMLElement; dataTransfer?: DataTransfer } = {}): React.DragEvent => {
  const target = overrides.target || document.createElement('div');
  target.setAttribute('data-index', '0');
  target.style.opacity = '1';
  target.getBoundingClientRect = vi.fn(() => ({
    width: 500,
    height: 40,
    top: 100,
    left: 50,
    right: 550,
    bottom: 140,
    x: 50,
    y: 100,
    toJSON: () => '',
  }));

  return {
    target,
    preventDefault: vi.fn(),
    dataTransfer: overrides.dataTransfer || createMockDataTransfer(),
  } as unknown as React.DragEvent;
};

const defaultProps = {
  freezeLeftColumns: [] as IAdjustedHeader[],
  columns: mockColumns,
  freezeRightColumns: [] as IAdjustedHeader[],
  flattenedData: mockFlattenedData,
  rowHeight: 40,
};

describe('useRowReorderDnd', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    document.documentElement.classList.remove('dark');
  });

  describe('state', () => {
    it('should detect reorder column in any column group', async () => {
      const { result: noReorder } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));
      expect(noReorder.current.state.hasReorderColumn).toBe(false);

      const { result: withReorder } = await renderHook(() => useRowReorderDnd({ ...defaultProps, columns: mockColumnsWithReorder }));
      expect(withReorder.current.state.hasReorderColumn).toBe(true);

      const { result: inLeftFreeze } = await renderHook(() =>
        useRowReorderDnd({ ...defaultProps, freezeLeftColumns: [{ key: 'row-reorder', caption: '', width: 40 }] })
      );
      expect(inLeftFreeze.current.state.hasReorderColumn).toBe(true);
    });

    it('should enable toggle mode only when all conditions met', async () => {
      const onReorder = vi.fn();

      const { result: allConditions } = await renderHook(() =>
        useRowReorderDnd({
          ...defaultProps,
          freezeLeftColumns: [{ key: 'row-reorder', caption: '', width: 40 }],
          reorderOnlyFromToggle: true,
          onReorderRowsToParent: onReorder,
        })
      );
      expect(allConditions.current.state.useToggleOnlyToReorder).toBe(true);

      const { result: noToggle } = await renderHook(() =>
        useRowReorderDnd({
          ...defaultProps,
          columns: mockColumnsWithReorder,
          reorderOnlyFromToggle: false,
          onReorderRowsToParent: onReorder,
        })
      );
      expect(noToggle.current.state.useToggleOnlyToReorder).toBe(false);

      const { result: noCallback } = await renderHook(() =>
        useRowReorderDnd({
          ...defaultProps,
          columns: mockColumnsWithReorder,
          reorderOnlyFromToggle: true,
        })
      );
      expect(noCallback.current.state.useToggleOnlyToReorder).toBe(false);
    });
  });

  describe('getReorderProps', () => {
    it('should return correct props based on toggle mode', async () => {
      const onReorder = vi.fn();

      const { result: normalMode } = await renderHook(() => useRowReorderDnd({ ...defaultProps, onReorderRowsToParent: onReorder }));
      const normalProps = normalMode.current.func.getReorderProps(0);
      expect(normalProps.enableReorderFromColumnOnly).toBe(false);
      expect(normalProps.onReorderRowsToParent).toBe(true);
      expect(normalProps).not.toHaveProperty('onReorderDragStart');

      const { result: toggleMode } = await renderHook(() =>
        useRowReorderDnd({
          ...defaultProps,
          columns: mockColumnsWithReorder,
          reorderOnlyFromToggle: true,
          onReorderRowsToParent: onReorder,
        })
      );
      const toggleProps = toggleMode.current.func.getReorderProps(0);
      expect(toggleProps.enableReorderFromColumnOnly).toBe(true);
      expect(toggleProps.onReorderDragStart).toBeDefined();
      expect(toggleProps.onReorderDragEnd).toBeDefined();
    });
  });

  describe('drag events', () => {
    it('should handle drag start for rows only', async () => {
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));

      const mockEvent = createMockDragEvent();
      result.current.func.handleDragStart(mockEvent, 0);
      expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '0');
      expect((mockEvent.target as HTMLElement).style.opacity).toBe('0.5');

      result.current.func.handleDragStart(mockEvent, 2);
      expect(mockEvent.dataTransfer.setData).toHaveBeenCalledTimes(1);
    });

    it('should handle reorder drag start with drag image', async () => {
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));

      const target = document.createElement('div');
      target.setAttribute('data-index', '0');
      target.getBoundingClientRect = vi.fn(() => ({
        width: 500,
        height: 40,
        top: 100,
        left: 50,
        right: 550,
        bottom: 140,
        x: 50,
        y: 100,
        toJSON: () => '',
      }));

      const mockEvent = createMockDragEvent({ target });
      result.current.func.handleReorderDragStart(mockEvent, 0);

      expect(mockEvent.dataTransfer.setDragImage).toHaveBeenCalled();
      expect(document.body.querySelector('[style*="position: fixed"]')).toBeTruthy();
    });

    it('should handle drag end and cleanup', async () => {
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));

      const target = document.createElement('div');
      target.setAttribute('data-index', '0');
      target.getBoundingClientRect = vi.fn(() => ({
        width: 500,
        height: 40,
        top: 100,
        left: 50,
        right: 550,
        bottom: 140,
        x: 50,
        y: 100,
        toJSON: () => '',
      }));

      const dragStartEvent = createMockDragEvent({ target });
      result.current.func.handleReorderDragStart(dragStartEvent, 0);
      expect(document.body.querySelector('[style*="position: fixed"]')).toBeTruthy();

      const targetWithOpacity = document.createElement('div');
      targetWithOpacity.style.opacity = '0.5';
      const dragEndEvent = createMockDragEvent({ target: targetWithOpacity });
      result.current.func.handleDragEnd(dragEndEvent);

      expect(targetWithOpacity.style.opacity).toBe('1');
      expect(document.body.querySelector('[style*="position: fixed"]')).toBeFalsy();
    });

    it('should handle drag over', async () => {
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));
      const mockEvent = createMockDragEvent();

      result.current.func.handleDragOver(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.dataTransfer.dropEffect).toBe('move');
    });

    it('should handle drop correctly', async () => {
      const onReorder = vi.fn();
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps, onReorderRowsToParent: onReorder }));

      const mockEvent = createMockDragEvent({ dataTransfer: createMockDataTransfer('0') });
      result.current.func.handleDrop(mockEvent, 3);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(onReorder).toHaveBeenCalledWith(0, 2);

      const sameIndexEvent = createMockDragEvent({ dataTransfer: createMockDataTransfer('0') });
      result.current.func.handleDrop(sameIndexEvent, 0);
      expect(onReorder).toHaveBeenCalledTimes(1);
    });

    it('should not drop on expanded rows', async () => {
      const onReorder = vi.fn();
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps, onReorderRowsToParent: onReorder }));

      const mockEvent = createMockDragEvent();
      result.current.func.handleDrop(mockEvent, 2);

      expect(onReorder).not.toHaveBeenCalled();
    });
  });

  describe('data row index calculation', () => {
    it('should calculate correct data index accounting for expanded rows', async () => {
      const { result } = await renderHook(() => useRowReorderDnd({ ...defaultProps }));

      const mockEvent0 = createMockDragEvent();
      result.current.func.handleDragStart(mockEvent0, 0);
      expect(mockEvent0.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '0');

      const mockEvent3 = createMockDragEvent();
      result.current.func.handleDragStart(mockEvent3, 3);
      expect(mockEvent3.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '2');
    });

    it('should handle empty or expanded-only data gracefully', async () => {
      const { result: empty } = await renderHook(() => useRowReorderDnd({ ...defaultProps, flattenedData: [] }));
      const mockEvent = createMockDragEvent();
      empty.current.func.handleDragStart(mockEvent, 0);
      expect(mockEvent.dataTransfer.setData).not.toHaveBeenCalled();

      const expandedOnly: IFlattenedData<Product>[] = [{ type: 'expanded', item: { id: 1, name: 'Product A' } }];
      const { result: expanded } = await renderHook(() => useRowReorderDnd({ ...defaultProps, flattenedData: expandedOnly }));
      const mockEvent2 = createMockDragEvent();
      expanded.current.func.handleDragStart(mockEvent2, 0);
      expect(mockEvent2.dataTransfer.setData).not.toHaveBeenCalled();
    });
  });
});
