import loadable from "@loadable/component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withAuthMiddleware from "./lib/hoc/withAuthMiddleware";
const AdminRoutes = loadable(() => import("./pages/admin"));
const LoginPage = loadable(() => import("./pages/login"));

function App() {
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