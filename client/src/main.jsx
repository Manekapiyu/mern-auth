
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import { AppContextProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppContextProvider>
      <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
