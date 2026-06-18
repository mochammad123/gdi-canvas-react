import ActionToggle from '@/pages/example/templates/template-master-and-detail/components/action-toggle';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/test-utils';

describe('ActionToggle', () => {
  it('seharusnya menampilkan menu aksi dan memanggil onClick saat edit diklik', async () => {
    const onClick = vi.fn();
    const screen = await renderWithProviders(<ActionToggle onClick={onClick} />);

    const toggleButton = screen.container.querySelector('.btn-action-toggle');
    if (!toggleButton) throw new Error('Tombol action toggle tidak ditemukan');

    await toggleButton.click();

    const editButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent?.trim() === 'Edit');
    if (!editButton) throw new Error('Tombol Edit tidak ditemukan');

    await expect.element(screen.getByText('Hapus')).toBeInTheDocument();
    editButton.click();

    expect(onClick).toHaveBeenCalledWith('edit');
  });
});
