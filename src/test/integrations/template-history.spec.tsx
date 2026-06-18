import TemplateMasterDetailHistoryPage from '@/pages/example/templates/template-master-and-detail/history';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test-utils';

describe('Template History Integration Test', () => {
  it('seharusnya merender judul history, filter, dan tombol export', async () => {
    const screen = await renderWithProviders(<TemplateMasterDetailHistoryPage />);

    await expect.element(screen.getByText('History')).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });
});
