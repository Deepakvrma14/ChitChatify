import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
// contexts
import SettingsProvider from "./contexts/SettingsContext";
import {store} from './app/store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <HelmetProvider>
  <Provider store={store}>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
      </Provider>
    // </HelmetProvider>
);

