import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from './reducers'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
