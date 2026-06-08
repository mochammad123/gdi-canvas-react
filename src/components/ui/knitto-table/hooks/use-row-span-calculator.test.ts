import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import { useRowSpanCalculator, type RowSpanData } from './use-rowspan-calculator';
import type { IHeader } from '../lib';

type Product = {
  category: string;
  subcategory: string;
  name: string;
  price: number;
};

const createMockColumns = (enableRowSpan: boolean): IHeader<Product>[] => [
  { key: 'row-selection', caption: '', width: 40 },
  { key: 'category', caption: 'Category', width: 150, enableRowSpan },
  { key: 'subcategory', caption: 'Subcategory', width: 150, enableRowSpan },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'price', caption: 'Price', width: 100 },
  { key: 'action', caption: 'Actions', width: 100 },
];

const mockData: Product[] = [
  { category: 'A', subcategory: 'X', name: 'Product 1', price: 100 },
  { category: 'A', subcategory: 'X', name: 'Product 2', price: 200 },
  { category: 'A', subcategory: 'Y', name: 'Product 3', price: 150 },
  { category: 'B', subcategory: 'X', name: 'Product 4', price: 300 },
  { category: 'B', subcategory: 'X', name: 'Product 5', price: 250 },
  { category: 'C', subcategory: 'Z', name: 'Product 6', price: 400 },
];

