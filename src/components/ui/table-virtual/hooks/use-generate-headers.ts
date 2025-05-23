import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IDataHeader, ITableVirtualHeaderColumn, ITableVirtualHeaderParentColumn } from '../types';
import { getFixedCardPosition } from '../utils';
import useOnClickOutside from './use-click-outside';

interface IGenerateHeaders<T> {
  headers?: IDataHeader<T>[];
  stickyHeaderHeight: number;
  adjustedColumnWidth: number;
  headerModel?: 'single-row' | 'double-row';
}

interface IAdjustedHeaderWidth {
  [key: PropertyKey]: { width: number };
}

export function useGenerateHeaders<T>(props: IGenerateHeaders<T>) {
  const { headers, stickyHeaderHeight, adjustedColumnWidth, headerModel } = props;

  const visibilityColumnsCardRef = useRef<HTMLDivElement>(null);

  const [adjustedHeaderWidth, setAdjustedHeaderWidth] = useState<IAdjustedHeaderWidth>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [isVisibilityColumnsCard, setIsVisibilityColumnsCard] = useState({
    show: false,
    position: { top: 0, left: 0 },
  });

  useEffect(() => {
    if (!headers?.length) return;
    setVisibleColumns([
      ...(headers?.map(({ caption, key }) => (key == 'action' ? 'Action' : key == 'checkbox-selection' ? 'Checkbox Selection' : caption)) || []),
    ]);
  }, [headers]);

  useOnClickOutside(visibilityColumnsCardRef, () => setIsVisibilityColumnsCard({ show: false, position: { top: 0, left: 0 } }));

  const headerData = useMemo(() => {
    return headers
      ?.filter(({ caption, key }) =>
        visibleColumns.includes(key == 'action' ? 'Action' : key == 'checkbox-selection' ? 'Checkbox Selection' : caption)
      )
      ?.reduce(
        (acc, data, idx) => {
          const width = adjustedHeaderWidth[data.key]?.width || adjustedColumnWidth;
          const fixedWidth = adjustedHeaderWidth[data.key]?.width || data.fixedWidth || 0;

          // ======== Define data header dari data yang tetap maupun yang adjustable ========
          const header: ITableVirtualHeaderColumn = {
            ...(data as ITableVirtualHeaderColumn),
            filterOptions: data.filterOptions || [],
            width: data.children?.length
              ? data.children.reduce((total, child) => total + (adjustedHeaderWidth[child.key]?.width || adjustedColumnWidth), 0)
              : width,
            fixedWidth: data.children?.length
              ? data.children.reduce(
                  (total, child) => total + (adjustedHeaderWidth[child.key]?.width || child.fixedWidth || adjustedColumnWidth || 0),
                  0
                )
              : fixedWidth,
            height: stickyHeaderHeight,
            left: idx * adjustedColumnWidth,
            useHeaderAction: data.useHeaderAction ?? headerModel === 'double-row',
            useFilter: data.useFilter ?? false,
            useSort: data.useSort ?? true,
            useSearch: data.useSearch ?? false,
            useSingleFilter: data.useSingleFilter ?? false,
          };

          //  ======== Jika header freezed. ========
          if (header.freezed) {
            // ======== Push data header ke arr freezed parent headers ========
            acc.freezedGroup.push({
              width: header.width,
              fixedWidth: header.fixedWidth || 0,
              caption: header.caption,
              hasChildren: !!data?.children?.length || false,
            });

            // ======== Push data header ke arr freezed headers ========
            if (data.children) {
              acc.freezed.push(
                ...data.children.map((child, childIdx) => ({
                  ...(child as ITableVirtualHeaderColumn),
                  height: stickyHeaderHeight,
                  width: adjustedHeaderWidth[child.key]?.width || adjustedColumnWidth,
                  fixedWidth: adjustedHeaderWidth[child.key]?.width || child.fixedWidth,
                  left: childIdx * adjustedColumnWidth,
                  useHeaderAction: data.useHeaderAction ?? headerModel === 'double-row',
                  useFilter: child.useFilter ?? false,
                  useSort: child.useSort ?? true,
                  useSearch: child.useSearch ?? false,
                  useSingleFilter: child.useSingleFilter ?? false,
                  freezed: true,
                }))
              );
            } else {
              acc.freezed.push(header);
            }
          }

          // Jika Header bukan Freezed namun ia Freezed Right
          else if (header.freezedRight) {
            acc.freezedRightGroup.push({
              width: header.width,
              fixedWidth: header.fixedWidth || 0,
              caption: header.caption,
              hasChildren: !!data?.children?.length || false,
            });

            if (data.children) {
              acc.freezedRight.push(
                ...data.children.map((child, childIdx) => ({
                  ...(child as ITableVirtualHeaderColumn),
                  height: stickyHeaderHeight,
                  width: adjustedHeaderWidth[child.key]?.width || adjustedColumnWidth,
                  fixedWidth: adjustedHeaderWidth[child.key]?.width || child.fixedWidth,
                  left: childIdx * adjustedColumnWidth,
                  useHeaderAction: data.useHeaderAction ?? headerModel === 'double-row',
                  useFilter: child.useFilter ?? false,
                  useSort: child.useSort ?? true,
                  useSearch: child.useSearch ?? false,
                  useSingleFilter: child.useSingleFilter ?? false,
                  freezedRight: true,
                }))
              );
            } else {
              acc.freezedRight.push(header);
            }
          }

          // ======== Jika header bukan yang freezed. ========
          else {
            // ======== Push data header ke arr non freezed parent headers ========
            acc.nonFreezedGroup.push({
              width: header.width,
              fixedWidth: header.fixedWidth || 0,
              caption: header.caption,
              hasChildren: !!data?.children?.length || false,
            });

            // ======== Push data header ke arr non freezed headers ========
            if (data.children) {
              acc.nonFreezed.push(
                ...data.children.map((child, childIdx) => ({
                  ...(child as ITableVirtualHeaderColumn),
                  height: stickyHeaderHeight,
                  width: adjustedHeaderWidth[child.key]?.width || adjustedColumnWidth,
                  fixedWidth: adjustedHeaderWidth[child.key]?.width || child.fixedWidth,
                  left: childIdx * adjustedColumnWidth,
                  useHeaderAction: data.useHeaderAction ?? headerModel === 'double-row',
                  useFilter: child.useFilter ?? false,
                  useSort: child.useSort ?? true,
                  useSearch: child.useSearch ?? false,
                  useSingleFilter: child.useSingleFilter ?? false,
                }))
              );
            } else {
              acc.nonFreezed.push(header);
            }
          }

          return acc;
        },
        { freezed: [], freezedRight: [], nonFreezed: [], freezedRightGroup: [], freezedGroup: [], nonFreezedGroup: [] } as {
          freezed: ITableVirtualHeaderColumn[];
          freezedRight: ITableVirtualHeaderColumn[];
          nonFreezed: ITableVirtualHeaderColumn[];
          freezedGroup: ITableVirtualHeaderParentColumn[];
          freezedRightGroup: ITableVirtualHeaderParentColumn[];
          nonFreezedGroup: ITableVirtualHeaderParentColumn[];
        }
      );
  }, [headers, adjustedColumnWidth, stickyHeaderHeight, adjustedHeaderWidth, visibleColumns, headerModel]);

  const handleResizeHeaderColumn = useCallback((keyName: string, newWidth: number) => {
    setAdjustedHeaderWidth((prev) => ({ ...prev, [keyName]: { width: newWidth } }));
  }, []);

  const handleOpenVisibilityColumnsCard = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { calculatedTop, calculatedLeft } = getFixedCardPosition(rect);

    setIsVisibilityColumnsCard({
      show: true,
      position: { top: calculatedTop, left: calculatedLeft },
    });
  }, []);

  const handleSelectVisibilityColumnsCard = useCallback((option: string) => {
    setVisibleColumns((prev) => {
      return prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option];
    });
  }, []);

  return {
    freezedHeaders: headerData?.freezed,
    freezedRightHeaders: headerData?.freezedRight,
    freezedGroupHeaders: headerData?.freezedGroup,
    freezedRightGroupHeaders: headerData?.freezedRightGroup,
    nonFreezedHeaders: headerData?.nonFreezed,
    nonFreezedGroupHeaders: headerData?.nonFreezedGroup,
    handleResizeHeaderColumn,
    handleOpenVisibilityColumnsCard,
    handleSelectVisibilityColumnsCard,
    visibleColumns,
    isVisibilityColumnsCard,
    visibilityColumnsCardRef,
  };
}
