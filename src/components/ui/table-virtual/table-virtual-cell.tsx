import clsx from 'clsx';
import { memo, useRef, useState } from 'react';

import TableRightClickCardWrapper from './components/table-right-click-card-wrapper';
import useOnClickOutside from './hooks/use-click-outside';
import { useDataContext } from './service/data-context';
import { useHeaderContext } from './service/header-context';
import { useUIContext } from './service/ui-context';
import TableVirtualCellAction from './table-virtual-cell-action';
import TableVirtualCellCheckbox from './table-virtual-cell-checkbox';
import TableVirtualCellExpand from './table-virtual-cell-expand';
import { ITableVirtualCell } from './types';

const TableVirtualCell = ({ rowIndex, columnIndex, style, expandComponent, data }: ITableVirtualCell) => {
  const rightClickWrapperRef = useRef<HTMLDivElement>(null);
  const actionCardRef = useRef<HTMLDivElement>(null);

  const { selectedRowIndex, onClickGridRow, classNameCell, onRightClickCell, cellPosition, renderRightClickRow } = useUIContext();
  const { finalDataSource, checkBoxSelection, expandedRow } = useDataContext();
  const { freezedHeaders, freezedRightHeaders, nonFreezedHeaders } = useHeaderContext();

  const [showActionCard, setShowActionCard] = useState({ show: false, rowIndex: -1 });

  useOnClickOutside(rightClickWrapperRef, () => onRightClickCell?.(null));
  useOnClickOutside(actionCardRef, () => setShowActionCard?.({ show: false, rowIndex: -1 }));

  const headerKey = nonFreezedHeaders?.[columnIndex]?.key;
  const headerRender = nonFreezedHeaders?.[columnIndex]?.render;
  const headerFreezed = nonFreezedHeaders?.[columnIndex]?.freezed;
  const headerClassName = nonFreezedHeaders?.[columnIndex]?.className;

  if (!headerKey) return;
  const cellValue = finalDataSource[rowIndex]?.[headerKey as keyof (typeof finalDataSource)[0]];
  const finalValue = typeof cellValue === 'number' && cellValue === 0 ? 0 : cellValue || '';
  const hasFreezedRight = freezedRightHeaders && freezedRightHeaders?.length > 0;

  return (
    <div
      style={{ ...style }}
      onClick={() => onClickGridRow?.(finalDataSource[rowIndex], rowIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onClickGridRow?.(finalDataSource[rowIndex], rowIndex);
        onRightClickCell?.({ x: e.clientX, y: e.clientY, rowIndex, columnIndex, isFreezed: false });
      }}
      className={clsx(
        'relative group text-xs hover:bg-blue-100 hover:border hover:border-blue-900',
        'flex flex-row items-center px-1.5 border-b border-b-gray-300',
        columnIndex !== nonFreezedHeaders?.length - 1 && 'border-r border-r-gray-300',
        onClickGridRow && '!cursor-pointer',
        rowIndex % 2 !== 0 ? 'bg-gray-100' : 'bg-white',
        {
          '!border-y !border-y-blue-900 !bg-blue-100': rowIndex === selectedRowIndex,
          '!border-l !border-l-blue-900': rowIndex === selectedRowIndex && columnIndex === 0 && !freezedHeaders?.length,
          '!border-r !border-r-blue-900': rowIndex === selectedRowIndex && columnIndex === nonFreezedHeaders?.length - 1 && !hasFreezedRight,
        },
        classNameCell?.(finalDataSource[rowIndex], rowIndex, columnIndex, false)
      )}
    >
      {headerKey !== 'checkbox-selection' && headerKey !== 'action' && headerKey !== 'expand' && (
        <div className={clsx('truncate w-full', headerClassName)}>
          {headerRender ? headerRender(finalDataSource[rowIndex], rowIndex) : (finalValue as string | number)}{' '}
        </div>
      )}

      {headerKey === 'checkbox-selection' && (
        <TableVirtualCellCheckbox rowIndex={rowIndex} checkBoxSelection={checkBoxSelection} finalDataSource={finalDataSource} />
      )}

      {headerKey === 'expand' && (
        <TableVirtualCellExpand
          rowIndex={rowIndex}
          item={data[rowIndex]}
          expandedRow={expandedRow}
          expandComponent={expandComponent}
          finalDataSource={finalDataSource}
        />
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

      {renderRightClickRow &&
        cellPosition &&
        cellPosition.rowIndex === rowIndex &&
        cellPosition.columnIndex === columnIndex &&
        !cellPosition.isFreezed === !headerFreezed && (
          <TableRightClickCardWrapper wrapperRef={rightClickWrapperRef} position={cellPosition}>
            {renderRightClickRow?.(finalDataSource[rowIndex], finalValue as string | number, () => onRightClickCell?.(null))}
          </TableRightClickCardWrapper>
        )}
    </div>
  );
};

export default memo(TableVirtualCell);
