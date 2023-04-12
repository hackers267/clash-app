import styles from "./index.module.css";

export interface CardProps {
  name: string;
  type: string;
}

export function Card({ name, type }: CardProps): JSX.Element {
  const containerClass = `${styles.card} ${styles.cardActive}`;
  return (
    <div className={containerClass}>
      <div className={styles.cardName}>{name}</div>
      <div className={styles.cardCheck}>Check</div>
      <div className={styles.cardType}>
        <span>{type}</span>
        <span className={styles.cardLabel}>UDP</span>
      </div>
    </div>
  );
}
