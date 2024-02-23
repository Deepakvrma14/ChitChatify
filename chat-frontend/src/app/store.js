import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer), //whatever is returned by persistreducer, it's used to create a root reducer that will automatically save and load local storage
  middleware: (
    getDefaultMiddleware //custom middleware
  ) =>
    getDefaultMiddleware({
      serializableCheck: false, //by default, it checks for immunable state 
      immutableCheck: false,
    }),
});

const persist = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persist, dispatch, useDispatch, useSelector };
