import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test-utils';
import Sidebar, { type ISidebarMenu } from '@/components/layout/sidebar';
import store from '@/redux/store';
import { toggleSidebar } from '@/redux/layoutSlice';

const sidebarMenuMock: ISidebarMenu[] = [
  {
    module: 'Example',
    menu: [
      {
        label: 'Dashboard',
        url: '/example/dashboard',
      },
    ],
  },
];

beforeEach(() => {
  if (store.getState().layout.isSidebarOpen) {
    store.dispatch(toggleSidebar());
  }
});

describe('Sidebar + Global State', () => {
  it('seharusnya sidebar tertutup secara default', async () => {
    const screen = await renderWithProviders(<Sidebar sidebarMenu={sidebarMenuMock} />);

    const sidebarEl = screen.getByTestId('sidebar');
    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('false');
  });

  it('seharusnya sidebar terbuka ketika state di-toggle', async () => {
    const screen = await renderWithProviders(<Sidebar sidebarMenu={sidebarMenuMock} />);

    const sidebarEl = screen.getByTestId('sidebar');
    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('false');

    store.dispatch(toggleSidebar());

    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('true');
  });

  it('seharusnya sidebar tertutup lagi ketika di-toggle kedua kalinya', async () => {
    const screen = await renderWithProviders(<Sidebar sidebarMenu={sidebarMenuMock} />);

    const sidebarEl = screen.getByTestId('sidebar');

    store.dispatch(toggleSidebar());
    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('true');

    await new Promise((r) => setTimeout(r, 350));
    store.dispatch(toggleSidebar());
    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('false');
  });
});
