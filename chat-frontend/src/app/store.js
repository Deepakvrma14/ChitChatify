import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useAppDispatch, useSelector as useAppSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';

const store = configureStore({
    reducer:persistReducer(),
    middlewarae: (getDefaultMiddleware)=>{
        getDefaultMiddleware({
            serializableCheck:false,
            immutableCheck:false,
        });
    }
});

const persist = persistStore(store);

const {dispatch} = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {persist, dispatch, useDispatch,useSelector};
