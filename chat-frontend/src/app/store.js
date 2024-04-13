import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, //whatever is returned by persistreducer, it's used to create a root reducer that will automatically save and load local storage
  middleware: (
    getDefaultMiddleware //custom middleware
  ) =>
    getDefaultMiddleware({
      serializableCheck: false, //by default, it checks for immunable state
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
