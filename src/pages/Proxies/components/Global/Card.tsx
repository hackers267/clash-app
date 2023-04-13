import styles from "./index.module.css";
import classNames from "classnames";

export interface CardProps {
  name: string;
  type: string;
  active: boolean;
}

export function Card({ name, type, active }: CardProps): JSX.Element {
  const containerClass = classNames(styles.card, {
    [styles.cardActive]: active,
  });
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
