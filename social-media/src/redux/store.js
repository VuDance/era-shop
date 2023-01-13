import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import cartReducer from "./Reducer/cartSlice";
import addressReducer from "./Reducer/addressSlice";
import orderReducer from "./Reducer/orderSlice";
import notificationReducer from "./Reducer/notificationSlice";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  notification: notificationReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // immutableCheck: { warnAfter: 128 },
      // serializableCheck: {
      //   warnAfter: 128,
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
