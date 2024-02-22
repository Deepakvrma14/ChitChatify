import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
// contexts
import SettingsProvider from "./contexts/SettingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
);

