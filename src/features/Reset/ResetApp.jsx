import { useDispatch } from "react-redux";

import { resetState } from "./reset-actions";
import { loadTasks } from "../Tasks/tasks-slice";
import { ToastContainer, toast } from "react-toastify";

export function ResetApp() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(resetState());
        dispatch(loadTasks())
          .unwrap()
          .then(() => {
            toast("All tasks were fetched");
          })
          .catch((err) => {
            toast(err);
          });
      }}
    >
      {" "}
      Reset
    </button>
  );
}
