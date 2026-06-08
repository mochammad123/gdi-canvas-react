import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import RowExpand from './row-expand';

describe('RowExpand', () => {
  const defaultProps = {
    rowIndex: 0,
    columnIndex: 0,
  };

  it('renders without crashing', async () => {
    const screen = await render(<RowExpand {...defaultProps} />);

    await expect.element(screen.getByTestId('kn-table-body-row-expand-wrapper-0-0')).toBeInTheDocument();
  });

  it('applies correct aria-label when collapsed (default)', async () => {
    const screen = await render(<RowExpand {...defaultProps} />);

    const button = screen.getByTestId('kn-table-body-row-expand-button-0-0');
    await expect.element(button).toHaveAttribute('aria-label', 'Expand row');
  });

  it('applies correct aria-label when expanded', async () => {
    const screen = await render(<RowExpand {...defaultProps} isExpanded={true} />);

    const button = screen.getByTestId('kn-table-body-row-expand-button-0-0');
    await expect.element(button).toHaveAttribute('aria-label', 'Collapse row');
  });

  it('should rotate to bottom icon when expanded', async () => {
    const screen = await render(<RowExpand {...defaultProps} isExpanded={true} />);
    const button = screen.getByTestId('kn-table-body-row-expand-button-0-0');
    const icon = button.getByRole('img');
    await expect.element(icon).toHaveClass('rotate-0');
  });

  it('should rotate to right icon when collapsed', async () => {
    const screen = await render(<RowExpand {...defaultProps} isExpanded={false} />);
    const button = screen.getByTestId('kn-table-body-row-expand-button-0-0');
    const icon = button.getByRole('img');
    await expect.element(icon).toHaveClass('-rotate-90');
  });
});
