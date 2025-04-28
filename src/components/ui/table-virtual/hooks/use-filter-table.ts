import { useCallback, useMemo, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { getFixedCardPosition } from '../utils';
import useOnClickOutside from './use-click-outside';
import useCloseOnWindowScroll from './use-close-on-window-scroll';

interface IFilterTable<TDataSource> {
  gridRef: React.RefObject<Grid | null>;
  data: TDataSource[];
  onChangeFilter?: (data: Record<keyof TDataSource, string[]>) => void;
  useServerFilter?: boolean;
}

export default function useFilterTable<TDataSource>(props: IFilterTable<TDataSource>) {
  const { gridRef, data, onChangeFilter, useServerFilter = false } = props;

  const filterCardRef = useRef<HTMLDivElement | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<keyof TDataSource, string[]>>({} as Record<keyof TDataSource, string[]>);

  const [isFilterCardOpen, setIsFilterCardOpen] = useState({ show: false, key: '' });
  const [filterCardPosition, setFilterCardPosition] = useState({ top: 0, left: 0 });

  useCloseOnWindowScroll({
    enabled: isFilterCardOpen.show,
    onClose: () => setIsFilterCardOpen({ show: false, key: '' }),
  });

  useOnClickOutside(filterCardRef, () => setIsFilterCardOpen({ show: false, key: '' }));

  const filteredData = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return data;
    if (useServerFilter) return data;

    return data.filter((row) => {
      return Object.entries(activeFilters).every(([columnName, filterValues]) => {
        const rowValue = row[columnName as keyof TDataSource]; // Bisa berupa angka atau string
        const filterValue = (filterValues as (string | number)[]).map((val) => (typeof rowValue === 'number' ? Number(val) : String(val)));

        return filterValue.some((value) => rowValue === value); // Pastikan tipe sama sebelum compare
      });
    });
  }, [data, activeFilters, useServerFilter]);

  const handleOpenFilter = useCallback((e: React.MouseEvent<HTMLElement>, activeFilterKey: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { calculatedTop, calculatedLeft } = getFixedCardPosition(rect);

    setFilterCardPosition({ top: calculatedTop, left: calculatedLeft });
    setIsFilterCardOpen({ show: true, key: activeFilterKey });
  }, []);

  const updateFilter = useCallback(
    (dataKey: keyof TDataSource | string, filterValues: string[]) => {
      gridRef.current?.scrollTo({ scrollTop: 0 });

      setActiveFilters((prev) => {
        const newFilters = { ...prev };

        if (filterValues.length === 0) {
          delete newFilters[dataKey as keyof TDataSource];
        } else {
          newFilters[dataKey as keyof TDataSource] = filterValues;
        }

        onChangeFilter?.(newFilters);

        return newFilters;
      });

      setIsFilterCardOpen({ show: false, key: '' });
    },
    [onChangeFilter]
  );

  const resetFilter = useCallback(
    (dataKey: keyof TDataSource | string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[dataKey as keyof TDataSource];
        onChangeFilter?.(newFilters);
        return newFilters;
      });
      setIsFilterCardOpen({ show: false, key: '' });
    },
    [onChangeFilter]
  );

  const resetAllFilter = useCallback(() => setActiveFilters({} as Record<keyof TDataSource, string[]>), []);

  return {
    filteredData,
    filterCardRef,
    filterCardPosition,
    isFilterCardOpen,
    handleOpenFilter,
    updateFilter,
    resetFilter,
    activeFilters,
    resetAllFilter,
  };
}
