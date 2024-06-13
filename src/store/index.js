import { legacy_createStore as createStore } from "redux";

import { rootReducer } from "./root-reducer";

export function configureStore() {
  return createStore(
    rootReducer,
    [],
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
