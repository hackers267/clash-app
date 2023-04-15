import { Header, Mode } from "./components";
import styles from "./index.module.css";
import { Outlet } from "react-router";

export function Proxies(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <Mode />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
