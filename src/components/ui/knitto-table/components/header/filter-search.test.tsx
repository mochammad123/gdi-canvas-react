import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import FilterSearch from './filter-search';

const defaultProps = {
  headerKey: 'name',
  onSearchChange: vi.fn(),
  onSearchClear: vi.fn(),
  mode: 'direct-search' as const,
};

describe('FilterSearch', () => {
  describe('direct-search mode', () => {
    it('should render input with correct test id', async () => {
      const screen = await render(<FilterSearch {...defaultProps} />);

      const input = screen.getByTestId('kn-table-header-filter-search-input-name');
      await expect.element(input).toBeInTheDocument();
    });

    it('should show initialSearch value', async () => {
      const screen = await render(<FilterSearch {...defaultProps} initialSearch="test query" />);

      const input = screen.getByTestId('kn-table-header-filter-search-input-name');
      await expect.element(input).toHaveValue('test query');
    });

    it('should call onSearchChange when Enter is pressed', async () => {
      const onSearchChange = vi.fn();
      const screen = await render(<FilterSearch {...defaultProps} onSearchChange={onSearchChange} />);

      const input = screen.getByTestId('kn-table-header-filter-search-input-name');
      await userEvent.type(input, 'search term');
      await userEvent.keyboard('{Enter}');

      expect(onSearchChange).toHaveBeenCalledWith('search term');
    });

    it('should clear search when isResetFilter becomes true', async () => {
      const { rerender, getByTestId } = await render(<FilterSearch {...defaultProps} initialSearch="old" isResetFilter={false} />);

      let input = getByTestId('kn-table-header-filter-search-input-name');
      await expect.element(input).toHaveValue('old');

      await rerender(<FilterSearch {...defaultProps} initialSearch="old" isResetFilter={true} />);

      input = getByTestId('kn-table-header-filter-search-input-name');
      await expect.element(input).toHaveValue('');
    });
  });

  describe('popout-card mode', () => {
    it('should render search icon', async () => {
      const screen = await render(<FilterSearch {...defaultProps} mode="popout-card" />);

      const icon = screen.getByTestId('kn-table-header-filter-search-action-name');
      await expect.element(icon).toBeInTheDocument();
    });

    it('should open card when search icon is clicked', async () => {
      const screen = await render(<FilterSearch {...defaultProps} mode="popout-card" />);

      const icon = screen.getByTestId('kn-table-header-filter-search-action-name');
      await icon.click();

      const cardInput = screen.getByTestId('kn-table-filter-search-input-name');
      await expect.element(cardInput).toBeInTheDocument();
    });

    it('should call onSearchChange when Apply is clicked', async () => {
      const onSearchChange = vi.fn();
      const screen = await render(<FilterSearch {...defaultProps} mode="popout-card" onSearchChange={onSearchChange} />);

      await screen.getByTestId('kn-table-header-filter-search-action-name').click();
      const input = screen.getByTestId('kn-table-filter-search-input-name');
      await userEvent.type(input, 'filter value');
      await screen.getByTestId('kn-table-filter-action-apply-btn-name').click();

      expect(onSearchChange).toHaveBeenCalledWith('filter value');
    });

    it('should call onSearchClear and clear input when Reset is clicked', async () => {
      const onSearchClear = vi.fn();
      const screen = await render(<FilterSearch {...defaultProps} mode="popout-card" onSearchClear={onSearchClear} />);

      await screen.getByTestId('kn-table-header-filter-search-action-name').click();
      const input = screen.getByTestId('kn-table-filter-search-input-name');
      await userEvent.type(input, 'some text');
      await screen.getByTestId('kn-table-filter-action-reset-btn-name').click();

      expect(onSearchClear).toHaveBeenCalled();
      await expect.element(input).toHaveValue('');
    });

    it('should call onSearchChange when Enter is pressed in card input', async () => {
      const onSearchChange = vi.fn();
      const screen = await render(<FilterSearch {...defaultProps} mode="popout-card" onSearchChange={onSearchChange} />);

      await screen.getByTestId('kn-table-header-filter-search-action-name').click();
      const input = screen.getByTestId('kn-table-filter-search-input-name');
      await userEvent.type(input, 'enter search');
      await userEvent.keyboard('{Enter}');

      expect(onSearchChange).toHaveBeenCalledWith('enter search');
    });
  });
});
