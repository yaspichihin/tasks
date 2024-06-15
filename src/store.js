import logger from "redux-logger";
import { configureStore, nanoid } from "@reduxjs/toolkit";

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
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import { tasksReducer } from "./features/Tasks/tasks-slice";
import { filterReducer } from "./features/Filter/filter-slice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  preloadedState: { tasks: [{ id: nanoid(), title: "PreloadedTask", completed: false }] },
});

export const persistor = persistStore(store);
