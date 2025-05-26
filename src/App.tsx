import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
const ExampleRoutes = loadable(() => import('./pages/example'));
const LoginPage = loadable(() => import('./pages/login'));
const ExperimentPage = loadable(() => import('./pages/experiment'));
const LoginCabangPage = loadable(() => import('./pages/login/login-cabang'));
const LoginChatbotPage = loadable(() => import('./pages/login/login-chatbot'));

function App() {
  registerSW({ immediate: true });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login-cabang" element={<LoginCabangPage />} />
        <Route path="/login-chatbot" element={<LoginChatbotPage />} />

        <Route path="/example/*" element={<ExampleRoutes />} />
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
