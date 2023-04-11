import styles from "./App.module.css";
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
import { ToolBar } from "./components";
import { useAtom } from "jotai";
import { langAtom } from "./storage";

function App(): JSX.Element {
  const [state] = useAtom(langAtom);
  const { locals, message } = state;
  return (
    <div className={styles.container}>
      <ToolBar />
      <IntlProvider defaultLocale="zh-CN" locale={locals} messages={message}>
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
