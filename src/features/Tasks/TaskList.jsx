import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVisibleTasks,
  toggleTask,
  deleteTask,
  loadTasks,
  tasksSelectors,
} from "./tasks-slice";

import "react-toastify/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export function TaskList() {
  const dispatch = useDispatch();

  const activeFilter = useSelector((state) => state.filter);
  const tasks = useSelector(tasksSelectors.selectAll);
  const { error, status } = useSelector((state) => state.tasks);
  const visibleTasks = selectVisibleTasks(tasks, activeFilter);

  useEffect(() => {
    const promise = dispatch(loadTasks())
      // Добавляем поддержку catch для rejected fetch actions
      .unwrap()
      .then(() => {
        toast("All tasks were fetched");
      })
      // Без unwrap не работает
      .catch((err) => {
        toast(err);
      });

    // Отменить запрос при закрытие страницы
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <ul>
        {error && <h2>{error}</h2>}
        {status === "loading" && <h2>Loading...</h2>}
        {
          // Если статус загружено
          status === "fulfilled" &&
            // И нет ошибок
            !error &&
            // Отрисовать задачи
            visibleTasks.map((task) => (
              <li key={task.uuid}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.uuid))}
                />{" "}
                {task.title}
                <button onClick={() => dispatch(deleteTask(task.uuid))}>delete</button>
              </li>
            ))
        }
      </ul>
    </>
  );
}
