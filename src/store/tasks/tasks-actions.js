import { createAction, nanoid } from "@reduxjs/toolkit";

export const addTask = createAction("@@tasks/ADD_TASK", (title) => ({
  payload: {
    id: nanoid(),
    title,
    completed: false,
  },
}));

export const delTask = createAction("@@tasks/DEL_TASK");
export const toggleTask = createAction("@@tasks/TOGGLE_TASK");
