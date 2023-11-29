import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Layer } from "./datalayer.js";
import { initialState, reducer } from "./reducer.js";
ReactDOM.render(
  <React.StrictMode>
    <Layer reducer={reducer} initialState={initialState}>
      <App />
    </Layer>
  </React.StrictMode>,
  document.getElementById("root")
);
