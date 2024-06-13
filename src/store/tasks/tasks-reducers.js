import { ADD_TASK, DEL_TASK, TOGGLE_TASK } from "./tasks-consts";

export function tasksReducer(state = [], action) {
  switch (action.type) {
    case ADD_TASK: {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      return [...state, newTask];
    }
    case DEL_TASK: {
      return state.filter((task) => task.id !== action.payload.taskId);
    }
    case TOGGLE_TASK: {
      return state.map((task) =>
        task.id === action.payload.taskId ? { ...task, completed: !task.completed } : task
      );
    }
    default: {
      return state;
    }
  }
}
