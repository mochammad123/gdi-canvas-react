import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { env } from './lib/variables/env';
const ExampleRoutes = loadable(() => import('./pages/example'));
const LoginPage = loadable(() => import('./pages/login'));
const LoginCabangPage = loadable(() => import('./pages/login/login-cabang'));
const LoginChatbotPage = loadable(() => import('./pages/login/login-chatbot'));

function App() {
  if (env.VITE_USE_MOCK_API !== 'true') {
    registerSW({ immediate: true });
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login-cabang" element={<LoginCabangPage />} />
        <Route path="/login-chatbot" element={<LoginChatbotPage />} />

        <Route path="/example/*" element={<ExampleRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
