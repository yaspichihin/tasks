import { useDispatch, useSelector } from "react-redux";

import { setFilter } from "./filter-slice";

export function Filter() {
  const dispatch = useDispatch();

  const activeFilter = useSelector((state) => state.filter);

  function handleFilter(value) {
    dispatch(setFilter(value));
  }

  return (
    <div>
      <button
        style={{ backgroundColor: activeFilter === "all" ? "peru" : "lightgrey" }}
        onClick={() => handleFilter("all")}
      >
        all
      </button>
      <button
        style={{ backgroundColor: activeFilter === "active" ? "peru" : "lightgrey" }}
        onClick={() => handleFilter("active")}
      >
        active
      </button>
      <button
        style={{ backgroundColor: activeFilter === "completed" ? "peru" : "lightgrey" }}
        onClick={() => handleFilter("completed")}
      >
        completed
      </button>
    </div>
  );
}
