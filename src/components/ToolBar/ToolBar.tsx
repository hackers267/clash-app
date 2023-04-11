import styles from "./index.module.css";
import { LangSwitcher } from "../LangSwitcher";

export function ToolBar(): JSX.Element {
  return (
    <div className={styles.container}>
      <LangSwitcher />
    </div>
  );
}
