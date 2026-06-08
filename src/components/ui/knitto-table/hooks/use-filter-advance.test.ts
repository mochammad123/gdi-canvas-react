import { act } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useFilterAdvance from './use-filter-advance';

type Product = { id: number; name: string; category: string; status: string };

const mockData: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', status: 'active' },
  { id: 2, name: 'Shirt', category: 'Clothing', status: 'active' },
  { id: 3, name: 'Phone', category: 'Electronics', status: 'inactive' },
  { id: 4, name: 'Pants', category: 'Clothing', status: 'inactive' },
  { id: 5, name: 'Book', category: 'Books', status: 'active' },
];

describe('useFilterAdvance', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('initial state', () => {
    it('should return all data when no filter is active', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      expect(result.current.filteredAdvanceData).toEqual(mockData);
      expect(result.current.activeAdvanceFilters).toEqual({});
      expect(result.current.isFilterAdvanceCardOpen).toEqual({ show: false, key: '' });
    });

    it('should expose filterAdvanceCardRef', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      expect(result.current.filterAdvanceCardRef).toBeDefined();
      expect(result.current.filterAdvanceCardRef.current).toBeNull();
    });
  });

  describe('client-side filtering', () => {
    it('should filter with "equal" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      expect(result.current.filteredAdvanceData).toHaveLength(2);
      expect(result.current.filteredAdvanceData.map((r) => r.category)).toEqual(['Electronics', 'Electronics']);
    });

    it('should filter with "notEqual" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'notEqual', 'Electronics'));

      expect(result.current.filteredAdvanceData).toHaveLength(3);
      expect(result.current.filteredAdvanceData.map((r) => r.category)).toEqual(['Clothing', 'Clothing', 'Books']);
    });

    it('should filter with "startsWith" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('name', 'startsWith', 'L'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData[0].name).toBe('Laptop');
    });

    it('should filter with "endsWith" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('name', 'endsWith', 't'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData.map((r) => r.name)).toEqual(['Shirt']);
    });

    it('should filter with "contains" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('name', 'contains', 'o'));

      expect(result.current.filteredAdvanceData).toHaveLength(3);
      expect(result.current.filteredAdvanceData.map((r) => r.name)).toEqual(['Laptop', 'Phone', 'Book']);
    });

    it('should filter with "notContains" config', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('name', 'notContains', 'o'));

      expect(result.current.filteredAdvanceData).toHaveLength(2);
      expect(result.current.filteredAdvanceData.map((r) => r.name)).toEqual(['Shirt', 'Pants']);
    });

    it('should handle case-insensitive filtering', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'electronics'));

      expect(result.current.filteredAdvanceData).toHaveLength(2);
      expect(result.current.filteredAdvanceData.map((r) => r.category)).toEqual(['Electronics', 'Electronics']);
    });

    it('should combine multiple filters with AND logic', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      act(() => result.current.updateAdvanceFilter('status', 'equal', 'active'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData[0]).toEqual({ id: 1, name: 'Laptop', category: 'Electronics', status: 'active' });
    });
  });

  describe('updateAdvanceFilter', () => {
    it('should add filter to activeAdvanceFilters', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      expect(result.current.activeAdvanceFilters).toHaveProperty('category');
      expect(result.current.activeAdvanceFilters.category).toEqual({ config_name: 'equal', value: 'Electronics' });
    });

    it('should close filter card after update', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.setIsFilterAdvanceCardOpen({ show: true, key: 'category' }));
      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      expect(result.current.isFilterAdvanceCardOpen).toEqual({ show: false, key: '' });
    });

    it('should update existing filter', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      act(() => result.current.updateAdvanceFilter('category', 'contains', 'Cloth'));

      expect(result.current.activeAdvanceFilters.category).toEqual({ config_name: 'contains', value: 'Cloth' });
      expect(result.current.filteredAdvanceData).toHaveLength(2);
    });
  });

  describe('resetAdvanceFilter', () => {
    it('should remove specific column from filter', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      act(() => result.current.updateAdvanceFilter('status', 'equal', 'active'));
      expect(Object.keys(result.current.activeAdvanceFilters)).toHaveLength(2);

      act(() => result.current.resetAdvanceFilter('category'));
      expect(result.current.activeAdvanceFilters).not.toHaveProperty('category');
      expect(result.current.activeAdvanceFilters).toHaveProperty('status');
    });

    it('should close filter card after reset', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.setIsFilterAdvanceCardOpen({ show: true, key: 'category' }));
      act(() => result.current.resetAdvanceFilter('category'));

      expect(result.current.isFilterAdvanceCardOpen).toEqual({ show: false, key: '' });
    });

    it('should return full data after removing all filters', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      expect(result.current.filteredAdvanceData).toHaveLength(2);

      act(() => result.current.resetAdvanceFilter('category'));
      expect(result.current.filteredAdvanceData).toEqual(mockData);
    });
  });

  describe('isResetFilter', () => {
    it('should reset activeAdvanceFilters when isResetFilter becomes true', async () => {
      const defaultProps = { data: mockData, isResetFilter: false };
      const { result, rerender } = await renderHook((props = defaultProps) => useFilterAdvance<Product>(props), { initialProps: defaultProps });

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      expect(result.current.activeAdvanceFilters).toHaveProperty('category');

      await act(async () => {
        rerender({ data: mockData, isResetFilter: true });
      });

      expect(result.current.activeAdvanceFilters).toEqual({});
    });
  });

  describe('useServerAdvanceFilter', () => {
    it('should return data as-is without client filtering when useServerAdvanceFilter is true', async () => {
      const onChangeAdvanceFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useServerAdvanceFilter: true,
          onChangeAdvanceFilter,
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'NonExistent'));

      expect(result.current.filteredAdvanceData).toEqual(mockData);
      expect(onChangeAdvanceFilter).toHaveBeenCalledWith({
        category: { config_name: 'equal', value: 'NonExistent' },
      });
    });

    it('should call onChangeAdvanceFilter on updateAdvanceFilter when useServerAdvanceFilter is true', async () => {
      const onChangeAdvanceFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useServerAdvanceFilter: true,
          onChangeAdvanceFilter,
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      expect(onChangeAdvanceFilter).toHaveBeenCalledWith({
        category: { config_name: 'equal', value: 'Electronics' },
      });
    });

    it('should call onChangeAdvanceFilter on resetAdvanceFilter when useServerAdvanceFilter is true', async () => {
      const onChangeAdvanceFilter = vi.fn();
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useServerAdvanceFilter: true,
          onChangeAdvanceFilter,
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      act(() => result.current.resetAdvanceFilter('category'));

      expect(onChangeAdvanceFilter).toHaveBeenLastCalledWith({});
    });
  });

  describe('useSessionFilter', () => {
    it('should save filters to sessionStorage when useSessionFilter is enabled', async () => {
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useSessionFilter: { tableKey: 'products-table' },
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      const stored = sessionStorage.getItem('filter_advance_per_column');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed['products-table']).toEqual({
        category: { config_name: 'equal', value: 'Electronics' },
      });
    });

    it('should merge with existing session data for different table keys', async () => {
      sessionStorage.setItem(
        'filter_advance_per_column',
        JSON.stringify({
          'other-table': { status: { config_name: 'equal', value: 'active' } },
        })
      );

      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useSessionFilter: { tableKey: 'products-table' },
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      const stored = JSON.parse(sessionStorage.getItem('filter_advance_per_column')!);
      expect(stored['other-table']).toEqual({ status: { config_name: 'equal', value: 'active' } });
      expect(stored['products-table']).toEqual({
        category: { config_name: 'equal', value: 'Electronics' },
      });
    });

    it('should use default table key when useSessionFilter.tableKey is not provided', async () => {
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useSessionFilter: { tableKey: '' },
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      const stored = JSON.parse(sessionStorage.getItem('filter_advance_per_column')!);
      expect(stored['']).toEqual({
        category: { config_name: 'equal', value: 'Electronics' },
      });
    });

    it('should not save to sessionStorage when useSessionFilter is not provided', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      const stored = sessionStorage.getItem('filter_advance_per_column');
      expect(stored).toBeNull();
    });

    it('should remove filter from sessionStorage when resetAdvanceFilter is called', async () => {
      const { result } = await renderHook(() =>
        useFilterAdvance<Product>({
          data: mockData,
          useSessionFilter: { tableKey: 'products-table' },
        })
      );

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));
      act(() => result.current.updateAdvanceFilter('status', 'equal', 'active'));

      let stored = JSON.parse(sessionStorage.getItem('filter_advance_per_column')!);
      expect(stored['products-table']).toHaveProperty('category');
      expect(stored['products-table']).toHaveProperty('status');

      act(() => result.current.resetAdvanceFilter('category'));

      stored = JSON.parse(sessionStorage.getItem('filter_advance_per_column')!);
      expect(stored['products-table']).not.toHaveProperty('category');
      expect(stored['products-table']).toHaveProperty('status');
    });
  });

  describe('edge cases', () => {
    it('should handle empty data array', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: [] }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'Electronics'));

      expect(result.current.filteredAdvanceData).toEqual([]);
    });

    it('should return empty array when no data matches filter', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('category', 'equal', 'NonExistent'));

      expect(result.current.filteredAdvanceData).toHaveLength(0);
    });

    it('should handle numeric string comparison', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.updateAdvanceFilter('id', 'equal', '1'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData[0].id).toBe(1);
    });

    it('should handle special characters in filter value', async () => {
      const specialData: { id: number; name: string }[] = [
        { id: 1, name: 'Item (A)' },
        { id: 2, name: 'Item [B]' },
        { id: 3, name: 'Item {C}' },
      ];

      const { result } = await renderHook(() => useFilterAdvance<{ id: number; name: string }>({ data: specialData }));

      act(() => result.current.updateAdvanceFilter('name', 'contains', '(A)'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData[0].name).toBe('Item (A)');
    });

    it('should handle whitespace in filter value', async () => {
      const whitespaceData: { id: number; name: string }[] = [
        { id: 1, name: 'Item One' },
        { id: 2, name: 'ItemTwo' },
        { id: 3, name: ' Item Three ' },
      ];

      const { result } = await renderHook(() => useFilterAdvance<{ id: number; name: string }>({ data: whitespaceData }));

      act(() => result.current.updateAdvanceFilter('name', 'contains', 'Item One'));

      expect(result.current.filteredAdvanceData).toHaveLength(1);
      expect(result.current.filteredAdvanceData[0].id).toBe(1);
    });
  });

  describe('setIsFilterAdvanceCardOpen', () => {
    it('should update isFilterAdvanceCardOpen state', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.setIsFilterAdvanceCardOpen({ show: true, key: 'category' }));

      expect(result.current.isFilterAdvanceCardOpen).toEqual({ show: true, key: 'category' });
    });

    it('should reset isFilterAdvanceCardOpen state', async () => {
      const { result } = await renderHook(() => useFilterAdvance<Product>({ data: mockData }));

      act(() => result.current.setIsFilterAdvanceCardOpen({ show: true, key: 'category' }));
      act(() => result.current.setIsFilterAdvanceCardOpen({ show: false, key: '' }));

      expect(result.current.isFilterAdvanceCardOpen).toEqual({ show: false, key: '' });
    });
  });
});
