export function getAllTasks(state) {
  return state.tasks;
}

export function getActiveTasks(state) {
  return state.tasks.filter((task) => task.completed === false);
}

export function getCompletedTasks(state) {
  return state.tasks.filter((task) => task.completed === true);
}
