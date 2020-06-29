import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import "popper.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery.min.js";
import "font-awesome/css/font-awesome.css";
import * as serviceWorker from "./serviceWorker";
import config from "./store/store";

ReactDOM.render(
  <Provider store={config.store}>
    <PersistGate loading={null} persistor={config.persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
