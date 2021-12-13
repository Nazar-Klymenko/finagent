import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "@redux/store";

import App from "./_app/App";
import "./_utils/i18n";
import * as serviceWorkerRegistration from "./_utils/serviceWorkerRegistration";

// import reportWebVitals from "./utils/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
// reportWebVitals(console.log);
