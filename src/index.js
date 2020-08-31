import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import App from "./App";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
