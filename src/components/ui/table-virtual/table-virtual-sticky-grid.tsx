import { memo, useCallback, useEffect, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import TableVirtualEmptyData from './components/table-virtual-empty-data';
import useGridScrolling from './hooks/use-grid-scrolling';
import { useDataContext } from './service/data-context';
import { useHeaderContext } from './service/header-context';
import { useUIContext } from './service/ui-context';
import TableVirtualCell from './table-virtual-cell';
import TableVirtualInnerElement from './table-virtual-inner-element';
import { ITableVirtualStickyGrid } from './types';

const TableVirtualStickyGrid = (props: ITableVirtualStickyGrid) => {
  const { width, height, gridRef, outerRef, onScrollTouchBottom, searchValue, expandComponent, data } = props;

  const {
    rowHeight,
    adjustedColumnWidth,
    setAdjustedColumnWidth,
    useAutoWidth,
    setOuterSize,
    setScrollbarWidth,
    // outerSize,
    isLoading,
    isScrolling,
    setIsScrolling,
    useFooter,
    onRightClickCell,
  } = useUIContext();

  const { finalDataSource, expandedRow } = useDataContext();

  const {
    nonFreezedHeaders,
    totalCountColumnNonFreezedHeaders,
    totalCountColumnNonFreezedHeadersExceptFixedWidth,
    totalCountFixedWidthNonFreezedHeaders,
    totalCountColumnAllHeaders,
  } = useHeaderContext();

  useEffect(() => {
    if (!outerRef.current) return;
    const scrollbarWidth = outerRef.current.offsetWidth - outerRef.current.clientWidth;

    setOuterSize?.({ width: outerRef.current.offsetWidth, height: outerRef.current.offsetHeight });
    setScrollbarWidth?.(scrollbarWidth);

    if (useAutoWidth) {
      const calculatedOuterWidth = width - (totalCountFixedWidthNonFreezedHeaders || 0);

      setAdjustedColumnWidth?.(Math.ceil((calculatedOuterWidth - scrollbarWidth) / (totalCountColumnNonFreezedHeadersExceptFixedWidth || 1)) - 1);
    }
  }, [width, height, useAutoWidth, nonFreezedHeaders, finalDataSource]);

  useEffect(() => {
    gridRef.current?.resetAfterIndices({ columnIndex: 0, rowIndex: 0, shouldForceUpdate: true });
  }, [totalCountColumnAllHeaders, expandedRow]);

  const itemKey = useCallback(
    ({ rowIndex, columnIndex }: { rowIndex: number; columnIndex: number }) => {
      const col = nonFreezedHeaders?.[columnIndex];
      return `${rowIndex}-${col?.key || columnIndex}`;
    },
    [nonFreezedHeaders]
  );

  const { handleScroll } = useGridScrolling({
    gridRef,
    finalDataSource,
    isLoading,
    rowHeight,
    onScrollTouchBottom,
  });

  const gridColumnWidths = useMemo((): number[] => {
    return nonFreezedHeaders?.map(({ fixedWidth }) => fixedWidth || adjustedColumnWidth) || [];
  }, [nonFreezedHeaders, adjustedColumnWidth]);

  //   const calculatingHeight = outerSize.height - finalDataSource?.length * rowHeight;
  return (
    <div className="size-max relative">
      <Grid
        key={'table-virtual-grid' + adjustedColumnWidth}
        itemKey={itemKey}
        className="border border-gray-300"
        ref={gridRef}
        outerRef={outerRef}
        itemData={data}
        width={width}
        height={height}
        onItemsRendered={(res) => <>{(res.overscanColumnStartIndex = 1)}</>}
        rowHeight={(index) => {
          if (!expandComponent) return rowHeight;
          return (data?.[index] as { id: string })?.id?.toString()?.startsWith('expanded') ? 300 + rowHeight : rowHeight;
        }}
        columnWidth={(index) => gridColumnWidths[index]}
        columnCount={totalCountColumnNonFreezedHeaders || 0}
        // rowCount={finalDataSource?.length + (Math.abs(calculatingHeight) >= 12 && useFooter ? 1 : 0) || 0}
        rowCount={finalDataSource?.length}
        innerElementType={(props) => <TableVirtualInnerElement {...props} data={data} expandComponent={expandComponent} outerRef={outerRef} />}
        // innerElementType={TableVirtualInnerElement}
        overscanRowCount={5}
        overscanColumnCount={2}
        onScroll={(props) => {
          handleScroll?.(props);
          onRightClickCell?.(null);
          const scrollTop = props.scrollTop;

          if (!useFooter) return;
          if (scrollTop >= 12 && !isScrolling) {
            setIsScrolling?.(true);
          } else if (scrollTop <= 12 && isScrolling) {
            setIsScrolling?.(false);
          }
        }}
      >
        {({ columnIndex, rowIndex, style, data }) => {
          return (
            <>
              <TableVirtualCell rowIndex={rowIndex} columnIndex={columnIndex} style={style} expandComponent={expandComponent} data={data} />
            </>
          );
        }}
      </Grid>

      {!finalDataSource?.length && !isLoading && <TableVirtualEmptyData searchValue={searchValue} />}
    </div>
  );
};

export default memo(TableVirtualStickyGrid);
