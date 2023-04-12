import styles from "./index.module.css";

export function Card(): JSX.Element {
  const containerClass = `${styles.card} ${styles.cardActive}`;
  return (
    <div className={containerClass}>
      <div className={styles.cardName}>DIRECT</div>
      <div className={styles.cardCheck}>Check</div>
      <div className={styles.cardType}>
        <span>Direct</span>
        <span className={styles.cardLabel}>UDP</span>
      </div>
    </div>
  );
}
