import logger from "redux-logger";
import { configureStore, nanoid } from "@reduxjs/toolkit";

import { tasksReducer } from "./features/Tasks/tasks-slice";
import { filterReducer } from "./features/Filter/filter-slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: { tasks: [{ id: nanoid(), title: "PreloadedTask", completed: false }] },
});
