/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, forwardRef } from 'react';
import { HEADER_GROUP_HEIGHT } from './constants';
import { useHeaderContext } from './service/header-context';
import { useUIContext } from './service/ui-context';
import TableVirtualStickyColumns from './table-virtual-sticky-columns';
import TableVirtualStickyFooters from './table-virtual-sticky-footers';
import TableVirtualStickyHeaders from './table-virtual-sticky-headers';
import { ITableVirtualInnerElement } from './types';
import { getRenderedCursor } from './utils';

const TableVirtualInnerElement = forwardRef<HTMLDivElement, ITableVirtualInnerElement>((props, ref) => {
  const { data, expandComponent, outerRef } = props;

  const { stickyHeaderHeight, useFooter, stickyFooterHeight, isScrolling } = useUIContext();
  const { freezedHeaders, totalCountFreezedHeadersWidth, totalCountGridWidth, headersHasChildren } = useHeaderContext();
  const [minRow, maxRow, _minColumn, _maxColumn] = getRenderedCursor(Children.toArray(props.children));

  const groupedByRow: Record<number, any[]> = {};
  Children.toArray(props.children).forEach((child: any) => {
    const rowIndex = child?.props?.rowIndex;
    if (rowIndex !== undefined) {
      if (!groupedByRow[rowIndex]) {
        groupedByRow[rowIndex] = [];
      }
      groupedByRow[rowIndex].push(child);
    }
  });

  return (
    <div
      id="innerbase-grid"
      ref={ref}
      style={{
        ...props.style,
        width: totalCountGridWidth,
        height: props.style.height || 0 + stickyHeaderHeight,
      }}
    >
      <TableVirtualStickyHeaders />
      <TableVirtualStickyColumns minRow={minRow} maxRow={maxRow} />
      {useFooter && <TableVirtualStickyFooters />}

      <div
        className="absolute"
        style={{
          top:
            isScrolling && useFooter
              ? -(stickyHeaderHeight - (stickyHeaderHeight - stickyFooterHeight))
              : stickyHeaderHeight + (headersHasChildren ? HEADER_GROUP_HEIGHT : 0),
          left: freezedHeaders?.length ? totalCountFreezedHeadersWidth : 0,
        }}
      >
        {Object.entries(groupedByRow).map(([rowIndex, cells]) => {
          if (expandComponent) {
            const id = (data[+rowIndex] as { id: string }).id.toString();
            const isExpanded = id.startsWith('expanded');
            if (isExpanded) {
              const fullWidth = outerRef.current?.querySelector('#innerbase-grid')?.clientWidth || 0;
              const style = cells[0]?.props?.style || {};
              return (
                <div
                  key={`expanded-${rowIndex}`}
                  data-row={rowIndex}
                  style={{
                    ...style,
                    height: style?.height - 30,
                    top: style.top + 10,
                    left: 49,
                    width: `${fullWidth - 50}px`,
                  }}
                >
                  {expandComponent(+id.replaceAll('expanded-', ''))}
                  <div className="absolute border-b border-b-gray-300 left-[-50px] bottom-[-20px] w-[calc(100%+50px)] h-0" />
                </div>
              );
            }
          }

          return (
            <div key={rowIndex} data-row={rowIndex}>
              {cells}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default TableVirtualInnerElement;
