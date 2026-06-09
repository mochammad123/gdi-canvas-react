import { beforeAll, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/test-utils';
import type { IHeader } from '../../lib';
import KnittoTable from '../../knitto-table';

type User = { id: number; name: string };

const defaultData: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

beforeAll(async () => {
  await Promise.all([import('../../virtual-table'), import('../../regular-table')]);
});

const waitForTableRender = async (screen: Awaited<ReturnType<typeof renderTable>>) => {
  await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
  await expect.element(screen.getByText('John Doe')).toBeInTheDocument();
};

const renderTable = (headers: IHeader<User>[], props = {}) =>
  renderWithProviders(
    <div className="h-96 w-full">
      <KnittoTable data={defaultData} headers={headers} rowKey="id" useRegularTable={false} {...props} />
    </div>
  );

describe('HeaderCell', () => {
  describe('normal column', () => {
    it('should render caption and filter elements', async () => {
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200, filterSelectionOptions: ['John Doe'] },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      await expect.element(screen.getByText('ID')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
      await expect.element(screen.getByTestId('kn-table-header-filter-search-input-name')).toBeInTheDocument();
      await expect.element(screen.getByTestId('kn-table-header-filter-selection-action-name')).toBeInTheDocument();
      await expect.element(screen.getByTestId('kn-table-header-filter-advance-action-name')).toBeInTheDocument();
    });

    it('should render sort action when headerMode is double', async () => {
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200 },
      ];
      const screen = await renderTable(headers, { headerMode: 'double' });
      await waitForTableRender(screen);

      const sortBtn = screen.getByTestId('kn-table-header-sort-action-id-unset');
      await expect.element(sortBtn).toBeInTheDocument();
    });
  });

  describe('row-selection column', () => {
    it('should render checkbox when key is row-selection', async () => {
      const headers: IHeader<User>[] = [
        { key: 'row-selection', caption: '', width: 40 },
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200 },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      const headerCheckbox = screen.getByTestId('kn-table-row-checkbox-input-undefined-undefined');
      await expect.element(headerCheckbox).toBeInTheDocument();
    });
  });

  describe('custom renderHeader', () => {
    it('should render custom content when renderHeader is provided', async () => {
      const customContent = 'Custom Header Content';
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        {
          key: 'name',
          caption: 'Name',
          width: 200,
          renderHeader: () => <span data-testid="custom-header">{customContent}</span>,
        },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      const customHeader = screen.getByTestId('custom-header');
      await expect.element(customHeader).toBeInTheDocument();
      await expect.element(customHeader).toHaveTextContent(customContent);
    });
  });

  describe('group header', () => {
    it('should render group caption and child columns', async () => {
      const headers: IHeader<User>[] = [
        {
          key: 'group-header-name',
          caption: 'User Info',
          width: 300,
          children: [
            { key: 'id', caption: 'ID', width: 100 },
            { key: 'name', caption: 'Name', width: 200 },
          ],
        },
      ];
      const screen = await renderTable(headers, { headerMode: 'double' });
      await waitForTableRender(screen);

      await expect.element(screen.getByText('User Info')).toBeInTheDocument();
      await expect.element(screen.getByText('ID')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('special columns', () => {
    it('should render expand column', async () => {
      const headers: IHeader<User>[] = [
        { key: 'expand', caption: '', width: 40 },
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200 },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      await expect.element(screen.getByText('ID')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
    });

    it('should render action column without breaking table', async () => {
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200 },
        { key: 'action', caption: 'Action', width: 80 },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      await expect.element(screen.getByTestId('kn-table-virtual')).toBeInTheDocument();
      await expect.element(screen.getByText('ID')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('hideFilter', () => {
    it('should render only id column filters when name has hideFilter', async () => {
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        {
          key: 'name',
          caption: 'Name',
          width: 200,
          hideFilter: { search: true, filterSelection: true, filterAdvance: true },
        },
      ];
      const screen = await renderTable(headers);
      await waitForTableRender(screen);

      await expect.element(screen.getByTestId('kn-table-header-filter-search-input-id')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('headerMode', () => {
    it('should render single header layout when headerMode is single', async () => {
      const headers: IHeader<User>[] = [
        { key: 'id', caption: 'ID', width: 80 },
        { key: 'name', caption: 'Name', width: 200 },
      ];
      const screen = await renderTable(headers, { headerMode: 'single' });
      await waitForTableRender(screen);

      await expect.element(screen.getByText('ID')).toBeInTheDocument();
      await expect.element(screen.getByText('Name')).toBeInTheDocument();
    });
  });
});
