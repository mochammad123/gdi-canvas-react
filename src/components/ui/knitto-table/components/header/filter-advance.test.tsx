import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import FilterAdvance from './filter-advance';

const defaultProps = {
  headerKey: 'name',
  onApplyFilter: vi.fn(),
  onResetFilter: vi.fn(),
};

describe('FilterAdvance', () => {
  it('should render filter icon', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} />);

    const icon = screen.getByTestId('kn-table-header-filter-advance-action-name');
    await expect.element(icon).toBeInTheDocument();
  });

  it('should show blue dot indicator when has filter value', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} initialFilterValue={{ config_name: 'equal', value: 'test' }} />);

    const indicator = screen.getByTestId('kn-table-header-filter-advance-action-indicator-name');
    await expect.element(indicator).toBeInTheDocument();
  });

  it('should not show blue dot when config is None', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} initialFilterValue={{ config_name: 'none', value: '' }} />);

    const indicator = screen.getByTestId('kn-table-header-filter-advance-action-indicator-name');
    await expect.element(indicator).not.toBeInTheDocument();
  });

  it('should open card when filter icon is clicked', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();

    const applyBtn = screen.getByTestId('kn-table-filter-action-apply-btn-name');
    await expect.element(applyBtn).toBeInTheDocument();
  });

  it('should display dropdown and "Filter dengan" text in card', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();

    const filterLabel = screen.getByText('Filter dengan');
    const dropdownBox = screen.getByTestId('kn-table-header-filter-advance-dropdown-box-name');
    await expect.element(filterLabel).toBeInTheDocument();
    await expect.element(dropdownBox).toBeInTheDocument();
  });

  it('should show input when config is not None', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} />);

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();

    const dropdownBox = screen.getByTestId('kn-table-header-filter-advance-dropdown-box-name');
    await dropdownBox.click();

    const optionEqual = screen.getByTestId('kn-table-header-filter-advance-dropdown-option-name-Equal');
    await optionEqual.click();

    const input = screen.getByTestId('kn-table-header-filter-advance-input-value-name');
    await expect.element(input).toBeInTheDocument();
  });

  it('should call onApplyFilter with config and value when Apply is clicked', async () => {
    const onApplyFilter = vi.fn();
    const screen = await render(<FilterAdvance {...defaultProps} onApplyFilter={onApplyFilter} />);

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();

    const dropdownBox = screen.getByTestId('kn-table-header-filter-advance-dropdown-box-name');
    await dropdownBox.click();
    await screen.getByTestId('kn-table-header-filter-advance-dropdown-option-name-Equal').click();

    const input = screen.getByTestId('kn-table-header-filter-advance-input-value-name');
    await userEvent.type(input, 'John');

    await screen.getByTestId('kn-table-filter-action-apply-btn-name').click();

    expect(onApplyFilter).toHaveBeenCalledWith('equal', 'John');
  });

  it('should call onResetFilter when Reset is clicked', async () => {
    const onResetFilter = vi.fn();
    const screen = await render(
      <FilterAdvance {...defaultProps} onResetFilter={onResetFilter} initialFilterValue={{ config_name: 'equal', value: 'test' }} />
    );

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();
    await screen.getByTestId('kn-table-filter-action-reset-btn-name').click();

    expect(onResetFilter).toHaveBeenCalled();
  });

  it('should show initialFilterValue in dropdown and input', async () => {
    const screen = await render(<FilterAdvance {...defaultProps} initialFilterValue={{ config_name: 'contains', value: 'initial' }} />);

    await screen.getByTestId('kn-table-header-filter-advance-action-name').click();

    const dropdownBoxText = screen.getByTestId('kn-table-header-filter-advance-dropdown-box-text-name');
    await expect.element(dropdownBoxText).toHaveTextContent('contains');

    const input = screen.getByTestId('kn-table-header-filter-advance-input-value-name');
    await expect.element(input).toHaveValue('initial');
  });

  it('should clear filter when isResetFilter becomes true', async () => {
    const { rerender, getByTestId } = await render(
      <FilterAdvance {...defaultProps} initialFilterValue={{ config_name: 'equal', value: 'old' }} isResetFilter={false} />
    );

    await getByTestId('kn-table-header-filter-advance-action-name').click();
    const input = getByTestId('kn-table-header-filter-advance-input-value-name');
    await expect.element(input).toHaveValue('old');

    await rerender(<FilterAdvance {...defaultProps} initialFilterValue={{ config_name: 'equal', value: 'old' }} isResetFilter={true} />);

    await getByTestId('kn-table-header-filter-advance-action-name').click();
    const dropdownBox = getByTestId('kn-table-header-filter-advance-dropdown-box-name');
    await expect.element(dropdownBox).toHaveTextContent('None');
  });
});
