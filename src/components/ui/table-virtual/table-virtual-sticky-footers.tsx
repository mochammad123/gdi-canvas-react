import { CSSProperties, memo, ReactNode } from 'react';
import clsx from 'clsx';
import { useHeaderContext } from './service/header-context';
import { useDataContext } from './service/data-context';
import { useUIContext } from './service/ui-context';

const TableVirtualStickyFooters = () => {
  const { adjustedColumnWidth, stickyFooterHeight, rowHeight, outerSize, scrollbarWidth } = useUIContext();
  const { finalDataSource } = useDataContext();
  const {
    freezedHeaders,
    freezedRightHeaders,
    nonFreezedHeaders,
    totalCountFreezedHeadersWidth,
    totalCountFreezedRightHeadersWidth,
    totalCountGridWidth,
  } = useHeaderContext();

  const calculatingHeight = outerSize.height - finalDataSource?.length * rowHeight;
  const useAbsolutePosition = calculatingHeight > rowHeight;
  const hasScrollHorizontal = totalCountGridWidth > outerSize.width;

  let footerLeftPosition = 0;
  let footerLeftFreezedPosition = 0;
  let footerLeftFreezedRightPosition = outerSize.width - totalCountFreezedRightHeadersWidth - scrollbarWidth;

  return (
    <>
      <div
        id="footers"
        className={clsx('sticky left-0 flex flex-row z-[3]')}
        style={{
          position: useAbsolutePosition ? 'absolute' : 'sticky',
          top: outerSize.height - stickyFooterHeight - (hasScrollHorizontal ? scrollbarWidth : 2),
          height: stickyFooterHeight,
          width: totalCountGridWidth + totalCountFreezedRightHeadersWidth,
        }}
      >
        {freezedHeaders?.map(({ key, renderSummary, fixedWidth, ...style }, columnIndex) => {
          footerLeftFreezedPosition += fixedWidth || adjustedColumnWidth;

          return (
            <FooterItem
              isFreezed
              key={'table-footer-freezed-' + key + columnIndex}
              value={renderSummary?.() || ''}
              style={{
                ...style,
                borderRightWidth: '1px',
                width: fixedWidth || adjustedColumnWidth,
                height: stickyFooterHeight,
                left: footerLeftFreezedPosition - (fixedWidth || adjustedColumnWidth),
              }}
            />
          );
        })}

        {freezedRightHeaders?.map(({ key, renderSummary, fixedWidth, ...style }, columnIndex) => {
          const firstColumn = columnIndex === 0;
          const lastColumn = columnIndex === freezedRightHeaders?.length - 1;
          footerLeftFreezedRightPosition += fixedWidth || adjustedColumnWidth;

          return (
            <FooterItem
              isFreezedRight
              key={'table-footer-freezed-' + key + columnIndex}
              value={renderSummary?.() || ''}
              style={{
                ...style,
                borderLeftWidth: firstColumn ? '1px' : '0px',
                borderRightWidth: !lastColumn ? '1px' : '0px',
                width: fixedWidth || adjustedColumnWidth,
                height: stickyFooterHeight,
                left: footerLeftFreezedRightPosition - (fixedWidth || adjustedColumnWidth),
              }}
            />
          );
        })}

        <div className="absolute">
          {nonFreezedHeaders?.map(({ key, renderSummary, fixedWidth, ...style }, colIndex) => {
            const lastColumnIndex = colIndex === nonFreezedHeaders?.length - 1;
            footerLeftPosition += fixedWidth || adjustedColumnWidth;

            return (
              <FooterItem
                key={'table-footer' + key + colIndex}
                value={renderSummary?.() || ''}
                style={{
                  ...style,
                  borderRightWidth: !lastColumnIndex ? '1px' : '0px',
                  width: fixedWidth || adjustedColumnWidth,
                  height: stickyFooterHeight,
                  left: totalCountFreezedHeadersWidth + footerLeftPosition - (fixedWidth || adjustedColumnWidth),
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

interface IFooterItem {
  style: CSSProperties;
  value: ReactNode | string;
  isFreezed?: boolean;
  isFreezedRight?: boolean;
}

const FooterItem = (props: IFooterItem) => {
  const { style, value, isFreezed = false, isFreezedRight = false } = props;

  return (
    <div
      className={clsx(
        isFreezed || isFreezedRight ? 'sticky z-[3]' : 'absolute',
        'border-gray-300 border-t-gray-500',
        'bg-gray-100 flex flex-row space-x-3 items-center text-xs font-bold border-t'
      )}
      style={style}
    >
      {value}
    </div>
  );
};

export default memo(TableVirtualStickyFooters);
