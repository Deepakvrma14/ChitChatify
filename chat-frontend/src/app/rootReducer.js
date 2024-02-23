import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// sllices here 
 

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    // whitelist to allow certain parts to persist 
    // blacklist to not to fill unnecessary storage 

}

const rootReducer = combineReducers({ // combine and help to have all the reducers at one place only 
    app:appReducer,

});

export {rootPersistConfig, rootReducer};
