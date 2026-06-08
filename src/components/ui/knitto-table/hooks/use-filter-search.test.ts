import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useFilterSearch from './use-filter-search';

type User = { id: number; name: string; email: string };

const mockData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
  { id: 4, name: 'Alice Johnson', email: 'alice.j@test.com' },
];

describe('useFilterSearch', () => {
  describe('initial state', () => {
    it('should return all data when no search is active', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      expect(result.current.searchedData).toEqual(mockData);
      expect(result.current.activeSearch).toEqual({});
    });
  });

  describe('filter search - client side', () => {
    it('should filter by exact match (case insensitive)', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'alice'));

      expect(result.current.searchedData).toHaveLength(2);
      expect(result.current.searchedData.map((r) => r.name)).toEqual(['Alice', 'Alice Johnson']);
    });

    it('should filter case insensitively - uppercase search matches lowercase data', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'ALICE'));

      expect(result.current.searchedData).toHaveLength(2);
      expect(result.current.searchedData.map((r) => r.name)).toEqual(['Alice', 'Alice Johnson']);
    });

    it('should filter case insensitively - lowercase search matches mixed case data', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('email', 'CHARLIE@TEST.COM'));

      expect(result.current.searchedData).toHaveLength(1);
      expect(result.current.searchedData[0].email).toBe('charlie@test.com');
    });

    it('should filter by partial match (contains)', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'son'));

      expect(result.current.searchedData).toHaveLength(1);
      expect(result.current.searchedData[0].name).toBe('Alice Johnson');
    });

    it('should filter multiple columns - all conditions must match', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'Alice'));
      act(() => result.current.updateSearch('email', 'alice@test'));

      expect(result.current.searchedData).toHaveLength(1);
      expect(result.current.searchedData[0]).toEqual({ id: 1, name: 'Alice', email: 'alice@test.com' });
    });
  });

  describe('empty string handling', () => {
    it('should remove search key when updateSearch is called with empty string', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'Alice'));
      expect(result.current.searchedData).toHaveLength(2);
      expect(result.current.activeSearch).toHaveProperty('name', 'Alice');

      act(() => result.current.updateSearch('name', ''));
      expect(result.current.activeSearch).not.toHaveProperty('name');
      expect(result.current.searchedData).toEqual(mockData);
    });

    it('should return all data when activeSearch has key with empty string (edge case)', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'Alice'));
      act(() => result.current.updateSearch('name', ''));

      expect(result.current.searchedData).toEqual(mockData);
    });

    it('should treat empty search as match-all for that column in filter logic', async () => {
      const dataWithEmpty: User[] = [
        { id: 1, name: 'Alice', email: 'alice@test.com' },
        { id: 2, name: 'Bob', email: '' },
      ];
      const { result } = await renderHook(() => useFilterSearch<User>({ data: dataWithEmpty }));

      act(() => result.current.updateSearch('name', 'Bob'));
      expect(result.current.searchedData).toHaveLength(1);
      expect(result.current.searchedData[0].name).toBe('Bob');
    });
  });

  describe('resetSearch', () => {
    it('should remove specific column from search', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'Alice'));
      act(() => result.current.updateSearch('email', 'test'));
      expect(Object.keys(result.current.activeSearch)).toHaveLength(2);

      act(() => result.current.resetSearch('name'));
      expect(result.current.activeSearch).not.toHaveProperty('name');
      expect(result.current.activeSearch).toHaveProperty('email', 'test');
    });
  });

  describe('resetAllSearch', () => {
    it('should clear all search and return full data', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'Alice'));
      expect(result.current.searchedData).toHaveLength(2);

      act(() => result.current.resetAllSearch());
      expect(result.current.activeSearch).toEqual({});
      expect(result.current.searchedData).toEqual(mockData);
    });
  });

  describe('useServerSearch', () => {
    it('should return data as-is without client filtering when useServerSearch is true', async () => {
      const onChangeSearch = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSearch<User>({
          data: mockData,
          useServerSearch: true,
          onChangeSearch,
        })
      );

      act(() => result.current.updateSearch('name', 'NonExistent'));

      expect(result.current.searchedData).toEqual(mockData);
      expect(onChangeSearch).toHaveBeenCalledWith({ name: 'NonExistent' });
    });
  });

  describe('isResetFilter', () => {
    it('should reset activeSearch when isResetFilter becomes true', async () => {
      const defaultProps = { data: mockData, isResetFilter: false };
      const { result, rerender } = await renderHook((props = defaultProps) => useFilterSearch<User>(props), { initialProps: defaultProps });

      act(() => result.current.updateSearch('name', 'Alice'));
      expect(result.current.activeSearch).toHaveProperty('name', 'Alice');

      await act(async () => {
        rerender({ data: mockData, isResetFilter: true });
      });

      expect(result.current.activeSearch).toEqual({});
    });
  });

  describe('no match', () => {
    it('should return empty array when search matches nothing', async () => {
      const { result } = await renderHook(() => useFilterSearch<User>({ data: mockData }));

      act(() => result.current.updateSearch('name', 'ZzzNonexistent'));

      expect(result.current.searchedData).toHaveLength(0);
    });
  });
});
