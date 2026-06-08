import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import BodyCell from './body-cell';
import type { IAdjustedHeader } from '../../lib';

type User = { id: number; name: string };

const mockRowData: User = { id: 1, name: 'John Doe' };

const createMockColumn = (overrides: Partial<IAdjustedHeader> = {}): IAdjustedHeader => ({
  key: 'name',
  caption: 'Name',
  width: 200,
  ...overrides,
});

const defaultPosition = {
  left: 0,
  width: 200,
  height: 28,
};

describe('BodyCell', () => {
  it('should render cell with value from rowData', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={false}
        column={createMockColumn()}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
      />
    );
    const cell = screen.getByTestId('kn-table-body-cell-0-0');

    await expect.element(cell).toHaveTextContent('John Doe');
  });

  it('should render checkbox column when column key is row-selection', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={true}
        isRowExpanded={false}
        column={createMockColumn({ key: 'row-selection' })}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
      />
    );

    const checkbox = screen.getByTestId('kn-table-body-row-checkbox-wrapper-0-0');
    await expect.element(checkbox).toBeInTheDocument();
  });

  it('should render expand column when column key is expand', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={true}
        column={createMockColumn({ key: 'expand' })}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
      />
    );

    const expand = screen.getByTestId('kn-table-body-row-expand-wrapper-0-0');
    await expect.element(expand).toBeInTheDocument();
  });

  it('should render reorder column when column key is row-reorder', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={false}
        column={createMockColumn({ key: 'row-reorder' })}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
        onReorderRowsToParent={true}
      />
    );

    const reorder = screen.getByTestId('kn-table-body-row-reorder-0-0');
    await expect.element(reorder).toBeInTheDocument();
  });

  it('should render custom cell content when renderCell is provided', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={false}
        column={createMockColumn({
          renderCell: (item: unknown) => <span data-testid="custom-render">{(item as User)?.name.toUpperCase()}</span>,
        })}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
      />
    );

    const customRender = screen.getByTestId('custom-render');
    await expect.element(customRender).toHaveTextContent('JOHN DOE');
  });

  it('should apply data attributes for row and column identification', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={false}
        column={createMockColumn({ key: 'id' })}
        position={defaultPosition}
        rowIndex={5}
        columnIndex={3}
      />
    );

    const cell = screen.getByTestId('kn-table-body-cell-5-3');
    await expect.element(cell).toHaveAttribute('data-row-key', 'row-1');
    await expect.element(cell).toHaveAttribute('data-row-index', '5');
    await expect.element(cell).toHaveAttribute('data-cell-index', '3');
    await expect.element(cell).toHaveAttribute('data-col-key', 'id');
  });

  it('should render empty string when cell value is undefined', async () => {
    const screen = await render(
      <BodyCell<User>
        rowKey="row-1"
        rowData={mockRowData}
        isRowChecked={false}
        isRowExpanded={false}
        column={createMockColumn({ key: 'nonexistent' as keyof User })}
        position={defaultPosition}
        rowIndex={0}
        columnIndex={0}
      />
    );

    const cell = screen.getByTestId('kn-table-body-cell-0-0');
    await expect.element(cell).toHaveTextContent('');
  });
});
