import { persistStore, persistReducer } from "redux-persist";
import { createStore, combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import * as reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "accessToken"],
};

const allReducers = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
