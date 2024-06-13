import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App";
import { configureStore } from "./store/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
