import { addTask, delTask, toggleTask } from "./tasks-actions";

export function tasksReducer(state = [], action) {
  switch (action.type) {
    case addTask.toString(): {
      return [...state, { ...action.payload }];
    }
    case delTask.toString(): {
      return state.filter((task) => task.id !== action.payload);
    }
    case toggleTask.toString(): {
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    }
    default: {
      console.log(action.type);
      return state;
    }
  }
}
