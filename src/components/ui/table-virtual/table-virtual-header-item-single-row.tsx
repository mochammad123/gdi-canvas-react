import { memo } from 'react';
import clsx from 'clsx';

import { HEADER_GROUP_HEIGHT } from './constants';
import useResizableHeader from './hooks/use-resizable-header';
import { useHeaderContext } from './service/header-context';
import { useDataContext } from './service/data-context';
import { useUIContext } from './service/ui-context';
import IcFilterAdvance from './icons/ic-filter-advance';
import IcFilterMultiple from './icons/ic-filter-multiple';
import IcFilter from './icons/ic-filter';
import IcSearch from './icons/ic-search';
import IcSort from './icons/ic-sort';
import { ITableVirtualHeaderItem } from './types';
import IcMenu from './icons/ic-menu';
import TableVirtualCheckbox from './components/table-virtual-checkbox';

const TableVirtualHeaderItem = (props: ITableVirtualHeaderItem) => {
  const {
    style,
    columnIndex,
    keyName,
    caption,
    totalHeaders,
    useFilter,
    useAdvanceFilter,
    useSort,
    useSearch,
    useSingleFilter,
    useHeaderAction,
    handleOpenFilter,
    handleOpenAdvanceFilter,
    handleOpenSearch,
    handleOpenVisibilityColumnsCard,
    handleSort,
    sortValue,
    isFreezed = false,
  } = props;
  const { outerSize, scrollbarWidth } = useUIContext();
  const { headersHasChildren } = useHeaderContext();
  const { filter, search, checkBoxSelection } = useDataContext();

  const { boxRef, handleMouseDown, resizableWidth, isTempResize } = useResizableHeader({
    keyName,
    columnIndex,
    currentWidth: Number(style.width || 80),
    isFreezed,
  });

  const { checkBoxSelectionKey, handleSelectAllCheckbox, isCheckedAll } = checkBoxSelection ?? {};

  const actionButtons = [
    {
      condition: useAdvanceFilter,
      icon: <IcFilterAdvance className="!size-5 text-gray-600" />,
      onClick: handleOpenAdvanceFilter,
    },
    {
      condition: useFilter,
      icon: !useSingleFilter ? (
        <IcFilterMultiple className="!size-[0.85rem] text-gray-600" />
      ) : (
        <IcFilter className="!size-[1rem] text-gray-600 stroke-0" />
      ),
      onClick: handleOpenFilter,
    },
    {
      condition: useSearch,
      icon: <IcSearch className="!size-[0.85rem] text-gray-600" />,
      onClick: handleOpenSearch,
    },
    { condition: useSort, icon: <IcSort sort={sortValue} />, onClick: handleSort },
    {
      condition: useHeaderAction,
      icon: <IcMenu className="!w-[1rem] !text-gray-700" />,
      onClick: handleOpenVisibilityColumnsCard,
    },
  ];

  return (
    <div
      ref={boxRef}
      className={clsx('group', isFreezed ? 'sticky' : 'absolute')}
      style={{
        ...style,
        zIndex: isFreezed ? 99999999 - columnIndex : 9999999 - columnIndex,
        top: headersHasChildren ? HEADER_GROUP_HEIGHT : 0,
      }}
    >
      {keyName !== 'checkbox-selection' && keyName !== 'action' && (
        <>
          <ResizeIndicator onMouseDown={handleMouseDown} />
          {isTempResize && <ResizeMovingIndicator height={outerSize.height - scrollbarWidth} left={resizableWidth - 8} />}
        </>
      )}

      <div
        className={clsx(
          'bg-gray-100 relative flex flex-row justify-between space-x-3 items-center text-xs font-bold h-full',
          'px-1.5 border-b border-b-gray-300',
          columnIndex !== totalHeaders - 1 && 'border-r border-r-gray-300',
          isFreezed && '!border-r !border-r-gray-300'
        )}
      >
        {keyName !== 'checkbox-selection' && keyName !== 'action' && (
          <>
            <span>{caption}</span>
            <div className="flex flex-row space-x-1.5 shrink-0 -mr-0">
              {actionButtons.map(({ condition, icon, onClick }, index) => {
                const isFilterButton = onClick === handleOpenFilter;
                const isSearchButton = onClick === handleOpenSearch;
                const hasActiveFilter = filter?.activeFilters?.[keyName] !== undefined;
                const hasActiveSearch = search?.activeSearch?.[keyName] !== undefined;

                return (
                  condition && (
                    <button key={index} className="shrink-0 cursor-pointer relative" onClick={(e) => onClick?.(e)}>
                      {icon}

                      {isFilterButton && hasActiveFilter && <NodeActiveFilter className="!-top-[.3rem] !-right-[.25rem]" />}
                      {isSearchButton && hasActiveSearch && <NodeActiveFilter className="!-top-[.3rem] !-right-[.25rem]" />}
                    </button>
                  )
                );
              })}
            </div>
          </>
        )}

        {keyName === 'checkbox-selection' && checkBoxSelectionKey && (
          <div>
            <TableVirtualCheckbox
              name={'checkbox-selection-all'}
              checked={isCheckedAll || false}
              onClick={(e) => e.stopPropagation()}
              onChecked={() => handleSelectAllCheckbox?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ResizeIndicator = (props: { onMouseDown: (e: React.MouseEvent<HTMLElement>) => void }) => (
  <div
    className={clsx('w-1.5 h-full cursor-col-resize z-[9999] group-hover:bg-blue-500/20', 'absolute right-0 top-1/2 -translate-y-1/2')}
    onMouseDown={props.onMouseDown}
  />
);

const ResizeMovingIndicator = (props: { height: number; left: number }) => {
  const { height, left } = props;

  return <div className="bg-blue-500/20 absolute z-[99999999999]" style={{ height, width: 6, left: left }} />;
};

const NodeActiveFilter = ({ className }: { className: string }) => (
  <div className={clsx('size-[.45rem] rounded-full bg-blue-900 absolute -top-[.3rem]', className)} />
);

export default memo(TableVirtualHeaderItem);
