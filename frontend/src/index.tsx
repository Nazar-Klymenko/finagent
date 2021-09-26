import React from "react";
import { render } from "react-dom";
import App from "./_app/App";
import * as serviceWorkerRegistration from "@utils/serviceWorkerRegistration";
import "@utils/i18n";
import { Provider } from "react-redux";
import store from "@redux/store";
// import { DataProvider } from "./context/DataContext";
// import reportWebVitals from "./utils/reportWebVitals";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
