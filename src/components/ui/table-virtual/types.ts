import { CSSProperties, HTMLAttributes, JSX, ReactNode } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { ADVANCE_FILTER_NAMES } from './constants';
import { TSortOrder } from './hooks/use-sort-table';

export interface ITableVirtual<TDataSource> {
  dataSource?: TDataSource[];
  headers?: IDataHeader<TDataSource>[];
  columnWidth?: number;
  rowHeight?: number;
  stickyHeaderHeight?: number;
  stickyFooterHeight?: number;
  isLoading?: boolean;
  headerModel?: 'single-row' | 'double-row';
  checkBoxSelectionKey?: keyof TDataSource;
  useAutoWidth?: boolean;
  useFooter?: boolean;
  useServerSearch?: boolean;
  useServerSort?: boolean;
  useServerFilter?: boolean;
  useServerAdvanceFilter?: boolean;
  useColumnHiddenIndicator?: boolean;
  searchValue?: string;
  onExpandRow?: (id: number, status: boolean) => void;
  onChangeCheckBoxSelection?: (selectedCheckBoxes: string[]) => void;
  onChangeAdvanceFilter?: (data: Record<string, { filterName: TAdvanceFilterName; value: string }>) => void;
  onChangeSearch?: (data: Record<string, string>) => void;
  onChangeFilter?: (data: Record<string, string[]>) => void;
  onChangeSort?: (sortKey: string, sortBy: TSortOrder) => void;
  onScrollTouchBottom?: () => void;
  onClickRow?: (data: Record<string, string | number>, rowIndex: number) => void;
  classNameCell?: (data: Record<string, string | number>, rowIndex: number, columnIndex: number, isFreezed: boolean) => string;
  renderRightClickRow?: (data: Record<string, string | number> | null, value: string | number, callbackFn?: () => void) => JSX.Element;
  renderActionCard?: (data: Record<string, string | number>, rowIndex: number) => ReactNode;
  expandComponent?: (id: number) => React.ReactNode;
}

export interface ICellPosition {
  x: number;
  y: number;
  rowIndex: number;
  columnIndex: number;
  isFreezed?: boolean;
}

export interface ITableVirtualStickyGrid {
  width: number;
  height: number;
  data: unknown[];
  gridRef: React.RefObject<Grid>;
  outerRef: React.RefObject<HTMLElement | null>;
  onScrollTouchBottom?: () => void;
  searchValue?: string;
  expandComponent?: (id: number) => React.ReactNode;
}

export interface ITableVirtualInnerElement {
  children: ReactNode;
  style: CSSProperties;
  expandComponent?: (id: number) => React.ReactNode;
  outerRef: React.RefObject<HTMLElement | null>;
  data: unknown[];
}

export interface ITableVirtualStickyHeaders {
  className?: string;
  style?: CSSProperties;
}

export interface ITableVirtualStickyColumns {
  minRow: number;
  maxRow: number;
}

export interface ITableVirtualHeaderColumn extends Omit<IDataHeader<unknown>, 'caption'> {
  headerIndex?: number;
  caption: string;
  width: number;
  height: number;
  left: number;
}

export interface ITableVirtualHeaderParentColumn {
  caption: string;
  width: number;
  fixedWidth: number;
  hasChildren: boolean;
}

export interface IDataHeader<TDataSource> {
  key: keyof TDataSource | 'checkbox-selection' | 'action' | 'expand' | 'expand-component';
  caption: string;
  className?: string;
  useHeaderAction?: boolean;
  useFilter?: boolean;
  useSort?: boolean;
  useSearch?: boolean;
  useSingleFilter?: boolean;
  useAdvanceFilter?: boolean;
  freezed?: boolean;
  freezedRight?: boolean;
  filterOptions?: string[];
  render?: (data?: TDataSource, rowIndex?: number) => ReactNode | string;
  renderSummary?: () => ReactNode | string;
  fixedWidth?: number;
  children?: Omit<IDataHeader<TDataSource>, 'freezed'>[];
}

export interface ITableVirtualCell extends Pick<ITableVirtualStickyGrid, 'expandComponent' | 'data'> {
  rowIndex: number;
  columnIndex: number;
  style: CSSProperties;
}

export interface ITableVirtualHeaderItem {
  style: CSSProperties;
  columnIndex: number;
  keyName: string;
  caption: string;
  totalHeaders: number;
  useFilter?: boolean;
  useAdvanceFilter?: boolean;
  useSort?: boolean;
  useSearch?: boolean;
  useHeaderAction?: boolean;
  useSingleFilter?: boolean;
  handleOpenFilter?: (e: React.MouseEvent<HTMLElement>) => void;
  handleOpenAdvanceFilter?: (e: React.MouseEvent<HTMLElement>) => void;
  handleOpenMenuCard?: (e: React.MouseEvent<HTMLElement>) => void;
  handleSort?: () => void;
  handleApplySearch?: (dataKey: string, searchValue: string) => void;
  handleResetSearch?: (dataKey: string) => void;
  sortValue?: TSortOrder;
  isFreezed?: boolean;
  isFreezedRight?: boolean;
  children?: ITableVirtualHeaderColumn[];
  headersHasChildren?: boolean;
  handleOpenSearch?: (e: React.MouseEvent<HTMLElement>) => void;
  handleOpenVisibilityColumnsCard?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ITableVirtualFilterCard extends HTMLAttributes<HTMLDivElement> {
  filterDataKey: string;
  filterOptions?: string[];
  filterCardRef: React.LegacyRef<HTMLDivElement>;
  filterPosition: { top: number; left: number };
  activeFilters?: string[];
  onResetFilter?: (dataKey: string) => void;
  onApplyFilter?: (dataKey: string, filterValues: string[]) => void;
  useSingleFilter?: boolean;
}

export interface ITableVirtualSearchCard extends HTMLAttributes<HTMLDivElement> {
  searchDataKey: string;
  searchCardRef: React.LegacyRef<HTMLDivElement>;
  searchCardPosition: { top: number; left: number };
  activeSearch?: string;
  onResetSearch?: (dataKey: string) => void;
  onApplySearch?: (dataKey: string, searchValue: string) => void;
}

export interface ITableVirtualFilterAdvanceCard extends HTMLAttributes<HTMLDivElement> {
  filterDataKey: string;
  filterCardRef: React.LegacyRef<HTMLDivElement>;
  filterCardPosition: { top: number; left: number };
  onApplyAdvanceFilter?: (dataKey: string, filterName: TAdvanceFilterName, filterValue: string) => void;
  onResetAdvanceFilter?: (dataKey: string) => void;
  activeAdvanceFilters?: { filterName: TAdvanceFilterName; value: string };
}

export type TAdvanceFilterName = keyof typeof ADVANCE_FILTER_NAMES;

export type TExpandedRows = Record<number, boolean>;
