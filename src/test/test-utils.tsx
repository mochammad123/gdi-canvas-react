// src/test/test-utils.tsx
import ToastProvider from '@/components/ui/toast';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'vitest-browser-react';

function renderWithProviders(ui: React.ReactElement, { initialEntries = ['/'] }: { initialEntries?: string[] } = {}) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ToastProvider>{ui}</ToastProvider>
      </MemoryRouter>
    </Provider>
  );
}

export { renderWithProviders };
