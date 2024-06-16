import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, toggleTask, deleteTask, loadTasks } from "./tasks-slice";

export function TaskList() {
  const dispatch = useDispatch();

  const activeFilter = useSelector((state) => state.filter);
  const tasks = useSelector((state) => getTasks(state, activeFilter));

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.title}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.uuid))}
          />{" "}
          {task.title}
          <button onClick={() => dispatch(deleteTask(task.uuid))}>delete</button>
        </li>
      ))}
    </ul>
  );
}
