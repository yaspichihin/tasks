import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetState } from "../Reset/reset-actions";

// get tasks
export const loadTasks = createAsyncThunk("tasks/load_tasks", async () => {
  const result = await fetch("http://localhost:8000/tasks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data;
});

// create task
export const createTask = createAsyncThunk("task/create_task", async (title) => {
  const result = await fetch("http://localhost:8000/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await result.json();
  return data;
});

// toggle task
export const toggleTask = createAsyncThunk("task/toggle_task", async (uuid, { getState }) => {
  const task = getState().tasks.entities.find((item) => item.uuid === uuid);

  const result = await fetch("http://localhost:8000/tasks/" + uuid, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: task.uuid,
      title: task.title,
      completed: !task.completed,
    }),
  });

  const data = await result.json();
  return data;
});

// delete task
export const deleteTask = createAsyncThunk("task/delete_task", async (uuid) => {
  const result = await fetch("http://localhost:8000/tasks/" + uuid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return uuid;
});

// Slice
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    entities: [],
    status: "idle", // 'pending', 'fulfilled', 'rejected
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => {
        return {
          entities: [],
          status: "idle",
          error: null,
        };
      })
      // loadTasks
      .addCase(loadTasks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loadTasks.rejected, (state) => {
        state.status = "rejected";
        state.error = "Error loading tasks";
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.entities = action.payload;
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createTask.rejected, (state) => {
        state.status = "rejected";
        state.error = "Something went wrong";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.entities.push(action.payload);
      })
      // toggleTask
      .addCase(toggleTask.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(toggleTask.rejected, (state) => {
        state.status = "rejected";
        state.error = "Error toggling task";
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;

        const updatedTask = action.payload;
        const index = state.entities.findIndex((task) => task.uuid === updatedTask.uuid);
        state.entities[index] = updatedTask;
      })
      // toggleTask
      .addCase(deleteTask.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.status = "rejected";
        state.error = "Error deleting task";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;

        state.entities = state.entities.filter((task) => task.uuid !== action.payload);
      });
  },
});

// Selectors
export function getTasks(state, activeFilter) {
  switch (activeFilter) {
    case "all":
      return state.tasks.entities;
    case "active":
      return state.tasks.entities.filter((task) => task.completed === false);
    case "completed":
      return state.tasks.entities.filter((task) => task.completed === true);
    default:
      return state;
  }
}

// Reducer
export const tasksReducer = tasksSlice.reducer;
