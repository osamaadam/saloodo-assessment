import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import parcelsReducer from "./parcels/parcelsSlice";
import userReducer from "./user/userSlice";

const persistedUserReducer = persistReducer(
  { key: "user", storage },
  userReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    parcels: parcelsReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
