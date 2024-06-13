import { useSelector, useDispatch } from "react-redux";

import { addTask, delTask, toggleTask } from "./store/tasks/tasks-actions";
import { getAllTasks, getCompletedTasks, getActiveTasks } from "./store/tasks/tasks-selectors";

export function App() {
  return (
    <div className="App">
      <h1>Redux Tasks</h1>
      <NewTask />
      <TaskList />
    </div>
  );
}

function NewTask() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask(event.target.title.value));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="New task" />
      <input type="submit" value="Add Task" />
    </form>
  );
}

function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector(getActiveTasks);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.title}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
          />{" "}
          {task.title}
          <button onClick={() => dispatch(delTask(task.id))}>delete</button>
        </li>
      ))}
    </ul>
  );
}
