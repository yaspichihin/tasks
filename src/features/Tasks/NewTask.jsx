import { useDispatch } from "react-redux";
import { addTask } from "./tasks-slice";

export function NewTask() {
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
