import { ReactNode, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { DataContext, IDataContext } from './data-context';
import useSortTable from '../hooks/use-sort-table';
import useFilterTable from '../hooks/use-filter-table';
import useFilterAdvanceTable from '../hooks/use-filter-advance-table';
import useSearchTable from '../hooks/use-search-table';
import { ITableVirtual } from '../types';
import useCheckboxSelection from '../hooks/use-checkbox-selection';

interface IDataProvider<TDataSource>
  extends Pick<
    ITableVirtual<TDataSource>,
    | 'useServerSort'
    | 'useServerFilter'
    | 'useServerAdvanceFilter'
    | 'onChangeSort'
    | 'onChangeFilter'
    | 'onChangeAdvanceFilter'
    | 'useServerSearch'
    | 'onChangeSearch'
    | 'checkBoxSelectionKey'
    | 'onChangeCheckBoxSelection'
  > {
  children: ReactNode;
  dataSource: TDataSource[];
  gridRef: React.RefObject<Grid | null>;
}

const DataProvider = <TDataSource,>(props: IDataProvider<TDataSource>) => {
  const {
    gridRef,
    children,
    dataSource,
    checkBoxSelectionKey,
    useServerSort,
    useServerFilter,
    useServerAdvanceFilter,
    onChangeCheckBoxSelection,
    onChangeSort,
    onChangeFilter,
    onChangeAdvanceFilter,
    useServerSearch,
    onChangeSearch,
  } = props;

  const { selectedCheckBoxes, isCheckedAll, handleSelectCheckboxRow, handleSelectAllCheckbox } = useCheckboxSelection({
    data: dataSource || [],
    onChangeCheckBoxSelection,
    keyExtractor: (item) => {
      const key = checkBoxSelectionKey as keyof TDataSource;
      return item[key] != null ? String(item[key]) : '';
    },
  });

  const { sortedData, handleSort, handleSpecificSort, sortKey, sortBy } = useSortTable({
    data: dataSource || [],
    onChangeSort,
    useServerSort,
  });

  const { filteredData, isFilterCardOpen, handleOpenFilter, filterCardRef, filterCardPosition, updateFilter, resetFilter, activeFilters } =
    useFilterTable({
      gridRef,
      data: sortedData || [],
      onChangeFilter,
      useServerFilter,
    });

  const {
    filteredAdvanceData,
    filterAdvanceCardRef,
    isFilterAdvanceCardOpen,
    handleOpenAdvanceFilter,
    filterAdvanceCardPosition,
    applyAdvanceFilter,
    resetAdvanceFilter,
    activeAdvanceFilters,
  } = useFilterAdvanceTable({
    gridRef,
    data: filteredData || [],
    onChangeAdvanceFilter,
    useServerAdvanceFilter,
  });

  const { searchedData, isSearchCardOpen, handleOpenSearch, searchCardRef, searchCardPosition, updateSearch, resetSearch, activeSearch } =
    useSearchTable({
      gridRef,
      data: filteredAdvanceData || [],
      useServerSearch,
      onChangeSearch,
    });

  const contextValue = useMemo(
    () =>
      ({
        finalDataSource: (searchedData || []) as Record<string, string | number>[],
        sort: { sortKey, sortBy, handleSort, handleSpecificSort },
        checkBoxSelection: {
          checkBoxSelectionKey: checkBoxSelectionKey as string,
          isCheckedAll,
          selectedCheckBoxes,
          handleSelectCheckboxRow,
          handleSelectAllCheckbox,
        },
        filter: {
          isFilterCardOpen,
          handleOpenFilter,
          filterCardRef,
          filterCardPosition,
          updateFilter,
          resetFilter,
          activeFilters,
        },
        filterAdvance: {
          isFilterAdvanceCardOpen,
          handleOpenAdvanceFilter,
          filterAdvanceCardRef,
          filterAdvanceCardPosition,
          applyAdvanceFilter,
          resetAdvanceFilter,
          activeAdvanceFilters,
        },
        search: {
          isSearchCardOpen,
          handleOpenSearch,
          searchCardRef,
          searchCardPosition,
          updateSearch,
          resetSearch,
          activeSearch,
        },
      }) satisfies IDataContext,
    [
      searchedData,
      sortKey,
      sortBy,
      isFilterCardOpen,
      filterCardPosition,
      activeFilters,
      isFilterAdvanceCardOpen,
      filterAdvanceCardPosition,
      activeAdvanceFilters,
      isSearchCardOpen,
      searchCardPosition,
      activeSearch,
      selectedCheckBoxes,
      isCheckedAll,
    ]
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export default DataProvider;
