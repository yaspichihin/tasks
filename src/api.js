const BASE_URL = "http://localhost:8000/";

// get tasks
export const loadTasks = async () => {
  const result = await fetch(BASE_URL + "tasks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data;
};

// create task
export const createTask = async (title) => {
  const result = await fetch(BASE_URL + "tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await result.json();
  return data;
};

// toggle task
export const toggleTask = async (uuid, task) => {
  const result = await fetch(BASE_URL + "tasks/" + uuid, {
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
};

// delete task
export const deleteTask = async (uuid) => {
  await fetch(BASE_URL + "tasks/" + uuid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return uuid;
};
