import { LegacyRef, memo, useMemo } from 'react';
import clsx from 'clsx';

import TableVirtualFilterCard from './components/table-virtual-filter-card';
import TableVirtualAdvanceFilterCard from './components/table-virtual-advance-filter-card';
import { ITableVirtualStickyHeaders } from './types';
import { useHeaderContext } from './service/header-context';
import { useDataContext } from './service/data-context';
import TableVirtualMenuCard from './components/table-virtual-menu-card';
import { HEADER_GROUP_HEIGHT } from './constants';
import TableVirtualHeaderItem from './table-virtual-header-item';
import TableVirtualSearchCard from './components/table-virtual-search-card';
import TableVirtualVisibilityColumnsCard from './components/table-virtual-visibility-columns-card';
import Portal from './components/portal';

const TableVirtualStickyHeaders = ({ className, style }: ITableVirtualStickyHeaders) => {
  const { sort, filter, search, filterAdvance } = useDataContext();
  const {
    freezedHeaders,
    freezedGroupHeaders,
    nonFreezedHeaders,
    nonFreezedGroupHeaders,
    totalCountFreezedHeadersWidth,
    totalCountGridWidth,
    menuCard,
    headersHasChildren,
    visibilityColumnsCardRef,
    isVisibilityColumnsCard,
    onOpenVisibilityColumnsCard,
  } = useHeaderContext();

  const { menuCardRef, isMenuCardOpen, onOpenMenuCard } = menuCard ?? {};

  const { sortBy, sortKey, handleSort, handleSpecificSort } = sort || {};

  const { isFilterCardOpen, handleOpenFilter, filterCardRef, filterCardPosition, activeFilters, updateFilter, resetFilter } = filter || {};

  const {
    isFilterAdvanceCardOpen,
    handleOpenAdvanceFilter,
    filterAdvanceCardRef,
    filterAdvanceCardPosition,
    applyAdvanceFilter,
    resetAdvanceFilter,
    activeAdvanceFilters,
  } = filterAdvance || {};

  const { isSearchCardOpen, handleOpenSearch, searchCardRef, searchCardPosition, activeSearch, updateSearch, resetSearch } = search || {};

  const selectedHeader = useMemo(() => {
    return [...(freezedHeaders || []), ...(nonFreezedHeaders || [])]?.find(({ key }) => key === isFilterCardOpen?.key);
  }, [freezedHeaders, nonFreezedHeaders, isFilterCardOpen]);

  let headerGroupLeftPosition = 0;
  let headerLeftPosition = 0;
  let headerGroupLeftFreezedPosition = 0;
  let headerLeftFreezedPosition = 0;

  return (
    <>
      <div id="headers" className={clsx('sticky top-0 flex flex-row z-[3]', className)} style={{ ...style, width: totalCountGridWidth }}>
        <div className="sticky top-0 left-0 w-max z-[999999999]">
          {headersHasChildren && (
            <div className="relative w-full h-[36px] flex">
              {freezedGroupHeaders?.map((groupHeader, groupIdx) => {
                const { hasChildren, caption, fixedWidth, width } = groupHeader ?? {};

                headerGroupLeftFreezedPosition += fixedWidth || width;

                return (
                  <div
                    key={'grou-header-freezed' + groupIdx}
                    className="bg-gray-100 border-r border-b border-gray-300 flex justify-center items-center text-xs font-bold"
                    style={{
                      height: HEADER_GROUP_HEIGHT,
                      width: fixedWidth || width,
                      left: headerGroupLeftFreezedPosition - (fixedWidth || width),
                    }}
                  >
                    {hasChildren ? caption : ''}
                  </div>
                );
              })}
            </div>
          )}

          <div className="relative w-full bg-yellow-50 flex">
            {freezedHeaders?.map((freezedHeader, columnIndex) => {
              const { key, caption, useAdvanceFilter, useFilter, useSearch, useSort, useSingleFilter, useHeaderAction, fixedWidth, width, ...style } =
                freezedHeader;

              headerLeftFreezedPosition += fixedWidth || width;

              return (
                <TableVirtualHeaderItem
                  isFreezed
                  key={'table-header-freezed-' + key + columnIndex}
                  keyName={key}
                  caption={caption}
                  columnIndex={columnIndex}
                  useSort={useSort}
                  useSearch={useSearch}
                  useFilter={useFilter}
                  useSingleFilter={useSingleFilter}
                  useAdvanceFilter={useAdvanceFilter}
                  useHeaderAction={useHeaderAction}
                  totalHeaders={freezedHeaders.length}
                  sortValue={sortKey === key ? sortBy : 'unset'}
                  handleSort={() => handleSort?.(key)}
                  handleOpenSearch={(e) => handleOpenSearch?.(e, key)}
                  handleOpenFilter={(e) => handleOpenFilter?.(e, key)}
                  handleOpenAdvanceFilter={(e) => handleOpenAdvanceFilter?.(e, key)}
                  handleOpenMenuCard={(e) => onOpenMenuCard?.(e, key)}
                  handleOpenVisibilityColumnsCard={(e) => onOpenVisibilityColumnsCard?.(e)}
                  handleApplySearch={updateSearch}
                  handleResetSearch={resetSearch}
                  style={{
                    ...style,
                    width: fixedWidth || width,
                    left: headerLeftFreezedPosition - (fixedWidth || width),
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="absolute">
          {headersHasChildren &&
            nonFreezedGroupHeaders?.map((groupHeader, colIndex) => {
              const { hasChildren, caption, fixedWidth, width } = groupHeader ?? {};

              headerGroupLeftPosition += fixedWidth || width;

              return (
                <div
                  key={'grou-header-' + colIndex}
                  className="absolute bg-gray-100 border-r border-b border-gray-300 flex justify-center items-center text-xs font-bold"
                  style={{
                    ...style,
                    width: fixedWidth || width,
                    height: HEADER_GROUP_HEIGHT,
                    left: (totalCountFreezedHeadersWidth || 0) + headerGroupLeftPosition - (fixedWidth || width),
                  }}
                >
                  {hasChildren ? caption : ''}
                </div>
              );
            })}

          {nonFreezedHeaders?.map((nonFreezedHeader, colIndex) => {
            const { key, caption, useAdvanceFilter, useFilter, useSort, useSearch, useSingleFilter, useHeaderAction, fixedWidth, width, ...style } =
              nonFreezedHeader;

            headerLeftPosition += fixedWidth || width;

            return (
              <TableVirtualHeaderItem
                key={'table-header-non-freezed-' + key + colIndex}
                keyName={key}
                caption={caption}
                columnIndex={colIndex}
                useSort={useSort}
                useSearch={useSearch}
                useFilter={useFilter}
                useSingleFilter={useSingleFilter}
                useAdvanceFilter={useAdvanceFilter}
                useHeaderAction={useHeaderAction}
                totalHeaders={nonFreezedHeaders.length}
                sortValue={sortKey === key ? sortBy : 'unset'}
                handleSort={() => handleSort?.(key)}
                handleOpenSearch={(e) => handleOpenSearch?.(e, key)}
                handleOpenFilter={(e) => handleOpenFilter?.(e, key)}
                handleOpenAdvanceFilter={(e) => handleOpenAdvanceFilter?.(e, key)}
                handleOpenMenuCard={(e) => onOpenMenuCard?.(e, key)}
                handleOpenVisibilityColumnsCard={(e) => onOpenVisibilityColumnsCard?.(e)}
                handleApplySearch={updateSearch}
                handleResetSearch={resetSearch}
                style={{
                  ...style,
                  width: fixedWidth || width,
                  left: (totalCountFreezedHeadersWidth || 0) + headerLeftPosition - (fixedWidth || width),
                }}
              />
            );
          })}
        </div>
      </div>

      {isSearchCardOpen?.show && searchCardRef && searchCardPosition && (
        <TableVirtualSearchCard
          searchCardRef={searchCardRef}
          searchCardPosition={searchCardPosition}
          searchDataKey={isSearchCardOpen.key}
          onApplySearch={updateSearch}
          onResetSearch={resetSearch}
          activeSearch={activeSearch?.[isSearchCardOpen.key] || ''}
        />
      )}

      {isFilterCardOpen?.show && filterCardRef && filterCardPosition && (
        <TableVirtualFilterCard
          filterDataKey={isFilterCardOpen.key}
          filterCardRef={filterCardRef}
          filterPosition={filterCardPosition}
          onApplyFilter={updateFilter}
          onResetFilter={resetFilter}
          activeFilters={activeFilters?.[isFilterCardOpen.key] || []}
          filterOptions={selectedHeader?.filterOptions || []}
          useSingleFilter={selectedHeader?.useSingleFilter}
        />
      )}

      {isFilterAdvanceCardOpen?.show && filterAdvanceCardRef && filterAdvanceCardPosition && (
        <TableVirtualAdvanceFilterCard
          filterDataKey={isFilterAdvanceCardOpen.key}
          filterCardRef={filterAdvanceCardRef}
          filterCardPosition={filterAdvanceCardPosition}
          onApplyAdvanceFilter={applyAdvanceFilter}
          onResetAdvanceFilter={resetAdvanceFilter}
          activeAdvanceFilters={activeAdvanceFilters?.[isFilterAdvanceCardOpen.key]}
        />
      )}

      {isMenuCardOpen?.show && (
        <TableVirtualMenuCard
          menuCardRef={menuCardRef}
          position={isMenuCardOpen.position}
          onSort={(order) => handleSpecificSort?.(isMenuCardOpen.dataKey as string, order)}
        />
      )}

      {isVisibilityColumnsCard?.show && (
        <Portal>
          <div
            ref={visibilityColumnsCardRef as LegacyRef<HTMLDivElement>}
            className="fixed !z-[9999]"
            style={{
              left: isVisibilityColumnsCard.position.left + 28,
              top: isVisibilityColumnsCard.position.top,
            }}
          >
            <TableVirtualVisibilityColumnsCard />
          </div>
        </Portal>
      )}
    </>
  );
};

export default memo(TableVirtualStickyHeaders);
