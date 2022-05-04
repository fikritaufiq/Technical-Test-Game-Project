import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import rootReducers from './_combineReducers'
import {checkSession} from "./userSlice";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false
            })]
    })

    store.dispatch(checkSession)
    return store
}

export default store()