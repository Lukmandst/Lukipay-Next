import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};
const authPersistConfig = {
  key: "authReducer",
  storage,
  whitelist: ["token", "pin", "id"],
};

const storeReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, storeReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk, logger))
);
export const persistor = persistStore(store);
