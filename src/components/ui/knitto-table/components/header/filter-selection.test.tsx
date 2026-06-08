import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import FilterSelection from './filter-selection';

const defaultProps = {
  headerKey: 'status',
  options: ['Active', 'Pending', 'Inactive'],
  onApplyFilter: vi.fn(),
  onResetFilter: vi.fn(),
};

describe('FilterSelection', () => {
  it('should render filter icon', async () => {
    const screen = await render(<FilterSelection {...defaultProps} />);

    const icon = screen.getByTestId('kn-table-header-filter-selection-action-status');
    await expect.element(icon).toBeInTheDocument();
  });

  it('should show blue dot indicator when has selected options', async () => {
    const screen = await render(<FilterSelection {...defaultProps} initialSelectedOptions={['Active']} />);

    const indicator = screen.getByTestId('kn-table-header-filter-selection-action-indicator-status');
    await expect.element(indicator).toBeInTheDocument();
  });

  it('should open card when filter icon is clicked', async () => {
    const screen = await render(<FilterSelection {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const applyBtn = screen.getByTestId('kn-table-filter-action-apply-btn-status');
    await expect.element(applyBtn).toBeInTheDocument();
  });

  it('should display options in card', async () => {
    const screen = await render(<FilterSelection {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const optionActive = screen.getByTestId('kn-table-header-filter-selection-option-status-Active');
    await expect.element(optionActive).toBeInTheDocument();
  });

  it('should filter options by search query', async () => {
    const screen = await render(<FilterSelection {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'active');

    const optionActive = screen.getByTestId('kn-table-header-filter-selection-option-status-Active');
    await expect.element(optionActive).toBeInTheDocument();
  });

  it('should call onApplyFilter with selected options when Apply is clicked', async () => {
    const onApplyFilter = vi.fn();
    const screen = await render(<FilterSelection {...defaultProps} onApplyFilter={onApplyFilter} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const checkboxActive = screen.getByTestId('kn-table-header-filter-selection-option-checkbox-status-Active');
    await checkboxActive.click();

    await screen.getByTestId('kn-table-filter-action-apply-btn-status').click();

    expect(onApplyFilter).toHaveBeenCalledWith(['Active']);
  });

  it('should call onResetFilter when Reset is clicked', async () => {
    const onResetFilter = vi.fn();
    const screen = await render(<FilterSelection {...defaultProps} onResetFilter={onResetFilter} initialSelectedOptions={['Active']} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();
    await screen.getByTestId('kn-table-filter-action-reset-btn-status').click();

    expect(onResetFilter).toHaveBeenCalled();
  });

  it('should show initialSelectedOptions as checked', async () => {
    const screen = await render(<FilterSelection {...defaultProps} initialSelectedOptions={['Active', 'Pending']} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const checkboxActive = screen.getByTestId('kn-table-header-filter-selection-option-checkbox-status-Active');
    const checkboxPending = screen.getByTestId('kn-table-header-filter-selection-option-checkbox-status-Pending');
    await expect.element(checkboxActive).toBeChecked();
    await expect.element(checkboxPending).toBeChecked();
  });

  it('should clear selection when isResetFilter becomes true', async () => {
    const { rerender, getByTestId } = await render(<FilterSelection {...defaultProps} initialSelectedOptions={['Active']} isResetFilter={false} />);

    await getByTestId('kn-table-header-filter-selection-action-status').click();
    let checkboxActive = getByTestId('kn-table-header-filter-selection-option-checkbox-status-Active');
    await expect.element(checkboxActive).toBeChecked();

    await rerender(<FilterSelection {...defaultProps} initialSelectedOptions={['Active']} isResetFilter={true} />);

    await getByTestId('kn-table-header-filter-selection-action-status').click();
    checkboxActive = getByTestId('kn-table-header-filter-selection-option-checkbox-status-Active');
    await expect.element(checkboxActive).not.toBeChecked();
  });

  it('should show "No data available!" when options is empty', async () => {
    const screen = await render(<FilterSelection {...defaultProps} options={[]} />);

    await screen.getByTestId('kn-table-header-filter-selection-action-status').click();

    const emptyMessage = screen.getByText('No data available!');
    await expect.element(emptyMessage).toBeInTheDocument();
  });
});
