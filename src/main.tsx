import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './styles/main.css';
import ToastProvider from './components/ui/toast';
import { env } from './lib/variables/env';

const useMockApi = env.VITE_ENVIRONTMENT === 'DEVELOPMENT' && env.VITE_USE_MOCK_API === 'true';

if (useMockApi) {
  import('@/test/mocks/browser').then(({ server }) => {
    server.start({ onUnhandledRequest: 'error' });
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider position="bottom-right" duration={10000}>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
