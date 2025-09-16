import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthenticationReducer from "../reducer/Authentication/AuthenticationSlice"
import storage from "redux-persist/lib/storage"
import BlockReducer from "../reducer/Authentication/BlockSlice"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "quiet_hours_scheduler_root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthenticationReducer,
  block: BlockReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;