describe('useRowSpanCalculator', () => {
  describe('empty data handling', () => {
    it('should return empty map when data is empty', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>([], columns as IHeader<unknown>[]));

      expect(result.current.size).toBe(0);
    });

    it('should return empty map when data is null/undefined', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(null as unknown as Product[], columns as IHeader<unknown>[]));

      expect(result.current.size).toBe(0);
    });
  });

  describe('enableRowSpan flag', () => {
    it('should return empty map when no columns have enableRowSpan', async () => {
      const columns = createMockColumns(false);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      expect(result.current.size).toBe(0);
    });

    it('should calculate rowSpan only for columns with enableRowSpan', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      // Should have entries for category and subcategory columns only
      const categoryEntries = Array.from(result.current.entries()).filter(([key]) => key.startsWith('category-'));
      const subcategoryEntries = Array.from(result.current.entries()).filter(([key]) => key.startsWith('subcategory-'));
      const nameEntries = Array.from(result.current.entries()).filter(([key]) => key.startsWith('name-'));

      expect(categoryEntries.length).toBe(6); // All rows
      expect(subcategoryEntries.length).toBe(6); // All rows
      expect(nameEntries.length).toBe(0); // No enableRowSpan
    });
  });

  describe('special column handling', () => {
    it('should skip special columns even with enableRowSpan', async () => {
      const columnsWithSpecial: IHeader<Product>[] = [
        { key: 'row-selection', caption: '', width: 40, enableRowSpan: true },
        { key: 'expand', caption: '', width: 40, enableRowSpan: true },
        { key: 'action', caption: 'Actions', width: 100, enableRowSpan: true },
        { key: 'row-reorder', caption: '', width: 40, enableRowSpan: true },
        { key: 'category', caption: 'Category', width: 150, enableRowSpan: true },
      ];

      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columnsWithSpecial as IHeader<unknown>[]));

      // Special columns should be skipped
      expect(result.current.has('row-selection-0')).toBe(false);
      expect(result.current.has('expand-0')).toBe(false);
      expect(result.current.has('action-0')).toBe(false);
      expect(result.current.has('row-reorder-0')).toBe(false);

      // Regular column should be processed
      expect(result.current.has('category-0')).toBe(true);
    });
  });

  describe('rowSpan calculation - consecutive duplicates', () => {
    it('should calculate correct rowSpan for category column', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      // Category 'A' appears in rows 0, 1, 2
      expect(result.current.get('category-0')).toEqual({
        rowSpan: 3,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 2,
      });
      // Intermediate cells get spanEndRow set to their own index when processed
      expect(result.current.get('category-1')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 1,
      });
      expect(result.current.get('category-2')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 2,
      });

      // Category 'B' appears in rows 3, 4
      expect(result.current.get('category-3')).toEqual({
        rowSpan: 2,
        shouldRender: true,
        spanStartRow: 3,
        spanEndRow: 4,
      });
      expect(result.current.get('category-4')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 3,
        spanEndRow: 4,
      });

      // Category 'C' appears only in row 5
      expect(result.current.get('category-5')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 5,
        spanEndRow: 5,
      });
    });

    it('should calculate correct rowSpan for subcategory column', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      // Subcategory 'X' appears in rows 0, 1 (consecutive)
      expect(result.current.get('subcategory-0')).toEqual({
        rowSpan: 2,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 1,
      });
      expect(result.current.get('subcategory-1')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 1,
      });

      // Subcategory 'Y' appears only in row 2
      expect(result.current.get('subcategory-2')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 2,
        spanEndRow: 2,
      });

      // Subcategory 'X' appears again in rows 3, 4 (consecutive but separated from first group)
      expect(result.current.get('subcategory-3')).toEqual({
        rowSpan: 2,
        shouldRender: true,
        spanStartRow: 3,
        spanEndRow: 4,
      });
      expect(result.current.get('subcategory-4')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 3,
        spanEndRow: 4,
      });

      // Subcategory 'Z' appears only in row 5
      expect(result.current.get('subcategory-5')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 5,
        spanEndRow: 5,
      });
    });
  });

  describe('null and undefined handling', () => {
    it('should handle null values correctly', async () => {
      const dataWithNulls = [
        { category: null as unknown as string, subcategory: 'X', name: 'A', price: 100 },
        { category: null as unknown as string, subcategory: 'X', name: 'B', price: 200 },
        { category: 'B', subcategory: 'Y', name: 'C', price: 300 },
      ];

      const columns: IHeader<(typeof dataWithNulls)[0]>[] = [
        { key: 'category', caption: 'Category', width: 150, enableRowSpan: true },
        { key: 'subcategory', caption: 'Subcategory', width: 150, enableRowSpan: true },
      ];

      const { result } = await renderHook(() => useRowSpanCalculator(dataWithNulls, columns as IHeader<unknown>[]));

      // Null values should be treated as empty string and merged
      expect(result.current.get('category-0')).toEqual({
        rowSpan: 2,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 1,
      });
      expect(result.current.get('category-1')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 1,
      });
    });

    it('should handle undefined values correctly', async () => {
      const dataWithUndefined = [
        { category: undefined as unknown as string, subcategory: 'X', name: 'A', price: 100 },
        { category: undefined as unknown as string, subcategory: 'X', name: 'B', price: 200 },
        { category: 'B', subcategory: 'Y', name: 'C', price: 300 },
      ];

      const columns: IHeader<(typeof dataWithUndefined)[0]>[] = [{ key: 'category', caption: 'Category', width: 150, enableRowSpan: true }];

      const { result } = await renderHook(() => useRowSpanCalculator(dataWithUndefined, columns as IHeader<unknown>[]));

      // Undefined values should be treated as empty string and merged
      expect(result.current.get('category-0')).toEqual({
        rowSpan: 2,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 1,
      });
    });
  });

  describe('single row data', () => {
    it('should handle single row data correctly', async () => {
      const singleRow = [{ category: 'A', subcategory: 'X', name: 'Product 1', price: 100 }];
      const columns = createMockColumns(true);

      const { result } = await renderHook(() => useRowSpanCalculator<(typeof singleRow)[0]>(singleRow, columns as IHeader<unknown>[]));

      expect(result.current.get('category-0')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 0,
      });
      expect(result.current.get('subcategory-0')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 0,
      });
    });
  });

  describe('no consecutive duplicates', () => {
    it('should not merge when values are not consecutive', async () => {
      const nonConsecutiveData = [
        { category: 'A', subcategory: 'X', name: 'Product 1', price: 100 },
        { category: 'B', subcategory: 'Y', name: 'Product 2', price: 200 },
        { category: 'A', subcategory: 'Z', name: 'Product 3', price: 300 },
      ];
      const columns = createMockColumns(true);

      const { result } = await renderHook(() =>
        useRowSpanCalculator<(typeof nonConsecutiveData)[0]>(nonConsecutiveData, columns as IHeader<unknown>[])
      );

      // All should have rowSpan: 1 since no consecutive duplicates
      expect(result.current.get('category-0')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 0,
      });
      expect(result.current.get('category-1')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 1,
        spanEndRow: 1,
      });
      expect(result.current.get('category-2')).toEqual({
        rowSpan: 1,
        shouldRender: true,
        spanStartRow: 2,
        spanEndRow: 2,
      });
    });
  });

  describe('all rows same value', () => {
    it('should merge all rows when all values are the same', async () => {
      const allSameData = [
        { category: 'A', subcategory: 'X', name: 'Product 1', price: 100 },
        { category: 'A', subcategory: 'Y', name: 'Product 2', price: 200 },
        { category: 'A', subcategory: 'Z', name: 'Product 3', price: 300 },
      ];
      const columns = createMockColumns(true);

      const { result } = await renderHook(() => useRowSpanCalculator<(typeof allSameData)[0]>(allSameData, columns as IHeader<unknown>[]));

      expect(result.current.get('category-0')).toEqual({
        rowSpan: 3,
        shouldRender: true,
        spanStartRow: 0,
        spanEndRow: 2,
      });
      // Intermediate cells get spanEndRow set to their own index when processed
      expect(result.current.get('category-1')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 1,
      });
      expect(result.current.get('category-2')).toEqual({
        rowSpan: 0,
        shouldRender: false,
        spanStartRow: 0,
        spanEndRow: 2,
      });
    });
  });

  describe('memoization', () => {
    it('should return same map reference when data and columns unchanged', async () => {
      const columns = createMockColumns(true);
      const { result, rerender } = await renderHook(
        (props?: { data: Product[]; cols: IHeader<Product>[] }) => useRowSpanCalculator<Product>(props!.data, props!.cols as IHeader<unknown>[]),
        { initialProps: { data: mockData, cols: columns } }
      );

      const firstResult = result.current;

      await rerender({ data: mockData, cols: columns });

      expect(result.current).toBe(firstResult);
    });

    it('should return new map when data changes', async () => {
      const columns = createMockColumns(true);
      const { result, rerender } = await renderHook(
        (props?: { data: Product[]; cols: IHeader<Product>[] }) => useRowSpanCalculator<Product>(props!.data, props!.cols as IHeader<unknown>[]),
        { initialProps: { data: mockData, cols: columns } }
      );

      const firstResult = result.current;

      const newData = [...mockData, { category: 'D', subcategory: 'W', name: 'Product 7', price: 500 }];
      await rerender({ data: newData, cols: columns });

      expect(result.current).not.toBe(firstResult);
    });
  });

  describe('Map structure verification', () => {
    it('should use correct key format', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      const keys = Array.from(result.current.keys());

      // All keys should follow pattern: columnKey-rowIndex
      keys.forEach((key) => {
        expect(key).toMatch(/^(category|subcategory)-\d+$/);
      });
    });

    it('should have correct value structure', async () => {
      const columns = createMockColumns(true);
      const { result } = await renderHook(() => useRowSpanCalculator<Product>(mockData, columns as IHeader<unknown>[]));

      const values = Array.from(result.current.values());

      values.forEach((value: RowSpanData) => {
        expect(value).toHaveProperty('rowSpan');
        expect(value).toHaveProperty('shouldRender');
        expect(value).toHaveProperty('spanStartRow');
        expect(value).toHaveProperty('spanEndRow');
        expect(typeof value.rowSpan).toBe('number');
        expect(typeof value.shouldRender).toBe('boolean');
        expect(typeof value.spanStartRow).toBe('number');
        expect(typeof value.spanEndRow).toBe('number');
      });
    });
  });
});
