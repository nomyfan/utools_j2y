import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if ((globalThis as any).utools) {
  (globalThis as any).utools.onPluginReady(() => {
    runApp();
  });
} else {
  runApp();
}
