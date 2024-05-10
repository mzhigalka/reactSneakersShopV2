import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "../src/scss/index.scss";
import React from "react";
import App from "./App";
import "macro-css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
