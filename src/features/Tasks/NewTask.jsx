import { useDispatch } from "react-redux";
import { createTask } from "./tasks-slice";

export function NewTask() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.title.value) {
      dispatch(createTask(event.target.title.value));
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="New task" />
      <input type="submit" value="Add Task" />
    </form>
  );
}
