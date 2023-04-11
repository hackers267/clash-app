import styles from "./index.module.css";
import { LangSwitcher } from "../LangSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function ToolBar(): JSX.Element {
  return (
    <div className={styles.container}>
      <ThemeSwitcher />
      <LangSwitcher />
    </div>
  );
}
