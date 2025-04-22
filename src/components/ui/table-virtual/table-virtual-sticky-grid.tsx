import { VariableSizeGrid as Grid } from 'react-window';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { ITableVirtualStickyGrid } from './types';
import tableVirtualInnerElement from './table-virtual-inner-element';
import TableVirtualCell from './table-virtual-cell';
import { useHeaderContext } from './service/header-context';
import { useDataContext } from './service/data-context';
import useGridScrolling from './hooks/use-grid-scrolling';
import { useUIContext } from './service/ui-context';
import TableVirtualEmptyData from './components/table-virtual-empty-data';

const TableVirtualStickyGrid = (props: ITableVirtualStickyGrid) => {
  const { width, height, gridRef, outerRef, onScrollTouchBottom, searchValue } = props;

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

  const { finalDataSource } = useDataContext();

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
    gridRef.current?.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
  }, [totalCountColumnAllHeaders]);

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
        width={width}
        height={height}
        rowHeight={() => rowHeight}
        columnWidth={(index) => gridColumnWidths[index]}
        columnCount={totalCountColumnNonFreezedHeaders || 0}
        // rowCount={finalDataSource?.length + (Math.abs(calculatingHeight) >= 12 && useFooter ? 1 : 0) || 0}
        rowCount={finalDataSource?.length}
        innerElementType={tableVirtualInnerElement}
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
        {({ columnIndex, rowIndex, style }) => <TableVirtualCell rowIndex={rowIndex} columnIndex={columnIndex} style={style} />}
      </Grid>

      {!finalDataSource?.length && !isLoading && <TableVirtualEmptyData searchValue={searchValue} />}
    </div>
  );
};

export default memo(TableVirtualStickyGrid);
