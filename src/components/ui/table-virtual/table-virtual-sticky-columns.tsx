import { Fragment, memo, useRef, useState } from 'react';
import clsx from 'clsx';

import { ITableVirtualStickyColumns } from './types';
import { HEADER_GROUP_HEIGHT } from './constants';
import useOnClickOutside from './hooks/use-click-outside';
import { useHeaderContext } from './service/header-context';
import { useDataContext } from './service/data-context';
import { useUIContext } from './service/ui-context';
import TableRightClickCardWrapper from './components/table-right-click-card-wrapper';
import TableVirtualCellCheckbox from './table-virtual-cell-checkbox';
import TableVirtualCellAction from './table-virtual-cell-action';

const TableVirtualStickyColumns = ({ minRow, maxRow }: ITableVirtualStickyColumns) => {
  const rightClickWrapperRef = useRef<HTMLDivElement>(null);
  const actionCardRef = useRef<HTMLDivElement>(null);
  const [showActionCard, setShowActionCard] = useState({ show: false, rowIndex: -1 });

  const {
    scrollbarWidth,
    selectedRowIndex,
    onClickGridRow,
    stickyFooterHeight,
    useFooter,
    stickyHeaderHeight,
    adjustedColumnWidth,
    rowHeight,
    isScrolling,
    onRightClickCell,
    cellPosition,
    renderRightClickRow,
    classNameCell,
    outerSize,
  } = useUIContext();
  const { finalDataSource, checkBoxSelection } = useDataContext();
  const { freezedHeaders, freezedRightHeaders, headersHasChildren, totalCountFreezedRightHeadersWidth } = useHeaderContext();

  useOnClickOutside(rightClickWrapperRef, () => onRightClickCell?.(null));
  useOnClickOutside(actionCardRef, () => setShowActionCard?.({ show: false, rowIndex: -1 }));

  let currLeftPosStickyLeft = 0;
  let currLeftPosStickyRight = outerSize?.width - totalCountFreezedRightHeadersWidth - scrollbarWidth;

  return (
    <div
      style={{
        marginTop: isScrolling && useFooter ? -stickyHeaderHeight - stickyFooterHeight - (headersHasChildren ? HEADER_GROUP_HEIGHT : 0) : 0,
      }}
    >
      {/*  Render Freezed Sticky Columns on the Left Side */}
      {freezedHeaders?.map(({ key: columnKeyName, render, fixedWidth }, idx) => {
        const columnIndex = idx;
        currLeftPosStickyLeft += fixedWidth || adjustedColumnWidth;

        return (
          <div
            key={'freezed-column-item-' + idx}
            className={clsx('sticky z-[2] bg-green-50')}
            style={{
              width: adjustedColumnWidth,
              height: `calc(100% - ${stickyHeaderHeight}px)`,
              left: currLeftPosStickyLeft - (fixedWidth || adjustedColumnWidth),
            }}
          >
            {Array.from({ length: maxRow - minRow + 1 }).map((_, idx) => {
              const rowIndex = minRow + idx;

              const cellValue = finalDataSource[rowIndex]?.[columnKeyName as keyof (typeof finalDataSource)[0]];
              const finalValue = typeof cellValue === 'number' && cellValue === 0 ? 0 : cellValue || '';
              const isFreezed = freezedHeaders?.find(({ key }) => key === columnKeyName)?.freezed;
              const headerKey = freezedHeaders?.[columnIndex]?.key;
              const headerClassName = freezedHeaders?.[columnIndex]?.className;

              return (
                <Fragment key={'freezed-column-row-item-' + idx}>
                  <div
                    onClick={() => onClickGridRow?.(finalDataSource[rowIndex], rowIndex)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onClickGridRow?.(finalDataSource[rowIndex], rowIndex);
                      onRightClickCell?.({
                        x: e.clientX,
                        y: e.clientY,
                        rowIndex,
                        columnIndex,
                        isFreezed: true,
                      });
                    }}
                    className={clsx(
                      'border-r border-r-gray-300 border-b border-b-gray-300',
                      'absolute flex items-center hover:bg-blue-100 hover:border hover:border-blue-900 group',
                      'px-1.5 text-xs bg-gray-100 cursor-pointer',
                      rowIndex % 2 !== 0 ? 'bg-gray-100' : 'bg-white',
                      {
                        '!border-y !border-y-blue-900 !bg-blue-100': rowIndex === selectedRowIndex,
                        '!border-l !border-l-blue-900': rowIndex === selectedRowIndex && columnIndex === 0,
                      },
                      classNameCell?.(finalDataSource[rowIndex], rowIndex, columnIndex, true)
                    )}
                    style={{
                      height: rowHeight,
                      width: fixedWidth || adjustedColumnWidth,
                      top: (minRow + idx) * rowHeight,
                    }}
                  >
                    {headerKey !== 'action' && headerKey !== 'checkbox-selection' && (
                      <div className={clsx('w-full truncate', headerClassName)}>
                        {render ? render(finalDataSource[rowIndex], rowIndex) : (finalValue as string | number)}
                      </div>
                    )}

                    {headerKey === 'checkbox-selection' && (
                      <TableVirtualCellCheckbox rowIndex={rowIndex} checkBoxSelection={checkBoxSelection} finalDataSource={finalDataSource} />
                    )}
                  </div>

                  {renderRightClickRow &&
                    cellPosition &&
                    cellPosition.rowIndex === rowIndex &&
                    cellPosition.columnIndex === columnIndex &&
                    cellPosition.isFreezed === isFreezed && (
                      <TableRightClickCardWrapper wrapperRef={rightClickWrapperRef} position={cellPosition}>
                        {renderRightClickRow?.(finalDataSource[rowIndex], finalValue as string | number, () => onRightClickCell?.(null))}
                      </TableRightClickCardWrapper>
                    )}
                </Fragment>
              );
            })}
          </div>
        );
      })}

      {/*  Render Freezed Sticky Columns on the Right Side */}
      {freezedRightHeaders?.map(({ key: columnKeyName, render, fixedWidth }, idx) => {
        const columnIndex = idx;
        const isLastColumn = columnIndex === freezedRightHeaders.length - 1;

        currLeftPosStickyRight += fixedWidth || adjustedColumnWidth;

        return (
          <div
            key={'freezed-column-item-' + idx}
            className={clsx('bg-white sticky z-[2]')}
            style={{
              width: fixedWidth || adjustedColumnWidth,
              height: `calc(100% - ${stickyHeaderHeight}px)`,
              left: currLeftPosStickyRight - (fixedWidth || adjustedColumnWidth),
            }}
          >
            {Array.from({ length: maxRow - minRow + 1 }).map((_, idx) => {
              const rowIndex = minRow + idx;

              const cellValue = finalDataSource[rowIndex]?.[columnKeyName as keyof (typeof finalDataSource)[0]];
              const finalValue = typeof cellValue === 'number' && cellValue === 0 ? 0 : cellValue || '';
              const isFreezed = freezedRightHeaders?.find(({ key }) => key === columnKeyName)?.freezed;
              const headerKey = freezedRightHeaders?.[columnIndex]?.key;
              const headerClassName = freezedRightHeaders?.[columnIndex]?.className;
              const headerRender = freezedRightHeaders?.[columnIndex]?.render;

              return (
                <Fragment key={'freezed-column-row-item-' + idx}>
                  <div
                    onClick={() => onClickGridRow?.(finalDataSource[rowIndex], rowIndex)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onClickGridRow?.(finalDataSource[rowIndex], rowIndex);
                      onRightClickCell?.({
                        x: e.clientX,
                        y: e.clientY,
                        rowIndex,
                        columnIndex,
                        isFreezed: true,
                      });
                    }}
                    className={clsx(
                      'border-b border-gray-300',
                      'absolute flex items-center hover:bg-blue-100 hover:border hover:border-blue-900 group',
                      'px-1.5 text-xs bg-gray-100 cursor-pointer',
                      !isLastColumn && 'border-r',
                      rowIndex % 2 !== 0 ? 'bg-gray-100' : 'bg-white',
                      columnIndex === 0 && '!border-l',
                      rowIndex === selectedRowIndex && '!border-y !border-y-blue-900 !bg-blue-100',
                      rowIndex === selectedRowIndex && isLastColumn && '!border-r !border-r-blue-900',
                      classNameCell?.(finalDataSource[rowIndex], rowIndex, columnIndex, true)
                    )}
                    style={{
                      height: rowHeight,
                      width: fixedWidth || adjustedColumnWidth,
                      top: (minRow + idx) * rowHeight,
                    }}
                  >
                    {headerKey !== 'action' && headerKey !== 'checkbox-selection' && (
                      <div className={clsx('w-full truncate', headerClassName)}>
                        {render ? render(finalDataSource[rowIndex], rowIndex) : (finalValue as string | number)}
                      </div>
                    )}

                    {headerKey === 'checkbox-selection' && (
                      <TableVirtualCellCheckbox rowIndex={rowIndex} checkBoxSelection={checkBoxSelection} finalDataSource={finalDataSource} />
                    )}

                    {headerKey === 'action' &&
                      (!headerRender ? (
                        <TableVirtualCellAction
                          rowIndex={rowIndex}
                          actionCardRef={actionCardRef}
                          showActionCard={showActionCard}
                          setShowActionCard={setShowActionCard}
                          finalDataSource={finalDataSource}
                        />
                      ) : (
                        headerRender(finalDataSource[rowIndex], rowIndex)
                      ))}
                  </div>

                  {renderRightClickRow &&
                    cellPosition &&
                    cellPosition.rowIndex === rowIndex &&
                    cellPosition.columnIndex === columnIndex &&
                    cellPosition.isFreezed === isFreezed && (
                      <TableRightClickCardWrapper wrapperRef={rightClickWrapperRef} position={cellPosition}>
                        {renderRightClickRow?.(finalDataSource[rowIndex], finalValue as string | number, () => onRightClickCell?.(null))}
                      </TableRightClickCardWrapper>
                    )}
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(TableVirtualStickyColumns);
