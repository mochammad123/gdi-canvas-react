import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import Layout from '@/components/layout';
import type { ISidebarMenu } from '@/components/layout/sidebar';
import Dashboard from '@/pages/example/dashboard';
import store from '@/redux/store';
import { toggleSidebar } from '@/redux/layoutSlice';

vi.mock('@/lib/hooks/hooks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/hooks/hooks')>('@/lib/hooks/hooks');
  return {
    ...actual,
    useUserLogin: () => ({
      data: { username: 'Test User' },
      authorized: true,
      unauthorized: false,
    }),
  };
});

const sidebarMenuMock: ISidebarMenu[] = [
  {
    module: 'Example',
    menu: [{ label: 'Dashboard', url: '/example/dashboard' }],
  },
];

beforeEach(() => {
  if (store.getState().layout.isSidebarOpen) {
    store.dispatch(toggleSidebar());
  }
});

describe('Layout (Header + Sidebar) - Dashboard', () => {
  it('seharusnya membuka & menutup sidebar lewat hamburger', async () => {
    const screen = await renderWithProviders(
      <Layout sidebar={sidebarMenuMock}>
        <Dashboard />
      </Layout>,
      { initialEntries: ['/example/dashboard'] }
    );

    const sidebar = screen.getByTestId('sidebar');
    await expect.poll(() => sidebar.element().getAttribute('data-open')).toBe('false');

    await screen.getByTestId('toggle-sidebar').click();
    await expect.poll(() => sidebar.element().getAttribute('data-open')).toBe('true');

    await expect.element(screen.getByTestId('backdrop')).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 350));
    await screen.getByTestId('backdrop').click();
    await expect.poll(() => sidebar.element().getAttribute('data-open')).toBe('false');
    await expect.poll(() => document.querySelector('[data-testid="backdrop"]')).toBeNull();
  });
});
