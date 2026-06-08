import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import RowCheckbox from './row-checkbox';

describe('RowCheckbox', () => {
  it('should render checkbox in unchecked state', async () => {
    const screen = await render(<RowCheckbox checked={false} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toBeInTheDocument();
    await expect.element(checkbox).not.toBeChecked();
  });

  it('should render checkbox in checked state', async () => {
    const screen = await render(<RowCheckbox checked={true} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toBeInTheDocument();
    await expect.element(checkbox).toBeChecked();
  });

  it('should toggle from unchecked to checked', async () => {
    const { rerender, getByTestId } = await render(<RowCheckbox checked={false} rowIndex={0} columnIndex={0} />);

    let checkbox = getByTestId('kn-table-row-checkbox-input-0-0');
    await expect.element(checkbox).not.toBeChecked();

    await rerender(<RowCheckbox checked={true} rowIndex={0} columnIndex={0} />);

    checkbox = getByTestId('kn-table-row-checkbox-input-0-0');
    await expect.element(checkbox).toBeChecked();
  });

  it('should toggle from checked to unchecked', async () => {
    const { rerender, getByTestId } = await render(<RowCheckbox checked={true} rowIndex={0} columnIndex={0} />);

    let checkbox = getByTestId('kn-table-row-checkbox-input-0-0');
    await expect.element(checkbox).toBeChecked();

    await rerender(<RowCheckbox checked={false} rowIndex={0} columnIndex={0} />);

    checkbox = getByTestId('kn-table-row-checkbox-input-0-0');
    await expect.element(checkbox).not.toBeChecked();
  });

  it('should have correct accessibility attributes', async () => {
    const screen = await render(<RowCheckbox checked={false} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
    await expect.element(checkbox).toHaveAttribute('data-name', 'header-checkbox');
  });

  it('should have readOnly attribute on input', async () => {
    const screen = await render(<RowCheckbox checked={true} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toHaveAttribute('readonly');
  });

  it('should apply correct styling classes', async () => {
    const screen = await render(<RowCheckbox checked={false} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toHaveClass('w-4');
    await expect.element(checkbox).toHaveClass('h-4');
    await expect.element(checkbox).toHaveClass('cursor-pointer');
    await expect.element(checkbox).toHaveClass('accent-blue-950');
  });

  it('should handle select all scenario (all rows checked)', async () => {
    const screen = await render(<RowCheckbox checked={true} rowIndex={0} columnIndex={0} />);

    const checkbox = screen.getByTestId('kn-table-row-checkbox-input-0-0');

    await expect.element(checkbox).toBeChecked();
    await expect.element(checkbox).toHaveAttribute('data-name', 'header-checkbox');
  });
});
