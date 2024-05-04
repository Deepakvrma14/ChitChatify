import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./features/appSlice";
import authReducer from "./features/authSlice";
import conversationReducer from "./features/conversationSlice";

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authState', 'conversationState']
} 

const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
  conversationState: conversationReducer,
});

export {rootPersistConfig, rootReducer};