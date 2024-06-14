import { createSlice, nanoid } from "@reduxjs/toolkit";
import { resetState } from "../Reset/reset-actions";

// Slice
export const tasksSlice = createSlice({
  name: "@@tasks",
  initialState: [],
  reducers: {
    addTask: {
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
      reducer: (state, action) => {
        const newTask = action.payload;
        state.push(newTask);
      },
    },
    delTask: {
      reducer: (state, action) => {
        const id = action.payload;
        return state.filter((task) => task.id !== id);
      },
    },
    toggleTask: {
      reducer: (state, action) => {
        const id = action.payload;
        const task = state.find((task) => task.id === id);
        task.completed = !task.completed;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => {
      return [];
    });
  },
});

// Selectors
export function getTasks(state, activeFilter) {
  switch (activeFilter) {
    case "all":
      return state.tasks;
    case "active":
      return state.tasks.filter((task) => task.completed === false);
    case "completed":
      return state.tasks.filter((task) => task.completed === true);
    default:
      return state;
  }
}

// Actions
export const { addTask, delTask, toggleTask } = tasksSlice.actions;

// Reducer
export const tasksReducer = tasksSlice.reducer;
