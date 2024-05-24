import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "../src/scss/index.scss";
import App from "./App";
import "macro-css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
