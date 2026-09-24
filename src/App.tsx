import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { env } from './lib/variables/env';
const LabelDesignerPage = loadable(() => import('./pages/label-designer'));

function App() {
  if (env.VITE_USE_MOCK_API !== 'true') {
    registerSW({ immediate: true });
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LabelDesignerPage />} />
        <Route path="/label-designer" element={<LabelDesignerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
