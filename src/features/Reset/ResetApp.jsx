import { useDispatch } from "react-redux";

import { resetState } from "./reset-actions";

export function ResetApp() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(resetState())}>Reset</button>;
}
