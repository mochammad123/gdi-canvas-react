import loadable from "@loadable/component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withAuthMiddleware from "./lib/hoc/withAuthMiddleware";
const AdminRoutes = loadable(() => import("./pages/admin"));
const LoginPage = loadable(() => import("./pages/login"));
import { registerSW } from 'virtual:pwa-register';

function App() {
  registerSW({ immediate: true })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default withAuthMiddleware(App);
