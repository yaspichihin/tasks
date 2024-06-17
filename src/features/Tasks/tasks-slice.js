import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { resetState } from "../Reset/reset-actions";

const tasksAdapter = createEntityAdapter({
  // Указываем уникальный идентификатор сущностей
  selectId: (task) => task.uuid,
});

// get tasks
export const loadTasks = createAsyncThunk(
  "tasks/load_tasks",
  async (_, { rejectWithValue, extra: api }) => {
    try {
      return api.loadTasks();
    } catch (err) {
      // Возвращаем свою ошибку
      return rejectWithValue("Error loading tasks");
    }
  },
  {
    // Если запрос выполняется, то не отправлять этот запрос
    condition: (_, { getState }) => {
      const { status } = getState().tasks;

      if (status === "loading") {
        return false;
      }
    },
  }
);

// create task
export const createTask = createAsyncThunk(
  "task/create_task",
  async (title, { rejectWithValue, extra: api }) => {
    try {
      return api.createTask(title);
    } catch (err) {
      return rejectWithValue("Error create task");
    }
  },
  {
    // Если запрос выполняется, то не отправлять этот запрос
    condition: (_, { getState }) => {
      const { status } = getState().tasks;

      if (status === "loading") {
        return false;
      }
    },
  }
);

// toggle task
export const toggleTask = createAsyncThunk(
  "task/toggle_task",
  async (uuid, { getState, rejectWithValue, extra: api }) => {
    try {
      const task = getState().tasks.entities[uuid];

      return api.toggleTask(uuid, task);
    } catch (err) {
      return rejectWithValue("Error toggling task");
    }
  },
  {
    // Если запрос выполняется, то не отправлять этот запрос
    condition: (_, { getState }) => {
      const { status } = getState().tasks;

      if (status === "loading") {
        return false;
      }
    },
  }
);

// delete task
export const deleteTask = createAsyncThunk(
  "task/delete_task",
  async (uuid, { rejectWithValue, extra: api }) => {
    try {
      return api.deleteTask(uuid);
    } catch (err) {
      return rejectWithValue("Error deleting task");
    }
  },
  {
    // Если запрос выполняется, то не отправлять этот запрос
    condition: (_, { getState }) => {
      const { status } = getState().tasks;

      if (status === "loading") {
        return false;
      }
    },
  }
);

// Slice
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(
    // entities по умолчанию определяется в адаптере
    {
      // Дополнительные параметры состояния
      status: "idle", // 'pending', 'fulfilled', 'rejected
      error: null,
    }
  ),
  extraReducers: (builder) => {
    builder
      .addCase(resetState, (state) => {
        tasksAdapter.removeAll(state);
        state.status = "idle";
        state.error = null
      })
      // loadTasks
      .addCase(loadTasks.fulfilled, (state, action) => {
        tasksAdapter.addMany(state, action.payload);
      })
      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
      })
      // toggleTask
      .addCase(toggleTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        tasksAdapter.updateOne(state, {
          // Где меняем определяем через uuid
          id: updatedTask.uuid,
          // Что меняем
          changes: {
            completed: updatedTask.completed,
          },
        });
      })
      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        const task_uuid = action.payload;
        tasksAdapter.removeOne(state, task_uuid);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "pending";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "rejected";
          // Ошибку брать которую определили сами или из action.error.message;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "fulfilled";
          state.error = null;
        }
      );
  },
});

// Basic selector
export const tasksSelectors = tasksAdapter.getSelectors((state) => state.tasks);

// extra logic
export function selectVisibleTasks(tasks = [], activeFilter) {
  switch (activeFilter) {
    case "all":
      return tasks;
    case "active":
      return tasks.filter((task) => task.completed === false);
    case "completed":
      return tasks.filter((task) => task.completed === true);
    default:
      return tasks;
  }
}

// Reducer
export const tasksReducer = tasksSlice.reducer;
