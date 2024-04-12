import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
// contexts
import SettingsProvider from "./contexts/SettingsContext";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <HelmetProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </PersistGate>
  </Provider>
  // </HelmetProvider>
);
