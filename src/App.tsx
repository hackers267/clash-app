import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Side } from "./Layouts";
import { General } from "./pages/General";
import { Settings } from "./pages/Settings";
import { Logs } from "./pages/Logs";
import { Feedback } from "./pages/Feedback";
import { Proxies } from "./pages/Proxies";
import { Profiles } from "./pages/Profiles";
import { Connections } from "./pages/Connections";
import React from "react";
import { IntlProvider } from "react-intl";

function App(): JSX.Element {
  const en = {
    General: "General",
    Settings: "Settings",
    Logs: "Logs",
    Feedback: "Feedback",
    Proxies: "Proxies",
    Profiles: "Profiles",
    Connections: "Connections",
  };
  const zh = {
    General: "通用",
    Settings: "设置",
    Logs: "日志",
    Feedback: "反馈",
    Proxies: "代理",
    Profiles: "配置",
    Connections: "连接",
  };
  return (
    <div className="container">
      <IntlProvider locale="zh-CN" messages={zh}>
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
      </IntlProvider>
    </div>
  );
}

export default App;
