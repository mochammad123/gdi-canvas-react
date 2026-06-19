import { env } from '@/lib/variables/env';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import LoginPage from '@/pages/login';
import { userEvent } from 'vitest/browser';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/browser';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  mockNavigate.mockClear();
});

describe('Login Integration Test', () => {
  it('seharusnya merender judul, field username, password, dan button login', async () => {
    const screen = await renderWithProviders(<LoginPage />);

    await expect.element(screen.getByRole('heading', { level: 3 })).toHaveTextContent(env.VITE_APP_NAME);
    await expect.element(screen.getByPlaceholder('Username')).toBeInTheDocument();
    await expect.element(screen.getByPlaceholder('Password')).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'LOGIN' })).toBeInTheDocument();
  });

  it('seharusnya menampilkan error validasi ketika submit dengan field kosong', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await submitButton.click();

    await expect.element(screen.getByText('Username wajib diisi')).toBeInTheDocument();
    await expect.element(screen.getByText('Password wajib diisi')).toBeInTheDocument();
  });

  it('seharusnya menampilkan error password wajib diisi ketika hanya username yang diisi', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Password wajib diisi')).toBeInTheDocument();
  });

  it('seharusnya menampilkan error username wajib diisi ketika hanya password yang diisi', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(passwordInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Username wajib diisi')).toBeInTheDocument();
  });

  it('seharusnya menampilkan toast success ketika login berhasil', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Login berhasil')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/example/dashboard');
  });

  it('seharusnya menampilkan toast error ketika Username salah', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'username');
    await user.type(passwordInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Password atau username salah')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('seharusnya menampilkan toast error ketika Password salah', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'password');
    await submitButton.click();

    await expect.element(screen.getByText('Password atau username salah')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('seharusnya menampilkan toast error ketika API network error', async () => {
    server.use(
      http.post(`${env.VITE_BASE_API_URL}/auth/login`, async () => {
        return HttpResponse.error();
      })
    );

    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholder('Username');
    const passwordInput = screen.getByPlaceholder('Password');
    const submitButton = screen.getByRole('button', { name: 'LOGIN' });

    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'admin');
    await submitButton.click();

    await expect.element(screen.getByText('Failed to fetch')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
