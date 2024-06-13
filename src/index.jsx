import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./App";
import { configureStore } from "./store/index";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
