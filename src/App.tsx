import loadable from "@loadable/component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AdminRoutes = loadable(() => import("./pages/admin"));
const LoginPage = loadable(() => import("./pages/login"));
const ExperimentPage = loadable(() => import("./pages/experiment"));
import { registerSW } from 'virtual:pwa-register';

function App() {
  registerSW({ immediate: true })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
