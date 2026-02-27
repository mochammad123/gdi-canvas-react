# Testing (Vitest Browser)

Dokumentasi ini menjelaskan cara menulis & menjalankan test di template ini, dengan fokus pada:

1. Test Function biasa (unit)
2. Test Component
3. Test Integration
4. Test Variabel/State (local state & global state/Redux)

Project ini menggunakan **Vitest** dengan mode **browser** (Playwright) dan helper dari `vitest-browser-react`.

## 📋 Daftar Isi

- [Instalasi](#instalasi)
- [Cara Menjalankan Test](#cara-menjalankan-test)
- [Struktur & File Penting](#struktur--file-penting)
- [1) Test Function Biasa (Unit)](#1-test-function-biasa-unit)
- [2) Test Component](#2-test-component)
- [3) Test Integration](#3-test-integration)
- [4) Test State](#4-test-state)

## Instalasi

Jalankan instalasi dependency project, lalu install browser binary untuk Playwright (karena test berjalan di browser).

```sh
pnpm install
pnpm exec playwright install chromium
```

### Dependencies testing yang dipakai

Dependencies berikut **sudah tersedia** di template ini (cek `package.json`), dan akan ikut ter-install saat `pnpm install`:

- `vitest`
- `@vitest/browser`
- `@vitest/browser-playwright`
- `vitest-browser-react`
- `playwright`
- `msw`

## Cara Menjalankan Test

### Command utama

```sh
# Mode watch (default)
pnpm test

# Mode run + coverage
pnpm test:coverage
```

### Menjalankan file tertentu / filter test

```sh
# Jalankan 1 file
pnpm vitest run src/test/integrations/login.spec.tsx

# Jalankan test berdasarkan nama test
pnpm test login.spec.tsx

# Jalankan test tertentu berdasarkan judul
pnpm vitest run -t "Login Integration Test"
```

## Struktur & File Penting

- **`vite.config.ts`**
  - Konfigurasi Vitest termasuk `test.browser.enabled: true` dan `setupFiles`.
- **`src/test/setup.ts`**
  - Setup global test: import `vitest-browser-react`, load CSS, dan start/stop MSW worker.
- **`src/test/test-utils.tsx`**
  - Helper `renderWithProviders` untuk bungkus komponen dengan `Redux Provider` + `MemoryRouter` + `ToastProvider`.
- **`src/test/mocks/*`**
  - MSW handlers (contoh: mock auth login).
- **Lokasi test**
  - Unit/integration test bisa di `src/test/*`
  - Component test juga banyak yang colocated, misalnya `src/components/ui/button/button.test.tsx`

## 1) Test Function Biasa (Unit)

Cocok untuk logic murni seperti helper function, util, schema validation (Zod), formatter, mapper, dll. Tidak perlu render UI.

Contoh nyata di repo:

- `src/test/units/sum.test.ts`
- `src/pages/login/login.test.tsx` (contoh : `formLoginSchema`, `getLoginResult`, dll)

Template yang disarankan:

```ts
import { describe, expect, it } from 'vitest';
import { someFn } from './some-fn';

describe('someFn', () => {
  it('case sukses', () => {
    expect(someFn(1)).toBe(2);
  });

  it('case error', () => {
    expect(() => someFn(-1)).toThrow();
  });
});
```

## 2) Test Component

Cocok untuk ngetest perilaku komponen UI secara terisolasi: render, props, event click, disabled/loading, dan output di DOM.

Contoh nyata di repo:

- `src/components/ui/button/button.test.tsx`
- `src/components/ui/pagination/pagination.spec.tsx`

Pola render:

- Jika **tidak butuh** Redux/Router/Toast: pakai `render` dari `vitest-browser-react`
- Jika **butuh** Redux/Router/Toast: pakai `renderWithProviders` dari `src/test/test-utils.tsx`

Contoh:

```tsx
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import Button from '@/components/ui/button/button';

describe('Button', () => {
  it('memanggil onClick saat diklik', async () => {
    const onClick = vi.fn();
    const screen = await render(<Button onClick={onClick}>Click</Button>);

    await screen.getByRole('button', { name: 'Click' }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## 3) Test Integration

Cocok untuk ngetest beberapa bagian sekaligus: page + router + redux + API mock (MSW) + side effects (toast/navigate).

Contoh nyata di repo:

- `src/test/integrations/login.spec.tsx`
- `src/test/integrations/dashboard.spec.tsx`
- `src/test/integrations/sidebar.spec.tsx`

### Mock API (MSW)

Default handler ada di `src/test/mocks/handlers/auth.handlers.ts` (disatukan lewat `src/test/mocks/handlers.ts`).

- Untuk skenario normal, **cukup pakai default handler** (tanpa `server.use(...)`).
- `server.use(...)` dipakai kalau kamu perlu **override** perilaku (contoh: network error / special case).

Contoh full (1 file berisi dua case: default handler + override error). Lihat juga `src/test/integrations/login.spec.tsx`:

```tsx
import { env } from '@/lib/variables/env';
import LoginPage from '@/pages/login';
import { server } from '@/test/mocks/browser';
import { renderWithProviders } from '@/test/test-utils';
import { http, HttpResponse } from 'msw';
import { userEvent } from 'vitest/browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
  it('success pakai default handler (tanpa server.use)', async () => {
    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholder('Username'), 'admin');
    await user.type(screen.getByPlaceholder('Password'), 'admin');
    await screen.getByRole('button', { name: 'LOGIN' }).click();

    await expect.element(screen.getByTestId('toast-success')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/example/dashboard');
  });

  it('override hanya untuk error (network error)', async () => {
    server.use(
      http.post(`${env.VITE_BASE_API_URL}/auth/login`, async () => {
        return HttpResponse.error();
      })
    );

    const screen = await renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholder('Username'), 'admin');
    await user.type(screen.getByPlaceholder('Password'), 'admin');
    await screen.getByRole('button', { name: 'LOGIN' }).click();

    await expect.element(screen.getByTestId('toast-error')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
```

Catatan: MSW worker distart di `src/test/setup.ts` dengan `onUnhandledRequest: 'error'`, jadi request yang tidak di-handle akan membuat test gagal (bagus untuk mencegah “silent network”).

### Mock modul (contoh navigate / hook)

Untuk nge-“lock” dependensi eksternal, gunakan `vi.mock(...)` seperti di `login.spec.tsx` (mock `useNavigate`) atau `dashboard.spec.tsx` (mock `useUserLogin`).

## 4) Test State

### A. Local state (React `useState`)

Cocok untuk memastikan perubahan state mempengaruhi UI dengan benar.

Contoh nyata di repo:

- `src/test/units/state.spec.tsx`

Contoh (test local state lewat component):

```tsx
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { useState } from 'react';
import { Typography } from '@/components/ui/typhography';
import { Button } from '@/components/ui/button';

function StateComponentTest() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography as="h3">{count}</Typography>
      <div className="flex gap-2">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
      </div>
    </div>
  );
}

describe('State Component Test', () => {
  it('seharusnya menambahkan nilai ketika button increment diklik', async () => {
    const screen = await render(<StateComponentTest />);

    await expect.element(screen.getByRole('heading', { level: 3 })).toHaveTextContent('0');

    await screen.getByRole('button', { name: 'Increment' }).click();
    await expect.element(screen.getByRole('heading', { level: 3 })).toHaveTextContent('1');
  });
});
```

### B. Global state (Redux)

Cocok untuk memastikan interaksi UI terhadap Redux store berjalan sesuai ekspektasi.

Contoh nyata di repo:

- `src/test/units/global-state.test.ts`
- `src/test/integrations/sidebar.spec.tsx`

Contoh 1 (unit test reducer/store tanpa render UI):

```ts
import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import layoutReducer, { toggleSidebar } from '@/redux/layoutSlice';

describe('Penggunaan global state redux', () => {
  it('seharusnya menampilkan nilai false -> true -> false', () => {
    const store = configureStore({ reducer: { layout: layoutReducer } });

    expect(store.getState().layout.isSidebarOpen).toBe(false);

    store.dispatch(toggleSidebar());
    expect(store.getState().layout.isSidebarOpen).toBe(true);

    store.dispatch(toggleSidebar());
    expect(store.getState().layout.isSidebarOpen).toBe(false);
  });
});
```

Contoh 2 (integration: render UI + dispatch ke singleton store). Penting: reset state di `beforeEach` kalau sebelumnya sudah berubah:

```tsx
import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/test-utils';
import Sidebar, { type ISidebarMenu } from '@/components/layout/sidebar';
import store from '@/redux/store';
import { toggleSidebar } from '@/redux/layoutSlice';

const sidebarMenuMock: ISidebarMenu[] = [{ module: 'Example', menu: [{ label: 'Dashboard', url: '/example/dashboard' }] }];

beforeEach(() => {
  if (store.getState().layout.isSidebarOpen) {
    store.dispatch(toggleSidebar());
  }
});

describe('Sidebar + Global State', () => {
  it('seharusnya sidebar terbuka ketika state di-toggle', async () => {
    const screen = await renderWithProviders(<Sidebar sidebarMenu={sidebarMenuMock} />);
    const sidebarEl = screen.getByTestId('sidebar');

    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('false');
    store.dispatch(toggleSidebar());
    await expect.poll(() => sidebarEl.element().getAttribute('data-open')).toBe('true');
  });
});
```

Catatan penting: `renderWithProviders` saat ini memakai **singleton store** dari `src/redux/store.ts`. Kalau test memodifikasi store (dispatch action), pastikan ada `beforeEach` untuk “balikin” state ke kondisi awal (lihat pola di `sidebar.spec.tsx` dan `dashboard.spec.tsx`).
