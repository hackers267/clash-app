import styles from "./index.module.css";

export function LangSwitcher(): JSX.Element {
  return (
    <ul className={styles.container}>
      <li>EN</li>
      <li>中文</li>
    </ul>
  );
}
