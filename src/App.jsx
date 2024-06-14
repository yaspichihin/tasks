import { NewTask } from "./features/Tasks/NewTask";
import { Filter } from "./features/Filter/Filter";
import { ResetApp } from "./features/Reset/ResetApp";
import { TaskList } from "./features/Tasks/TaskList";

export function App() {
  return (
    <div className="App">
      <h1>Redux Tasks</h1>
      <NewTask />
      <Filter />
      <ResetApp />
      <TaskList />
    </div>
  );
}
