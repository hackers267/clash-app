import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import { General } from "./pages/General";
import { Settings } from "./pages/Settings";
import { Logs } from "./pages/Logs";
import { Connections } from "./pages/Connections";
import { Feedback } from "./pages/Feedback";
import { Proxies } from "./pages/Proxies";
import { Profiles } from "./pages/Profiles";
import { Side } from "./Layouts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Side>
              <General />
            </Side>
          }
        />
        <Route
          path="/settings"
          element={
            <Side>
              <Settings />
            </Side>
          }
        />
        <Route
          path="/logs"
          element={
            <Side>
              <Logs />
            </Side>
          }
        />
        <Route
          path="/feedback"
          element={
            <Side>
              <Feedback />
            </Side>
          }
        />
        <Route
          path="/proxies"
          element={
            <Side>
              <Proxies />
            </Side>
          }
        />
        <Route
          path="/profiles"
          element={
            <Side>
              <Profiles />
            </Side>
          }
        />
        <Route
          path="/connections"
          element={
            <Side>
              <Connections />
            </Side>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
