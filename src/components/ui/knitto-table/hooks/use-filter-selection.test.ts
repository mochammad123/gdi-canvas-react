import { act } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useFilterSelection from './use-filter-selection';

type Product = { id: number; name: string; category: string; status: string };

const mockData: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', status: 'active' },
  { id: 2, name: 'Shirt', category: 'Clothing', status: 'active' },
  { id: 3, name: 'Phone', category: 'Electronics', status: 'inactive' },
  { id: 4, name: 'Pants', category: 'Clothing', status: 'inactive' },
  { id: 5, name: 'Book', category: 'Books', status: 'active' },
];

describe('useFilterSelection', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('initial state', () => {
    it('should return all data when no filter is active', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      expect(result.current.filteredData).toEqual(mockData);
      expect(result.current.activeFilters).toEqual({});
      expect(result.current.isFilterCardOpen).toEqual({ show: false, key: '' });
    });
  });

  describe('client-side filtering', () => {
    it('should filter by single value', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));

      expect(result.current.filteredData).toHaveLength(2);
      expect(result.current.filteredData.map((r) => r.category)).toEqual(['Electronics', 'Electronics']);
    });

    it('should filter by multiple values (OR logic within same column)', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics', 'Books']));

      expect(result.current.filteredData).toHaveLength(3);
      expect(result.current.filteredData.map((r) => r.name)).toEqual(['Laptop', 'Phone', 'Book']);
    });

    it('should filter by multiple columns (AND logic between columns)', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));
      act(() => result.current.updateFilter('status', ['active']));

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0]).toEqual({ id: 1, name: 'Laptop', category: 'Electronics', status: 'active' });
    });

    it('should handle numeric value comparison correctly', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('id', ['1', '3']));

      expect(result.current.filteredData).toHaveLength(2);
      expect(result.current.filteredData.map((r) => r.id)).toEqual([1, 3]);
    });
  });

  describe('updateFilter', () => {
    it('should remove filter when empty array is passed', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));
      expect(result.current.filteredData).toHaveLength(2);

      act(() => result.current.updateFilter('category', []));
      expect(result.current.filteredData).toEqual(mockData);
      expect(result.current.activeFilters).not.toHaveProperty('category');
    });

    it('should close filter card after update', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));

      expect(result.current.isFilterCardOpen).toEqual({ show: false, key: '' });
    });

    it('should update activeFilters correctly', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));

      expect(result.current.activeFilters).toHaveProperty('category', ['Electronics']);
    });
  });

  describe('resetFilter', () => {
    it('should remove specific column from filter', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));
      act(() => result.current.updateFilter('status', ['active']));
      expect(Object.keys(result.current.activeFilters)).toHaveLength(2);

      act(() => result.current.resetFilter('category'));
      expect(result.current.activeFilters).not.toHaveProperty('category');
      expect(result.current.activeFilters).toHaveProperty('status', ['active']);
    });

    it('should call onChangeFilter when useServerFilter is true', async () => {
      const onChangeFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useServerFilter: true,
          onChangeFilter,
        })
      );

      act(() => result.current.updateFilter('category', ['Electronics']));
      act(() => result.current.resetFilter('category'));

      expect(onChangeFilter).toHaveBeenCalledTimes(2);
      expect(onChangeFilter).toHaveBeenLastCalledWith({});
    });
  });

  describe('resetAllFilter', () => {
    it('should clear all filters and return full data', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));
      act(() => result.current.updateFilter('status', ['active']));
      expect(result.current.filteredData).toHaveLength(1);

      act(() => result.current.resetAllFilter());
      expect(result.current.activeFilters).toEqual({});
      expect(result.current.filteredData).toEqual(mockData);
    });
  });

  describe('isResetFilter', () => {
    it('should reset activeFilters when isResetFilter becomes true', async () => {
      const defaultProps = { data: mockData, isResetFilter: false };
      const { result, rerender } = await renderHook((props = defaultProps) => useFilterSelection<Product>(props), { initialProps: defaultProps });

      act(() => result.current.updateFilter('category', ['Electronics']));
      expect(result.current.activeFilters).toHaveProperty('category', ['Electronics']);

      await act(async () => {
        rerender({ data: mockData, isResetFilter: true });
      });

      expect(result.current.activeFilters).toEqual({});
    });
  });

  describe('useServerFilter', () => {
    it('should return data as-is without client filtering when useServerFilter is true', async () => {
      const onChangeFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useServerFilter: true,
          onChangeFilter,
        })
      );

      act(() => result.current.updateFilter('category', ['NonExistent']));

      expect(result.current.filteredData).toEqual(mockData);
      expect(onChangeFilter).toHaveBeenCalledWith({ category: ['NonExistent'] });
    });

    it('should call onChangeFilter on updateFilter when useServerFilter is true', async () => {
      const onChangeFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useServerFilter: true,
          onChangeFilter,
        })
      );

      act(() => result.current.updateFilter('category', ['Electronics', 'Books']));

      expect(onChangeFilter).toHaveBeenCalledWith({ category: ['Electronics', 'Books'] });
    });
  });

  describe('useSessionFilter', () => {
    it('should save filters to sessionStorage when useSessionFilter is enabled', async () => {
      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useSessionFilter: { tableKey: 'products-table' },
        })
      );

      act(() => result.current.updateFilter('category', ['Electronics']));

      const stored = sessionStorage.getItem('filter_selection_per_column');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed['products-table']).toEqual({ category: ['Electronics'] });
    });

    it('should merge with existing session data for different table keys', async () => {
      sessionStorage.setItem('filter_selection_per_column', JSON.stringify({ 'other-table': { status: ['active'] } }));

      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useSessionFilter: { tableKey: 'products-table' },
        })
      );

      act(() => result.current.updateFilter('category', ['Electronics']));

      const stored = JSON.parse(sessionStorage.getItem('filter_selection_per_column')!);
      expect(stored['other-table']).toEqual({ status: ['active'] });
      expect(stored['products-table']).toEqual({ category: ['Electronics'] });
    });

    it('should use default table key when useSessionFilter.tableKey is not provided', async () => {
      const { result } = await renderHook(() =>
        useFilterSelection<Product>({
          data: mockData,
          useSessionFilter: { tableKey: '' },
        })
      );

      act(() => result.current.updateFilter('category', ['Electronics']));

      const stored = JSON.parse(sessionStorage.getItem('filter_selection_per_column')!);
      expect(stored['']).toEqual({ category: ['Electronics'] });
    });

    it('should not save to sessionStorage when useSessionFilter is not provided', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['Electronics']));

      const stored = sessionStorage.getItem('filter_selection_per_column');
      expect(stored).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle empty data array', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: [] }));

      act(() => result.current.updateFilter('category', ['Electronics']));

      expect(result.current.filteredData).toEqual([]);
    });

    it('should return empty array when no data matches filter', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      act(() => result.current.updateFilter('category', ['NonExistent']));

      expect(result.current.filteredData).toHaveLength(0);
    });

    it('should handle mixed data types correctly', async () => {
      type MixedData = { id: number; name: string; count: number };
      const mixedData: MixedData[] = [
        { id: 1, name: 'Item1', count: 10 },
        { id: 2, name: 'Item2', count: 20 },
        { id: 3, name: 'Item3', count: 10 },
      ];

      const { result } = await renderHook(() => useFilterSelection<MixedData>({ data: mixedData }));

      act(() => result.current.updateFilter('count', ['10']));

      expect(result.current.filteredData).toHaveLength(2);
      expect(result.current.filteredData.map((r) => r.id)).toEqual([1, 3]);
    });
  });

  describe('filterCardRef', () => {
    it('should expose filterCardRef', async () => {
      const { result } = await renderHook(() => useFilterSelection<Product>({ data: mockData }));

      expect(result.current.filterCardRef).toBeDefined();
      expect(result.current.filterCardRef.current).toBeNull();
    });
  });
});
