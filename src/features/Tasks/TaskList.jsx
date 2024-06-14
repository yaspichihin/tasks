import { useDispatch, useSelector } from "react-redux";
import { getTasks, toggleTask, delTask } from "./tasks-slice";

export function TaskList() {
  const dispatch = useDispatch();

  const activeFilter = useSelector((state) => state.filter);
  const tasks = useSelector((state) => getTasks(state, activeFilter));

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
