import { combineReducers, configureStore } from "@reduxjs/toolkit";
import imageSlice from "./slices/imageSlice";
import adminSlice from "./slices/adminSlice";
import authSlice from "./slices/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};



const rootReducer = combineReducers({
  image: imageSlice,
  admin: adminSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
