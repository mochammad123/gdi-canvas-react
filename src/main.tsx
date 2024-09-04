import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <Toaster />
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
