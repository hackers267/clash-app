import { Header } from "./components";
import styles from "./index.module.css";
import { Outlet } from "react-router";

export function Proxies(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
