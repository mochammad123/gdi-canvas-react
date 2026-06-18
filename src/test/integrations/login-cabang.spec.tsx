import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test-utils';
import LoginCabangPage from '@/pages/login/login-cabang';
import { userEvent } from 'vitest/browser';

describe('Login Cabang Integration Test', () => {
  it('seharusnya merender judul, field username, password, cabang, dan button login', async () => {
    const screen = await renderWithProviders(<LoginCabangPage />);

    await expect.element(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Auth Login');
    await expect.element(screen.getByPlaceholder('Username')).toBeInTheDocument();
    await expect.element(screen.getByPlaceholder('Password')).toBeInTheDocument();
    await expect.element(screen.getByText('Cabang')).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'LOGIN' })).toBeInTheDocument();
  });

  it('seharusnya menampilkan error validasi ketika submit dengan field kosong', async () => {
    const screen = await renderWithProviders(<LoginCabangPage />);
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await submitButton.click();

    await expect.element(screen.getByText('Username wajib diisi')).toBeInTheDocument();
    await expect.element(screen.getByText('Password wajib diisi')).toBeInTheDocument();
    await expect.element(screen.getByText('Cabang wajib diisi')).toBeInTheDocument();
  });

  it('seharusnya menampilkan error cabang wajib diisi ketika username dan password sudah diisi', async () => {
    const screen = await renderWithProviders(<LoginCabangPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Cabang wajib diisi')).toBeInTheDocument();
  });
});
