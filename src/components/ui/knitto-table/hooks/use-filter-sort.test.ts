import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useFilterSort from './use-filter-sort';

type User = { id: number; name: string | null; email: string };

const mockData: User[] = [
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
];

const mockDataWithNulls: User[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: null, email: 'bob@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
  { id: 4, name: null, email: 'dave@test.com' },
];

describe('useFilterSort', () => {
  describe('initial state', () => {
    it('should return sortKey null and sortBy unset by default', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData }));

      expect(result.current.sortKey).toBeNull();
      expect(result.current.sortBy).toBe('unset');
    });

    it('should return sortedData as original data when no sort applied', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData }));

      expect(result.current.sortedData).toEqual(mockData);
    });
  });

  describe('sort asc/desc/unset cycle (handleSort)', () => {
    it('should cycle asc -> desc -> unset when clicking same column', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData }));

      act(() => result.current.handleSort('name'));
      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('asc');

      act(() => result.current.handleSort('name'));
      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('desc');

      act(() => result.current.handleSort('name'));
      expect(result.current.sortKey).toBeNull();
      expect(result.current.sortBy).toBe('unset');
    });

    it('should set asc when clicking different column', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData }));

      act(() => result.current.handleSort('name'));
      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('asc');

      act(() => result.current.handleSort('email'));
      expect(result.current.sortKey).toBe('email');
      expect(result.current.sortBy).toBe('asc');
    });
  });

  describe('client sort (useServerSort false)', () => {
    it('should sort ascending by string column', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSort('name'));

      expect(result.current.sortedData.map((r) => r.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should sort descending by string column', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSort('name'));
      act(() => result.current.handleSort('name'));

      expect(result.current.sortedData.map((r) => r.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('should sort ascending by numeric column', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSort('id'));

      expect(result.current.sortedData.map((r) => r.id)).toEqual([1, 2, 3]);
    });
  });

  describe('null handling', () => {
    it('should put nulls first when ascending', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockDataWithNulls, useServerSort: false }));

      act(() => result.current.handleSort('name'));

      expect(result.current.sortedData.map((r) => r.name)).toEqual([null, null, 'Alice', 'Charlie']);
    });

    it('should put nulls last when descending', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockDataWithNulls, useServerSort: false }));

      act(() => result.current.handleSpecificSort('name', 'desc'));

      expect(result.current.sortedData.map((r) => r.name)).toEqual(['Charlie', 'Alice', null, null]);
    });

    it('should treat both null values equal', async () => {
      const dataWithTwoNulls: User[] = [
        { id: 1, name: null, email: 'a@test.com' },
        { id: 2, name: null, email: 'b@test.com' },
      ];
      const { result } = await renderHook(() => useFilterSort<User>({ data: dataWithTwoNulls, useServerSort: false }));

      act(() => result.current.handleSort('name'));

      expect(result.current.sortedData).toHaveLength(2);
      expect(result.current.sortedData.every((r) => r.name === null)).toBe(true);
    });
  });

  describe('server sort (useServerSort true)', () => {
    it('should return data as-is without client sorting', async () => {
      const onChangeSort = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSort<User>({
          data: mockData,
          useServerSort: true,
          onChangeSort,
        })
      );

      act(() => result.current.handleSort('name'));

      expect(result.current.sortedData).toEqual(mockData);
    });

    it('should call onChangeSort when handleSort is triggered', async () => {
      const onChangeSort = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSort<User>({
          data: mockData,
          useServerSort: true,
          onChangeSort,
        })
      );

      act(() => result.current.handleSort('name'));
      expect(onChangeSort).toHaveBeenCalledWith('name', 'asc');

      act(() => result.current.handleSort('name'));
      expect(onChangeSort).toHaveBeenCalledWith('name', 'desc');

      act(() => result.current.handleSort('name'));
      expect(onChangeSort).toHaveBeenCalledWith('name', 'unset');
    });

    it('should call onChangeSort when handleSpecificSort is triggered', async () => {
      const onChangeSort = vi.fn();
      const { result } = await renderHook(() =>
        useFilterSort<User>({
          data: mockData,
          useServerSort: true,
          onChangeSort,
        })
      );

      act(() => result.current.handleSpecificSort('email', 'desc'));
      expect(onChangeSort).toHaveBeenCalledWith('email', 'desc');
    });
  });

  describe('isResetFilter', () => {
    it('should reset sortKey and sortBy when isResetFilter becomes true', async () => {
      const defaultProps = { data: mockData, isResetFilter: false };
      const { result, rerender } = await renderHook((props = defaultProps) => useFilterSort<User>(props), { initialProps: defaultProps });

      act(() => result.current.handleSort('name'));
      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('asc');

      await act(async () => {
        rerender({ data: mockData, isResetFilter: true });
      });

      expect(result.current.sortKey).toBeNull();
      expect(result.current.sortBy).toBe('unset');
    });
  });

  describe('handleSpecificSort', () => {
    it('should set sort directly to asc', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSpecificSort('name', 'asc'));

      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('asc');
      expect(result.current.sortedData.map((r) => r.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should set sort directly to desc', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSpecificSort('name', 'desc'));

      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortBy).toBe('desc');
      expect(result.current.sortedData.map((r) => r.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('should clear sort when unset', async () => {
      const { result } = await renderHook(() => useFilterSort<User>({ data: mockData, useServerSort: false }));

      act(() => result.current.handleSpecificSort('name', 'asc'));
      expect(result.current.sortKey).toBe('name');

      act(() => result.current.handleSpecificSort('name', 'unset'));
      expect(result.current.sortKey).toBeNull();
      expect(result.current.sortBy).toBe('unset');
      expect(result.current.sortedData).toEqual(mockData);
    });
  });
});
