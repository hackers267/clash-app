import styles from "./index.module.css";
import classNames from "classnames";

export function Card({ name, type, active }: ProfileCard): JSX.Element {
  const cardClass = classNames(styles.card, {
    [styles.active]: active,
  });
  return (
    <div className={cardClass}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>View</div>
      <div className={styles.type}>{type}</div>
    </div>
  );
}
