import { memo, useMemo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import { MINIMUM_ROW_HEIGHT } from './constants';
import DataProvider from './service/data-provider';
import HeaderProvider from './service/header-provider';
import UIProvider from './service/ui-provider';
import TableVirtualLoading from './table-virtual-loading';
import TableVirtualStickyGrid from './table-virtual-sticky-grid';
import { ITableVirtual } from './types';

const TableVirtual = <T,>(props: ITableVirtual<T>) => {
  const {
    dataSource,
    headers,
    columnWidth = 180,
    rowHeight = MINIMUM_ROW_HEIGHT,
    stickyHeaderHeight = 50,
    stickyFooterHeight = 40,
    headerModel = 'double-row',
    searchValue,
    checkBoxSelectionKey,
    useAutoWidth = false,
    useFooter,
    useServerSort,
    useServerFilter,
    useServerAdvanceFilter,
    useServerSearch,
    useColumnHiddenIndicator,
    isLoading,
    onChangeCheckBoxSelection,
    onExpandRow,
    onChangeSearch,
    onChangeAdvanceFilter,
    onChangeFilter,
    onChangeSort,
    onScrollTouchBottom,
    onClickRow,
    classNameCell,
    renderRightClickRow,
    renderActionCard,
    expandComponent,
  } = props;

  const gridRef = useRef<Grid | null>(null);
  const outerRef = useRef<HTMLElement>(null);

  const memoizedHeaders = useMemo(() => headers || [], [headers]);
  const memoizedDataSource = useMemo(() => dataSource || [], [dataSource]);
  const memoizedParentValue = useMemo(
    () => ({
      gridRef,
      columnWidth,
      rowHeight,
      stickyHeaderHeight,
      stickyFooterHeight,
      headerModel,
      isLoading,
      useAutoWidth,
      useFooter,
      useColumnHiddenIndicator,
      classNameCell,
      renderRightClickRow,
      renderActionCard,
    }),
    [props]
  );

  return (
    <UIProvider columnWidth={columnWidth} onClickRow={onClickRow} parentValue={memoizedParentValue}>
      <HeaderProvider headers={memoizedHeaders || []} stickyHeaderHeight={stickyHeaderHeight}>
        <DataProvider
          gridRef={gridRef}
          dataSource={memoizedDataSource || []}
          checkBoxSelectionKey={checkBoxSelectionKey}
          useServerSort={useServerSort}
          useServerFilter={useServerFilter}
          useServerAdvanceFilter={useServerAdvanceFilter}
          useServerSearch={useServerSearch}
          onChangeCheckBoxSelection={onChangeCheckBoxSelection}
          onExpandRow={onExpandRow}
          onChangeSort={onChangeSort}
          onChangeFilter={onChangeFilter}
          onChangeAdvanceFilter={onChangeAdvanceFilter}
          onChangeSearch={onChangeSearch}
        >
          <div className="h-[calc(100%-0.1rem)] relative">
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <TableVirtualStickyGrid
                    width={width}
                    height={height}
                    gridRef={gridRef}
                    data={memoizedDataSource}
                    outerRef={outerRef}
                    onScrollTouchBottom={onScrollTouchBottom}
                    searchValue={searchValue}
                    expandComponent={expandComponent}
                  />
                );
              }}
            </AutoSizer>

            {isLoading && <TableVirtualLoading />}
          </div>
        </DataProvider>
      </HeaderProvider>
    </UIProvider>
  );
};

export default memo(TableVirtual) as typeof TableVirtual;
