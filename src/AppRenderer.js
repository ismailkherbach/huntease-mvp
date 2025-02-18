import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn:
    "https://b113d6fc6a2a496ca6b80b90d62b52a5@o410251.ingest.sentry.io/5284008",
});

const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));
ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<div className="loading" />}>
      <App />
    </Suspense>{" "}
  </Provider>,
  document.getElementById("root")
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
