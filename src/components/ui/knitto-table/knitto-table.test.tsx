import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { renderWithProviders } from '@/test/test-utils';
import type { IHeader, IKnittoTable, IVirtualTableRef } from './lib';
import KnittoTable from './knitto-table';

type User = { id: number; name: string };

const defaultMockData: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Brown' },
];

const defaultMockHeaders: IHeader<User>[] = [
  { key: 'id', caption: 'ID', width: 80, filterSelectionOptions: ['1', '2', '3'] },
  { key: 'name', caption: 'Name', width: 200, filterSelectionOptions: ['John Doe', 'Jane Smith', 'Alice Brown'] },
];

const renderKnittoTable = <T extends User>(props: Partial<IKnittoTable<T>>, ref?: React.ForwardedRef<IVirtualTableRef>) => {
  return (
    <div className="h-96 w-full">
      <KnittoTable data={defaultMockData as T[]} headers={defaultMockHeaders as IHeader<T>[]} rowKey="id" {...props} ref={ref} />
    </div>
  );
};

describe('Knitto Table', () => {
  describe('rendering modes', () => {
    it('should render with minimal props: headers, data, rowKey', async () => {
      const screen = await renderWithProviders(renderKnittoTable({}));

      await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
    });

    it('should render virtual table when useRegularTable is false', async () => {
      const screen = await renderWithProviders(renderKnittoTable({}));

      await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
    });

    it('should render regular table when useRegularTable is true', async () => {
      const screen = await renderWithProviders(renderKnittoTable({ useRegularTable: true }));

      await expect.element(screen.getByTestId('kn-table-regular')).toBeInTheDocument();
    });
  });

  describe('loading and empty states', () => {
    it('should show loading indicator when isLoading is true', async () => {
      const screen = await renderWithProviders(renderKnittoTable({ isLoading: true }));

      await expect.element(screen.getByTestId('kn-table-loading-indicator')).toBeInTheDocument();
    });

    it('should show "Tidak ada data yang tersedia" when data is empty', async () => {
      const screen = await renderWithProviders(renderKnittoTable({ data: [] }));

      const emptyIndicator = screen.getByTestId('kn-table-empty-data');
      await expect.element(emptyIndicator).toBeInTheDocument();
      await expect.element(emptyIndicator).toHaveTextContent('Tidak ada data yang tersedia');
    });
  });

  describe('footer rendering', () => {
    it('should show footer in virtual table when useFooter is true', async () => {
      const screen = await renderWithProviders(renderKnittoTable({ useFooter: true }));

      await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
      await expect.element(screen.getByTestId('kn-virtual-table-footer')).toBeInTheDocument();
    });

    it('should display footer in regular table when useFooter is true', async () => {
      const screen = await renderWithProviders(renderKnittoTable({ useRegularTable: true, useFooter: true }));

      await expect.element(screen.getByTestId('kn-table-regular')).toBeInTheDocument();
      await expect.element(screen.getByTestId('kn-regular-table-footer')).toBeInTheDocument();
    });
  });

  describe('row interactions', () => {
    it('should call onClickRow with correct arguments when row is clicked', async () => {
      const onClickRow = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onClickRow }));

      await expect.element(screen.getByText('John Doe')).toBeInTheDocument();
      await userEvent.click(screen.getByText('John Doe'));

      expect(onClickRow).toHaveBeenCalledWith(expect.objectContaining({ id: 1, name: 'John Doe' }), expect.any(Number), expect.any(Number));
    });

    it('should call onDoubleClickRow with correct arguments', async () => {
      const onDoubleClickRow = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onDoubleClickRow }));

      await expect.element(screen.getByText('John Doe')).toBeInTheDocument();
      await userEvent.dblClick(screen.getByText('John Doe'));

      expect(onDoubleClickRow).toHaveBeenCalledWith(expect.objectContaining({ id: 1, name: 'John Doe' }), expect.any(Number), expect.any(Number));
    });

    it('should call onRightClickRow with item and position', async () => {
      const onRightClickRow = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onRightClickRow }));

      await expect.element(screen.getByText('John Doe')).toBeInTheDocument();
      await userEvent.click(screen.getByText('John Doe'), { button: 'right' });

      expect(onRightClickRow).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'John Doe' }),
        expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) })
      );
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref with scrollElement and virtualizer', async () => {
      const ref: React.RefObject<IVirtualTableRef | null> = { current: null };
      const screen = await renderWithProviders(renderKnittoTable({}, ref));

      await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
      expect(ref.current).not.toBeNull();
      expect(ref.current?.scrollElement).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveProperty('virtualizer');
    });
  });

  describe('drag and drop row reordering', () => {
    it('should call onReorderRows with fromIndex and toIndex when DnD in virtual table', async () => {
      const onReorderRows = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onReorderRows }));

      await expect.element(screen.getByTestId('kn-table-virtual-row-0')).toBeInTheDocument();
      await userEvent.dragAndDrop(screen.getByTestId('kn-table-virtual-row-0'), screen.getByTestId('kn-table-virtual-row-1'));

      expect(onReorderRows).toHaveBeenCalledWith(0, 1);
    });

    it('should call onReorderRows with fromIndex and toIndex when DnD in regular table', async () => {
      const onReorderRows = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ useRegularTable: true, onReorderRows }));

      await expect.element(screen.getByTestId('kn-table-regular-row-0')).toBeInTheDocument();
      await userEvent.dragAndDrop(screen.getByTestId('kn-table-regular-row-0'), screen.getByTestId('kn-table-regular-row-1'));

      expect(onReorderRows).toHaveBeenCalledWith(0, 1);
    });
  });

  describe('server-side filtering', () => {
    it('should call onChangeFilter with correct argument on sort filter', async () => {
      const onChangeFilter = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onChangeFilter: { sort: onChangeFilter }, useServerFilter: { sort: true } }));

      await expect.element(screen.getByTestId('kn-table-header-sort-action-id-unset')).toBeInTheDocument();
      await userEvent.click(screen.getByTestId('kn-table-header-sort-action-id-unset'));

      expect(onChangeFilter).toHaveBeenCalledWith('id', 'asc');
    });

    it('should call onChangeFilter with correct argument on search filter', async () => {
      const onChangeFilter = vi.fn();
      const screen = await renderWithProviders(renderKnittoTable({ onChangeFilter: { search: onChangeFilter }, useServerFilter: { search: true } }));

      await expect.element(screen.getByTestId('kn-table-header-filter-search-input-name')).toBeInTheDocument();
      const searchInput = screen.getByTestId('kn-table-header-filter-search-input-name');
      await userEvent.type(searchInput, 'Jane');

      await expect.element(searchInput).toHaveValue('Jane');

      await userEvent.keyboard('{Enter}');
      expect(onChangeFilter).toHaveBeenCalledWith({ name: 'Jane' });
    });

    it('should call onChangeFilter with correct argument on selection filter', async () => {
      const onChangeFilter = vi.fn();
      const screen = await renderWithProviders(
        renderKnittoTable({
          onChangeFilter: { selection: onChangeFilter },
          useServerFilter: { selection: true },
        })
      );

      await expect.element(screen.getByTestId('kn-table-header-filter-selection-action-name')).toBeInTheDocument();
      await userEvent.click(screen.getByTestId('kn-table-header-filter-selection-action-name'));

      const filterSelectionOption = screen.getByTestId('kn-table-header-filter-selection-option-checkbox-name-John Doe');
      await userEvent.click(filterSelectionOption);

      const filterSelectionApplyBtn = screen.getByTestId('kn-table-filter-action-apply-btn-name');
      await userEvent.click(filterSelectionApplyBtn);

      expect(onChangeFilter).toHaveBeenCalledWith({ name: ['John Doe'] });
    });

    it('should call onChangeFilter with correct argument on advance filter', async () => {
      const onChangeFilter = vi.fn();
      const screen = await renderWithProviders(
        renderKnittoTable({ onChangeFilter: { advance: onChangeFilter }, useServerFilter: { advance: true } })
      );

      await expect.element(screen.getByTestId('kn-table-header-filter-advance-action-name')).toBeInTheDocument();
      await userEvent.click(screen.getByTestId('kn-table-header-filter-advance-action-name'));

      const advanceFilterDropdownBox = screen.getByTestId('kn-table-header-filter-advance-dropdown-box-name');
      await userEvent.click(advanceFilterDropdownBox);

      const advanceFilterDropdownOption = screen.getByTestId('kn-table-header-filter-advance-dropdown-option-name-Equal');
      await userEvent.click(advanceFilterDropdownOption);

      const advanceFilterInputValue = screen.getByTestId('kn-table-header-filter-advance-input-value-name');
      await userEvent.type(advanceFilterInputValue, 'Jane');

      const advanceFilterApplyBtn = screen.getByTestId('kn-table-filter-action-apply-btn-name');
      await userEvent.click(advanceFilterApplyBtn);

      expect(onChangeFilter).toHaveBeenCalledWith({ name: { config_name: 'equal', value: 'Jane' } });
    });
  });
});
