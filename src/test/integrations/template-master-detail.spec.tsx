import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import TemplateMasterAndDetail from '@/pages/example/templates/template-master-and-detail';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Template Master And Detail Integration Test', () => {
  it('seharusnya merender layout form sidebar, master, dan detail', async () => {
    const screen = await renderWithProviders(<TemplateMasterAndDetail />);

    await expect.element(screen.getByPlaceholder('Tulis nama kategori')).toBeInTheDocument();
    await expect.element(screen.getByText('Master Kategori')).toBeInTheDocument();
    await expect.element(screen.getByText('Detail Chemical')).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument();
  });

  it('seharusnya menampilkan error validasi ketika form disubmit kosong', async () => {
    const screen = await renderWithProviders(<TemplateMasterAndDetail />);
    const submitButton = screen.getByRole('button', { name: 'Simpan' });

    await submitButton.click();

    await expect.element(screen.getByText('Kategori wajib diisi')).toBeInTheDocument();
    await expect.element(screen.getByText('Chemical wajib diisi')).toBeInTheDocument();
  });

  it('seharusnya navigasi ke halaman history ketika tombol history diklik', async () => {
    const screen = await renderWithProviders(<TemplateMasterAndDetail />);
    mockNavigate.mockClear();

    await screen.getByRole('button', { name: 'History' }).click();

    expect(mockNavigate).toHaveBeenCalledWith('/example/master-and-detail/history');
  });
});
