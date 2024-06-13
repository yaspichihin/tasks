import { ADD_TASK, DEL_TASK, TOGGLE_TASK } from "./tasks-consts";

export function addTask(title) {
  return {
    type: ADD_TASK,
    payload: {
      title,
    },
  };
}

export function delTask(taskId) {
  return {
    type: DEL_TASK,
    payload: {
      taskId,
    },
  };
}

export function toggleTask(taskId) {
  return {
    type: TOGGLE_TASK,
    payload: {
      taskId,
    },
  };
}
