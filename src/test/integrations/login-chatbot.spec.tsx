import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test-utils';
import LoginChatbotPage from '@/pages/login/login-chatbot';

describe('Login Chatbot Integration Test', () => {
  it('seharusnya merender judul dan button log in', async () => {
    const screen = await renderWithProviders(<LoginChatbotPage />);

    await expect.element(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Learning Management System');
    await expect.element(screen.getByRole('button', { name: 'LOG IN' })).toBeInTheDocument();
  });

  it('seharusnya menampilkan toast success ketika button log in diklik', async () => {
    const screen = await renderWithProviders(<LoginChatbotPage />);
    const loginButton = screen.getByRole('button', { name: 'LOG IN' });

    await loginButton.click();

    await expect.element(screen.getByTestId('toast-success')).toBeInTheDocument();
    await expect.element(screen.getByText('Login berhasil')).toBeInTheDocument();
  });
});
