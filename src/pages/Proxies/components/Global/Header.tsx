import styles from "./index.module.css";

export function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.item}>
        <span>Global</span>
        <span>S</span>
        <span>美国07</span>
      </div>
      <div className={styles.item}>
        {/* TODO: 替换为icon */}
        <span>info</span>
        <span>speed</span>
      </div>
    </div>
  );
}
